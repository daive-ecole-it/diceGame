import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import desjeu from '../images/des-jeu.jpg';  
import WEB01 from '../images/3133093420398WEB01.jpg';  

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
      navigate('/home'); // Redirect to configuration page
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <section>
      <div>
            <div>
                <img src={desjeu} alt="DiceGame" className="bg-purple-900 absolute bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden" />
            </div>
            <div className="relative min-h-screen sm:flex sm:flex-row justify-center bg-transparent rounded-3xl shadow-xl">
                <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
                    <div className="self-start hidden lg:flex flex-col text-gray-300">
                        <h1 className="my-3 font-semibold text-4xl">Bienvenue dans Dice Game</h1>
                        <p className="pr-3 text-sm opacity-75">Notre jeu se deroule entre un a plusieurs utilisateurs..laisser vous tenter par l'expreience.</p>
                    </div>
                </div>
                <form >
                <div className="flex justify-center self-center z-10">
                    <div className="p-12 bg-white mx-auto rounded-3xl w-96">
                        <div className="mb-7">
                            <h3 className="font-semibold text-2xl text-gray-800">DICE GAME</h3>
                            <p className="text-gray-400">voulez vous faire une inscription?
                            <a href="/Inscription" className="text-sm text-purple-700 hover:text-purple-700">Inscription</a>
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <input
                                    className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                    type="text" value={userName}
                                    placeholder="Entrer votre pseudo" onChange={(e) => setUserName(e.target.value)}/>
                            </div>
                            <div className="mt-4 flex justify-between  text-sm">
                              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                                <input className="mr-1" type="checkbox" />
                                <span>Remember Me</span>
                              </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm ml-auto">
                                  <button type="button" onClick={handleGuestMode} className="text-purple-700 hover:text-purple-600">Connexion mode invite</button>   
                                </div>
                            </div>
                            <div>
                                    <button
                                      onClick={handleCheckUser}
                                        type="submit"
                                        className="w-full flex justify-center bg-purple-800 hover:bg-blue-500 hover:bg-blue-700 text-gray-100 p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                                    >
                                        connexion
                                    </button>
                               
                            </div>
                            <div className="flex items-center justify-center space-x-2 my-5">
                                <span className="h-px w-16 bg-gray-100"></span>
                                <span className="text-gray-300 font-normal">ou</span>
                                <span className="h-px w-16 bg-gray-100"></span>
                            </div>
                            <div className="flex justify-center gap-5 w-full">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
                                >
                                    <svg className="w-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                                        <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                                        <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                                        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                                    </svg>
                                    <span>Google</span>
                                </button>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center mb-6 md:mb-0 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 text-sm text-gray-500 p-3 rounded-lg tracking-wide font-medium cursor-pointer transition ease-in duration-500"
                                >
                                    <svg className="w-4 mr-2" viewBox="0 0 100 100" style={{ enableBackground: "new 0 0 100 100" }} xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Layer_1" />
                                        <g id="Layer_2">
                                            <path d="M50 2.5c-58.892 1.725-64.898 84.363-7.46 95h14.92c57.451-10.647 51.419-93.281-7.46-95z" style={{ fill: "#1877f2" }} />
                                            <path d="M57.46 64.104h11.125l2.117-13.814H57.46v-8.965c0-3.779 1.85-7.463 7.781-7.463h6.021V22.101c-12.894-2.323-28.385-1.616-28.722 17.66V50.29H30.417v13.814H42.54V97.5h14.92V64.104z" style={{ fill: "#f1f1f1" }} />
                                        </g>
                                    </svg>
                                    <span>Facebook</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </form>

            </div>
            <footer className="bg-transparent absolute w-full bottom-0 left-0 z-30">
                <div className="container p-5 mx-auto flex items-center justify-between">
                    <div className="flex mr-auto">
                        <span href="#" target="_blank" title="Game of Dice" className="text-center text-gray-700 focus:outline-none">
                            <img src={WEB01} alt="DiceGame" className="object-cover mx-auto w-8 h-8 rounded-full w-24 h-24" />
                            <p className="text-xl">Dice<strong>GAME</strong></p>
                        </span>
                    </div>
                </div>
            </footer>
            <svg className="absolute bottom-0 left-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#fff" fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
            </svg>

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
