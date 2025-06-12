import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/PrincipalInvestor.css';

function PrincipalInvestors() {
  const [investors, setInvestors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    Accnt_ID: '',
    Princip_Investor_ID: '',
    Princip_Investor_Name: '',
    Princip_Investor_Perma_Add: '',
    Princip_Investor_Present_Add: '',
    Princip_Investor_HomeNo: '',
    Princip_Investor_Birth_Date: '',
    Princip_Investor_Nationality: '',
    Princip_Investor_Sex: '',
    Princip_Investor_Civil_Status: '',
    Princip_Investor_Birth_Place: '',
    Princip_Investor_Email_Add: '',
    SSS_No: '',
    Princip_Investor_WorkNo: '',
    Princip_Investor_Occupation: '',
    Nature_Work: '',
    Job_Description: '',
    Company_Name: '',
    Gross_Annual_Income: '',
    Princip_Investor_Work_Address: '',
    Princip_Investor_Mailing_Address: '',
    PH_TIN: '',
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
      if (editingId) {
        await api.put(`/principal-investors/${editingId}`, formData);
      } else {
        await api.post('/principal-investors', formData);
      }
      setEditingId(null);
      setFormData({
        Accnt_ID: '',
        Princip_Investor_ID: '',
        Princip_Investor_Name: '',
        Princip_Investor_Perma_Add: '',
        Princip_Investor_Present_Add: '',
        Princip_Investor_HomeNo: '',
        Princip_Investor_Birth_Date: '',
        Princip_Investor_Nationality: '',
        Princip_Investor_Sex: '',
        Princip_Investor_Civil_Status: '',
        Princip_Investor_Birth_Place: '',
        Princip_Investor_Email_Add: '',
        SSS_No: '',
        Princip_Investor_WorkNo: '',
        Princip_Investor_Occupation: '',
        Nature_Work: '',
        Job_Description: '',
        Company_Name: '',
        Gross_Annual_Income: '',
        Princip_Investor_Work_Address: '',
        Princip_Investor_Mailing_Address: '',
        PH_TIN: '',
      });
      fetchInvestors();
    } catch (err) {
      console.error(err);
    }
  };

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Principal Investor?")) {
      try {
        await api.delete(`/principal-investors/${id}`);
        fetchInvestors();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleEdit = (inv) => {
    setEditingId(inv.Princip_Investor_ID);
    setFormData(inv);
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      Accnt_ID: '',
      Princip_Investor_ID: '',
      Princip_Investor_Name: '',
      Princip_Investor_Perma_Add: '',
      Princip_Investor_Present_Add: '',
      Princip_Investor_HomeNo: '',
      Princip_Investor_Birth_Date: '',
      Princip_Investor_Nationality: '',
      Princip_Investor_Sex: '',
      Princip_Investor_Civil_Status: '',
      Princip_Investor_Birth_Place: '',
      Princip_Investor_Email_Add: '',
      SSS_No: '',
      Princip_Investor_WorkNo: '',
      Princip_Investor_Occupation: '',
      Nature_Work: '',
      Job_Description: '',
      Company_Name: '',
      Gross_Annual_Income: '',
      Princip_Investor_Work_Address: '',
      Princip_Investor_Mailing_Address: '',
      PH_TIN: '',
    });
  };

  // Format date to yyyy-mm-dd only (remove GMT)
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (typeof dateStr === 'string' && dateStr.includes('T')) {
      return dateStr.split('T')[0];
    }
    return dateStr;
  };

  return (
    <div className="PrincipalInvestor-container">
      <h2>Principal Investors</h2>
      <form onSubmit={handleSubmit} className="PrincipalInvestor-form">
        {Object.keys(formData).map((key) => (
          <input
            className="PrincipalInvestor-input"
            key={key}
            placeholder={key.replace(/_/g, ' ')}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
            disabled={key === 'Princip_Investor_ID' && editingId !== null}
          />
        ))}
        <div className="PrincipalInvestor-buttons">
          <button type="submit">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={handleCancel}>Cancel</button>}
        </div>
      </form>

      {/* Scrollable wrapper */}
      <div className="PrincipalInvestor-table-container">
        <table className="PrincipalInvestor-table">
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
            </tr>
          </thead>
          <tbody>
            {investors.map((inv) => (
              <tr key={inv.Princip_Investor_ID}>
                <td>{account.find(acc => acc.Accnt_ID === inv.Accnt_ID)?.Accnt_ID}</td>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PrincipalInvestors;
