import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/tpbos.css';

function TPBOs() {
  const [tpbos, setTpbos] = useState([]);
  const [editingId, setEditingId] = useState(null);  // Track if editing
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

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
  const fetchAccounts = async () => {
    try {
      const res = await api.get('/accounts');
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchAccounts();
}, []);

  // Add or update depending on editing state
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await api.put(`/tpbos/${editingId}`, formData);
      } else {
        // Create
        await api.post('/tpbos', formData);
      }
      setEditingId(null);
      setFormData({
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
      fetchTpbos();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this TPBO?")) {
      try {
        await api.delete(`/tpbos/${id}`);
        fetchTpbos();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Load data into form for editing
  const handleEdit = (tpbo) => {
    setEditingId(tpbo.TPBO_ID);
    setFormData(tpbo);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setFormData({
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
            disabled={key === 'TPBO_ID' && editingId !== null} // disable ID editing on update
          />
        ))}
        <div className="tpbo-buttons">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
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
            <th>Actions</th> {/* Actions column */}
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
              <td>
                <button onClick={() => handleEdit(tpbo)}>Edit</button>
                <button onClick={() => handleDelete(tpbo.TPBO_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TPBOs;
