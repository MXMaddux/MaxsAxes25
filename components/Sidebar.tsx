import React from "react";
import Image from "next/image";
import logo from "@/public/images/logo-no-background.png";
import Link from "next/link";
import { useGuitarsContext } from "@/store/guitars_context";
import { FaTimes } from "react-icons/fa";
import { links } from "@/utils/links";
import CartButtons from "./CartButtons";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGuitarsContext();

  return (
    <aside
      className={`fixed top-0 left-0 w-full h-full bg-white transition-transform duration-300 ease-in-out z-[-1]
        ${isSidebarOpen ? "translate-x-0 z-[999]" : "-translate-x-full"}`}
    >
      <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
        <Link href="/" onClick={closeSidebar}>
          <Image
            src={logo}
            alt="Max's Axes"
            className="h-[45px] w-auto"
            width={180}
            height={45}
          />
        </Link>
        <button
          onClick={closeSidebar}
          className="text-2xl bg-transparent border-none text-red-700 hover:text-red-500 transition-colors cursor-pointer mt-0.5"
          aria-label="Close sidebar"
        >
          <FaTimes />
        </button>
      </div>

      <ul className="mb-8">
        {links.map(({ id, text, url }) => (
          <li key={id}>
            <Link
              href={url}
              onClick={closeSidebar}
              className="block text-left text-base capitalize py-4 px-6 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:pl-8 transition-all duration-300"
            >
              {text}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/checkout"
            onClick={closeSidebar}
            className="block text-left text-base capitalize py-4 px-6 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:pl-8 transition-all duration-300"
          >
            checkout
          </Link>
        </li>
      </ul>

      <div className="mx-auto my-8 w-[225px]">
        <CartButtons showOnMobile={true} />
      </div>
    </aside>
  );
};

export default Sidebar;
