import React from 'react';

function Ideas() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Ideas</h1>
          <p className="text-gray-600">Capture, compare, and evolve ideas with AI assistance.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Ideas</h2>
                <button className="px-3 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700">New Idea</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">AI Resume Copilot</div>
                  <div className="text-gray-600">Resume rewriting + job matching</div>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="font-medium">Founder Match Graph</div>
                  <div className="text-gray-600">Skills + values alignment network</div>
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Compare Ideas</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="border rounded-lg p-4">
                  <div className="text-gray-500">Scorecard</div>
                  <ul className="mt-2 space-y-1">
                    <li>• Problem Pain</li>
                    <li>• ICP Clarity</li>
                    <li>• Founder-Market Fit</li>
                    <li>• Distribution Edge</li>
                    <li>• MVP Simplicity</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="text-gray-500">AI Insight</div>
                  <p className="mt-2 text-gray-700">AI will highlight risks, moat, and next validation steps.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Prompts</h2>
              <div className="space-y-2 text-sm">
                <button className="w-full p-2 rounded-md border hover:bg-gray-50 text-left">Refine problem statement</button>
                <button className="w-full p-2 rounded-md border hover:bg-gray-50 text-left">Draft MVP spec</button>
                <button className="w-full p-2 rounded-md border hover:bg-gray-50 text-left">List 10 ICP interview qs</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ideas;


