import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/TPBOs.css';

function TPBOs() {
  const [tpbos, setTpbos] = useState([]);
  const [formData, setFormData] = useState({
    Account_ID: '',
    TPBO_ID: '',
    TPBO_Type: '',
    TPBO_Name: '',
    TPBO_Relationship: '',
    TPBO_Residence: '',
    TPBO_Birth_Date: '',
    TPBO_Birth_Place: '',
    TPBO_Sex: '',
    TPBO_TIN: '',
    TPBO_Nationality: '',
    TPBO_Occupation: '',
    TPBO_Number: '',
  });

  useEffect(() => {
    fetchTpbos();
  }, []);

  const fetchTpbos = async () => {
    try {
      const res = await api.get('/tpbos');
      setTpbos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tpbos', formData);
      fetchTpbos();
      setFormData({
        TPBO_ID: '',
        TPBO_Name: '',
        TPBO_Relationship: '',
        TPBO_Residence: '',
        TPBO_Birth_Date: '',
        TPBO_Birth_Place: '',
        TPBO_Sex: '',
        TPBO_TIN: '',
        TPBO_Nationality: '',
        TPBO_Occupation: '',
        TPBO_Number: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

return (
  <div className="tpbo-container">
    <h2>TPBOs</h2>

    <form className="tpbo-form" onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          className="tpbo-input"
          placeholder={key.replace(/_/g, ' ')}
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        />
      ))}
      <div className="tpbo-buttons">
        <button type="submit">Add</button>
        <button type="button">Delete</button>
      </div>
    </form>

    <table className="tpbo-table">
      <thead>
        <tr>
          <th>Account ID</th>
          <th>TPBO ID</th>
          <th>Name</th>
          <th>Relationship</th>
          <th>Residence</th>
          <th>Birth Date</th>
          <th>Birth Place</th>
          <th>Sex</th>
          <th>TIN</th>
          <th>Nationality</th>
          <th>Occupation</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {tpbos.map((tpbo) => (
          <tr key={tpbo.TPBO_ID}>
            <td>{tpbo.Account_ID}</td>
            <td>{tpbo.TPBO_ID}</td>
            <td>{tpbo.TPBO_Name}</td>
            <td>{tpbo.TPBO_Relationship}</td>
            <td>{tpbo.TPBO_Residence}</td>
            <td>{tpbo.TPBO_Birth_Date}</td>
            <td>{tpbo.TPBO_Birth_Place}</td>
            <td>{tpbo.TPBO_Sex}</td>
            <td>{tpbo.TPBO_TIN}</td>
            <td>{tpbo.TPBO_Nationality}</td>
            <td>{tpbo.TPBO_Occupation}</td>
            <td>{tpbo.TPBO_Number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default TPBOs
