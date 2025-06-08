import React, { useEffect, useState } from 'react';
import { api } from '../api';

function PEPs() {
  const [peps, setPeps] = useState([]);
  const [formData, setFormData] = useState({
    PEP_ID: '',
    PEP_Name: '',
    Position: '',
    Country: '',
  });

  useEffect(() => {
    fetchPeps();
  }, []);

  const fetchPeps = async () => {
    try {
      const res = await api.get('/peps');
      setPeps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/peps', formData);
      fetchPeps();
      setFormData({
        PEP_ID: '',
        PEP_Name: '',
        Position: '',
        Country: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>PEPs</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          />
        ))}
        <button type="submit">Add</button>
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {peps.map((pep) => (
            <tr key={pep.PEP_ID}>
              <td>{pep.PEP_ID}</td>
              <td>{pep.PEP_Name}</td>
              <td>{pep.Position}</td>
              <td>{pep.Country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PEPs;