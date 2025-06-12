import React, { useEffect, useState } from 'react';
import { api } from '../api';
import '../styles/PrincipalInvestor.css';

function PrincipalInvestors() {
  const [investors, setInvestors] = useState([]);
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
      await api.post('/principal-investors', formData);
      fetchInvestors();
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="PrincipalInvestor-container">
      <h2>Principal Investors</h2>
      <form onSubmit={handleSubmit} className="PrincipalInvestor-form">
        {Object.keys(formData).map((key) => (
          <input
            className="PrincipalInvestor-input"
            key={key}
            placeholder={key}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          />
        ))}
        <div className="PrincipalInvestor-buttons">
          <button type="submit">Add</button>
          <button type="button">Delete</button>
        </div>
      </form>

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
            <tr key={`${inv.Accnt_ID}-${PrincipInvestor.Princip_Investor_ID}`}>
              <td>{PrincipInvestor.Accnt_ID}</td>
              <td>{PrincipInvestor.Princip_Investor_ID}</td>
              <td>{PrincipInvestor.Princip_Investor_Name}</td>
              <td>{PrincipInvestor.Princip_Investor_Perma_Add}</td>
              <td>{PrincipInvestor.Princip_Investor_Present_Add}</td>
              <td>{PrincipInvestor.Princip_Investor_HomeNo}</td>
              <td>{PrincipInvestor.Princip_Investor_Birth_Date}</td>
              <td>{PrincipInvestor.Princip_Investor_Nationality}</td>
              <td>{PrincipInvestor.Princip_Investor_Sex}</td>
              <td>{PrincipInvestor.Princip_Investor_Civil_Status}</td>
              <td>{PrincipInvestor.Princip_Investor_Birth_Place}</td>
              <td>{PrincipInvestor.Princip_Investor_Email_Add}</td>
              <td>{PrincipInvestor.SSS_No}</td>
              <td>{PrincipInvestor.Princip_Investor_WorkNo}</td>
              <td>{PrincipInvestor.Princip_Investor_Occupation}</td>
              <td>{PrincipInvestor.Nature_Work}</td>
              <td>{PrincipInvestor.Job_Description}</td>
              <td>{PrincipInvestor.Company_Name}</td>
              <td>{PrincipInvestor.Gross_Annual_Income}</td>
              <td>{PrincipInvestor.Princip_Investor_Work_Address}</td>
              <td>{PrincipInvestor.Princip_Investor_Mailing_Address}</td>
              <td>{PrincipInvestor.PH_TIN}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrincipalInvestors;
