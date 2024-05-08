import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import "../../images/logo.png";
import navCSS from "./navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authentication";
import Cookies from "js-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();
  const navigation = [
    { name: "Docs", to: "/home" },
    { name: "Careers", to: "/careers" },
    { name: "RoadMaps", to: "/roadMaps" },
    { name: "About Us", to: "/aboutus" },
    { name: "FAQs", to: "/faqs" },
  ];
  function logOutFunc() {
    Cookies.remove("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <Disclosure as="nav" className="bg-wc">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  className={`${navCSS.imglogo} h-16 flex flex-shrink-0 items-center`}
                ></div>
                <div className="hidden sm:ml-6 sm:flex  items-center">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/home"
                      className={(navData) =>
                        navData.isActive
                          ? "text-lg  text-pc transition rounded-md px-3 py-2 font-medium"
                          : "text-lg text-bc hover:text-pc transition rounded-md px-3 py-2 font-medium"
                      }
                      aria-current="page"
                    >
                      Docs{" "}
                    </NavLink>
                    {token ? (
                      <>
                        <NavLink
                          to="/careers"
                          className={(navData) =>
                            navData.isActive
                              ? "text-lg  text-pc transition rounded-md px-3 py-2 font-medium"
                              : "text-lg text-bc hover:text-pc transition rounded-md px-3 py-2 font-medium"
                          }
                          aria-current="page"
                        >
                          Careers
                        </NavLink>
                        <NavLink
                          to="/roadMaps"
                          className={(navData) =>
                            navData.isActive
                              ? "text-lg  text-pc transition rounded-md px-3 py-2 font-medium"
                              : "text-lg text-bc hover:text-pc transition rounded-md px-3 py-2 font-medium"
                          }
                          aria-current="page"
                        >
                          RoadMaps
                        </NavLink>
                      </>
                    ) : (
                      ""
                    )}
                    <NavLink
                      to="/aboutus"
                      className={(navData) =>
                        navData.isActive
                          ? "text-lg  text-pc transition rounded-md px-3 py-2 font-medium"
                          : "text-lg text-bc hover:text-pc transition rounded-md px-3 py-2 font-medium"
                      }
                      aria-current="page"
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      to="/faqs"
                      className={(navData) =>
                        navData.isActive
                          ? "text-lg  text-pc transition rounded-md px-3 py-2 font-medium"
                          : "text-lg text-bc hover:text-pc transition rounded-md px-3 py-2 font-medium"
                      }
                      aria-current="page"
                    >
                      FAQs
                    </NavLink>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {token ? (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full p-1 text-gray-400 hover:text-white hover:bg-pc focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pc"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pc">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <NavLink
                            to="/profile"
                            className={(navData) =>
                              navData.isActive
                                ? "bg-red-500 block px-4 py-2 text-sm text-bc"
                                : "!!bg-transparent block px-4 py-2 text-sm hover:text-white hover:bg-pc"
                            }
                          >
                            Your Profile
                          </NavLink>
                          <button
                            onClick={logOutFunc}
                            className="!!bg-transparent block w-100 text-left px-4 py-2 text-bc hover:text-white text-sm hover:bg-pc"
                          >
                            Log out
                          </button>
                        </div>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center w-100 h-100">
                      <Link
                        to="/signup"
                        className={`cta__btn2 ${navCSS.cta__btn_nav2}`}
                        href=""
                      >
                        sign up
                      </Link>

                      <Link
                        to="/login"
                        className={`cta__btn ${navCSS.cta__btn_nav1}`}
                        href=""
                      >
                        log in
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-blue-600">
              <NavLink
                to="/docs"
                className={(navData) =>
                  navData.isActive
                    ? "bg-bc text-white block rounded-md px-3 py-2 text-base font-medium"
                    : "text-gray-300 hover:bg-bc hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }
                aria-current="page"
              >
                Docs{" "}
              </NavLink>
              {token ? (
                <>
                  <NavLink
                    to="/careers"
                    className={(navData) =>
                      navData.isActive
                        ? "bg-bc text-white block rounded-md px-3 py-2 text-base font-medium"
                        : "text-gray-300 hover:bg-bc hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    }
                    aria-current="page"
                  >
                    Careers
                  </NavLink>
                  <NavLink
                    to="/roadMaps"
                    className={(navData) =>
                      navData.isActive
                        ? "bg-bc text-white block rounded-md px-3 py-2 text-base font-medium"
                        : "text-gray-300 hover:bg-bc hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                    }
                    aria-current="page"
                  >
                    RoadMaps
                  </NavLink>
                </>
              ) : (
                ""
              )}
              <NavLink
                to="/aboutus"
                className={(navData) =>
                  navData.isActive
                    ? "bg-bc text-white block rounded-md px-3 py-2 text-base font-medium"
                    : "text-gray-300 hover:bg-bc hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }
                aria-current="page"
              >
                About Us
              </NavLink>
              <NavLink
                to="/faqs"
                className={(navData) =>
                  navData.isActive
                    ? "bg-bc text-white block rounded-md px-3 py-2 text-base font-medium"
                    : "text-gray-300 hover:bg-bc hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }
                aria-current="page"
              >
                FAQs
              </NavLink>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
