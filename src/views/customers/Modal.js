import React from "react";
// import {ToastContainer } from "react-toastify";
import { useGlobalContext } from "./context";
import "../modal.css";

function Modal() {
  const {closeModal,handleSubmit,handleChange,editMood,state} = useGlobalContext()
  const {first_name , last_name , email,phone_no} = state

  return (
    <div className="modalBackground">
      {/* <ToastContainer/> */}
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="title">
          <h5>Add New Customer</h5>
        </div>
        <div className="body">
        
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type='text' name='first_name' placeholder='Enter First Name' value={first_name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type='text' name='last_name' placeholder='Enter Last Name' value={last_name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type='email' name='email' placeholder="Enter Email" value={email} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <input type='tel' name='phone_no' placeholder='Enter Phone Number' value={phone_no} onChange={handleChange}/>
          </div>

        <div className="footer">
          <button onClick={closeModal } id="cancelBtn">Cancel</button>
            <button type='submit' onSubmit={handleSubmit}>{editMood?"Update":"Submit"}</button>
        </div>
        </form>

        </div>
      </div>
    </div>
  );
}

export default Modal;
