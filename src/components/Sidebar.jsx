import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Primary navigation for the collaboration + alignment platform
const primaryNav = [
  { name: 'Workspace', path: '/workspace', icon: '🧭', description: 'Your collaborative home' },
  { name: 'Ideas', path: '/ideas', icon: '💡', description: 'Capture and evolve ideas' },
  { name: 'Pipeline', path: '/pipeline', icon: '🛠️', description: 'Idea → business steps' },
  { name: 'Matches', path: '/matches', icon: '🤝', description: 'Cofounder & idea alignment' },
  { name: 'Tests', path: '/tests', icon: '🧪', description: 'Personality & skills' },
  { name: 'Collaborators', path: '/collaborators', icon: '👥', description: 'People & roles' },
];

// Keep AI chat modules accessible as secondary shortcuts
const aiShortcuts = [
  { name: 'AI: Pipeline Coach', path: '/chat/business', icon: '🏗️', description: 'Validate and scope' },
  { name: 'AI: Networking', path: '/chat/networking', icon: '🧩', description: 'Outreach & intros' },
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
            <p className="text-primary-200 text-sm">AI-assisted collaboration</p>
          </div>
        )}

        {/* User Profile Summary */}
        {!collapsed && user && (
          <div className="mb-6 p-3 bg-primary-700 rounded-lg">
            <div className="flex items-center space-x-3">
              {user.profile?.avatar ? (
                <img
                  src={user.profile.avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover border border-primary-600"
                />
              ) : (
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.profile?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{user.profile?.name || 'User'}</p>
                <p className="text-primary-200 text-sm">
                  {user.insights?.progress?.sessionsCompleted || 0} sessions completed
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Primary Navigation */}
        <nav className="space-y-2">
          {primaryNav.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'hover:bg-primary-700 text-primary-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{item.icon}</span>
                  {!collapsed && (
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs opacity-75">{item.description}</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Secondary: AI Shortcuts */}
        {!collapsed && (
          <div className="mt-6">
            <p className="px-2 mb-2 text-xs uppercase tracking-wider text-primary-300">AI Shortcuts</p>
            <div className="space-y-2">
              {aiShortcuts.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`block p-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white shadow-lg'
                        : 'hover:bg-primary-700 text-primary-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs opacity-75">{item.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="space-y-2">
              <Link
                to="/network"
                className="block p-2 rounded-lg hover:bg-primary-700 text-primary-200 text-sm"
              >
                🌐 Network
              </Link>
              <Link
                to="/dashboard"
                className="block p-2 rounded-lg hover:bg-primary-700 text-primary-200 text-sm"
              >
                📊 Assistant Panel
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


