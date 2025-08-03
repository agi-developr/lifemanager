const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User = require('../models/User');
const ChatSession = require('../models/ChatSession');

// Get user analytics
router.get('/analytics', auth, async (req, res) => {
  try {
    // Get session statistics
    const totalSessions = await ChatSession.countDocuments({ userId: req.user._id });
    const completedSessions = await ChatSession.countDocuments({ 
      userId: req.user._id, 
      status: 'completed' 
    });
    
    // Get module usage
    const moduleStats = await ChatSession.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$module', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Get recent activity
    const recentActivity = await ChatSession.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('module status metadata updatedAt');

    res.json({
      totalSessions,
      completedSessions,
      completionRate: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0,
      moduleStats,
      recentActivity: recentActivity.map(session => ({
        module: session.module,
        status: session.status,
        lastActivity: session.metadata.lastActivity,
        messageCount: session.metadata.messageCount
      }))
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to get analytics' });
  }
});

// Get personalized recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    const recommendations = [];

    // Based on user insights
    if (req.user.insights.passions.length > 0) {
      recommendations.push({
        type: 'passion',
        title: 'Explore Your Passions',
        description: 'Based on your interests, here are some activities to try',
        items: req.user.insights.passions.map(passion => ({
          name: `Learn more about ${passion}`,
          action: `Start a conversation about ${passion}`,
          module: 'passions'
        }))
      });
    }

    if (req.user.insights.strengths.length > 0) {
      recommendations.push({
        type: 'strength',
        title: 'Leverage Your Strengths',
        description: 'Use your strengths to advance your goals',
        items: req.user.insights.strengths.map(strength => ({
          name: `Develop ${strength} further`,
          action: `Explore career opportunities using ${strength}`,
          module: 'career'
        }))
      });
    }

    // Based on session history
    const recentSessions = await ChatSession.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(5);

    const usedModules = [...new Set(recentSessions.map(s => s.module))];
    const allModules = ['passions', 'strengths', 'upskill', 'money', 'career', 'events', 'goals', 'community'];
    const unusedModules = allModules.filter(module => !usedModules.includes(module));

    if (unusedModules.length > 0) {
      recommendations.push({
        type: 'exploration',
        title: 'Try New Areas',
        description: 'Explore these modules to discover new insights',
        items: unusedModules.slice(0, 3).map(module => ({
          name: `Explore ${module}`,
          action: `Start a conversation about ${module}`,
          module
        }))
      });
    }

    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Get progress insights
router.get('/progress', auth, async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user._id })
      .sort({ createdAt: 1 });

    // Calculate progress over time
    const progressData = sessions.map((session, index) => ({
      date: session.createdAt,
      sessionNumber: index + 1,
      module: session.module,
      messageCount: session.metadata.messageCount
    }));

    // Calculate engagement trends
    const weeklySessions = {};
    sessions.forEach(session => {
      const week = session.createdAt.toISOString().slice(0, 10); // YYYY-MM-DD
      weeklySessions[week] = (weeklySessions[week] || 0) + 1;
    });

    res.json({
      progressData,
      weeklySessions,
      totalSessions: sessions.length,
      averageMessagesPerSession: sessions.length > 0 
        ? sessions.reduce((sum, s) => sum + s.metadata.messageCount, 0) / sessions.length 
        : 0
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to get progress data' });
  }
});

module.exports = router; 