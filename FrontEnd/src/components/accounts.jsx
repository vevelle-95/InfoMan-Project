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
  const [searchTerm, setSearchTerm] = useState('');

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
      setFormData({
        Accnt_ID: '',
        AccntHolder_No: '',
        Accnt_Type: '',
        Accnt_Name: '',
        Accnt_ITF: '',
      });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/accounts/${id}`);
      fetchAccounts();
      if (editingId === id) {
        setFormData({
          Accnt_ID: '',
          AccntHolder_No: '',
          Accnt_Type: '',
          Accnt_Name: '',
          Accnt_ITF: '',
        });
        setEditingId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (account) => {
    setFormData(account);
    setEditingId(account.Accnt_ID);
  };

  return (
    <div className="shared-container">
      <h2>Accounts</h2>

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
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          <button
            type="button"
            onClick={() => {
              if (editingId) {
                handleDelete(editingId);
              }
            }}
            disabled={!editingId}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => {
              setFormData({
                Accnt_ID: '',
                AccntHolder_No: '',
                Accnt_Type: '',
                Accnt_Name: '',
                Accnt_ITF: '',
              });
              setEditingId(null);
            }}
          >
            Clear
          </button>
        </div>
      </form>

      <input
        className="shared-input"
        placeholder="Search by Account Name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />

      <div className="table-scroll">
        <table className="shared-table">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Holder No</th>
              <th>Type</th>
              <th>Name</th>
              <th>In-Turn-For</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts
              .filter((acc) =>
                acc.Accnt_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                acc.Accnt_ID.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((acc) => (
                <tr key={`${acc.Accnt_ID}-${acc.AccntHolder_No}`}>
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
