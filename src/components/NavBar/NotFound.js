import React from "react";
import img404 from "../../assets/404.png";
import "./NotFound.css";

const NotFound = ({ search }) => {
  return (
    <div className="no-found">
      "{search}"의 검색 결과를 찾을 수 없습니다.
      <img src={img404} alt="notfound" />
    </div>
  );
};

export default NotFound;
