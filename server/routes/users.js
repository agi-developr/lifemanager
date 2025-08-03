const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const ChatSession = require('../models/ChatSession');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        profile: req.user.profile,
        insights: req.user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to get profile' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, age, location, currentJob, interests, goals } = req.body;
    
    req.user.profile = {
      ...req.user.profile,
      name: name || req.user.profile.name,
      age: age || req.user.profile.age,
      location: location || req.user.profile.location,
      currentJob: currentJob || req.user.profile.currentJob,
      interests: interests || req.user.profile.interests,
      goals: goals || req.user.profile.goals
    };
    
    await req.user.save();
    
    res.json({
      user: {
        id: req.user._id,
        email: req.user.email,
        profile: req.user.profile,
        insights: req.user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user insights
router.get('/insights', auth, async (req, res) => {
  try {
    res.json(req.user.getInsightsSummary());
  } catch (error) {
    console.error('Get insights error:', error);
    res.status(500).json({ error: 'Failed to get insights' });
  }
});

// Update user insights
router.put('/insights', auth, async (req, res) => {
  try {
    const { passions, strengths, skills } = req.body;
    
    if (passions) {
      req.user.insights.passions = [...new Set([...req.user.insights.passions, ...passions])];
    }
    if (strengths) {
      req.user.insights.strengths = [...new Set([...req.user.insights.strengths, ...strengths])];
    }
    if (skills) {
      req.user.insights.skills = [...new Set([...req.user.insights.skills, ...skills])];
    }
    
    await req.user.save();
    
    res.json(req.user.getInsightsSummary());
  } catch (error) {
    console.error('Update insights error:', error);
    res.status(500).json({ error: 'Failed to update insights' });
  }
});

// Get dashboard data
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Get recent sessions
    const recentSessions = await ChatSession.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(5)
      .select('module status metadata createdAt');

    // Calculate engagement score
    const totalSessions = await ChatSession.countDocuments({ userId: req.user._id });
    const completedSessions = await ChatSession.countDocuments({ 
      userId: req.user._id, 
      status: 'completed' 
    });
    
    const engagementScore = totalSessions > 0 ? Math.min(100, (completedSessions / totalSessions) * 100) : 0;

    res.json({
      profile: req.user.profile,
      insights: req.user.getInsightsSummary(),
      progress: {
        ...req.user.insights.progress,
        engagementScore: Math.round(engagementScore)
      },
      recentSessions: recentSessions.map(session => session.getSummary())
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

module.exports = router; 