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
    <h2>Principal Investors</h2>

    {/* Search Field */}
    <input
      className="shared-search"
      type="text"
      placeholder="Search by Name, ID, Email, etc."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

    <form onSubmit={handleSubmit} className="shared-form">
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          className="shared-input"
          placeholder={key.replace(/_/g, ' ')}
          value={formData[key]}
          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          disabled={key === 'Princip_Investor_ID' && editingId !== null}
        />
      ))}

      <div className="shared-buttons">
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
      </div>
    </form>

    <div className="shared-table-wrapper">
      <table className="shared-table">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Investor ID</th>
            <th>Name</th>
            <th>Permanent Address</th>
            <th>Present Address</th>
            <th>Home No</th>
            <th>Birth Date</th>
            <th>Nationality</th>
            <th>Sex</th>
            <th>Civil Status</th>
            <th>Birth Place</th>
            <th>Email</th>
            <th>SSS No</th>
            <th>Work No</th>
            <th>Occupation</th>
            <th>Nature of Work</th>
            <th>Job Description</th>
            <th>Company Name</th>
            <th>Annual Income</th>
            <th>Work Address</th>
            <th>Mailing Address</th>
            <th>PH TIN</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {investors
            .filter((inv) =>
              Object.values(inv).some((value) =>
                value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
            .map((inv) => (
              <tr key={inv.Princip_Investor_ID}>
                <td>{accounts.find(acc => acc.Accnt_ID === inv.Accnt_ID)?.Accnt_ID || ''}</td>
                <td>{inv.Princip_Investor_ID}</td>
                <td>{inv.Princip_Investor_Name}</td>
                <td>{inv.Princip_Investor_Perma_Add}</td>
                <td>{inv.Princip_Investor_Present_Add}</td>
                <td>{inv.Princip_Investor_HomeNo}</td>
                <td>{formatDate(inv.Princip_Investor_Birth_Date)}</td>
                <td>{inv.Princip_Investor_Nationality}</td>
                <td>{inv.Princip_Investor_Sex}</td>
                <td>{inv.Princip_Investor_Civil_Status}</td>
                <td>{inv.Princip_Investor_Birth_Place}</td>
                <td>{inv.Princip_Investor_Email_Add}</td>
                <td>{inv.SSS_No}</td>
                <td>{inv.Princip_Investor_WorkNo}</td>
                <td>{inv.Princip_Investor_Occupation}</td>
                <td>{inv.Nature_Work}</td>
                <td>{inv.Job_Description}</td>
                <td>{inv.Company_Name}</td>
                <td>{inv.Gross_Annual_Income}</td>
                <td>{inv.Princip_Investor_Work_Address}</td>
                <td>{inv.Princip_Investor_Mailing_Address}</td>
                <td>{inv.PH_TIN}</td>
                <td>
                  <button onClick={() => handleEdit(inv)}>Edit</button>
                  <button onClick={() => handleDelete(inv.Princip_Investor_ID)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
);

