// src/components/Avatar.js
import React from "react";
import { useNavigate } from 'react-router-dom';
import face9 from "../images/9.jpg";
import shtterstock from "../images/shutterstock_3436869_1_.webp";
import R from "../images/R.jfif";
import de1 from "../images/logo_de/1.png";

const Avatar = () => {
    const navigate = useNavigate();
    return (
        <div className="text-black bg-black">
            <main className="w-full min-h-screen transition-all main">
                <div className="py-2 px-6 bg-purple-800 flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
                    <span
                        href="#"
                        className="flex items-center pb-4 border-b border-b-gray-800 bg-white p-4 z-50"
                    >
                        <h2 className="font-bold text-2xl">
                            DICE{" "}
                            <span className="bg-purple-800 text-white px-2 rounded-md">
                                GAME
                            </span>
                        </h2>
                    </span>
                    <ul className="ml-auto flex items-center">
                        <li className="dropdown ml-3">
                            <button
                                type="button"
                                className="dropdown-toggle flex items-center"
                            >
                                <div className="flex-shrink-0 w-10 h-10 relative">
                                    <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                        <img className="w-8 h-8 rounded-full" src={face9} alt="" />
                                        <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                                        <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-2 md:block text-left">
                                    <h2 className="text-sm font-semibold text-white">daahir</h2>
                                    <p className="text-xs text-white">Administrator</p>
                                </div>
                            </button>
                            <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                                <li>
                                    <span
                                        href="#"
                                        className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                    >
                                        Profile
                                    </span>
                                </li>
                                <li>
                                    <form method="POST" action="">
                                        <a
                                            href="Login.html"
                                            role="menuitem"
                                            className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50"
                                        >
                                            Logout
                                        </a>
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

                {/* Contenu Principal */}
                <div className="content p-4">
                    <div>
                        <img
                            src={shtterstock}
                            alt="DiceGame"
                            className="absolute top-0 left-0  from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden opacity-45"
                        />
                    </div>

                    <div className=" flex ">
                        <div className="flex  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-opacity-80 px-4 py-3 text-center ">
                            <div className="flex justify-center h-auto">
                                <div className="flex flex-col">
                                    <div className="pb-40  text-white"></div>

                                    <div className="flex justify-around w-full  ">
                                        <div className="text-white ">
                                            <div>
                                                <img
                                                    alt="user 2"
                                                    src={R}
                                                    className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                                                />
                                            </div>
                                            <div>pseudo</div>
                                        </div>
                                        <div className="px-10 py-10">
                                            <img src="../image/logo_de/1" alt="" />
                                            <span>
                                                <div className="flex p-20  relative  bg-white opacity-85 rounded-full max-w-xs ">
                                                    <svg
                                                        className="de1 absolute bottom-0 left-0 mb-8"
                                                        viewBox="0 0 375 283"
                                                        fill="none"
                                                    ></svg>
                                                    <div className="relative flex items-center justify-center">
                                                        <img className="relative w-20" src={de1} alt="" />
                                                    </div>
                                                </div>
                                            </span>
                                        </div>

                                        <div className="text-white">
                                            <div>
                                                <img
                                                    alt="user 2"
                                                    src={R}
                                                    className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                                                />
                                            </div>
                                            <div>pseudo</div>
                                        </div>
                                    </div>

                                    <div className=" pt-40 text-white">
                                        <div>
                                            <img
                                                alt="user 2"
                                                src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg"
                                                className="relative inline-block h-12 w-12 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10"
                                            />
                                        </div>
                                        <div>daahir</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center mt-4"></div>
                        </div>

                        <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                        <button
                            onClick={() => navigate('/partie1')}
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
                </div>
                {/* Fin du Contenu */}
            </main>

            <script src="https://unpkg.com/@popperjs/core@2"></script>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </div>
    );
};

export default Avatar;
