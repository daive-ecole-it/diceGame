// src/components/Home1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NationaleDice from '../images/National-Dice-Day-iStock-1221187735-750x375 (1).jpg';  

const Home1 = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full min-h-screen transition-all main text-black bg-black font-inter">
      <div className="py-2 px-6 bg-purple-800 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
        <a href="#" className="flex items-center pb-4 border-b border-b-gray-800 bg-white p-4 z-50">
          <h2 className="font-bold text-2xl">DICE <span className="bg-purple-800 text-white px-2 rounded-md">GAME</span></h2>
        </a>
        <ul className="ml-auto flex items-center">
          <li className="dropdown ml-3">
            <button type="button" className="dropdown-toggle flex items-center">
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <img className="w-8 h-8 rounded-full" src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg" alt="Profile"/>
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
                <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50">Profile</a>
              </li>
              <li>
                <form method="POST" action="">
                  <a href="/login" role="menuitem" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer">
                    Log Out
                  </a>
                </form>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <img src={NationaleDice} className="absolute top-0 left-0 from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden opacity-45" />
        </div>
        <div className="relative min-w-screen min-h-screen flex flex-col items-center justify-center">
          <div className="flex items-center justify-center flex-col gap-3 relative mt-10">
            <h1 className="text-5xl text-white">Private Mode</h1>
            <p>Created with 💞 by Sk</p>
          </div>
          <br /><br /><br /><br />
          <div className="w-full max-w-md mx-auto">
            <div className="px-7 bg-white shadow-lg rounded-2xl">
              <div className="flex">
                <div className="flex-1 group">
                  <button onClick={() => navigate('/partie1')} className="flex items-end justify-center text-center mx-auto px-4 w-full text-black group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500 uppercase transition-all duration-100 hover:shadow-md hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                    <span className="block px-1 pt-1 pb-2">
                      <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-1">Play</span>
                    </span>
                  </button>
                </div>
                <div className="flex-1 group">
                  <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-black group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500 uppercase transition-all duration-100 hover:shadow-md hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                    <span className="block px-1 pt-1 pb-2">
                      <i className="far fa-compass text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-1">Explore</span>
                    </span>
                  </a>
                </div>
                <div className="flex-1 group">
                  <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-black group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500 uppercase transition-all duration-100 hover:shadow-md hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                    <span className="block px-1 pt-1 pb-2">
                      <i className="far fa-search text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-1">Historique</span>
                    </span>
                  </a>
                </div>
                <div className="flex-1 group">
                  <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-black group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500 uppercase transition-all duration-100 hover:shadow-md hover:bg-gradient-to-t hover:from-stone-100 before:to-stone-50 hover:-translate-y-[3px]">
                    <span className="block px-1 pt-1 pb-2">
                      <i className="far fa-cog text-2xl pt-1 mb-1 block"></i>
                      <span className="block text-xs pb-1">Settings</span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end fixed bottom-0 right-0 mr-4 z-10">
          <div>
            <a href="#" target="_blank" title="Game of Dice" className="text-center text-gray-700 focus:outline-none">
              <img src="/images/3133093420398WEB01.jpg" alt="DiceGame" className="object-cover mx-auto w-6 rounded-full w-24" />
              <p className="text-xl">Log<strong>out</strong></p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home1;
