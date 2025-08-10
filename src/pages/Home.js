import React from 'react';
import { Link } from 'react-router-dom';

const featuredTools = [
  {
    title: 'Workspace',
    description: 'Your collaborative home to organize ideas and people',
    icon: '🧭',
    path: '/workspace',
    color: 'bg-gradient-to-br from-blue-500 to-blue-600'
  },
  {
    title: 'Ideas',
    description: 'Capture, compare, and evolve ideas with AI assistance',
    icon: '💡',
    path: '/ideas',
    color: 'bg-gradient-to-br from-green-500 to-green-600'
  },
  {
    title: 'Pipeline',
    description: 'Structured steps from idea → business with AI help',
    icon: '🛠️',
    path: '/pipeline',
    color: 'bg-gradient-to-br from-orange-500 to-orange-600'
  },
  {
    title: 'Matches',
    description: 'Cofounder and idea alignment based on your profile',
    icon: '🤝',
    path: '/matches',
    color: 'bg-gradient-to-br from-purple-500 to-purple-600'
  },
  {
    title: 'Tests',
    description: 'Personality and skills assessment for better matches',
    icon: '🧪',
    path: '/tests',
    color: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  },
  {
    title: 'Collaborators',
    description: 'Manage people, roles, and invites for each idea',
    icon: '👥',
    path: '/collaborators',
    color: 'bg-gradient-to-br from-pink-500 to-pink-600'
  }
];

function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Build with the right people on the right ideas
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          An AI-assisted collaboration platform for personality tests, skills & passion profiling, cofounder-to-idea alignment, and an idea → business pipeline.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/workspace"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Go to Workspace
          </Link>
          <Link
            to="/pipeline"
            className="border border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            View Pipeline
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
            <h3 className="text-xl font-semibold mb-2">Profile & Assess</h3>
            <p className="text-gray-600">Run personality and skills tests to establish your profile</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Match & Align</h3>
            <p className="text-gray-600">Find cofounders and ideas that fit your skills, values, and passions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ship with AI</h3>
            <p className="text-gray-600">Move ideas through the AI-assisted pipeline to launch</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 