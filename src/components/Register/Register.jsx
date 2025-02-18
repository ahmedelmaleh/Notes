import { useState } from "react";
import style from "./Register.module.css";
import regsiterImage from "../../assets/images/register.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signUp(values) {
    setLoading(true);
    setErrorMessage(""); 
    try {
      const response = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        values
      );

      if (response.data.msg === "done") {
        navigate("/login");
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
    name: Yup.string().required("Username is required").min(3, 'Min length is 3').max(10, 'Max length is 10'),
    email: Yup.string().required('Email is required').email(),
    password: Yup.string().required('Password is required').matches(/^[A-Z]/, 'Must begin with a capital letter').min(3, "Min length is 3"),
    age: Yup.number().required('Age is required').min(18, 'Min age is 18 years old').max(100, 'Max age is 100 years old'),
    phone: Yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Please enter a valid Egyptian number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: '',
      phone: ""
    },
    validationSchema,
    onSubmit: signUp
  });

  return (
    <section className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className={`${style.container} row`}>
        <figure className="col-md-8 m-0 p-md-0">
          <div className="image-container">
            <img src={regsiterImage} className="w-100" alt="Register Image" />
          </div>
        </figure>
        <form className="col-md-4 d-flex flex-column justify-content-center px-5" onSubmit={formik.handleSubmit}>
          <h2 className="m-0 fw-bold font-Montserrat">Create an account</h2>
          <p className="mb-3">Let's get started for free</p>
          
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <div className="form-group d-flex flex-column gap-2 justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && <div className="alert alert-danger">{formik.errors.name}</div>}

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

            <input
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Age"
              name="age"
              id="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && <div className="alert alert-danger">{formik.errors.age}</div>}

            <input
              type="tel"
              inputMode="numeric"
              className="form-control"
              placeholder="Phone"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && <div className="alert alert-danger">{formik.errors.phone}</div>}

            <button 
              disabled={!(formik.isValid && formik.dirty) || loading} 
              type="submit" 
              className="btn btn-main d-flex align-items-center justify-content-center"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span> 
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-decoration-underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
