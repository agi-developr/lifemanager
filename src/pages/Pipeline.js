import React from 'react';

const stages = [
  { key: 'discovery', title: 'Discovery', items: ['Problem interviews', 'ICP definition', 'Competitive scan'] },
  { key: 'validation', title: 'Validation', items: ['MVP hypothesis', 'Landing page test', 'Pre-orders / LOIs'] },
  { key: 'build', title: 'Build', items: ['MVP spec', 'Core features', 'Instrumentation'] },
  { key: 'launch', title: 'Launch', items: ['Beta cohort', 'Feedback loops', 'Pricing test'] },
  { key: 'growth', title: 'Growth', items: ['Acquisition channels', 'Activation', 'Retention'] },
];

function Pipeline() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Idea → Business Pipeline</h1>
          <p className="text-gray-600">Structured steps with AI guidance at each stage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage) => (
            <div key={stage.key} className="bg-white border rounded-lg p-4">
              <div className="font-semibold mb-2">{stage.title}</div>
              <ul className="text-sm text-gray-700 space-y-2">
                {stage.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 w-2 h-2 rounded-full bg-primary-500"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-3 w-full p-2 rounded-md border hover:bg-gray-50 text-sm">
                Ask AI for next step
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pipeline;


