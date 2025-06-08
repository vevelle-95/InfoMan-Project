import React, { useEffect, useState } from 'react';
import { api } from '../api';

function PrincipalInvestors() {
  const [investors, setInvestors] = useState([]);
  const [formData, setFormData] = useState({
    Accnt_ID: '',
    Princip_Investor_ID: '',
    Princip_Investor_Name: '',
    Princip_Investor_Birth_Date: '',
    Princip_Investor_Nationality: '',
  });

  useEffect(() => {
    fetchInvestors();
  }, []);

  const fetchInvestors = async () => {
    try {
      const res = await api.get('/principal-investors');
      setInvestors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/principal-investors', formData);
      fetchInvestors();
      setFormData({
        Accnt_ID: '',
        Princip_Investor_ID: '',
        Princip_Investor_Name: '',
        Princip_Investor_Birth_Date: '',
        Princip_Investor_Nationality: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Principal Investors</h2>
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
            <th>Account ID</th>
            <th>Investor ID</th>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {investors.map((inv) => (
            <tr key={`${inv.Accnt_ID}-${inv.Princip_Investor_ID}`}>
              <td>{inv.Accnt_ID}</td>
              <td>{inv.Princip_Investor_ID}</td>
              <td>{inv.Princip_Investor_Name}</td>
              <td>{inv.Princip_Investor_Birth_Date}</td>
              <td>{inv.Princip_Investor_Nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalInvestors;