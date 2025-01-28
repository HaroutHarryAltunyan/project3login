import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Homepage from './pages/homepage';
import Register from './pages/register';
import Login from './pages/login';

function App() {
  return (
    <div>
      {/* Navbar component is rendered on all pages */}
      <Navbar />
      <main>
        {/* Define application routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;