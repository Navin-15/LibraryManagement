// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     let temp = {};

//     // Email validation
//     if (!email) temp.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(email))
//       temp.email = "Enter a valid email address";

//     // Password validation
//     if (!password) temp.password = "Password is required";
//     else if (password.length < 6)
//       temp.password = "Password must be at least 6 characters";

//     setErrors(temp);

//     return Object.keys(temp).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!validate()) return;

//     alert("Login Successful!");
//     // Your backend login API here
//   };

//   return (
//     <div className="login-wrapper d-flex align-items-center justify-content-center">
//       <div className="login-card shadow-lg p-4 rounded">
//         <h3 className="text-center mb-3 login-title">Welcome Back</h3>
//         <p className="text-center text-muted mb-4">Please login to your account</p>

//         <form onSubmit={handleSubmit}>
//           {/* Email Field */}
//           <div className="form-group mb-3">
//             <label className="form-label fw-semibold">Email</label>
//             <input
//               type="text"
//               className={`form-control ${errors.email ? "is-invalid" : ""}`}
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {errors.email && (
//               <div className="invalid-feedback">{errors.email}</div>
//             )}
//           </div>

//           {/* Password Field */}
//           <div className="form-group mb-3">
//             <label className="form-label fw-semibold">Password</label>
//             <input
//               type="password"
//               className={`form-control ${errors.password ? "is-invalid" : ""}`}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {errors.password && (
//               <div className="invalid-feedback">{errors.password}</div>
//             )}
//           </div>

//           {/* Button */}
//           <button className="btn btn-primary w-100 login-btn" type="submit">
//             Login
//           </button>
//         </form>

//         <p className="text-center mt-3 small">
//           Don't have an account?{" "}
//           <a href="#" className="text-decoration-none">Register</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// with API AND REDIRECTB 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let temp = {};

    if (!email) temp.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      temp.email = "Enter a valid email address";

    if (!password) temp.password = "Password is required";
    else if (password.length < 6)
      temp.password = "Password must be at least 6 characters";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("staff", JSON.stringify(res.data.staff));

      navigate("/dashboard"); // Redirect
    } catch (err) {
      setBackendError(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="login-card shadow-lg p-4 rounded">
        <h3 className="text-center mb-3 login-title">Staff Login</h3>

        {backendError && (
          <div className="alert alert-danger text-center">{backendError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="text"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter your staff email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button className="btn btn-primary w-100 login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
