import React from "react";
// import {ToastContainer } from "react-toastify";
import { useGlobalContext} from './Context'
import "../modal.css";

function Modal() {
  const {closeModal,handleSubmit,handleChange,editMood,state} = useGlobalContext()
  const {category_name , brand , color , quantity} = state

  return (
    <div className="modalBackground">
      {/* <ToastContainer/> */}
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="title">
          <h3>Add New Category</h3>
        </div>
        <div className="body">
        
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Category Name</label>
            <input type='text' name='category_name' placeholder='Enter Category Name' value={category_name} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Brand</label>
            <input type='text' name='brand' placeholder='Enter Brand' value={brand} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Color</label>
            <input type='text' name='color' placeholder="Enter Color" value={color} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label style={{textAlign:"left"}}>Quantity</label>
            <input type='number' name='quantity' placeholder='Enter Quantity' value={quantity} onChange={handleChange}/>
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
