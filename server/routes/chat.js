const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const ChatSession = require('../models/ChatSession');
const User = require('../models/User');
const aiService = require('../services/aiService');

// Create new chat session
router.post('/session', auth, async (req, res) => {
  try {
    const { module } = req.body;
    
    // Check if user already has an active session for this module
    let session = await ChatSession.findOne({
      userId: req.user._id,
      module,
      status: 'active'
    });

    if (!session) {
      // Create new session
      session = new ChatSession({
        userId: req.user._id,
        module,
        messages: []
      });
    }

    // Generate welcome message
    const welcomeMessage = await aiService.generateResponse(
      `Start a conversation about ${module}`,
      module,
      req.user.getInsightsSummary()
    );

    // Add welcome message to session
    session.messages.push({
      sender: 'assistant',
      content: welcomeMessage.content,
      timestamp: new Date()
    });

    await session.save();

    // Update user's last active time
    await req.user.updateLastActive();

    res.json({
      sessionId: session._id,
      module: session.module,
      messages: session.messages,
      insights: welcomeMessage.insights
    });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create chat session' });
  }
});

// Send message to AI
router.post('/message', auth, async (req, res) => {
  try {
    const { sessionId, message, module } = req.body;
    
    let session;
    
    if (sessionId) {
      // Find existing session
      session = await ChatSession.findById(sessionId);
      if (!session || session.userId.toString() !== req.user._id.toString()) {
        return res.status(404).json({ error: 'Session not found' });
      }
    } else {
      // Create new session if none exists
      session = new ChatSession({
        userId: req.user._id,
        module: module || 'general',
        messages: []
      });
    }

    // Add user message
    session.messages.push({
      sender: 'user',
      content: message,
      timestamp: new Date()
    });

    // Generate AI response
    const aiResponse = await aiService.generateResponse(
      message,
      session.module,
      req.user.getInsightsSummary()
    );

    // Add AI response
    session.messages.push({
      sender: 'assistant',
      content: aiResponse.content,
      timestamp: new Date()
    });

    // Update session metadata
    session.metadata.messageCount = session.messages.length;
    session.metadata.lastActivity = new Date();

    await session.save();

    // Update user insights if AI provided new ones
    if (aiResponse.insights && Object.keys(aiResponse.insights).length > 0) {
      await updateUserInsights(req.user._id, aiResponse.insights);
    }

    // Update user's last active time
    await req.user.updateLastActive();

    res.json({
      sessionId: session._id,
      messages: session.messages,
      insights: aiResponse.insights,
      suggestions: aiResponse.suggestions
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get chat sessions for user
router.get('/sessions', auth, async (req, res) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('module status metadata createdAt');

    res.json(sessions.map(session => session.getSummary()));
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// Get specific session
router.get('/session/:sessionId', auth, async (req, res) => {
  try {
    const session = await ChatSession.findById(req.params.sessionId);
    
    if (!session || session.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      sessionId: session._id,
      module: session.module,
      messages: session.messages,
      insights: session.insights,
      status: session.status
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// Update session status
router.put('/session/:sessionId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const session = await ChatSession.findById(req.params.sessionId);
    
    if (!session || session.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.status = status;
    await session.save();

    res.json({ message: 'Session updated successfully' });
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

// Helper function to update user insights
async function updateUserInsights(userId, insights) {
  try {
    const user = await User.findById(userId);
    if (!user) return;

    // Update insights based on AI response
    if (insights.passions) {
      user.insights.passions = [...new Set([...user.insights.passions, ...insights.passions])];
    }
    if (insights.strengths) {
      user.insights.strengths = [...new Set([...user.insights.strengths, ...insights.strengths])];
    }
    if (insights.skills) {
      user.insights.skills = [...new Set([...user.insights.skills, ...insights.skills])];
    }

    await user.save();
  } catch (error) {
    console.error('Error updating user insights:', error);
  }
}

module.exports = router; 