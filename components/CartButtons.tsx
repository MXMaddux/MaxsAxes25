import { FaShoppingCart, FaUserPlus, FaUserMinus } from "react-icons/fa";
import Link from "next/link";
import { useCartContext } from "@/store/cart_context";
import { useUserContext } from "@/store/user_context";

interface CartButtonsProps {
  showOnMobile: boolean;
}

const CartButtons = ({ showOnMobile = false }: CartButtonsProps) => {
  const { total_items = 0, clearCart } = useCartContext();
  const { loginWithRedirect, myUser, logout } = useUserContext();

  return (
    <div
      className={`${
        showOnMobile ? "flex" : "hidden md:flex"
      } items-center gap-4 w-[225px]`}
    >
      <Link
        href="/cart"
        className="text-gray-800 text-2xl tracking-wider flex items-center hover:opacity-80 transition-opacity"
      >
        Cart
        <span className="flex items-center relative ml-1">
          <FaShoppingCart className="h-6 w-6" />
          <span className="absolute -top-3 -right-4 bg-blue-500 w-5 h-5 flex items-center justify-center rounded-full text-xs text-white">
            {total_items}
          </span>
        </span>
      </Link>

      {myUser ? (
        <button
          type="button"
          className="text-gray-800 text-2xl tracking-wider flex items-center hover:opacity-80 transition-opacity"
          onClick={() => {
            clearCart();
            localStorage.removeItem("user");
            logout();
          }}
          aria-label="Logout"
        >
          Logout <FaUserMinus className="ml-1 h-5 w-5" />
        </button>
      ) : (
        <button
          type="button"
          className="text-gray-800 text-2xl tracking-wider flex items-center hover:opacity-80 transition-opacity"
          onClick={loginWithRedirect}
          aria-label="Login"
        >
          Login <FaUserPlus className="ml-1 h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default CartButtons;
