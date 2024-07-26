import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getCartItems from "../../redux/action/cartActions";

export default function InputQuantityCom({item}) {
  const [quantity, setQuantity] = useState(item.quantity);
  const { cartItems } = useSelector((state) => state._items);
  const dispatch = useDispatch();

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const updateCartItems = (updatedItem) => {
    const updatedCartItems = cartItems.map(cartItem =>
      cartItem.id === updatedItem.id ? updatedItem : cartItem
    );
    dispatch(getCartItems(updatedCartItems));
  };

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItems({ ...item, quantity: newQuantity });
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItems({ ...item, quantity: newQuantity });
    }
  };
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{quantity}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
