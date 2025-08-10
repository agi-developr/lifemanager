import React from 'react';

function Collaborators() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Collaborators</h1>
          <p className="text-gray-600">Manage people, roles, and invites for each idea.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Team</h2>
                <button className="px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">Invite</button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-gray-600">Product • Builder • Owner</div>
                  </div>
                  <button className="px-3 py-1 rounded-md border hover:bg-gray-50">Manage</button>
                </div>
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <div className="font-medium">Sam Dev</div>
                    <div className="text-gray-600">Full-stack • Contributor</div>
                  </div>
                  <button className="px-3 py-1 rounded-md border hover:bg-gray-50">Manage</button>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Roles</h2>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Owner • Maintainer • Contributor • Viewer</li>
                <li>• Access: Ideas, Pipeline, Tests, Matches</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">AI Help</h2>
              <p className="text-sm text-gray-600">Generate role descriptions and interview prompts for your needs.</p>
              <button className="mt-3 w-full p-2 rounded-md border hover:bg-gray-50 text-sm">Draft role description</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collaborators;


