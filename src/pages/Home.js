import React from 'react';
import { Link } from 'react-router-dom';

const featuredTools = [
  {
    title: 'Career Planning',
    description: 'Set your career path and milestones with AI guidance',
    icon: '🚀',
    path: '/chat/career',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    title: 'Goal Tracker',
    description: 'Manage and achieve your personal goals systematically',
    icon: '🎯',
    path: '/chat/goals',
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    title: 'Passion Discovery',
    description: 'Find what truly excites and motivates you',
    icon: '🔥',
    path: '/chat/passions',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    title: 'Skill Development',
    description: 'Learn new skills tailored to your interests',
    icon: '📚',
    path: '/chat/upskill',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    title: 'Financial Planning',
    description: 'Manage your money and build wealth',
    icon: '💰',
    path: '/chat/money',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  },
  {
    title: 'Community Connect',
    description: 'Find and connect with like-minded individuals',
    icon: '👥',
    path: '/chat/community',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
];

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-primary-600">LifeManager</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Your AI-powered life coach helping you discover passions, build skills, and achieve your goals. 
          Start a conversation and transform your life today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/chat/passions"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Start Your Journey
          </Link>
          <Link
            to="/dashboard"
            className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
          <div className="text-gray-600">Happy Users</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
          <div className="text-gray-600">Life Areas Covered</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
          <div className="text-gray-600">AI Support Available</div>
        </div>
      </div>

      {/* Featured Tools */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <Link
              key={tool.title}
              to={tool.path}
              className="group block"
            >
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className={`${tool.color} p-6 text-white text-center`}>
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                  <p className="text-white/90 text-sm">{tool.description}</p>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-primary-600 font-medium group-hover:text-primary-700">
                      Start Conversation
                    </span>
                    <svg className="w-5 h-5 text-primary-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Start a Conversation</h3>
            <p className="text-gray-600">Choose a topic and begin chatting with your AI life coach</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Get Insights</h3>
            <p className="text-gray-600">Receive personalized insights and actionable recommendations</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your growth and celebrate your achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 