// src/components/Partie1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NationaleDice from '../images/National-Dice-Day-iStock-1221187735-750x375 (1).jpg';  

const Partie1 = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen transition-all main text-black bg-black font-inter">
      <div className="py-2 px-6 bg-purple-800 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <div className="flex items-center pb-4 border-b border-b-gray-800 bg-white p-4 z-50">
          <h2 className="font-bold text-2xl">
            DICE <span className="bg-purple-800 text-white px-2 rounded-md">GAME</span>
          </h2>
        </div>
        <ul className="ml-auto flex items-center">
          <li className="dropdown ml-3">
            <button type="button" className="dropdown-toggle flex items-center">
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                    alt=""
                  />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <div className="p-2 md:block text-left">
                <h2 className="text-sm font-semibold text-white">Pseudo</h2>
                <p className="text-xs text-white">Administrator</p>
              </div>
            </button>
            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
              <li>
                <button
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </button>
              </li>
              <li>
                <form method="POST" action="">
                  <button
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate('/')}
                  >
                    Log Out
                  </button>
                </form>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div className="">
      <div>
          <img src={NationaleDice} className="absolute top-0 left-0 from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden opacity-45" />
        </div>

        <div className="relative flex gap-10 min-h-screen flex-col justify-center items-center overflow-hidden py-6 sm:py-12">
        <button
            onClick={() => navigate('/configuration')}
            className="btn overflow-hidden relative w-64 bg-white text-black py-4 px-4 rounded-xl font-bold uppercase before:block before:absolute before:h-full before:w-full before:bg-purple-800 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform"
          >
            <span className="relative">Mode solo</span>
          </button>
          <button
            onClick={() => navigate('/avatar')}
            className="btn overflow-hidden relative w-64 bg-white text-black py-4 px-4 rounded-xl font-bold uppercase before:block before:absolute before:h-full before:w-full before:bg-purple-800 before:left-0 before:top-0 before:-translate-y-full hover:before:translate-y-0 before:transition-transform"
          >
            <span className="relative">Mode multijoueur</span>
          </button>
        </div>

        <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
          <button
            onClick={() => navigate('/home1')}
            title="Game of Dice"
            className="text-center text-white focus:outline-none"
          >
            <svg
              className="w-[36px] h-[36px] text-red-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-xl text-white">
              Ba<strong>ck</strong>
            </p>
          </button>
        </div>
      </div>
    </main>
  );
};

export default Partie1;
