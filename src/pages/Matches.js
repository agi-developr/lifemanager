import React from 'react';

function Matches() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
          <p className="text-gray-600">Cofounder and idea alignment based on personality, values, and skills.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Recommended People</h2>
              <div className="space-y-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex items-center justify-between border rounded-lg p-4">
                    <div>
                      <div className="font-medium">Alex Founder {i}</div>
                      <div className="text-sm text-gray-600">ENTP • Product • B2B SaaS • 82% alignment</div>
                    </div>
                    <div className="space-x-2">
                      <button className="px-3 py-1 rounded-md border hover:bg-gray-50 text-sm">View</button>
                      <button className="px-3 py-1 rounded-md bg-primary-600 text-white hover:bg-primary-700 text-sm">Intro</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Compatible Ideas</h2>
              <ul className="space-y-3 text-gray-700">
                <li>• Dev tools for onboarding (75%)</li>
                <li>• Local commerce aggregator (71%)</li>
                <li>• Education AI tutor (69%)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Filters</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button className="p-2 rounded-md border hover:bg-gray-50">Time zones</button>
                <button className="p-2 rounded-md border hover:bg-gray-50">Stage</button>
                <button className="p-2 rounded-md border hover:bg-gray-50">Skills</button>
                <button className="p-2 rounded-md border hover:bg-gray-50">Values</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Matches;


