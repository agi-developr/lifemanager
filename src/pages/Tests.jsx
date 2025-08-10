import React, { useState } from 'react';
import { pipelineAPI } from '../services/api';

function Tests() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(null);

  const saveSample = async () => {
    try {
      setLoading(true);
      const payload = {
        personality: { type: 'Innovative Extrovert', bigFive: { openness: 0.9, extraversion: 0.8, conscientiousness: 0.7 } },
        passions: ['AI', 'Sustainability', 'EdTech'],
        skills: [
          { name: 'Coding', level: 9 },
          { name: 'UI/UX Design', level: 7 },
          { name: 'Marketing', level: 4 },
          { name: 'Project Management', level: 6 },
          { name: 'Fundraising', level: 3 }
        ],
        demographics: { yearsExperience: 4, location: 'San Francisco', ageRange: '28-35' },
        currentStage: 'Ideation',
        currentIdeaDescription: 'An AI-powered app that helps users track and reduce their personal carbon footprint through gamified challenges and personalized recommendations.'
      };
      const res = await pipelineAPI.saveTests(payload);
      setSaved(res.data.assessments);
    } catch (e) {
      console.error(e);
      alert('Failed to save sample tests. Please ensure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Personality & Skills Tests</h1>
          <p className="text-gray-600">Establish your profile for better matches and idea alignment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Available Assessments</h2>
              <div className="space-y-3 text-sm">
                <button className="w-full p-3 rounded-md border hover:bg-gray-50 text-left">16 Personalities (Big Five proxy)</button>
                <button className="w-full p-3 rounded-md border hover:bg-gray-50 text-left">Founder Motivation & Values</button>
                <button className="w-full p-3 rounded-md border hover:bg-gray-50 text-left">Skills & Experience Matrix</button>
                <button className="w-full p-3 rounded-md border hover:bg-gray-50 text-left">Working Style & Availability</button>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">Your Snapshot</h2>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Personality: ENTP-A</li>
                <li>• Values: Autonomy, Impact, Craft</li>
                <li>• Skills: Product, JS, UX</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-3">With AI</h2>
              <p className="text-sm text-gray-600">AI can infer baseline from your profile and refine with targeted questions.</p>
              <button onClick={saveSample} disabled={loading} className="mt-3 w-full p-2 rounded-md border hover:bg-gray-50 text-sm">
                {loading ? 'Saving...' : 'Load sample data (hackathon founder)'}
              </button>
              {saved && (
                <div className="mt-3 text-xs text-gray-700 break-words">
                  <div>Saved. Alignment: {saved.alignmentScore || 0}%</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tests;


