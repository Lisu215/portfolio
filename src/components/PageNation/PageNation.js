import React from "react";
import "./PageNation.css";
import Pagination from "react-js-pagination";

const PageNation = ({ page, totalPage, handlePageChange }) => {
  return (
    <Pagination
      activePage={page}
      totalItemsCount={totalPage}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};

export default PageNation;
