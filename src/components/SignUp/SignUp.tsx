import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import styles from './SignUp.module.scss';

interface FormValues {
  email: string;
  password: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  console.log(watch('email'));
  console.log(watch('password'));
  console.log('errors');

  return (
    <form
      className="w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
        Sign Up
      </h1>

      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>

        <input
          {...register('email', {
            required: true,
            maxLength: 30,
            pattern: emailPattern,
          })}
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email address"
        />
        {errors.email && (
          <span className={styles.error}>
            {errors.email.type === 'required' && 'Email is required'}
            {errors.email.type === 'pattern' && 'Invalid email format'}
          </span>
        )}
      </div>

      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>

        <input
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /^[A-Za-z0-9]+$/i,
          })}
          className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
        />
        {errors.password && (
          <span className={styles.error}>
            {errors.password.type === 'required' && 'Password is required'}
            {errors.password.type === 'minLength' &&
              'Password must be at least 6 characters'}
            {errors.password.type === 'maxLength' &&
              'Password must not exceed 20 characters'}
            {errors.password.type === 'pattern' &&
              'Password can only contain letters and numbers'}
          </span>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};
