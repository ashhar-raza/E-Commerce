import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/slices/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const dispatch = useDispatch();
  const { products, totalPrice } = useSelector((state) => state.cart);

  if (products.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-neutral-950 text-gray-400">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="h-full bg-neutral-950 p-6 overflow-auto">
      <h1 className="text-2xl font-semibold text-white mb-6">
        Your Cart
      </h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-neutral-900 rounded-xl p-4 shadow-md"
          >
            {/* LEFT — Product Details */}
            <div className="flex items-center gap-4">
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h2 className="text-white font-medium">
                  {item.title}
                </h2>
                <p className="text-gray-400 text-sm">
                  ₹ {item.price}
                </p>
              </div>
            </div>

            {/* RIGHT — Quantity & Actions */}
            <div className="flex items-center gap-4">
              {/* Quantity */}
              <div className="flex items-center bg-neutral-800 rounded-lg">
                <button
                  onClick={() => dispatch(removeItem(item.id))}
                  className="p-2 text-gray-300 hover:text-white"
                >
                  <Minus size={16} />
                </button>

                <span className="px-4 text-white font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(addItem(item))}
                  className="p-2 text-gray-300 hover:text-white"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Delete (remove 1 quantity) */}
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="text-red-400 hover:text-red-500 transition"
                title="Remove one item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 flex justify-end">
        <div className="bg-neutral-900 rounded-xl p-4 w-full max-w-sm">
          <div className="flex justify-between text-white mb-2">
            <span>Total</span>
            <span>₹ {totalPrice}</span>
          </div>
          <button className="w-full mt-3 bg-gray-200 text-black py-2 rounded-lg hover:bg-white transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
