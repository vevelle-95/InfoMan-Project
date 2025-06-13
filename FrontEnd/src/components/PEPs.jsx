import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/FormStyles.css';

function PEPs() {
  const [peps, setPeps] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Accnt_ID: '',
    PEP_ID: '',
    PEP_Name: '',
    PEP_Relationship: '',
    PEP_GovtPosition: '',
  });

  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPeps();
    fetchAccounts();
  }, []);

  const fetchPeps = async () => {
    try {
      const res = await api.get('/peps');
      setPeps(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/peps/${editingId}`, formData);
      } else {
        await api.post('/peps', formData);
      }
      setEditingId(null);
      setFormData({
        Accnt_ID: '',
        PEP_ID: '',
        PEP_Name: '',
        PEP_Relationship: '',
        PEP_GovtPosition: '',
      });
      fetchPeps();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this PEP?')) {
      try {
        await api.delete(`/peps/${id}`);
        fetchPeps();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (pep) => {
    setEditingId(pep.PEP_ID);
    setFormData(pep);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      Accnt_ID: '',
      PEP_ID: '',
      PEP_Name: '',
      PEP_Relationship: '',
      PEP_GovtPosition: '',
    });
  };

  // Filter peps by search term (search in PEP_Name or PEP_ID or Accnt_ID)
  const filteredPeps = peps.filter(
    (pep) =>
      pep.PEP_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pep.PEP_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pep.Accnt_ID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shared-container">
      <h2>PEPs</h2>

      <form onSubmit={handleSubmit} className="shared-form">
        {Object.keys(formData).map((key) => (
          <input
            className="shared-input"
            key={key}
            placeholder={key.replace(/_/g, ' ')}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            disabled={key === 'PEP_ID' && editingId !== null}
          />
        ))}
        <div className="shared-buttons">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <input
        className="shared-input"
        placeholder="Search by PEP Name, PEP ID, or Account ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <div className="table-scroll">
        <table className="shared-table">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>PEP ID</th>
              <th>Name</th>
              <th>Relationship</th>
              <th>Govt Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeps.map((pep) => (
              <tr key={pep.PEP_ID}>
                <td>{accounts.find((acc) => acc.Accnt_ID === pep.Accnt_ID)?.Accnt_ID || ''}</td>
                <td>{pep.PEP_ID}</td>
                <td>{pep.PEP_Name}</td>
                <td>{pep.PEP_Relationship}</td>
                <td>{pep.PEP_GovtPosition}</td>
                <td>
                  <button onClick={() => handleEdit(pep)}>Edit</button>
                  <button onClick={() => handleDelete(pep.PEP_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PEPs;
