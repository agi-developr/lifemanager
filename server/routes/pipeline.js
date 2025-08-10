const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const aiService = require('../services/aiService');

function computeAlignment(passions = [], skills = []) {
  if (!Array.isArray(passions) || passions.length === 0) return 0;
  const skillNames = skills
    .map((s) => (typeof s === 'string' ? s : s?.name))
    .filter(Boolean)
    .map((x) => x.toLowerCase());

  const passionToKeywords = {
    ai: ['ai', 'artificial intelligence', 'ml', 'machine learning', 'data', 'software', 'coding', 'engineering'],
    sustainability: ['sustainability', 'climate', 'environment', 'green', 'carbon', 'fundraising', 'partnerships', 'policy'],
    edtech: ['edtech', 'education', 'learning', 'curriculum', 'ui', 'ux', 'product', 'coding']
  };

  const normalize = (s) => (s || '').toLowerCase().trim();
  const normalizedPassions = passions.map(normalize);

  let matches = 0;
  for (const p of normalizedPassions) {
    const key = p.replace(/\s+/g, '');
    const keywords = passionToKeywords[key] || [p];
    const isMatch = keywords.some((kw) => skillNames.some((sn) => sn.includes(kw) || kw.includes(sn)));
    if (isMatch) matches += 1;
  }
  return Math.round((matches / normalizedPassions.length) * 100);
}

// Save or update assessments/tests
router.put('/tests', auth, async (req, res) => {
  try {
    const data = req.body || {};
    const { personality, passions, skills, demographics, currentStage, currentIdeaDescription } = data;

    // Update
    req.user.assessments = {
      ...req.user.assessments,
      personality: personality || req.user.assessments?.personality,
      passions: passions || req.user.assessments?.passions || [],
      skills: skills || req.user.assessments?.skills || [],
      demographics: demographics || req.user.assessments?.demographics,
      currentStage: currentStage || req.user.assessments?.currentStage,
      currentIdeaDescription: currentIdeaDescription || req.user.assessments?.currentIdeaDescription
    };

    // Compute alignment
    const flatSkills = (req.user.assessments.skills || []).map((s) => (typeof s === 'string' ? s : s?.name)).filter(Boolean);
    req.user.assessments.alignmentScore = computeAlignment(req.user.assessments.passions || [], flatSkills);

    await req.user.save();

    res.json({
      assessments: req.user.assessments
    });
  } catch (error) {
    console.error('Save tests error:', error);
    res.status(500).json({ error: 'Failed to save tests' });
  }
});

// Generate personalized pipeline JSON
router.get('/coach', auth, async (req, res) => {
  try {
    const a = req.user.assessments || {};
    const summary = a.personality?.type || 'Unknown';

    const userContext = {
      user_personality_type: a.personality?.type,
      user_passions: a.passions,
      user_skills: a.skills,
      user_demographics: a.demographics,
      current_stage: a.currentStage,
      current_idea_description: a.currentIdeaDescription,
      alignment_score: a.alignmentScore
    };

    // If no data, return guidance to complete tests
    if (!a.passions || !a.skills || !a.demographics) {
      return res.json({
        summary: 'Complete Tests to personalize your pipeline.',
        steps: [
          { step_number: 1, action: 'Open Tests', tips: 'Fill personality, top 3 passions, skills with levels, demographics.' }
        ],
        next_recommendation: 'Submit your Tests, then reload the Pipeline Coach.',
        potential_matches: []
      });
    }

    // Compose deterministic JSON without external AI dependency for now
    const stage = (a.currentStage || 'Ideation').trim();
    const strengths = (a.skills || [])
      .filter((s) => (s.level || 0) >= 7)
      .map((s) => (typeof s === 'string' ? s : s.name));
    const gaps = (a.skills || [])
      .filter((s) => (s.level || 0) <= 4)
      .map((s) => (typeof s === 'string' ? s : s.name));

    const payload = {
      summary: `As a ${summary} with passions in ${a.passions?.join(', ')}, alignment ${a.alignmentScore || 0}%. Strengths: ${strengths.join(', ') || 'n/a'}. Focus: ${stage}.`,
      steps: [
        {
          step_number: 1,
          action: 'Ideation: sharpen problem/persona and JTBD',
          tips: 'Define 1 target persona and top 3 pains. Post to Ideas with success criteria.'
        },
        {
          step_number: 2,
          action: 'Validation: 10 interviews + 4-question survey',
          tips: 'Aim for ≥70% strong pain signal and 3 pre-commit emails.'
        },
        {
          step_number: 3,
          action: 'Collaborators: close gaps',
          tips: `Use Matches to find: ${gaps.join(', ') || 'marketing, fundraising'}`
        },
        {
          step_number: 4,
          action: 'Prototyping: 1-week MVP',
          tips: 'Define 1 core flow, choose no-code or code based on skills, daily feedback loop.'
        },
        {
          step_number: 5,
          action: 'Launch: minimal GTM test',
          tips: 'Landing page + single channel. Goal: 100 visits, 20 signups, 5 calls.'
        },
        {
          step_number: 6,
          action: 'Scaling: metrics + SWOT + pivot rules',
          tips: 'North-star: WAU; pivot if activation <5% after 2 iterations.'
        }
      ],
      next_recommendation: stage === 'Ideation' ? 'Run Validation interviews next.' : 'Proceed to next pipeline stage.',
      potential_matches: [
        'Growth marketer (climate tech)',
        'Fundraising/partnerships lead',
        'Designer for gamification'
      ]
    };

    res.json(payload);
  } catch (error) {
    console.error('Coach error:', error);
    res.status(500).json({ error: 'Failed to generate pipeline' });
  }
});

module.exports = router;


