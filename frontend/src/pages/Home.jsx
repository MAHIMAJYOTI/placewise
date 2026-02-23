import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import { generateRoadmap } from '../services/api';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const roadmap = await generateRoadmap(formData);
      localStorage.setItem('roadmapData', JSON.stringify(roadmap));
      navigate('/roadmap');
    } catch (err) {
      setError(err.message || 'Failed to generate roadmap.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '720px', margin: '48px auto', padding: '0 16px' }}>
      <h1>Placement AI Roadmap</h1>
      <p>Enter your details to generate a personalized placement roadmap.</p>
      <InputForm onSubmit={handleGenerate} loading={loading} />
      {error && <p style={{ color: '#d93025', marginTop: '12px' }}>{error}</p>}
    </main>
  );
}

export default Home;
