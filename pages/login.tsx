import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as css from '../styles/app.scss';
import Nav from '../components/nav';
import Router from 'next/router'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required")
});

class Login extends React.Component {
  submit(email: string, password: string, setSubmitting: Function) {
    const data = JSON.stringify({"username":email,"password":password});
    const element = document.head.querySelector('meta[name="X-CSRF-TOKEN"]') as HTMLMetaElement;
    const rawHeaders: Headers | string[][] | Record<string, string> | undefined = {
      'Content-Type': 'application/json'
    };
    if(element) {
      rawHeaders['csrf-token'] = element.content;
    }
    const headers = new Headers(rawHeaders);
    fetch('/auth/login', {
      method: 'post',
      body: data,
      headers
    }).then(function(response) {
      return response.json();
    }).then(function(result) {
      setSubmitting(false);
      if(result && result.access_token) {
        Router.push('/');
      }
    });
  }
  render() {
    return (
      <div className={css.container}>
        <div className={`${css['row']} ${css['mb-5']}`}>
          <div className={`${css['col-lg-12']} ${css['text-center']}`}>
            <h1 className={css['mt-5']}>Login Form</h1>
          </div>
        </div>
        <div className={css.row}>
          <div className={css['col-lg-12']}>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={({ email, password }, {setSubmitting}) => {
                this.submit(email, password, setSubmitting);
              }}
            >
              {({ touched, errors, isSubmitting }) => (
                <Form>
                  <div className={css['form-group']}>
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      className={`${css['form-control']} ${
                        touched.email && errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="email"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className={css['form-group']}>
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      className={`${css['form-control']} ${
                        touched.password && errors.password ? "is-invalid" : ""
                      }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="password"
                      className={css['invalid-feedback']}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${css['btn']} ${css['btn-primary']} ${css['btn-block']}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Please wait..." : "Submit"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
