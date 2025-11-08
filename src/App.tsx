import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from './lib/api';

function Home() {
  const [health, setHealth] = useState('loading...');
  useEffect(() => {
    api
      .get('/health')
      .then((res) => setHealth(String(res.data)))
      .catch(() => setHealth('error'));
  }, []);
  return (
    <div style={{ padding: 24 }}>
      <h1>Flowlog Frontend</h1>
      <h1 className='text-3xl font-bold text-blue-600'>Flowlog Frontend</h1>
      <p>Backend health: {health}</p>
      <nav>
        <Link to='/about'>About</Link>
      </nav>
    </div>
  );
}
function About() {
  return <div style={{ padding: 24 }}>About page</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
