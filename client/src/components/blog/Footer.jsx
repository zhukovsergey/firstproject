import React from "react";
import logo from "../../assets/imgs/logo.png";
import dzen from "../../assets/imgs/dzen.svg";
import { FaTelegramPlane } from "react-icons/fa";
import axios from "axios";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <img src={logo} className="h-24 me-3" alt="FlowBite Logo" />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Соцсети
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium flex flex-col gap-2">
                <li className="mb-4">
                  <a
                    href="https://dzen.ru/zhukovkaana"
                    className="inline-flex items-center hover:underline gap-2"
                  >
                    <img
                      src={dzen}
                      alt="dzen"
                      className="w-10 opacity-60 hover:opacity-100"
                    />
                    <span>Яндекс дзен</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="inline-flex items-center hover:underline gap-2"
                  >
                    <FaTelegramPlane className="text-4xl hover:text-gray-700" />
                    <span>Телеграм</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            {new Date().getFullYear()}© . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
