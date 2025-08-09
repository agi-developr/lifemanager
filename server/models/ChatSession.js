const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  module: {
    type: String,
    enum: ['passions', 'strengths', 'upskill', 'money', 'career', 'events', 'goals', 'community', 'business', 'networking', 'general'],
    required: true
  },
  messages: [messageSchema],
  insights: {
    discoveredPassions: [{
      type: String,
      trim: true
    }],
    identifiedStrengths: [{
      type: String,
      trim: true
    }],
    recommendations: [{
      type: String,
      trim: true
    }],
    goals: [{
      type: String,
      trim: true
    }]
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'paused'],
    default: 'active'
  },
  metadata: {
    sessionDuration: Number, // in minutes
    messageCount: {
      type: Number,
      default: 0
    },
    lastActivity: {
      type: Date,
      default: Date.now
    }
  }
}, {
  timestamps: true
});

// Update message count and last activity
chatSessionSchema.methods.addMessage = function(message) {
  this.messages.push(message);
  this.metadata.messageCount = this.messages.length;
  this.metadata.lastActivity = new Date();
  return this.save();
};

// Get session summary
chatSessionSchema.methods.getSummary = function() {
  return {
    id: this._id,
    module: this.module,
    messageCount: this.metadata.messageCount,
    status: this.status,
    insights: this.insights,
    createdAt: this.createdAt,
    lastActivity: this.metadata.lastActivity
  };
};

// Extract insights from messages
chatSessionSchema.methods.extractInsights = function() {
  const insights = {
    discoveredPassions: [],
    identifiedStrengths: [],
    recommendations: [],
    goals: []
  };

  // Simple keyword-based insight extraction
  const passionKeywords = ['love', 'passionate', 'enjoy', 'excited', 'motivated'];
  const strengthKeywords = ['strength', 'good at', 'excel', 'skilled', 'talent'];
  const goalKeywords = ['goal', 'aim', 'target', 'achieve', 'want to'];

  this.messages.forEach(message => {
    const content = message.content.toLowerCase();
    
    if (message.sender === 'assistant') {
      // Extract recommendations from AI responses
      if (content.includes('recommend') || content.includes('suggest')) {
        insights.recommendations.push(message.content);
      }
    }
  });

  return insights;
};

module.exports = mongoose.model('ChatSession', chatSessionSchema); 