import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "40px",
      }}
    >
      {pageNumbers.map((number) => (
        <div key={number} style={{ marginRight: "10px" }}>
          <button onClick={() => paginate(number)}>{number}</button>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
