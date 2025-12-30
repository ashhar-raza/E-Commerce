import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/thunks/userThunk';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-neutral-950 px-4">


      {/* Card */}
      <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-xl p-8 animate-fadeIn">

        {/* Header */}
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Login to continue shopping
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="email"
                name="email"
                placeholder="john@mail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-400 text-sm">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="password"
                name="password"
                placeholder="changeme"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center animate-shake">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 text-black font-medium py-2 rounded-lg hover:bg-white transition-all duration-300 disabled:opacity-60"
          >
            <LogIn size={18} />
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-neutral-700"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-neutral-700"></div>
        </div>

        {/* Signup */}
        <p className="text-gray-400 text-sm text-center">
          Don’t have an account?{' '}
          <Link
            to="/signup"
            className="text-white hover:underline transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
