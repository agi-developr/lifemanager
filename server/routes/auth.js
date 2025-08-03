const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../middleware/auth');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, age, location, currentJob, interests } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      email,
      password,
      profile: {
        name,
        age,
        location,
        currentJob,
        interests: interests || []
      }
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        insights: user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Update last active
    await user.updateLastActive();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        insights: user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        insights: user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { name, age, location, currentJob, interests, goals } = req.body;

    // Update profile
    user.profile = {
      ...user.profile,
      name: name || user.profile.name,
      age: age || user.profile.age,
      location: location || user.profile.location,
      currentJob: currentJob || user.profile.currentJob,
      interests: interests || user.profile.interests,
      goals: goals || user.profile.goals
    };

    await user.save();

    res.json({
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        insights: user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Demo login (for development)
router.post('/demo', async (req, res) => {
  try {
    // Create or find demo user
    let user = await User.findOne({ email: 'demo@lifemanagement.app' });
    
    if (!user) {
      user = new User({
        email: 'demo@lifemanagement.app',
        password: 'demo123',
        profile: {
          name: 'Demo User',
          age: 25,
          location: 'San Francisco, CA',
          currentJob: 'Software Developer',
          interests: ['Technology', 'Travel', 'Reading'],
          goals: ['Learn React', 'Save $10,000', 'Find new job']
        },
        insights: {
          passions: ['Coding', 'Travel', 'Writing'],
          strengths: ['Problem Solving', 'Creativity', 'Leadership'],
          skills: ['JavaScript', 'Project Management', 'Communication'],
          progress: {
            sessionsCompleted: 12,
            goalsAchieved: 3,
            lastActive: new Date()
          }
        }
      });
      await user.save();
    }

    // Update last active
    await user.updateLastActive();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        profile: user.profile,
        insights: user.getInsightsSummary()
      }
    });
  } catch (error) {
    console.error('Demo login error:', error);
    res.status(500).json({ error: 'Failed to login demo user' });
  }
});

module.exports = router; 