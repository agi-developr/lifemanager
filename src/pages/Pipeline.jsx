import React, { useState } from 'react';
import { pipelineAPI } from '../services/api';

const stages = [
  { key: 'discovery', title: 'Discovery', items: ['Problem interviews', 'ICP definition', 'Competitive scan'] },
  { key: 'validation', title: 'Validation', items: ['MVP hypothesis', 'Landing page test', 'Pre-orders / LOIs'] },
  { key: 'build', title: 'Build', items: ['MVP spec', 'Core features', 'Instrumentation'] },
  { key: 'launch', title: 'Launch', items: ['Beta cohort', 'Feedback loops', 'Pricing test'] },
  { key: 'growth', title: 'Growth', items: ['Acquisition channels', 'Activation', 'Retention'] },
];

function Pipeline() {
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadCoach = async () => {
    try {
      setLoading(true);
      const res = await pipelineAPI.getCoach();
      setCoach(res.data);
    } catch (e) {
      console.error(e);
      alert('Failed to load Pipeline Coach. Ensure you saved tests and are logged in.');
    } finally {
      setLoading(false);
    }
  };

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
               <button onClick={loadCoach} disabled={loading} className="mt-3 w-full p-2 rounded-md border hover:bg-gray-50 text-sm">
                {loading ? 'Loading…' : 'Ask AI for next step'}
              </button>
            </div>
          ))}
        </div>

        {coach && (
          <div className="mt-6 bg-white border rounded-lg p-6">
            <div className="font-semibold mb-2">Pipeline Coach</div>
            <div className="text-sm text-gray-800 mb-3">{coach.summary}</div>
            <ol className="list-decimal ml-6 space-y-2 text-sm">
              {coach.steps?.map((s) => (
                <li key={s.step_number}>
                  <span className="font-medium">{s.action}</span> — <span className="text-gray-700">{s.tips}</span>
                </li>
              ))}
            </ol>
            {coach.next_recommendation && (
              <div className="mt-3 text-sm"><span className="font-medium">Next:</span> {coach.next_recommendation}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Pipeline;


