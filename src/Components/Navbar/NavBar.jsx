import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/images/logo.png";

export default function NavBar() {
  const { userData } = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <header>
      <Popover className="relative bg-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="/">
              <span className="sr-only">Workflow</span>
              <img className="h-8 w-auto sm:h-10" src={logo} alt="" />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <button
              onClick={() => navigate("/")}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Profile
            </button>
            <button
              onClick={() => navigate("/revision")}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Revision
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              About
            </button>
          </Popover.Group>
          {!userData && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <button
                onClick={() => navigate("/signIn")}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
              >
                Sign in/Log In
              </button>
            </div>
          )}
          {userData && (
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
          )}
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img className="h-8 w-auto" src={logo} alt="Workflow" />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate("/")}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/revision")}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Revision
                  </button>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    About
                  </button>
                </div>
                {!userData && (
                  <div className="mt-6">
                    <button
                      onClick={() => navigate("/signIn")}
                      className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
                    >
                      Sign up/Log In
                    </button>
                  </div>
                )}
                {userData && (
                  <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"></div>
                )}
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </header>
  );
}
