// import React, { useState } from "react";
// import "../Books/CreateBooks.css";

// const CreateBook = () => {
//   const [bookId] = useState("BOOK-" + Math.floor(Math.random() * 100000));
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     genre: "",
//     publicationYear: "",
//     availableCopies: "",
//     isbn: "",
//     rating: "",
//   });

//   const [errors, setErrors] = useState({});
//   const currentYear = new Date().getFullYear();
//   const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography"];

//   // Validation function
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = "Title is required.";
//     if (!formData.author.trim()) newErrors.author = "Author is required.";
//     if (!formData.genre) newErrors.genre = "Genre must be selected.";
//     if (!formData.publicationYear || formData.publicationYear < 1900 || formData.publicationYear > currentYear) {
//       newErrors.publicationYear = `Enter a valid year between 1900 and ${currentYear}.`;
//     }
//     if (formData.availableCopies === "" || formData.availableCopies < 0) {
//       newErrors.availableCopies = "Available copies must be 0 or greater.";
//     }
//     if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required.";
//     if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
//       newErrors.rating = "Rating must be between 1 and 5.";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Restrict publication year to valid numbers only
//     if (name === "publicationYear") {
//       if (value !== "" && (value < 1900 || value > currentYear)) return;
//     }

//     // Restrict rating to max 5
//     if (name === "rating") {
//       if (value !== "" && value > 5) return;
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       alert("Book Created Successfully ✅");
//       console.log("Book Data:", { bookId, ...formData });
//       // Reset form
//       setFormData({
//         title: "",
//         author: "",
//         genre: "",
//         publicationYear: "",
//         availableCopies: "",
//         isbn: "",
//         rating: "",
//       });
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Create New Book</h2>
//       <form className="book-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Book ID (Auto-generated)</label>
//           <input type="text" value={bookId} disabled />
//         </div>

//         <div className="form-group">
//           <label>Title <span className="required">*</span></label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//           {errors.title && <span className="error">{errors.title}</span>}
//         </div>

//         <div className="form-group">
//           <label>Author <span className="required">*</span></label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//           />
//           {errors.author && <span className="error">{errors.author}</span>}
//         </div>

//         <div className="form-group">
//           <label>Genre</label>
//           <select name="genre" value={formData.genre} onChange={handleChange}>
//             <option value="">Select Genre</option>
//             {genres.map((g) => (
//               <option key={g} value={g}>
//                 {g}
//               </option>
//             ))}
//           </select>
//           {errors.genre && <span className="error">{errors.genre}</span>}
//         </div>

//         <div className="form-group">
//           <label>Publication Year</label>
//           <input
//             type="number"
//             name="publicationYear"
//             placeholder={`1900 - ${currentYear}`}
//             value={formData.publicationYear}
//             onChange={handleChange}
//           />
//           {errors.publicationYear && <span className="error">{errors.publicationYear}</span>}
//         </div>

//         <div className="form-group">
//           <label>Available Copies</label>
//           <input
//             type="number"
//             name="availableCopies"
//             min="0"
//             value={formData.availableCopies}
//             onChange={handleChange}
//           />
//           {errors.availableCopies && <span className="error">{errors.availableCopies}</span>}
//         </div>

//         <div className="form-group">
//           <label>ISBN Number</label>
//           <input
//             type="text"
//             name="isbn"
//             value={formData.isbn}
//             onChange={handleChange}
//           />
//           {errors.isbn && <span className="error">{errors.isbn}</span>}
//         </div>

//         <div className="form-group">
//           <label>Rating (1-5)</label>
//           <input
//             type="number"
//             name="rating"
//             min="1"
//             max="5"
//             value={formData.rating}
//             onChange={handleChange}
//           />
//           {errors.rating && <span className="error">{errors.rating}</span>}
//         </div>

//         <button type="submit" className="submit-btn">Create Book</button>
//       </form>
//     </div>
//   );
// };

// export default CreateBook;

import React, { useState } from "react";
import "../Books/CreateBooks.css";
import axios from "axios";
import TopBar from '../../Topbar/TopBar'


const CreateBook = () => {
  const [bookId] = useState("BOOK-" + Math.floor(Math.random() * 100000));
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationYear: "",
    availableCopies: "",
    isbn: "",
    rating: "",
  });

  const [errors, setErrors] = useState({});
  const currentYear = new Date().getFullYear();
  const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography"];

  // Validation function
  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.author.trim()) newErrors.author = "Author is required.";
    if (!formData.genre) newErrors.genre = "Genre must be selected.";
    if (
      !formData.publicationYear ||
      formData.publicationYear < 1900 ||
      formData.publicationYear > currentYear
    ) {
      newErrors.publicationYear = `Enter a valid year between 1900 and ${currentYear}.`;
    }
    if (formData.availableCopies === "" || formData.availableCopies < 0) {
      newErrors.availableCopies = "Available copies must be 0 or greater.";
    }
    if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required.";
    if (formData.rating && (formData.rating < 1 || formData.rating > 5)) {
      newErrors.rating = "Rating must be between 1 and 5.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict rating max 5
    if (name === "rating" && value > 5) return;

    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       alert("Book Created Successfully ✅");
//       console.log("Book Data:", { bookId, ...formData });
//       setFormData({
//         title: "",
//         author: "",
//         genre: "",
//         publicationYear: "",
//         availableCopies: "",
//         isbn: "",
//         rating: "",
//       });
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    try {
      const response = await axios.post("http://localhost:5000/api/books", {
        bookId,
        ...formData,
      });
      alert("Book Created Successfully ✅");
      console.log("Saved Book:", response.data.book);

      // Reset form
      setFormData({
        title: "",
        author: "",
        genre: "",
        publicationYear: "",
        availableCopies: "",
        isbn: "",
        rating: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error creating book: " + error.response?.data?.error || error.message);
    }
  }
};

  return (
    <div className="parentcontainer">
        <TopBar/>
      <div className="form-container">
      <h2 className="fw-bold text-primary">📚 Create New Book</h2>
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Book ID</label>
          <input type="text" value={bookId} disabled />
        </div>

        <div className="form-group">
          <label>Title <span className="required">*</span></label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Author <span className="required">*</span></label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label>Genre</label>
          <select name="genre" value={formData.genre} onChange={handleChange}>
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.genre && <span className="error">{errors.genre}</span>}
        </div>

        <div className="form-group">
          <label>Publication Year</label>
          <input
            type="number"
            name="publicationYear"
            placeholder={`1900 - ${currentYear}`}
            value={formData.publicationYear}
            onChange={handleChange}
          />
          {errors.publicationYear && <span className="error">{errors.publicationYear}</span>}
        </div>

        <div className="form-group">
          <label>Available Copies</label>
          <input
            type="number"
            name="availableCopies"
            min="0"
            value={formData.availableCopies}
            onChange={handleChange}
            placeholder="0"
          />
          {errors.availableCopies && <span className="error">{errors.availableCopies}</span>}
        </div>

        <div className="form-group">
          <label>ISBN Number</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Enter ISBN number"
          />
          {errors.isbn && <span className="error">{errors.isbn}</span>}
        </div>

        <div className="form-group">
          <label>Rating (1-5)</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter rating"
          />
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        <button type="submit" className="submit-btn">Create Book</button>
      </form>
    </div>
    </div>
    
  );
};

export default CreateBook;

