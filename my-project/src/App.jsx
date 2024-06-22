import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Configuration from './components/Configuration';
import GamePlay from './components/GamePlay';
import flaskApi from './utils/flaskApi'; // Assurez-vous que vous avez un fichier pour gérer les appels API

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [config, setConfig] = useState(null);

  const fetchConfig = async (sessionId) => {
    try {
      const response = await flaskApi.get(`/get-session/${sessionId}`);
      setConfig(response.data);
    } catch (error) {
      console.error('Failed to fetch config:', error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        fetchConfig(sessionId);
      }
    }
  }, [isAuth]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
        <Route path="/configuration" element={isAuth ? <Configuration onConfigSubmit={fetchConfig} /> : <Navigate to="/login" />} />
        <Route path="/gameplay" element={isAuth && config ? <GamePlay config={config} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={isAuth ? (config ? "/gameplay" : "/configuration") : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
