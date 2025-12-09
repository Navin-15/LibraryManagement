// import React, { useState } from "react";
// import "../Staffs/CreateStaff.css";

// const CreateStaff = () => {
//   const [staffId] = useState("STAFF-" + Math.floor(Math.random() * 100000));
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});
//   const roles = ["Librarian", "Assistant"];

//   // Validation
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required.";

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
//     }

//     if (!formData.role) newErrors.role = "Select a role.";

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//     } else {
//       const phoneRegex = /^\d{10}$/;
//       if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Only allow digits for phone number
//     if (name === "phone" && !/^\d*$/.test(value)) return;

//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       alert("Staff Member Added Successfully ✅");
//       console.log("Staff Data:", { staffId, ...formData });

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         role: "",
//         phone: "",
//       });
//     }
//   };

//   return (
//     <div className="staff-form-container">
//       <h2>Add Staff Member</h2>
//       <form className="staff-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Staff ID</label>
//           <input type="text" value={staffId} disabled />
//         </div>

//         <div className="form-group">
//           <label>Name <span className="required">*</span></label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter staff name"
//           />
//           {errors.name && <span className="error">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label>Email <span className="required">*</span></label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label>Role <span className="required">*</span></label>
//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="">Select Role</option>
//             {roles.map((r) => (
//               <option key={r} value={r}>{r}</option>
//             ))}
//           </select>
//           {errors.role && <span className="error">{errors.role}</span>}
//         </div>

//         <div className="form-group">
//           <label>Phone Number <span className="required">*</span></label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter 10-digit phone number"
//             maxLength="10"
//           />
//           {errors.phone && <span className="error">{errors.phone}</span>}
//         </div>

//         <button type="submit" className="submit-btn">Add Staff Member</button>
//       </form>
//     </div>
//   );
// };

// export default CreateStaff;

// without permission field

// import React, { useState } from "react";
// import axios from "axios";
// import "../Staffs/CreateStaff.css";

// const CreateStaff = () => {
//   const [staffId] = useState("STAFF-" + Math.floor(Math.random() * 100000));
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     phone: "",
//   });

//   const [errors, setErrors] = useState({});
//   const roles = ["Librarian", "Assistant"];

//   // Validation
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required.";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email))
//         newErrors.email = "Invalid email format.";
//     }
//     if (!formData.role) newErrors.role = "Select a role.";
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone" && !/^\d*$/.test(value)) return;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/staff", {
//           staffId,
//           ...formData,
//         });
//         alert(response.data.message || "Staff added successfully ✅");

//         setFormData({
//           name: "",
//           email: "",
//           role: "",
//           phone: "",
//         });
//       } catch (error) {
//         alert("Error: " + (error.response?.data?.error || error.message));
//       }
//     }
//   };

//   return (
//     <div className="staff-form-container">
//       <h2>Add Staff Member</h2>
//       <form className="staff-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Staff ID</label>
//           <input type="text" value={staffId} disabled />
//         </div>

//         <div className="form-group">
//           <label>
//             Name <span className="required">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter staff name"
//           />
//           {errors.name && <span className="error">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label>
//             Email <span className="required">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label>
//             Role <span className="required">*</span>
//           </label>
//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="">Select Role</option>
//             {roles.map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>
//           {errors.role && <span className="error">{errors.role}</span>}
//         </div>

//         <div className="form-group">
//           <label>
//             Phone Number <span className="required">*</span>
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter 10-digit phone number"
//             maxLength="10"
//           />
//           {errors.phone && <span className="error">{errors.phone}</span>}
//         </div>

//         <button type="submit" className="submit-btn">
//           Add Staff Member
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateStaff;

// with permission field

// import React, { useState } from "react";
// import axios from "axios";
// import "../Staffs/CreateStaff.css";

// const CreateStaff = () => {
//   const [staffId] = useState("STAFF-" + Math.floor(Math.random() * 100000));
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "",
//     phone: "",
//     permissions: [], // <-- NEW FIELD
//   });

//   const [errors, setErrors] = useState({});
//   const roles = ["Librarian", "Assistant"];
//   const permissionsList = ["Books", "Members", "Transactions", "Staffs"];

//   // Validation
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required.";
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email))
//         newErrors.email = "Invalid email format.";
//     }
//     if (!formData.role) newErrors.role = "Select a role.";
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       newErrors.phone = "Phone number must be 10 digits.";
//     }
//     if (formData.permissions.length === 0) {
//       newErrors.permissions = "Select at least one permission.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "phone" && !/^\d*$/.test(value)) return;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle checkbox selection
//   const handleCheckbox = (permission) => {
//     let updatedPermissions = [...formData.permissions];

//     if (updatedPermissions.includes(permission)) {
//       updatedPermissions = updatedPermissions.filter((p) => p !== permission);
//     } else {
//       updatedPermissions.push(permission);
//     }

//     setFormData({ ...formData, permissions: updatedPermissions });
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const response = await axios.post("http://localhost:5000/api/staff", {
//           staffId,
//           ...formData,
//         });

//         alert(response.data.message || "Staff added successfully!");

//         setFormData({
//           name: "",
//           email: "",
//           role: "",
//           phone: "",
//           permissions: [],
//         });
//       } catch (error) {
//         alert("Error: " + (error.response?.data?.error || error.message));
//       }
//     }
//   };

//   return (
//     <div className="staff-form-container">
//       <h2>Add Staff Member</h2>
//       <form className="staff-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Staff ID</label>
//           <input type="text" value={staffId} disabled />
//         </div>

//         <div className="form-group">
//           <label>
//             Name <span className="required">*</span>
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter staff name"
//           />
//           {errors.name && <span className="error">{errors.name}</span>}
//         </div>

//         <div className="form-group">
//           <label>
//             Email <span className="required">*</span>
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Enter email"
//           />
//           {errors.email && <span className="error">{errors.email}</span>}
//         </div>

//         <div className="form-group">
//           <label>
//             Role <span className="required">*</span>
//           </label>
//           <select name="role" value={formData.role} onChange={handleChange}>
//             <option value="">Select Role</option>
//             {roles.map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>
//           {errors.role && <span className="error">{errors.role}</span>}
//         </div>

//         {/* PERMISSIONS SECTION */}
//         <div className="form-group">
//           <label>
//             Permissions <span className="required">*</span>
//           </label>

//           <div className="checkbox-group">
//             {permissionsList.map((perm) => (
//               <label key={perm} className="checkbox-item permission-item">
//                 <input
//                   type="checkbox"
//                   checked={formData.permissions.includes(perm)}
//                   onChange={() => handleCheckbox(perm)}
//                 />
//                 {perm}
//               </label>
//             ))}
//           </div>

//           {errors.permissions && (
//             <span className="error">{errors.permissions}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>
//             Phone Number <span className="required">*</span>
//           </label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             placeholder="Enter 10-digit phone number"
//             maxLength="10"
//           />
//           {errors.phone && <span className="error">{errors.phone}</span>}
//         </div>

//         <button type="submit" className="submit-btn">
//           Add Staff Member
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateStaff;

// with password and confirm password section with validation

import React, { useState } from "react";
import axios from "axios";
import "../Staffs/CreateStaff.css";
import TopBar from '../../Topbar/TopBar'

const CreateStaff = () => {
  const [staffId] = useState("STAFF-" + Math.floor(Math.random() * 100000));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    password: "",
    confirmPassword: "",
    permissions: [],
  });

  const [errors, setErrors] = useState({});
  const roles = ["Librarian", "Assistant"];
  const permissionsList = ["Books", "Members", "Transactions", "Staffs"];

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email))
        newErrors.email = "Invalid email format.";
    }

    if (!formData.role) newErrors.role = "Select a role.";

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // Phone Validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Permissions
    if (formData.permissions.length === 0) {
      newErrors.permissions = "Select at least one permission.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  // Checkbox handler
  const handleCheckbox = (permission) => {
    let updatedPermissions = [...formData.permissions];

    if (updatedPermissions.includes(permission)) {
      updatedPermissions = updatedPermissions.filter((p) => p !== permission);
    } else {
      updatedPermissions.push(permission);
    }

    setFormData({ ...formData, permissions: updatedPermissions });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/staff`, {
          staffId,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          phone: formData.phone,
          password: formData.password,
          permissions: formData.permissions,
        });

        alert(response.data.message || "Staff added successfully!");

        setFormData({
          name: "",
          email: "",
          role: "",
          phone: "",
          password: "",
          confirmPassword: "",
          permissions: [],
        });
      } catch (error) {
        alert("Error: " + (error.response?.data?.error || error.message));
      }
    }
  };

  return (
    <div className="parentstaff">
        <TopBar/>
      <div className="staff-form-container">
      <h2>Add Staff Member</h2>
      <form className="staff-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Staff ID</label>
          <input type="text" value={staffId} disabled />
        </div>

        <div className="form-group">
          <label>
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter staff name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* PASSWORD */}
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Minimum 8 characters"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="form-group">
          <label>
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            Role <span className="required">*</span>
          </label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Select Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.role && <span className="error">{errors.role}</span>}
        </div>

        {/* PERMISSIONS */}
        <div className="form-group">
          <label>
            Permissions <span className="required">*</span>
          </label>

          <div className="checkbox-group">
            {permissionsList.map((perm) => (
              <label key={perm} className="checkbox-item permission-item">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(perm)}
                  onChange={() => handleCheckbox(perm)}
                />
                {perm}
              </label>
            ))}
          </div>

          {errors.permissions && (
            <span className="error">{errors.permissions}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="text"
            name="phone"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Add Staff Member
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateStaff;


