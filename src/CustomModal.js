
import React from "react";
import './CustomModal.css';
import PostModal from "./PostModal";

const CustomModal = ({ username, setCustomIsOpen }) => {
  return (
    <div className="cM__container"> 
      <div className="cM__darkBg" onClick={(e)=> {setCustomIsOpen()}}  ></div>
      <div className="cM__position">
        <PostModal username={username} />
      </div>
    </div>
  );
};

export default CustomModal;