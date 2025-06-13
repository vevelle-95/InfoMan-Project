import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import debounce from 'lodash.debounce';
import '../styles/tpbos.css';

function TPBOs() {
  const [tpbos, setTpbos] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    Accnt_ID: '',
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
    fetchAccounts();
  }, []);

  const fetchTpbos = async (query = '') => {
    try {
      const endpoint = query ? `/tpbos/search?q=${encodeURIComponent(query)}` : '/tpbos';
      const res = await api.get(endpoint);
      setTpbos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await api.get('/accounts');
      setAccounts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => fetchTpbos(query), 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tpbos/${editingId}`, formData);
      } else {
        await api.post('/tpbos', formData);
      }
      setEditingId(null);
      setFormData({
        Accnt_ID: '',
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
      console.error(err.response?.data || err.message);
    }
  };

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

  const handleEdit = (tpbo) => {
    setEditingId(tpbo.TPBO_ID);
    setFormData(tpbo);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      Accnt_ID: '',
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

      <input
        className="tpbo-search"
        type="text"
        placeholder="Search by name or ID..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <form className="tpbo-form" onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            className="tpbo-input"
            placeholder={key.replace(/_/g, ' ')}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            disabled={key === 'TPBO_ID' && editingId !== null}
          />
        ))}
        <div className="tpbo-buttons">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>

      <div className="tpbo-table-wrapper">
        <table className="tpbo-table">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>TPBO ID</th>
              <th>TPBO Type</th>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tpbos.map((tpbo) => (
              <tr key={tpbo.TPBO_ID}>
                <td>{accounts.find(acc => acc.Accnt_ID === tpbo.Accnt_ID)?.Accnt_ID}</td>
                <td>{tpbo.TPBO_ID}</td>
                <td>{tpbo.TPBO_Type}</td>
                <td>{tpbo.TPBO_Name}</td>
                <td>{tpbo.TPBO_Relationship}</td>
                <td>{tpbo.TPBO_Residence}</td>
                <td>{tpbo.TPBO_Birth_Date?.split('T')[0]}</td>
                <td>{tpbo.TPBO_Birth_Place}</td>
                <td>{tpbo.TPBO_Sex}</td>
                <td>{tpbo.TPBO_TIN}</td>
                <td>{tpbo.TPBO_Nationality}</td>
                <td>{tpbo.TPBO_Occupation}</td>
                <td>{tpbo.TPBO_Number}</td>
                <td>
                  <button className="tpbo-edit-btn" onClick={() => handleEdit(tpbo)}>Edit</button>
                  <button className="tpbo-delete-btn" onClick={() => handleDelete(tpbo.TPBO_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TPBOs;
