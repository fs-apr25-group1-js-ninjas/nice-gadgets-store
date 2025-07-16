import { useState, type FC } from 'react';
// import styles from './AuthPage.module.scss';
import { SignIn } from '../../components/SignIn';
import { SignUp } from '../../components/SignUp';

export const AuthPage: FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggle = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex flex-col items-center justify-center min-h-screen px-6 mx-auto">
        {!isSignUp ?
          <SignIn />
        : <SignUp />}

        <div className="mt-6 text-center ">
          <button
            onClick={handleToggle}
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
            Don’t have an account yet? Sign up
          </button>
        </div>
      </div>
    </section>
  );
};
