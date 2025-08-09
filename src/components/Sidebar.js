import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const modules = [
  { name: 'Business', path: '/chat/business', icon: '🏗️', description: 'Create and validate ideas' },
  { name: 'Networking', path: '/chat/networking', icon: '🧩', description: 'Grow your network' },
  { name: 'Passions', path: '/chat/passions', icon: '🔥', description: 'Discover what excites you' },
  { name: 'Strengths', path: '/chat/strengths', icon: '💪', description: 'Identify your unique abilities' },
  { name: 'Upskill', path: '/chat/upskill', icon: '📚', description: 'Learn new skills' },
  { name: 'Money', path: '/chat/money', icon: '💰', description: 'Manage your finances' },
  { name: 'Career', path: '/chat/career', icon: '🚀', description: 'Plan your career path' },
  { name: 'Events', path: '/chat/events', icon: '📅', description: 'Find relevant events' },
  { name: 'Goals', path: '/chat/goals', icon: '🎯', description: 'Set and track goals' },
  { name: 'Community', path: '/chat/community', icon: '👥', description: 'Connect with others' }
];

function Sidebar({ collapsed, onToggle, user, onLogout }) {
  const location = useLocation();

  return (
    <div className={`bg-gradient-to-b from-primary-800 to-primary-900 text-white h-full transition-width duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4">
        {/* Toggle Button */}
        <button 
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        {!collapsed && (
          <div className="mt-6 mb-8">
            <h2 className="text-xl font-bold">LifeManager</h2>
            <p className="text-primary-200 text-sm">Your AI Life Coach</p>
          </div>
        )}

        {/* User Profile Summary */}
        {!collapsed && user && (
          <div className="mb-6 p-3 bg-primary-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.profile?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium">{user.profile?.name || 'User'}</p>
                <p className="text-primary-200 text-sm">
                  {user.insights?.progress?.sessionsCompleted || 0} sessions completed
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Modules */}
        <nav className="space-y-2">
          {modules.map((module) => {
            const isActive = location.pathname === module.path;
            return (
              <Link
                key={module.name}
                to={module.path}
                className={`block p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'hover:bg-primary-700 text-primary-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{module.icon}</span>
                  {!collapsed && (
                    <div className="flex-1">
                      <p className="font-medium">{module.name}</p>
                      <p className="text-xs opacity-75">{module.description}</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="space-y-2">
              <Link
                to="/network"
                className="block p-2 rounded-lg hover:bg-primary-700 text-primary-200 text-sm"
              >
                👥 People & Network
              </Link>
              <Link
                to="/dashboard"
                className="block p-2 rounded-lg hover:bg-primary-700 text-primary-200 text-sm"
              >
                📊 Dashboard
              </Link>
              <Link
                to="/profile"
                className="block p-2 rounded-lg hover:bg-primary-700 text-primary-200 text-sm"
              >
                ⚙️ Settings
              </Link>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="block w-full text-left p-2 rounded-lg hover:bg-primary-700 text-primary-200 text-sm"
                >
                  🚪 Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar; 