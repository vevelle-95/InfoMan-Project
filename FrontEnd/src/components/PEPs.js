import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/FormStyles.css';

function PEPs() {
  const [peps, setPeps] = useState([]);
  const [formData, setFormData] = useState({
    Account_ID: '',
    PEP_ID: '',
    PEP_Name: '',
    PEP_Relationship: '',
    PEP_GovtPosition: '',
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
        Account_ID: '',
        PEP_ID: '',
        PEP_Name: '',
        PEP_Relationship: '',
        PEP_GovtPosition: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="shared-container">
      <h2>PEPs</h2>
      <form onSubmit={handleSubmit} className="shared-form">
        {Object.keys(formData).map((key) => (
          <input
            className="shared-input"
            key={key}
            placeholder={key}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          />
        ))}
        <div className="shared-buttons">
          <button type="submit">Add</button>
          <button type="button">Delete</button>
        </div>
      </form>

      <table className="shared-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>PEP ID</th>
            <th>Name</th>
            <th>Relationship</th>
            <th>Govt Position</th>
          </tr>
        </thead>
        <tbody>
          {peps.map((pep) => (
            <tr key={pep.PEP_ID}>
              <td>{pep.Account_ID}</td>
              <td>{pep.PEP_ID}</td>
              <td>{pep.PEP_Name}</td>
              <td>{pep.PEP_Relationship}</td>
              <td>{pep.PEP_GovtPosition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PEPs;
