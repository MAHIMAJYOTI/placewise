import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoadmapCard from '../components/RoadmapCard';

function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('roadmapData');
    if (!raw) return;

    try {
      setRoadmap(JSON.parse(raw));
    } catch {
      setRoadmap(null);
    }
  }, []);

  return (
    <main style={{ maxWidth: '900px', margin: '48px auto', padding: '0 16px' }}>
      <h1>Your Placement Roadmap</h1>
      {!roadmap ? (
        <>
          <p>No roadmap found. Generate one from the home page.</p>
          <Link to="/">Go to Home</Link>
        </>
      ) : (
        <RoadmapCard roadmap={roadmap} />
      )}
    </main>
  );
}

export default Roadmap;
