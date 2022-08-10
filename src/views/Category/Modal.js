import React from "react";
import { useGlobalContext } from "./Context";
import "../modal.css";
import { Row, Col } from "react-bootstrap";

function Modal() {
  const {
    serviceId,
    subservicename,
    updateInputValue,
    closeModal,
    handleChange,
    handleSubmit,
    editMood,
    data,
  } = useGlobalContext();
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <Row style={{ alignItems: "baseline" }}>
          <Col md={10} style={{ textAlign: "right" }}>
            <div className="title">
              <h6>Add New Category</h6>
            </div>
          </Col>
          <Col md={2}>
            <div className="titleCloseBtn">
              <button onClick={closeModal} className="button">
                X
              </button>
            </div>
          </Col>
        </Row>
        <div className="add-btn">
          <button type="button">Add Category</button>
        </div>
        <div className="body">
          {/* <DropDown/> */}
          {/* ===========DROP-DOWN============*/}
          <form className="form" onSubmit={handleSubmit}>
            <Row style={{ alignItems: "baseline" }}>
              <Col md={6}>
                <div style={{ display: "flex" }}>
                  <label style={{ fontSize: "14px", display: "block" }}>
                    Category:
                  </label>
                  <select
                    onChange={handleChange}
                    style={{ width: "110px", fontSize: "14px", border: "none" }}
                    id="category"
                    value={serviceId}
                    required
                  >
                    <option>--Select--</option>
                    {data.map((item, id) => (
                      <option key={id} value={item.id}>
                        {item.service_name}
                      </option>
                    ))}
                  </select>
                </div>
              </Col>
              <Col md={6}>
                <div className="form-group">
                  <input
                    type="text"
                    name="sub_service_name"
                    placeholder="Add Sub-Category"
                    value={subservicename}
                    onChange={(evt) => updateInputValue(evt)}
                  />
                </div>
              </Col>
            </Row>

            <div className="form-group">
              <input type="file" name="upload image" />
            </div>

            <div className="footer">
              <button onClick={closeModal} id="cancelBtn">
                Cancel
              </button>
              {/* <div className="d-grid gap-2 mt-2"> */}
              <button type="submit" onSubmit={handleSubmit}>
                {editMood ? "Update" : "Submit"}
              </button>
              {/* </div> */}
            </div>
          </form>

          {/* ======================== */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
