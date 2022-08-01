import React, { useState, useEffect } from "react";
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
import { useGlobalContext } from "./Context";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";
import ReactPaginate from "react-paginate";

function Category() {
  const {
    openModal,
    isModalOpen,
    data,
    handleUpdate,
    handleDelete,
    // handleDisable,
    filter,
    handleSearchChange
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
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
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
                  <h4 style={{ display: "inline" }}>
                    Category management Table
                  </h4>
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
                      <th>Image</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                     { data && data.length === 0 ? (
                      <tr>
                        <td>
                          No data found
                        </td>
                      </tr>
                    ):
                      currentItems
                      // eslint-disable-next-line
                        .filter((item) => {
                          if (filter === "") {
                            return item;
                          } else if (
                            item.category_name
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.service_name}</td>
                            <td>{item.image_url}</td>
                            <td>
                              <div className="btn-group">
                                <button
                                  style={{ margin: "0 10px", border: "none" }}
                                  // disabled={item.isDis ? true : false}
                                  onClick={() => handleUpdate(item.id)}
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  style={{ margin: "0 10px", border: "none" }}
                                  // disabled={item.isDis ? true : false}
                                  onClick={() => handleDelete(item.id)}
                                >
                                  <MdDelete />
                                </button>
                                {/* <div
                                  className="form-check form-switch"
                                  onClick={() =>
                                    handleDisable(item.id, item.isDis)
                                  }
                                  style={{ margin: "0 10px" }}
                                >
                                  {item.isDis ? (
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexSwitchCheckDefault"
                                    />
                                  ) : (
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexSwitchCheckChecked "
                                      defaultChecked
                                    />
                                  )}
                                </div> */}
                              </div>
                            </td>
                          </tr>
                        ))}
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

export default Category;
