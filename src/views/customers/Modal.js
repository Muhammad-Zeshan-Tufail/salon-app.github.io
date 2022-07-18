import React from "react";
// import {ToastContainer } from "react-toastify";
import { useGlobalContext } from "./context";
import "../modal.css";

function Modal() {
  const {closeModal,handleSubmit,handleChange,editMood,state} = useGlobalContext()
  const {first_name , last_name , date_of_birth , country} = state

  return (
    <div className="modalBackground">
      {/* <ToastContainer/> */}
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="title">
          <h3>Add New Customer</h3>
        </div>
        <div className="body">
        
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Customer Name</label>
            <input type='text' name='first_name' placeholder='Enter First Name' value={first_name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Last Name</label>
            <input type='text' name='last_name' placeholder='Enter Last Name' value={last_name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label style={{textAlign:"left"}}>DOB</label>
            <input type='date' name='date_of_birth' placeholder="Enter DOB" value={date_of_birth} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Country</label>
            <input type='text' name='country' placeholder='Enter Country' value={country} onChange={handleChange}/>
          </div>

        <div className="footer">
          <button onClick={closeModal } id="cancelBtn">Cancel</button>
          <div className="d-grid gap-2 mt-2">
            <button type='submit' onSubmit={handleSubmit}>{editMood?"Update":"Submit"}</button>
          </div>
        </div>
        </form>

        </div>
      </div>
    </div>
  );
}

export default Modal;
