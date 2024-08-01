import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = ({ setAuth }) => {
  const [userName, setUserName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [createUser, setCreateUser] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  const handleCheckUser = async () => {
    try {
      const res = await api.post('/auth/check', { username: userName });
      const lastLoginDate = new Date(res.data.lastLogin);
      setPopupMessage(`Dernière connexion de ${userName}: ${lastLoginDate.toLocaleString()}. Est-ce bien vous ?`);
      setShowPopup(true);
      setCreateUser(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setPopupMessage(`L'utilisateur ${userName} n'existe pas. Voulez-vous créer un compte ?`);
        setShowPopup(true);
        setCreateUser(true);
      } else {
        console.error(err.response.data);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { username: createUser ? userName : userName });
      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username: res.data.user.username }));
      localStorage.setItem('userId', res.data.user._id);
      console.log('Login successful, setting auth state to true');
      setAuth(true);
      navigate('/configuration'); // Redirect to configuration page
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleGuestMode = async () => {
    try {
      const res = await api.post('/auth/login', { username: '' });
      const token = res.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ username: res.data.user.username }));
      setAuth(true);
      navigate('/configuration'); // Redirect to configuration page
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-16 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/loading-page2.jpg')` }}>
      <div className="md:w-1/3 max-w-sm bg-white p-8 rounded-lg shadow-md bg-opacity-80">
        <div className="text-center md:text-left mb-4">
          <img className="rounded-lg shadow-md bg-opacity-80" src='/images/1.png' alt="logged image" />
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
        </div>
        <div className="text-center md:text-left mt-4 flex justify-between space-x-2">
          <button
            onClick={handleCheckUser}
            className="bg-customPurple hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="button"
          >
            Login
          </button>
          <button
            onClick={handleGuestMode}
            className="bg-customPurple hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="button"
          >
            Play With Guest Mode
          </button>
        </div>
        {showPopup && (
          <div className="popup mt-4 p-4 border border-gray-300 rounded bg-white shadow-lg">
            <p className="mb-4">{popupMessage}</p>
            <div className="flex justify-between space-x-2">
              {createUser ? (
                <button
                  onClick={handleLogin}
                  className="bg-green-500 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                >
                  Create Account
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-green-500 hover:bg-green-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                >
                  Yes, it's me
                </button>
              )}
              <button
                onClick={() => setShowPopup(false)}
                className="bg-red-500 hover:bg-red-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
