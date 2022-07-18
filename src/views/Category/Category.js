import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
} from "reactstrap";

// import {ToastContainer} from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
import { useGlobalContext } from "./Context";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal";

function Category() {
  const {
    openModal,
    isModalOpen,
    data,
    handleUpdate,
    handleDelete,
    handleDisable,
  } = useGlobalContext();

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4 style={{ display: "inline" }}>Category management Table</h4>
                  <Button
                    style={{
                      display: "inline",
                      float: "right",
                      margin: "0 2rem",
                    }}
                    onClick={openModal}
                  >
                    Add Category
                  </Button>
                </CardTitle>
                {isModalOpen && <Modal />}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>No.</th>
                      <th>Category Name</th>
                      <th>Brand</th>
                      <th>Color</th>
                      <th>Quantity</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.category_name}</td>
                          <td>{item.brand}</td>
                          <td>{item.color}</td>
                          <td>{item.quantity}</td>
                          <td>
                            <div className="btn-group">
                              <button
                                style={{ margin: "0 10px", border: "none" }}
                                disabled={item.isDis ? true : false}
                                onClick={() => handleUpdate(item.id)}
                              >
                                <FiEdit />
                              </button>
                              <button
                                style={{ margin: "0 10px", border: "none" }}
                                disabled={item.isDis ? true : false}
                                onClick={() => handleDelete(item.id)}
                              >
                                <MdDelete />
                              </button>
                              {/* <div
                                onClick={() =>
                                  handleDisable(item.id, item.isDis)
                                }
                                style={{ margin: "0 20px" }}
                              >
                                {item.isDis ? (
                                  <input type="checkbox" checked />
                                ) : (
                                  <input type="checkbox" />
                                )}
                              </div> */}
                              <div className="form-check form-switch" onClick={()=>handleDisable(item.id , item.isDis)} style={{margin:"0 10px"}}>
                          {item.isDis?<input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>:
                          <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked " defaultChecked/>}
                        </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Category;
