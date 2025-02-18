import style from "./Login.module.css";
import LoginImage from "../../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
export default function Login() {
  const {token,setToken}=useContext(UserContext)
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signIn(values) {
    setLoading(true);
    setErrorMessage(""); 
    try {
      const response = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
        values
      );

      if (response.data.msg === "done") {
        localStorage.setItem('userToken',`3b8ny__${response.data.token}`)
        setToken(response.data.token)
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg || "Something went wrong!");
      } else {
        setErrorMessage("Network error, please try again later.");
      }
    } finally {
      setLoading(false); 
    }
    
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required('Password is required'), 
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: signIn
  });
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={LoginImage} className="w-100" alt="Regsiter Image" />
          </div>
        </figure>
        <form className="col-md-4 d-flex flex-column justify-content-center px-5" onSubmit={formik.handleSubmit}>
          <h2 className="m-0 fw-bold font-Montserrat">
            Welcome Back <i className="fa-solid fa-heart ms-0 text-main"></i>
          </h2>
          <p className="mb-3">
            Thanks for returning! Please sign in to access your account.
          </p>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && <div className="alert alert-danger">{formik.errors.email}</div>}


            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && <div className="alert alert-danger">{formik.errors.password}</div>}


            <button disabled={!(formik.isValid && formik.dirty) || loading} 
              type="submit" 
              className="btn btn-main d-flex align-items-center justify-content-center">
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span> 
                  Logging...
                </>
              ) : (
                "Login"
              )}
            </button>
            <p>
              You don't have account yet ?
              <Link to="/signup" className="text-decoration-underline">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
