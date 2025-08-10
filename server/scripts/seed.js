/*
  Seed script to verify DB connection and create a demo user.
  Usage:
    MONGODB_URI="<your mongodb+srv>" JWT_SECRET="dev" node scripts/seed.js
*/

const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const User = require('../models/User');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI. Set env and try again.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected.');

  const email = 'demo@lifemanager.app';
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      email,
      password: 'demo123',
      profile: {
        name: 'Demo User',
        age: 25,
        location: 'Remote',
        currentJob: 'Builder',
        interests: ['AI', 'Startups', 'Learning'],
        goals: ['Ship MVP']
      },
      insights: {
        passions: ['Making'],
        strengths: ['Creativity'],
        skills: ['JS', 'UX'],
        progress: { sessionsCompleted: 0, goalsAchieved: 0, lastActive: new Date() }
      }
    });
    await user.save();
    console.log('Demo user created:', user.email);
  } else {
    console.log('Demo user already exists:', user.email);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


