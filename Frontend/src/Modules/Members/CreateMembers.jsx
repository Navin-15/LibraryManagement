// import React, { useState, useEffect } from "react";
// import "../Members/CreateMembers.css";

// const CreateMember = () => {
//   const [memberId] = useState("MEM-" + Math.floor(Math.random() * 100000));
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     startDate: new Date().toISOString().split("T")[0], // Default to today
//     membershipType: "",
//     maxBooks: "",
//   });

//   const [errors, setErrors] = useState({});

//   const membershipRules = {
//     Basic: 2,
//     Premium: 5,
//     Elite: 10,
//   };

//   // Update maxBooks when membershipType changes
//   useEffect(() => {
//     if (formData.membershipType) {
//       setFormData((prev) => ({
//         ...prev,
//         maxBooks: membershipRules[formData.membershipType],
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, maxBooks: "" }));
//     }
//   }, [formData.membershipType]);

//   // Validation function
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = "Name is required.";

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required.";
//     } else {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format.";
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required.";
//     } else {
//       const phoneRegex = /^\d{10}$/;
//       if (!phoneRegex.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits.";
//     }

//     if (!formData.startDate) newErrors.startDate = "Start date is required.";

//     if (!formData.membershipType) newErrors.membershipType = "Select membership type.";

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

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       alert("Member Created Successfully ✅");
//       console.log("Member Data:", { memberId, ...formData });

//       // Reset form
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         startDate: new Date().toISOString().split("T")[0],
//         membershipType: "",
//         maxBooks: "",
//       });
//     }
//   };

//   return (
//     <div className="member-form-container">
//       <h2>Create New Member</h2>
//       <form className="member-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Member ID</label>
//           <input type="text" value={memberId} disabled />
//         </div>

//         <div className="form-group">
//           <label>Name <span className="required">*</span></label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter member name"
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

//         <div className="form-group">
//           <label>Membership Start Date</label>
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//           />
//           {errors.startDate && <span className="error">{errors.startDate}</span>}
//         </div>

//         <div className="form-group">
//           <label>Membership Type</label>
//           <select
//             name="membershipType"
//             value={formData.membershipType}
//             onChange={handleChange}
//           >
//             <option value="">Select Type</option>
//             <option value="Basic">Basic</option>
//             <option value="Premium">Premium</option>
//             <option value="Elite">Elite</option>
//           </select>
//           {errors.membershipType && <span className="error">{errors.membershipType}</span>}
//         </div>

//         <div className="form-group">
//           <label>Max Books Allowed</label>
//           <input type="number" value={formData.maxBooks} disabled />
//         </div>

//         <button type="submit" className="submit-btn">Create Member</button>
//       </form>
//     </div>
//   );
// };

// export default CreateMember;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Members/CreateMembers.css";
import TopBar from '../../Topbar/TopBar'

const CreateMember = () => {
  const [memberId] = useState("MEM-" + Math.floor(Math.random() * 100000));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: new Date().toISOString().split("T")[0],
    membershipType: "",
    maxBooks: "",
  });

  const [errors, setErrors] = useState({});

  const membershipRules = {
    Basic: 2,
    Premium: 5,
    Elite: 10,
  };

  // ✅ Update maxBooks automatically
  useEffect(() => {
    if (formData.membershipType) {
      setFormData((prev) => ({
        ...prev,
        maxBooks: membershipRules[formData.membershipType],
      }));
    } else {
      setFormData((prev) => ({ ...prev, maxBooks: "" }));
    }
  }, [formData.membershipType]);

  // ✅ Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits.";
    if (!formData.startDate) newErrors.startDate = "Start date is required.";
    if (!formData.membershipType)
      newErrors.membershipType = "Select membership type.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Submit form to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const newMember = { memberId, ...formData };
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/members`, newMember);
        alert("✅ Member Created Successfully!");
        console.log("Saved Member:", newMember);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          startDate: new Date().toISOString().split("T")[0],
          membershipType: "",
          maxBooks: "",
        });
      } catch (err) {
        console.error("Error saving member:", err);
        alert("❌ Failed to save member. Please check console.");
      }
    }
  };

  return (
    <div className="parentmember">
      <TopBar/>
      <div className="member-form-container">
      <h2>Create New Member</h2>
      <form className="member-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Member ID</label>
          <input type="text" value={memberId} disabled />
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
            placeholder="Enter member name"
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

        <div className="form-group">
          <label>
            Phone Number <span className="required">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            maxLength="10"
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Membership Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}
        </div>

        <div className="form-group">
          <label>Membership Type</label>
          <select
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Elite">Elite</option>
          </select>
          {errors.membershipType && (
            <span className="error">{errors.membershipType}</span>
          )}
        </div>

        <div className="form-group">
          <label>Max Books Allowed</label>
          <input type="number" value={formData.maxBooks} disabled />
        </div>

        <button type="submit" className="submit-btn">
          Create Member
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateMember;
