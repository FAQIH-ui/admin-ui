import React, { useContext} from 'react'
import AuthLayout from '../components/Layouts/AuthLayout.jsx';
import FormSignIn from '../components/Fragments/FormSignIn.jsx';
import { loginService } from '../services/authService.jsx';
import { AuthContext } from '../context/authContext.jsx';

function signIn() {
    const { login } = useContext(AuthContext);

  	const handleLogin = async (email, password) => {
    try {
      const { refreshToken } = await loginService(email, password);
			
			login(refreshToken);
    } catch (err) {
      console.error(err.msg);
    }
  };

  return (
    <AuthLayout>
      <FormSignIn onSubmit={handleLogin} />
    </AuthLayout>
  );
}

export default signIn;