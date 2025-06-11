import React, { useEffect, useState } from 'react';
import { api } from '../api';

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
    <div>
      <h2>TPBOs</h2>
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
        <button type="remove">Delete</button>
      </form>

      <table border="1" cellPadding="5">
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
              <td>{tpbo.TPBO_ID}</td>
              <td>{tpbo.TPBO_Name}</td>
              <td>{tpbo.Relationship}</td>
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

export default TPBOs;
