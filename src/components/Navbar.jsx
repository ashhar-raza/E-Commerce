import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { User, ShoppingCart, Home, LogOut } from 'lucide-react';
import { logout } from '../redux/slices/userSlice';
import { persistor } from '../redux/store';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector((state) => state.user);
    const totalQuantity = useSelector(
        (state) => state.cart.totalQuantity
    );

    const handleLogout = () => {
        dispatch(logout());
        persistor.purge(); // clears persisted redux
        navigate('/login');
    };

    return (
        <nav className="w-full h-[10vh] bg-neutral-900 text-gray-100 px-6 flex items-center justify-between shadow-md">


            {/* LEFT - Profile */}
            <Link
                to={isAuthenticated ? "/profile" : "/login"}
                className="flex items-center gap-2 hover:text-white transition"
            >
                <User size={24} />
                <span className="hidden sm:block text-sm font-medium">
                    {isAuthenticated ? 'Profile' : 'Login'}
                </span>
            </Link>

            {/* RIGHT */}
            <div className="flex items-center gap-6">

                {/* Home (always visible) */}
                <Link
                    to="/"
                    className="flex items-center gap-1 hover:text-white transition"
                >
                    <Home size={22} />
                    <span className="hidden sm:block text-sm">Home</span>
                </Link>

                {/* Authenticated */}
                {isAuthenticated && (
                    <>
                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative flex items-center gap-1 hover:text-white transition"
                        >
                            <ShoppingCart size={22} />
                            <span className="hidden sm:block text-sm">Cart</span>

                            {totalQuantity > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalQuantity}
                                </span>
                            )}
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-1 text-red-400 hover:text-red-500 transition"
                        >
                            <LogOut size={22} />
                            <span className="hidden sm:block text-sm">Logout</span>
                        </button>
                    </>
                )}

                {/* NOT Authenticated */}
                {!isAuthenticated && (
                    <>
                        <Link
                            to="/login"
                            className="text-sm hover:text-white transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="text-sm hover:text-white transition"
                        >
                            Signup
                        </Link>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;
