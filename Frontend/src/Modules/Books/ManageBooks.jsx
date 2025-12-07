// managebooks without search option and pdf downloadable

// import React, { useState } from "react";

// const CreateBook = () => {
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
//   const [bookId] = useState("BOOK-" + Math.floor(Math.random() * 100000));

//   const currentYear = new Date().getFullYear();

//   const genres = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography"];

//   const validate = () => {
//     let newErrors = {};

//     if (!formData.title.trim()) newErrors.title = "Title is required.";
//     if (!formData.author.trim()) newErrors.author = "Author is required.";
//     if (!formData.genre) newErrors.genre = "Genre must be selected.";

//     if (
//       !formData.publicationYear ||
//       formData.publicationYear < 1900 ||
//       formData.publicationYear > currentYear
//     )
//       newErrors.publicationYear = `Enter a valid year between 1900 and ${currentYear}.`;

//     if (formData.availableCopies === "" || formData.availableCopies < 0)
//       newErrors.availableCopies = "Available copies must be 0 or greater.";

//     if (!formData.isbn.trim()) newErrors.isbn = "ISBN is required.";

//     if (
//       formData.rating &&
//       (formData.rating < 1 || formData.rating > 5)
//     )
//       newErrors.rating = "Rating must be between 1 and 5.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       alert("Book Created Successfully ✅");
//       console.log("Book Data:", { bookId, ...formData });
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Create Book</h2>
//       <form onSubmit={handleSubmit} style={styles.form}>
//         <div style={styles.field}>
//           <label>Book ID (Auto-generated):</label>
//           <input type="text" value={bookId} disabled />
//         </div>

//         <div style={styles.field}>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//           {errors.title && <span style={styles.error}>{errors.title}</span>}
//         </div>

//         <div style={styles.field}>
//           <label>Author:</label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//           />
//           {errors.author && <span style={styles.error}>{errors.author}</span>}
//         </div>

//         <div style={styles.field}>
//           <label>Genre:</label>
//           <select
//             name="genre"
//             value={formData.genre}
//             onChange={handleChange}
//           >
//             <option value="">Select Genre</option>
//             {genres.map((g) => (
//               <option key={g} value={g}>
//                 {g}
//               </option>
//             ))}
//           </select>
//           {errors.genre && <span style={styles.error}>{errors.genre}</span>}
//         </div>

//         <div style={styles.field}>
//           <label>Publication Year:</label>
//           <input
//             type="number"
//             name="publicationYear"
//             value={formData.publicationYear}
//             onChange={handleChange}
//           />
//           {errors.publicationYear && (
//             <span style={styles.error}>{errors.publicationYear}</span>
//           )}
//         </div>

//         <div style={styles.field}>
//           <label>Available Copies:</label>
//           <input
//             type="number"
//             name="availableCopies"
//             value={formData.availableCopies}
//             onChange={handleChange}
//           />
//           {errors.availableCopies && (
//             <span style={styles.error}>{errors.availableCopies}</span>
//           )}
//         </div>

//         <div style={styles.field}>
//           <label>ISBN Number:</label>
//           <input
//             type="text"
//             name="isbn"
//             value={formData.isbn}
//             onChange={handleChange}
//           />
//           {errors.isbn && <span style={styles.error}>{errors.isbn}</span>}
//         </div>

//         <div style={styles.field}>
//           <label>Rating (1–5):</label>
//           <input
//             type="number"
//             name="rating"
//             value={formData.rating}
//             onChange={handleChange}
//           />
//           {errors.rating && <span style={styles.error}>{errors.rating}</span>}
//         </div>

//         <button type="submit" style={styles.button}>
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: "500px",
//     margin: "20px auto",
//     backgroundColor: "#f3f4f6",
//     padding: "20px",
//     borderRadius: "10px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   field: {
//     marginBottom: "15px",
//   },
//   error: {
//     color: "red",
//     fontSize: "12px",
//   },
//   button: {
//     backgroundColor: "#1f2937",
//     color: "white",
//     border: "none",
//     padding: "10px",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default CreateBook;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Books/ManageBooks.css"


// const ManageBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBooks, setSelectedBooks] = useState([]);

//   // ✅ Fetch books from backend
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/books");
//       setBooks(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Handle checkbox selection
//   const handleCheckboxChange = (bookId) => {
//     setSelectedBooks((prev) =>
//       prev.includes(bookId)
//         ? prev.filter((id) => id !== bookId)
//         : [...prev, bookId]
//     );
//   };

//   // ✅ Delete selected books
//   const handleDelete = async () => {
//     if (selectedBooks.length === 0) {
//       alert("Please select at least one book to delete!");
//       return;
//     }
//     if (window.confirm("Are you sure you want to delete the selected books?")) {
//       try {
//         await axios.delete("http://localhost:5000/api/books", {
//           data: { ids: selectedBooks },
//         });
//         fetchBooks();
//         setSelectedBooks([]);
//         alert("Selected books deleted successfully!");
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   // ✅ Export selected books to Excel
//   const exportToExcel = () => {
//     if (selectedBooks.length === 0) {
//       alert("Please select at least one book to export!");
//       return;
//     }
//     const selectedData = books.filter((book) =>
//       selectedBooks.includes(book._id)
//     );
//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
//     XLSX.writeFile(workbook, "Selected_Books.xlsx");
//   };

//   // ✅ Export selected books to PDF
//   const exportToPDF = () => {
//     if (selectedBooks.length === 0) {
//       alert("Please select at least one book to export!");
//       return;
//     }
//     const doc = new jsPDF();
//     const selectedData = books.filter((book) =>
//       selectedBooks.includes(book._id)
//     );
//     const tableData = selectedData.map((b) => [
//       b.bookId,
//       b.title,
//       b.author,
//       b.genre,
//       b.publicationYear,
//       b.availableCopies,
//       b.isbn,
//       b.rating,
//     ]);
//     doc.text("Library Books Report", 14, 15);
//     doc.autoTable({
//       head: [["Book ID", "Title", "Author", "Genre", "Year", "Copies", "ISBN", "Rating"]],
//       body: tableData,
//       startY: 20,
//     });
//     doc.save("Selected_Books.pdf");
//   };

//   return (
//     <div className="container mt-5 parent d-block bg-danger">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">📚 Manage Books</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrashAlt /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={exportToExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={exportToPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   onChange={(e) =>
//                     setSelectedBooks(
//                       e.target.checked ? books.map((b) => b._id) : []
//                     )
//                   }
//                   checked={selectedBooks.length === books.length && books.length > 0}
//                 />
//               </th>
//               <th>Book ID</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Genre</th>
//               <th>Year</th>
//               <th>Copies</th>
//               <th>ISBN</th>
//               <th>Rating</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book._id}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedBooks.includes(book._id)}
//                     onChange={() => handleCheckboxChange(book._id)}
//                   />
//                 </td>
//                 <td>{book.bookId}</td>
//                 <td>{book.title}</td>
//                 <td>{book.author}</td>
//                 <td>{book.genre || "-"}</td>
//                 <td>{book.publicationYear || "-"}</td>
//                 <td>{book.availableCopies}</td>
//                 <td>{book.isbn}</td>
//                 <td>{book.rating}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageBooks;

//correct code 

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import * as XLSX from "xlsx";
// import "../Books/ManageBooks.css";

// const ManageBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [selectedBooks, setSelectedBooks] = useState([]);

//   // ✅ Fetch books from backend
//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/books");
//       setBooks(res.data);
//     } catch (err) {
//       console.error("Error fetching books:", err);
//     }
//   };

//   // ✅ Handle checkbox selection
//   const handleCheckboxChange = (bookId) => {
//     setSelectedBooks((prev) =>
//       prev.includes(bookId)
//         ? prev.filter((id) => id !== bookId)
//         : [...prev, bookId]
//     );
//   };

//   // ✅ Delete selected books
//   const handleDelete = async () => {
//     if (selectedBooks.length === 0) {
//       alert("Please select at least one book to delete!");
//       return;
//     }
//     if (window.confirm("Are you sure you want to delete the selected books?")) {
//       try {
//         await axios.delete("http://localhost:5000/api/books", {
//           data: { ids: selectedBooks },
//         });
//         fetchBooks();
//         setSelectedBooks([]);
//         alert("Selected books deleted successfully!");
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   // ✅ Export selected books to Excel
//   const exportToExcel = () => {
//     if (selectedBooks.length === 0) {
//       alert("Please select at least one book to export!");
//       return;
//     }
//     const selectedData = books.filter((book) =>
//       selectedBooks.includes(book._id)
//     );
//     const worksheet = XLSX.utils.json_to_sheet(selectedData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
//     XLSX.writeFile(workbook, "Selected_Books.xlsx");
//   };

//   // ✅ Export selected books to PDF
//   const exportToPDF = () => {
//     if (selectedBooks.length === 0) {
//       alert("Please select at least one book to export!");
//       return;
//     }
//     const doc = new jsPDF();
//     const selectedData = books.filter((book) =>
//       selectedBooks.includes(book._id)
//     );
//     const tableData = selectedData.map((b) => [
//       b.bookId,
//       b.title,
//       b.author,
//       b.genre,
//       b.publicationYear,
//       b.availableCopies,
//       b.isbn,
//       b.rating,
//     ]);
//     doc.text("Library Books Report", 14, 15);
//     doc.autoTable({
//       head: [
//         ["Book ID", "Title", "Author", "Genre", "Year", "Copies", "ISBN", "Rating"],
//       ],
//       body: tableData,
//       startY: 20,
//     });
//     doc.save("Selected_Books.pdf");
//   };

//   return (
//     <div className=" mt-5 parent d-block bg-light p-4 rounded shadow parent">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h2 className="fw-bold text-primary">📚 Manage Books</h2>
//         <div>
//           <button className="btn btn-danger me-2" onClick={handleDelete}>
//             <FaTrashAlt /> Delete
//           </button>
//           <button className="btn btn-success me-2" onClick={exportToExcel}>
//             <FaFileExcel /> Excel
//           </button>
//           <button className="btn btn-secondary" onClick={exportToPDF}>
//             <FaFilePdf /> PDF
//           </button>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped table-bordered text-center align-middle shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>
//                 <input
//                   type="checkbox"
//                   onChange={(e) =>
//                     setSelectedBooks(
//                       e.target.checked ? books.map((b) => b._id) : []
//                     )
//                   }
//                   checked={selectedBooks.length === books.length && books.length > 0}
//                 />
//               </th>
//               <th>Book ID</th>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Genre</th>
//               <th>Year</th>
//               <th>Copies</th>
//               <th>ISBN</th>
//               <th>Rating</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.length > 0 ? (
//               books.map((book) => (
//                 <tr key={book._id}>
//                   <td>
//                     <input
//                       type="checkbox"
//                       checked={selectedBooks.includes(book._id)}
//                       onChange={() => handleCheckboxChange(book._id)}
//                     />
//                   </td>
//                   <td>{book.bookId}</td>
//                   <td>{book.title}</td>
//                   <td>{book.author}</td>
//                   <td>{book.genre || "-"}</td>
//                   <td>{book.publicationYear || "-"}</td>
//                   <td>{book.availableCopies}</td>
//                   <td>{book.isbn}</td>
//                   <td>{book.rating}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-muted">
//                   No books found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageBooks;

// managebooks with search option and pdf downloadable

import React, { useEffect, useState } from "react";
import axios from "axios";
import TopBar from '../../Topbar/TopBar'
import { FaTrashAlt, FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import "../Books/ManageBooks.css";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  const handleCheckboxChange = (bookId) => {
    setSelectedBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleDelete = async () => {
    if (selectedBooks.length === 0) {
      alert("Please select at least one book to delete!");
      return;
    }
    if (window.confirm("Are you sure you want to delete the selected books?")) {
      try {
        await axios.delete("http://localhost:5000/api/books", {
          data: { ids: selectedBooks },
        });
        fetchBooks();
        setSelectedBooks([]);
        alert("Selected books deleted successfully!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const exportToExcel = () => {
    if (selectedBooks.length === 0) {
      alert("Please select at least one book to export!");
      return;
    }
    const selectedData = books.filter((book) => selectedBooks.includes(book._id));
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Books");
    XLSX.writeFile(workbook, "Selected_Books.xlsx");
  };

  const exportToPDF = () => {
    if (selectedBooks.length === 0) {
      alert("Please select at least one book to export!");
      return;
    }
    const doc = new jsPDF();
    const selectedData = books.filter((book) => selectedBooks.includes(book._id));
    const tableData = selectedData.map((b) => [
      b.bookId,
      b.title,
      b.author,
      b.genre || "-",
      b.publicationYear || "-",
      b.availableCopies,
      b.isbn,
      b.rating,
    ]);

    doc.text("Library Books Report", 14, 15);
    autoTable(doc, {
      head: [["Book ID", "Title", "Author", "Genre", "Year", "Copies", "ISBN", "Rating"]],
      body: tableData,
      startY: 20,
    });
    doc.save("Selected_Books.pdf");
  };

  // 🔍 Search filter
  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.bookId.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="managebooks">
      <TopBar/>
        <div className="mt-5 parent d-block bg-light p-4 rounded shadow parent">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">📚 Manage Books</h2>
        <div>
          <button className="btn btn-danger me-2" onClick={handleDelete}>
            <FaTrashAlt /> Delete
          </button>
          <button className="btn btn-success me-2" onClick={exportToExcel}>
            <FaFileExcel /> Excel
          </button>
          <button className="btn btn-secondary" onClick={exportToPDF}>
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Title, Author, or Book ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center align-middle shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedBooks(
                      e.target.checked ? filteredBooks.map((b) => b._id) : []
                    )
                  }
                  checked={
                    selectedBooks.length === filteredBooks.length &&
                    filteredBooks.length > 0
                  }
                />
              </th>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Copies</th>
              <th>ISBN</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(book._id)}
                      onChange={() => handleCheckboxChange(book._id)}
                    />
                  </td>
                  <td>{book.bookId}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre || "-"}</td>
                  <td>{book.publicationYear || "-"}</td>
                  <td>{book.availableCopies}</td>
                  <td>{book.isbn}</td>
                  <td>{book.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-muted">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary ms-2"
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default ManageBooks;
