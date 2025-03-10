import { useDispatch, useSelector } from "react-redux";
import Cart from "../../../Cart";
import Compair from "../../../Helpers/icons/Compair";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";
import SearchBox from "../../../Helpers/SearchBox";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import getCartItems from "../../../../redux/action/cartActions";

export default function Middlebar({ className, type }) {
  const items = useSelector((state) => state._items.cartItems);
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   if (Array.isArray(items) && items.length === 0 && Array.isArray(cartItems) && cartItems.length > 0) {
  //     dispatch(getCartItems(cartItems));
  //   }
  // }, [cartItems,dispatch, items]);

  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
                <Link to="/">
                  <img
                    width="152"
                    height="36"
                    // src={`${
                    //   import.meta.env.VITE_PUBLIC_URL
                    // }/assets/images/logo-3.svg`}
                    src="/assets/ebazaar-images/e-bazaar_logo_new.webp"
                    alt="logo"
                  />
                </Link>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                <Link to="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </Link>
                {/* <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                  }`}
                >
                  2
                </span> */}
              </div>
              <div className="favorite relative">
                <Link to="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </Link>
                {/* <span
                  className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                    type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                  }`}
                >
                  1
                </span> */}
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link to="/view-cart">
                    <span>
                      <ThinBag />
                    </span>
                  </Link>
                  {Array.isArray(items) && items.length > 0 && 
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                    }`}
                  >
                    {items && items?.length}
                  </span>
}
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
