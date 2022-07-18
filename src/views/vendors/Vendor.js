import React from "react";

// import {ToastContainer} from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../BasicTable.css"
// import Modal from "./Modal";
import { useGlobalContext } from "./context";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import image from "../../assets/img/mike.jpg"

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import Modal from "./Modal";

// reactstrap components

function VendorTable() {
  const { data, handleUpdate, handleDelete,isModalOpen, handleDisable } =
    useGlobalContext();
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4 style={{ display: "inline" }}>Vendors Table</h4>

                  {/* <Button style={{display:"inline",float:"right",margin:"0 2rem"}}>Add Vendor</Button> */}
                  {isModalOpen && <Modal/>}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Vendor Name</th>
                      <th>Address</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td style={{padding:"0px",paddingLeft:"7px"}}><img style={{width:"35px", height:"35px",borderRadius:"50%"}} src={image} alt={image}/> </td>
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                          <td>{item.details}</td>
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
                              <div
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

export default VendorTable;
