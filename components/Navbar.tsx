"use client";

import Image from "next/image";
import logo from "@/public/images/logo-no-background.png";
import Link from "next/link";
import { links } from "@/utils/links";
import { useUserContext } from "@/store/user_context";
import { Button } from "./ui/button";
import { FaBars } from "react-icons/fa";
import { useGuitarsContext } from "@/store/guitars_context";
import CartButtons from "./CartButtons";

const Navbar = () => {
  const { myUser } = useUserContext();
  const { openSidebar } = useGuitarsContext();

  return (
    <nav className="h-20 flex items-center justify-center bg-blue-200 w-full px-4 sm:px-8">
      <div className="w-full max-w-[1170px] mx-auto">
        {/* Mobile view */}
        <div className="md:hidden flex items-center justify-between w-full">
          <Link href="/">
            <Image
              src={logo}
              width={200}
              alt="Max's Axes logo"
              className="w-[180px] sm:w-[200px] md:w-[240px]"
            />
          </Link>
          <div className="flex items-center gap-4">
            <CartButtons showOnMobile={false} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-blue-500 hover:bg-transparent hover:text-blue-600"
              onClick={openSidebar}
            >
              <FaBars className="h-6 w-6" onClick={openSidebar} />
            </Button>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:items-center">
          <Link href="/">
            <Image src={logo} alt="Max's Axes" className="w-[240px]" />
          </Link>

          <ul className="flex justify-center">
            {links.map((link) => {
              const { id, text, url } = link;
              return (
                <li key={id} className="mx-2">
                  <Link
                    href={url}
                    className="text-gray-700 text-base capitalize tracking-wider py-2 hover:border-b-2 hover:border-blue-300"
                  >
                    {text}
                  </Link>
                </li>
              );
            })}
            {myUser && (
              <li className="mx-2">
                <Link
                  href="/checkout"
                  className="text-gray-700 text-base capitalize tracking-wider py-2 hover:border-b-2 hover:border-blue-300"
                >
                  checkout
                </Link>
              </li>
            )}
          </ul>

          <div className="grid">
            <CartButtons showOnMobile={false} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
