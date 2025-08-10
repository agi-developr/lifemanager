const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: function() { return !this.googleId; }, // Only required if not Google OAuth
    minlength: 6
  },
  googleId: {
    type: String,
    sparse: true
  },
  profile: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    avatar: {
      type: String, // data URI or CDN URL
      trim: true
    },
    age: {
      type: Number,
      min: 13,
      max: 120
    },
    location: {
      type: String,
      trim: true
    },
    currentJob: {
      type: String,
      trim: true
    },
    interests: [{
      type: String,
      trim: true
    }],
    goals: [{
      type: String,
      trim: true
    }]
  },
  insights: {
    passions: [{
      type: String,
      trim: true
    }],
    strengths: [{
      type: String,
      trim: true
    }],
    skills: [{
      type: String,
      trim: true
    }],
    progress: {
      sessionsCompleted: {
        type: Number,
        default: 0
      },
      goalsAchieved: {
        type: Number,
        default: 0
      },
      lastActive: {
        type: Date,
        default: Date.now
      }
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    expiresAt: {
      type: Date
    }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pipeline Coach assessments and profile
userSchema.add({
  assessments: {
    personality: {
      type: {
        type: String, // e.g., "Innovative Extrovert"
        trim: true
      },
      bigFive: {
        openness: { type: Number, min: 0, max: 1 },
        conscientiousness: { type: Number, min: 0, max: 1 },
        extraversion: { type: Number, min: 0, max: 1 },
        agreeableness: { type: Number, min: 0, max: 1 },
        neuroticism: { type: Number, min: 0, max: 1 }
      }
    },
    passions: [{ type: String, trim: true }], // e.g., ["AI", "Sustainability", "EdTech"]
    skills: [{
      name: { type: String, trim: true },
      level: { type: Number, min: 0, max: 10 }
    }],
    demographics: {
      yearsExperience: { type: Number, min: 0, max: 80 },
      location: { type: String, trim: true },
      ageRange: { type: String, trim: true }
    },
    currentStage: { type: String, trim: true }, // Ideation, Validation, Prototyping, Launch, Scaling
    currentIdeaDescription: { type: String, trim: true },
    alignmentScore: { type: Number, min: 0, max: 100 }
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Get user insights summary
userSchema.methods.getInsightsSummary = function() {
  return {
    passions: this.insights.passions,
    strengths: this.insights.strengths,
    skills: this.insights.skills,
    progress: this.insights.progress
  };
};

// Update last active
userSchema.methods.updateLastActive = function() {
  this.insights.progress.lastActive = new Date();
  return this.save();
};

module.exports = mongoose.model('User', userSchema); 