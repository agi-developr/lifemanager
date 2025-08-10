import React, { useState } from 'react';

function Dashboard() {
  const [userData, setUserData] = useState({
    insights: {
      passions: ['Coding', 'Travel', 'Writing'],
      strengths: ['Problem Solving', 'Creativity', 'Leadership'],
      skills: ['JavaScript', 'Project Management', 'Communication'],
    },
    progress: {
      sessionsCompleted: 12,
      goalsAchieved: 3,
      lastActive: new Date(),
    },
    goals: [
      { id: 1, title: 'Learn React', progress: 75, category: 'skill' },
      { id: 2, title: 'Save $10,000', progress: 45, category: 'financial' },
      { id: 3, title: 'Find new job', progress: 30, category: 'career' },
    ],
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Dashboard</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-primary-600">{userData.progress.sessionsCompleted}</div>
          <div className="text-gray-600 text-sm">Sessions Completed</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-green-600">{userData.progress.goalsAchieved}</div>
          <div className="text-gray-600 text-sm">Goals Achieved</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">85%</div>
          <div className="text-gray-600 text-sm">Engagement Score</div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Passions */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">🔥</span>
            Top Passions
          </h3>
          <div className="space-y-2">
            {userData.insights.passions.map((passion, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-700">{passion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">💪</span>
            Key Strengths
          </h3>
          <div className="space-y-2">
            {userData.insights.strengths.map((strength, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-2xl mr-2">🎯</span>
          Active Goals
        </h3>
        <div className="space-y-4">
          {userData.goals.map((goal) => (
            <div key={goal.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{goal.title}</h4>
                <span className="text-sm text-gray-500 capitalize">{goal.category}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{goal.progress}% Complete</span>
                <span>Due in 30 days</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Completed passion discovery session</span>
            <span className="text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Updated career goals</span>
            <span className="text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600">Started skill development plan</span>
            <span className="text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


