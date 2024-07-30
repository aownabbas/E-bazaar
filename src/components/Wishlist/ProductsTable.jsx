import { useDispatch, useSelector } from "react-redux";
import InputQuantityCom from "../Helpers/InputQuantityCom";
import getCartItems from "../../redux/action/cartActions";

export default function ProductsTable({ className }) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  console.log(cartItems,"555555");

  const YourComponent = ({ item }) => {

    // Ensure price and quantity are numbers
    const price = Number(item.price.replace(/[^0-9.-]+/g, ""));
    const quantity = Number(item.quantity);

    // Check for valid values
    if (isNaN(price) || isNaN(quantity)) {
      console.error('Invalid price or quantity:', item.price, item.quantity); // Debugging
      return <span className="text-[15px] font-normal">N/A</span>; // or display a fallback message
    }

    return (
      <span className="text-[15px] font-normal">
        {price * quantity}
      </span>
    );
  };

  const removeSingleItem = (itemToRemove) => {
    const updatedItems = cartItems.filter(item => item.id !== itemToRemove.id);
    // dispatch(getCartItems(updatedItems));
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap w-[380px]">product</td>
              <td className="py-4 whitespace-nowrap text-center">color</td>
              <td className="py-4 whitespace-nowrap text-center">size</td>
              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap text-center">quantity</td>
              <td className="py-4 whitespace-nowrap text-center">total</td>
              <td className="py-4 whitespace-nowrap text-right w-[114px] block"></td>
            </tr>
            {/* table heading end */}
            {cartItems && cartItems.length > 0 && cartItems.map((item) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10 py-4">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`${import.meta.env.VITE_PUBLIC_URL}/assets/images/${item.image}`}
                        alt="product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px] text-qblack">{item.title}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex justify-center items-center">
                    <span className="w-[20px] h-[20px] bg-[#E4BC87] block rounded-full"></span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">Small</span>
                  </div>
                </td>
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">{item.price}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex justify-center items-center">
                    <InputQuantityCom item={item} />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <YourComponent item={item} />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="cursor-pointer" onClick={()=>removeSingleItem(item)}>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                          fill="#AAAAAA"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
