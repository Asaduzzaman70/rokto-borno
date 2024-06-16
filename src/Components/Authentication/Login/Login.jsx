import React from 'react';
import { useForm } from 'react-hook-form';
import imgLogin from '../../../assets/Elements/login.png'

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-white w-full">
          <img src={imgLogin} alt="Doctor and Pills" className="mx-auto mb-4 w-full"/>
          <h1 className="text-3xl font-bold">Welcome to Doc House</h1>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="mb-6 text-3xl text-center">Sign in to Doc House</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username or Email Address
              </label>
              <input
                {...register('username')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username or address"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...register('password')}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              <p className="text-right">
                <a className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800" href="#">
                  Forgot password?
                </a>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            Don't have an account? <a className="text-orange-500 hover:text-orange-800" href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
