import React, { useState } from 'react';
import LabeledInput from '../Elements/LabeledInput.jsx';
import Button from '../Elements/Button.jsx';
import AppSnackbar from '../Elements/AppSnackbar.jsx'; // sesuaikan path/props jika berbeda
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Skema validasi Sign Up
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required("Nama wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

function FormSignUp() {
  const navigate = useNavigate();

  // State untuk toast/snackbar
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success" | "error" (sesuai MUI Alert severity)
  });

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleRegister = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        "https://jwt-auth-eight-neon.vercel.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // Coba deteksi kasus email sudah terdaftar dari status/pesan API
        const isEmailTaken =
          response.status === 409 ||
          (data?.message || "").toLowerCase().includes("email");

        setSnackbar({
          open: true,
          message: isEmailTaken
            ? "Email sudah pernah digunakan sebelumnya"
            : data?.message || "Registrasi gagal, silakan coba lagi",
          severity: "error",
        });
        return;
      }

      // Sukses
      setSnackbar({
        open: true,
        message: "Register Berhasil",
        severity: "success",
      });

      // Opsional: arahkan ke halaman login setelah beberapa saat
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Terjadi kesalahan jaringan, silakan coba lagi",
        severity: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* form start */}
      <div className="mt-16">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* NAME */}
              <div className="mb-6">
                <Field name="name">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="name"
                      type="text"
                      label="Name"
                      placeholder="Insert your name here"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="hello@example.com"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="********"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* BUTTON */}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* form end */}

      {/* teks start */}
      <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03 relative">
        <div className="border border-gray-05 w-full"></div>
        <div className="px-2 bg-special-mainBg absolute"> or sign up with</div>
      </div>
      {/* teks end */}

      {/* sign up with google start */}
      <div className="mb-8">
        <Button type="button" variant="secondary">
          <span className="flex items-center justify-center">
            <svg
              className="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="800px"
              height="800px"
              viewBox="-0.5 0 48 48"
              version="1.1"
            >
              <title>Google-color</title>
              <desc>Created with Sketch.</desc>
              <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  fill="#FBBC05"
                />
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  fill="#EB4335"
                />
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  fill="#34A853"
                />
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  fill="#4285F4"
                />
              </g>
            </svg>
            Continue with Google
          </span>
        </Button>
      </div>
      {/* sign up with google end */}

      {/* link start */}
      <div className="flex justify-center text-sm text-gray-01">
        Already have an account?&nbsp;
        <Link to="/login" className="text-primary font-bold">
          Sign In Here
        </Link>
      </div>
      {/* link end */}

      {/* Toast/Snackbar notification */}
      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={closeSnackbar}
      />
    </>
  );
}

export default FormSignUp;
