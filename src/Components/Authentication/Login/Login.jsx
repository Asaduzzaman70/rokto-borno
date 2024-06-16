import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import imgLogin from '../../../assets/Elements/login.png'
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onTouched' });
  const [showPassword, setShowPassword] = useState(false);
  const { logIn } = useAuth();


  const onSubmit = data => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password);

    logIn(email, password)
      .then(res => {
        console.log('User Logged:-',res.user);
      })
      .catch(error => {
        console.log(error);
      })
  };


  return (
    <div className='my-16'>
      <div className='text-center'>
        <h1 className='text-2xl md:text-3xl lg:text-6xl uppercase font-bold text-myBg-dark dark:text-myBgTheme-white border-double border-myBg-dark dark:border-b-8 border-sky-500 inline-block'>Happy To See You</h1> <br />
        <h2 className='md:text-xl lg:text-2xl text-myBg-dark mt-2 font-light dark:text-myBgTheme-white dark:bg-myBg-dark inline-block rounded-lg p-2 dark:font-bold dark:uppercase'>
          Your Journey to Saving Lives Begins Here
        </h2>
        <p className='md:text-base lg:text-xl text-myText-highDark dark:text-myText-mediumLight'>Your journey to saving lives begins here.</p>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white w-full">
            <img src={imgLogin} alt="Doctor and Pills" className="mx-auto w-full" />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <div className='w-3/4 mx-auto rounded-lg border border-myBg-dark py-10 px-2'>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className='label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark'>Email*</span>
                  </label>
                  <input
                    {...register('email', { required: true })}
                    className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white w-full"
                    type="email"
                    placeholder="Enter your username or address"
                  />
                  {errors.email && <p className="text-myBg-dark dark:text-myBgTheme-white text-sm mt-2">*Name field is required</p>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className='label-text text-lg text-myBg-dark font-bold dark:text-myBgTheme-white dark:border-b-4 dark:border-myBg-dark'>Password*</span>
                  </label>
                  <div className='relative'>
                    <input
                      {...register('password', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                      })}
                      className="input input-lg bg-transparent border-2 border-myBg-dark text-myText-highDark font-semibold dark:text-myBgTheme-white w-full"
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-6 bottom-6 text-myText-highDark dark:text-myBgTheme-white text-lg"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password?.type === 'required' && <p className='text-myBg-dark dark:text-myBgTheme-white text-sm'>*Password field is required</p>}
                  {errors.password?.type === 'minLength' && <p className='text-myBg-dark dark:text-myBgTheme-white text-sm'>*Password must be 6 characters</p>}
                  {errors.password?.type === 'maxLength' && <p className='text-myBg-dark dark:text-myBgTheme-white text-sm'>*Password must be less then 20 characters</p>}
                  {errors.password?.type === 'pattern' && <p className='text-myBg-dark dark:text-myBgTheme-white text-sm'>*Password must have one uppercase, one lowercase, one number and one special characters</p>}
                </div>
                <div className="form-control mt-6">
                  <input className="btn text-base uppercase bg-myBg-dark text-myBgTheme-white font-bold border-4 border-myBg-dark" type="submit" value="Login" />
                </div>
              </form>
              <p className="md:text-base lg:text-xl text-myText-highDark dark:text-myText-mediumLight text-center">
                Don't have an account? <Link to='/register' className="text-orange-500 hover:text-orange-800 text-myBg-dark dark:text-myBgTheme-white" href="#">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
