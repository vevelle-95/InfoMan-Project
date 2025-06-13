import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/FormStyles.css';

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    Accnt_ID: '',
    AccntHolder_No: '',
    Accnt_Type: '',
    Accnt_Name: '',
    Accnt_ITF: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAccounts();
  }, []);

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
        await api.put(`/accounts/${editingId}`, formData);
      } else {
        await api.post('/accounts', formData);
      }
      fetchAccounts();
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (account) => {
    setFormData(account);
    setEditingId(account.Accnt_ID);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/accounts/${id}`);
      fetchAccounts();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      Accnt_ID: '',
      AccntHolder_No: '',
      Accnt_Type: '',
      Accnt_Name: '',
      Accnt_ITF: '',
    });
    setEditingId(null);
  };

  return (
    <div className="shared-container">
      <h2>Accounts</h2>

      {/* Search Field */}
      <input
        className="shared-search"
        type="text"
        placeholder="Search by Account ID, Holder No, or Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="shared-form">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            className="shared-input"
            placeholder={key.replace(/_/g, ' ')}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            disabled={key === 'Accnt_ID' && editingId !== null}
          />
        ))}

        <div className="shared-buttons">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>

      {/* Table */}
      <div className="shared-table-wrapper scrollable-table">
        <table className="shared-table">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Holder No</th>
              <th>Type</th>
              <th>Name</th>
              <th>ITF</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts
              .filter((acc) =>
                Object.values(acc).some((val) =>
                  val?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
              )
              .map((acc) => (
                <tr key={acc.Accnt_ID}>
                  <td>{acc.Accnt_ID}</td>
                  <td>{acc.AccntHolder_No}</td>
                  <td>{acc.Accnt_Type}</td>
                  <td>{acc.Accnt_Name}</td>
                  <td>{acc.Accnt_ITF}</td>
                  <td>
                    <button onClick={() => handleEdit(acc)}>Edit</button>
                    <button onClick={() => handleDelete(acc.Accnt_ID)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Accounts;
