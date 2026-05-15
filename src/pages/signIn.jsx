import React from 'react'
import AuthLayout from '../components/Layouts/AuthLayout.jsx';
import FormSignIn from '../components/Fragments/FormSignIn.jsx';

function signIn() {
  return (
    <AuthLayout>
      <FormSignIn />
    </AuthLayout>
  );
}

export default signIn;