import BreadcrumbCom from "../BreadcrumbCom";
import EmptyWishlistError from "../EmptyWishlistError";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";
import ProductsTable from "../Wishlist/ProductsTable";
import getCartItems from "../../redux/action/cartActions";

export default function ViewCart({ wishlist = true }) {

  const cartItems = JSON.parse(localStorage.getItem('cartItems'));

  const cleanCartItems=()=>{
    localStorage.setItem('cartItems', JSON.stringify([]));
  }

  return (
    <Layout childrenClasses={wishlist ? "pt-0 pb-0" : ""}>
      {cartItems && cartItems.length <= 0 ? (
        <div className="wishlist-page-wrapper w-full pb-[60px] mt-[30px]">
          <div className="container-x mx-auto">
            <BreadcrumbCom
              paths={[
                { name: "home", path: "/" },
                { name: "view-cart", path: "/view-cart" },
              ]}
            />
            <EmptyWishlistError />
          </div>
        </div>
      ) : (
        <div className="wishlist-page-wrapper w-full bg-white pb-[60px]">
          <div className="w-full">
            <PageTitle
              title="ViewCart"
              breadcrumb={[
                { name: "home", path: "/" },
                { name: "view-cart", path: "/view-cart" },
              ]}
            />
          </div>
          <div className="w-full mt-[23px]">
            <div className="container-x mx-auto">
              <ProductsTable className="mb-[30px]" />
              <div className="w-full mt-[30px] flex sm:justify-end justify-start">
                <div className="sm:flex sm:space-x-[30px] items-center">
                  <button type="button">
                    <div className="w-full text-sm font-semibold text-qred mb-5 sm:mb-0" onClick={cleanCartItems}>
                      Clean CartList
                    </div>
                  </button>
                  <div className="w-[180px] h-[50px]">
                    <button type="button" className="yellow-btn">
                      <div className="w-full text-sm font-semibold">
                        Add to Cart All
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
