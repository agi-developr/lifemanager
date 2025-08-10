import React from 'react';

function Workspace() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Workspace</h1>
          <p className="text-gray-600">Your collaborative home to organize ideas, people, and progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button className="p-3 rounded-lg border hover:bg-gray-50 text-left">💡 New Idea</button>
                <button className="p-3 rounded-lg border hover:bg-gray-50 text-left">🧪 Take Test</button>
                <button className="p-3 rounded-lg border hover:bg-gray-50 text-left">🤝 Find Cofounder</button>
                <button className="p-3 rounded-lg border hover:bg-gray-50 text-left">🛠️ Next Pipeline Step</button>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
              <ul className="space-y-3 text-gray-700">
                <li>• You created an idea: "AI Resume Copilot"</li>
                <li>• Personality: ENTP-A • Skills: Product, JS, Prompting</li>
                <li>• Pipeline: Validated 3 customer interviews</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Assistant</h2>
              <p className="text-sm text-gray-600 mb-3">What do you want to make progress on today?</p>
              <div className="space-y-2 text-sm">
                <button className="w-full p-2 rounded-md border hover:bg-gray-50 text-left">🏗️ Scope MVP with AI</button>
                <button className="w-full p-2 rounded-md border hover:bg-gray-50 text-left">🧭 Map next 7 days</button>
                <button className="w-full p-2 rounded-md border hover:bg-gray-50 text-left">📣 Draft outreach</button>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Your Alignment</h2>
              <div className="text-sm text-gray-700 space-y-2">
                <div>Personality: <span className="font-medium">ENTP-A</span></div>
                <div>Top Skills: Product, JS, UX, GTM</div>
                <div>Passion Themes: Tools for builders, learning, leverage</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Workspace;


