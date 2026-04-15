import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import AIConsult from './pages/AIConsult';
import Analytics from './pages/Analytics';
import LeadDash from './pages/LeadDash';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Home /></Layout>} />
        <Route path="/ai-consult" element={<Layout><AIConsult /></Layout>} />
        <Route path="/analytics" element={<Layout><Analytics /></Layout>} />
        <Route path="/lead" element={<Layout><LeadDash /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;