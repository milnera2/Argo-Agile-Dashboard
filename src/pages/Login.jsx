import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export default function Login() {
  return <div className="p-8 text-2xl font-bold">
    <Link to="/dashboard">Login here </Link>
    </div>;
}