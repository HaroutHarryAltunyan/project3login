import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/homepage'

function Home() {
  return <div>Welcome to the Home Page!</div>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage/>} />
      </Routes>
    </div>
  );
}

export default App;