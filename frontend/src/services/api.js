const API_BASE_URL = 'http://localhost:5000';

export async function generateRoadmap(payload) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/roadmap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return await response.json();
  } catch {
    return {
      title: `${payload.targetRole} Placement Roadmap`,
      steps: [
        `Week 1-2: Build fundamentals for ${payload.branch}`,
        'Week 3-4: Practice aptitude and DSA daily',
        `Week 5-6: Prepare ${payload.targetRole} interview topics`,
        'Week 7-8: Mock interviews + resume refinement'
      ]
    };
  }
}
