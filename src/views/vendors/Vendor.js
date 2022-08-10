import React, { useState, useEffect } from "react";
// import Modal from "./Modal";
import { useGlobalContext } from "./context";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import image from "../../assets/img/mike.jpg";
import ReactPaginate from "react-paginate";

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
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";

// reactstrap components

function VendorTable() {
  const {
    data,
    handleUpdate,
    handleDelete,
    isModalOpen,
    handleDisable,
    filter,
    handleSearchChange,
  } = useGlobalContext();
  // =================================
  // PAGINATION
  // =================================
  
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };
  // =================================

  return (
    <>
      <div className="content">
        <Row className="justify-content-end">
          <Col md="3" sm="6" xs="12">
            <form>
              <InputGroup className="no-border">
                <Input
                  placeholder="Search Name..."
                  style={{ height: "100%", zIndex: "3333" }}
                  type="text"
                  value={filter || ""}
                  onChange={handleSearchChange}
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText style={{ height: "100%", zIndex: "3333" }}>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>
                  <h4 style={{ display: "inline" }}>Vendors Table</h4>

                  {/* <Button style={{display:"inline",float:"right",margin:"0 2rem"}}>Add Vendor</Button> */}
                  {isModalOpen && <Modal />}
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
                    {data && data.length === 0 ? (
                      <tr>
                        <td>No data found</td>
                      </tr>
                    ) : (
                      //eslint-disable-next-line
                      currentItems.filter((item) => {
                          if (filter === "") {
                            return item;
                          } else if (
                            item.name
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td style={{ padding: "0px", paddingLeft: "7px" }}>
                              <img
                                style={{
                                  width: "35px",
                                  height: "35px",
                                  borderRadius: "50%",
                                }}
                                src={image}
                                alt={image}
                              />{" "}
                            </td>
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
                                    <input type="checkbox" defaultChecked />
                                  ) : (
                                    <input type="checkbox" />
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))
                    )}
                  </tbody>
                </Table>
              </CardBody>
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active-page"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default VendorTable;
