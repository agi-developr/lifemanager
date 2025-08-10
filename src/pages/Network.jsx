import React, { useEffect, useState } from 'react';
import { networkAPI } from '../services/api';

function PersonCard({ person }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{person.name}</h3>
          <p className="text-sm text-gray-500">{person.currentJob || '—'} {person.location ? `• ${person.location}` : ''}</p>
        </div>
        {typeof person.score === 'number' && (
          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">Match {person.score}</span>
        )}
      </div>
      <div className="mt-3 text-sm">
        {person.skills?.length > 0 && (
          <div className="mb-2">
            <span className="font-medium">Skills:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {person.skills.slice(0, 6).map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">{s}</span>
              ))}
            </div>
          </div>
        )}
        {person.interests?.length > 0 && (
          <div>
            <span className="font-medium">Interests:</span>
            <div className="mt-1 flex flex-wrap gap-2">
              {person.interests.slice(0, 6).map((s, i) => (
                <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 bg-primary-600 text-white rounded hover:bg-primary-700">Connect</button>
        <button className="px-3 py-2 border rounded hover:bg-gray-50">View</button>
      </div>
    </div>
  );
}

function Network() {
  const [suggested, setSuggested] = useState([]);
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await networkAPI.getSuggested();
        setSuggested(res.data || []);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await networkAPI.search(q.trim());
      setResults(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold">People & Network</h1>
          <p className="text-gray-600">Find like-minded people to learn with, collaborate, or build a business.</p>
        </div>

        <form onSubmit={onSearch} className="flex gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, skill, interest..."
            className="flex-1 px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-primary-600 text-white rounded hover:bg-primary-700"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {results.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((p) => (
                <PersonCard key={p.id} person={p} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-lg font-semibold mb-3">Suggested for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggested.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Network;


