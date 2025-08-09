const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// Simple similarity score based on overlapping interests and skills
function computeSimilarityScore(a, b) {
  const aInterests = new Set(a.profile?.interests || []);
  const bInterests = new Set(b.profile?.interests || []);
  const aSkills = new Set(a.insights?.skills || []);
  const bSkills = new Set(b.insights?.skills || []);

  let score = 0;
  for (const i of aInterests) if (bInterests.has(i)) score += 2;
  for (const s of aSkills) if (bSkills.has(s)) score += 3;
  return score;
}

// GET /api/network/suggested - suggested people to connect with
router.get('/suggested', auth, async (req, res) => {
  try {
    const current = req.user;
    const candidates = await User.find({ _id: { $ne: current._id }, isActive: true })
      .select('profile insights email createdAt')
      .limit(100);

    const scored = candidates
      .map(u => ({
        user: u,
        score: computeSimilarityScore(current, u)
      }))
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(x => ({
        id: x.user._id,
        name: x.user.profile?.name,
        location: x.user.profile?.location,
        currentJob: x.user.profile?.currentJob,
        interests: x.user.profile?.interests || [],
        skills: x.user.insights?.skills || [],
        score: x.score
      }));

    res.json(scored);
  } catch (error) {
    console.error('Get suggested network error:', error);
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});

// GET /api/network/search?q=design
router.get('/search', auth, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json([]);
    }

    const regex = new RegExp(q, 'i');
    const results = await User.find({
      _id: { $ne: req.user._id },
      isActive: true,
      $or: [
        { 'profile.name': regex },
        { 'profile.currentJob': regex },
        { 'profile.interests': regex },
        { 'insights.skills': regex }
      ]
    })
      .select('profile insights')
      .limit(20);

    res.json(results.map(u => ({
      id: u._id,
      name: u.profile?.name,
      location: u.profile?.location,
      currentJob: u.profile?.currentJob,
      interests: u.profile?.interests || [],
      skills: u.insights?.skills || []
    })));
  } catch (error) {
    console.error('Search network error:', error);
    res.status(500).json({ error: 'Failed to search' });
  }
});

module.exports = router;


