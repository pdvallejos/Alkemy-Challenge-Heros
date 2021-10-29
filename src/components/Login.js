import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { iniciarSesionAction } from "../redux/loginReducer";
import Error from "./Error";
import Loading from "./Loading";

const Login = (props) => {
  const usuarioActivo = useSelector((store) => store.login.activo);
  const { error, loading } = useSelector((store) => store.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (usuarioActivo) return props.history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioActivo]);

  return (
    !usuarioActivo && (
      <div className="container">
        <h1 className="text-white mt-3">Login account</h1>
        {error && <Error error={error} /> }
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 5) {
              errors.password = "Password must have 5 characters";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            dispatch(iniciarSesionAction(values));
          }}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="form-group">
              <div className="mt-4">
                <span className="text-white">Email:</span>
                <Field
                  type="email"
                  name="email"
                  className="form-control col-sm-5"
                  placeholder="your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
                <div className="mt-3">
                  <span className="text-white ">Password:</span>
                  <Field
                    type="password"
                    name="password"
                    className="form-control col-sm-5 "
                    placeholder="your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting||!isValid}
                    className="btn btn-primary mt-3"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <div className="row justify-content-center">
          {loading && <Loading />}
        </div>
      </div>
    )
  );
};

export default Login;
