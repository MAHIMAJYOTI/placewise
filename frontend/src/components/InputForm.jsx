import React, { useState } from 'react';

function InputForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    name: '',
    branch: '',
    targetRole: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="branch"
        placeholder="Branch (e.g., CSE)"
        value={form.branch}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="targetRole"
        placeholder="Target role (e.g., SDE)"
        value={form.targetRole}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Roadmap'}
      </button>
    </form>
  );
}

export default InputForm;
