import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flaskApi from '../utils/flaskApi';

const Configuration = ({ onConfigSubmit }) => {
  const [form, setForm] = useState({
    numberOfDices: '',
    numberOfGames: '',
    waitTimeBetweenGames: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
      const creator = userId;
      const response = await flaskApi.post('/configure-session', { ...form, creator });
      localStorage.setItem('sessionId', response.data.session_id);
      alert('Session configurée avec succès!');
      onConfigSubmit(response.data.configuration);
      navigate('/gameplay');
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Configurer la session de jeu</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfDices">
              Nombre de dés
            </label>
            <input
              type="number"
              name="numberOfDices"
              value={form.numberOfDices}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numberOfGames">
              Nombre de jeux
            </label>
            <input
              type="number"
              name="numberOfGames"
              value={form.numberOfGames}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="waitTimeBetweenGames">
              Temps d'attente entre les jeux (en secondes)
            </label>
            <input
              type="number"
              name="waitTimeBetweenGames"
              value={form.waitTimeBetweenGames}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Configurer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Configuration;
