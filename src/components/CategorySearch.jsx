// // CategorySearch component
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const CategorySearch = () => {
//   const [categoryQuery, setCategoryQuery] = useState("");
//   const [categoryLink, setCategoryLink] = useState(null);
//   const [categoryData, setCategoryData] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("path/to/categories.json");
//         const data = await response.json();
//         setCategoryData(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategorySearchChange = (e) => {
//     const query = e.target.value;
//     setCategoryQuery(query);

//     const foundCategory = categoryData.find(
//       (category) => category.name.toLowerCase() === query.toLowerCase()
//     );

//     if (foundCategory) {
//       setCategoryLink(`/categories/${foundCategory.id}`);
//     } else {
//       setCategoryLink(null);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search Categories"
//         value={categoryQuery}
//         onChange={handleCategorySearchChange}
//       />
//       {categoryLink && <Link to={categoryLink}>Go to {categoryQuery}</Link>}
//       {!categoryLink && categoryQuery && <p>No such category found.</p>}
//     </div>
//   );
// };

// export default CategorySearch;
