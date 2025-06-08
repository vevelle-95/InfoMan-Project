import React, { useEffect, useState } from 'react';
import { api } from '../api';

function TPBOs() {
  const [tpbos, setTpbos] = useState([]);
  const [formData, setFormData] = useState({
    TPBO_ID: '',
    TPBO_Name: '',
    Relationship: '',
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
        Relationship: '',
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
      </form>

      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Relationship</th>
          </tr>
        </thead>
        <tbody>
          {tpbos.map((tpbo) => (
            <tr key={tpbo.TPBO_ID}>
              <td>{tpbo.TPBO_ID}</td>
              <td>{tpbo.TPBO_Name}</td>
              <td>{tpbo.Relationship}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TPBOs;