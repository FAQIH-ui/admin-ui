import React from 'react';
import AuthLayout from '../components/Layouts/AuthLayout.jsx';
import FormSignUp from '../components/Fragments/FormSignUp.jsx';

function SignUpPage() {
  return (
    <AuthLayout>
      <FormSignUp />
    </AuthLayout>
  );
}

export default SignUpPage;