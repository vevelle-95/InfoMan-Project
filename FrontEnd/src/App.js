import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Accounts from './components/accounts';
import PrincipalInvestors from './components/PrincipalInvestors';
import PEPs from './components/PEPs';
import TPBOs from './components/TPBOs';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Accounts</Link> | 
          <Link to="/principal-investors">Principal Investors</Link> | 
          <Link to="/peps">PEPs</Link> | 
          <Link to="/tpbos">TPBOs</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Accounts />} />
          <Route path="/principal-investors" element={<PrincipalInvestors />} />
          <Route path="/peps" element={<PEPs />} />
          <Route path="/tpbos" element={<TPBOs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
