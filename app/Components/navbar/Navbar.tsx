"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "@/app/lib/Redux/AuthSlice";
import { RootState } from "@/app/lib/Redux/ReduxStore";
export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.authSlice.userToken);
  const [isMounted, setIsMounted] = useState(false);
  const logOut = () => {
    dispatch(clearToken());
    router.replace("/login");
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="bg-blue-400  fixed w-full z-20 top-0 inset-s-0 border-b border-default">
      <div className="max-w-7xl  flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={logo}
            alt={"Website Title"}
            width={180}
            height={180}
            className="h-10 w-auto"
          />
          <span className="self-center p-2 rounded-md duration-500 text-white hover:text-blue-400 hover:rounded-md hover:bg-white hover:p-2 text-xl text-heading font-semibold whitespace-nowrap">
            NextBoard
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden text-white hover:text-blue-400 hover:rounded-md hover:bg-white "
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>

          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded-md duration-500   text-white hover:text-blue-400 hover:rounded-md hover:bg-white  ${
                  pathname === "/"
                    ? "text-blue-400! bg-white  rounded-md"
                    : "text-heading text-white hover:text-blue-400 hover:rounded-md hover:bg-white"
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/userposts"
                className={`block py-2 px-3 rounded   text-white hover:text-blue-400 hover:rounded-md hover:bg-white  ${
                  pathname === "/userposts"
                    ? "text-blue-400! bg-white  rounded-md"
                    : "text-heading text-white hover:text-blue-400 hover:rounded-md hover:bg-white"
                }`}
              >
                My Posts
              </Link>
            </li>

            <li>
              <Link
                href="/profile"
                className={`block py-2 px-3 rounded   text-white hover:text-blue-400 hover:rounded-md hover:bg-white  ${
                  pathname === "/profile"
                    ? "text-blue-400! bg-white  rounded-md"
                    : "text-heading text-white hover:text-blue-400 hover:rounded-md hover:bg-white"
                }`}
              >
                Profile
              </Link>
            </li>

            {isMounted&& (<>
            
            {!token && (
              <>
                <li>
                  <Link
                    href="/login"
                    className={`block py-2 px-3 rounded-md duration-500 text-white hover:text-blue-400 hover:rounded-md hover:bg-white  ${
                      pathname === "/login"
                        ? "text-blue-400! bg-white  rounded-md"
                        : "text-heading text-white hover:text-blue-400 hover:rounded-md hover:bg-white"
                    }`}
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <Link
                    href="/register"
                    className={`block py-2 px-3 rounded-md duration-500  text-white hover:text-blue-400 hover:rounded-md hover:bg-white  ${
                      pathname === "/register"
                        ? "text-blue-400! bg-white  rounded-md"
                        : "text-heading text-white hover:text-blue-400 hover:rounded-md hover:bg-white"
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

            {token && (
              <>
                <li>
                  <span
                    onClick={() => logOut()}
                    className="block py-2 px-3 cursor-pointer rounded-md duration-500  text-red-500 hover:text-red-600 hover:rounded-md hover:bg-white"
                  >
                    LogOut
                  </span>
                </li>
              </>
            )}
            </>)}
          </ul>
        </div>
      </div>
    </nav>
  );
}
