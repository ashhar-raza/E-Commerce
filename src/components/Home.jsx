import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/thunks/productThunk';
import { addItem, removeItem } from '../redux/slices/cartSlice';

const Home = () => {
    const dispatch = useDispatch();

    const { allProducts, loading } = useSelector((state) => state.products);
    const cartItems = useSelector((state) => state.cart.products);

    useEffect(() => {
        dispatch(getProduct());
    }, [dispatch]);

    const getCartItem = (id) => {
        return cartItems.find((item) => item.id === id);
    };

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center text-gray-400">
                Loading products...
            </div>
        );
    }

    return (
        <div className="h-full overflow-auto bg-neutral-950 p-6">
            <h1 className="text-2xl font-semibold text-white mb-6">
                Products
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {allProducts.map((product) => {
                    const cartItem = getCartItem(product.id);

                    return (
                        <div
                            key={product.id}
                            className="bg-neutral-900 rounded-xl shadow-md p-4 flex flex-col"
                        >
                            {/* Image */}
                            <img
                                src={product.images?.[0]}
                                alt={product.title}
                                className="h-40 w-full object-cover rounded-lg mb-3"
                            />

                            {/* Title */}
                            <h2 className="text-white font-medium mb-1 truncate">
                                {product.title}
                            </h2>

                            {/* Price */}
                            <p className="text-gray-400 mb-3">
                                ₹ {product.price}
                            </p>

                            {/* Actions */}
                            <div className="mt-auto">
                                {!cartItem ? (
                                    <button
                                        onClick={() => dispatch(addItem(product))}
                                        className="w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-white transition"
                                    >
                                        Add to Cart
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-between bg-neutral-800 rounded-lg px-3 py-2">
                                        <button
                                            onClick={() => dispatch(removeItem(product.id))}
                                            className="text-white text-lg px-2"
                                        >
                                            −
                                        </button>

                                        <span className="text-white font-medium">
                                            {cartItem.quantity}
                                        </span>

                                        <button
                                            onClick={() => dispatch(addItem(product))}
                                            className="text-white text-lg px-2"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
