import React from "react";
// import {ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import image from "../../assets/img/mike.jpg"
import { useGlobalContext } from "./context";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal";

function Customers() {
  const { data, handleUpdate, handleDelete, handleDisable, isModalOpen } =
    useGlobalContext();
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader navbar>
                <CardTitle>
                  <h4 style={{ display: "inline" }}>Customers Table</h4>

                  {/* <Button style={{display:"inline",float:"right",margin:"0 2rem"}} onClick={openModal}>Add Customer</Button> */}
                  {isModalOpen && <Modal />}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  {/* <ToastContainer/> */}
                  <thead className="text-primary">
                    <tr>
                      <th>No.</th>
                      <th>Image</th>
                      <th>Customer Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Country</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* =================Custom Work============== */}
                    {data && data.length === 0 ? (
                      <h3 className="text-center fluid">No data found</h3>
                    ) : (
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td style={{width:"10px", height:"10px",padding:"0px auto",borderRadius:"50%"}}><img style={{maxWidth:"56%"}} src={item.image} alt={image}/> </td>
                          {/* <td>{item.image}</td> */}
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.date_of_birth}</td>
                          <td>{item.country}</td>
                          <td className="text-right">
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
                      ))
                    )}
                    {/* =================Custom Work============== */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Table on Plain Background</CardTitle>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>City</th>
                      <th className="text-right">Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                      <td className="text-right">$38,735</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                      <td className="text-right">$78,615</td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Gloucester</td>
                      <td className="text-right">$98,615</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default Customers;
