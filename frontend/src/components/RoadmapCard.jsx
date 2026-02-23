function RoadmapCard({ roadmap }) {
  const title = roadmap?.title || 'Roadmap';
  const steps = roadmap?.steps || [];

  return (
    <section style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px', marginTop: '16px' }}>
      <h2>{title}</h2>
      {steps.length === 0 ? (
        <p>No steps available.</p>
      ) : (
        <ol>
          {steps.map((step, index) => (
            <li key={`${index}-${step}`}>{step}</li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default RoadmapCard;
