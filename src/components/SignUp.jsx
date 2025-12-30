import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/thunks/userThunk';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Image, UserPlus } from 'lucide-react';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://avatar.iran.liara.run/public/37',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      avatar: 'https://avatar.iran.liara.run/public/37'
    });
    console.log(formData);
    const result = await dispatch(createUser(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/login');
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-neutral-950 px-4 py-10">


      {/* Card */}
      <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-xl p-8 animate-fadeIn">

        {/* Header */}
        <h2 className="text-2xl font-semibold text-white text-center mb-2">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Join us and start shopping
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="text"
                name="name"
                placeholder="Nicolas"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="email"
                name="email"
                placeholder="nico@gmail.com"
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
                placeholder="1234"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            </div>
          </div>

          {/* Avatar */}
          {/* <div>
            <label className="text-gray-400 text-sm">Avatar URL</label>
            <div className="relative mt-1">
              <Image className="absolute left-3 top-3 text-gray-500" size={18} />
              <input
                type="text"
                name="avatar"
                placeholder="https://picsum.photos/800"
                value={formData.avatar}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-white rounded-lg border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-gray-600 transition"
              />
            </div>
          </div> */}

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center animate-shake">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gray-200 text-black font-medium py-2 rounded-lg hover:bg-white transition-all duration-300 disabled:opacity-60"
          >
            <UserPlus size={18} />
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-gray-400 text-sm text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-white hover:underline transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
