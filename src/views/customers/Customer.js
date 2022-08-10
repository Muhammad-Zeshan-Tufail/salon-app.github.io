import React,{useState,useEffect} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
// import image from "../../assets/img/mike.jpg"
import { useGlobalContext } from "./context";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Modal from "./Modal";
import ReactPaginate from "react-paginate";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";



function Customers() {
  const { data, handleUpdate, handleDelete, isModalOpen,filter,handleSearchChange } = useGlobalContext();
   // =================================
  // PAGINATION 
  // =================================
  const [currentItems, setCurrentItems] = useState(data);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage , data]);

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
              <CardHeader >
                <CardTitle>
                  <h4 style={{ display: "inline" }}>Customers Table</h4>

                  {isModalOpen && <Modal />}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  {/* <ToastContainer/> */}
                  <thead className="text-primary">
                    <tr>
                      <th>No.</th>
                      {/* <th>Image</th> */}
                      <th>Customer Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  
                  <tbody>
                    {/* =================Custom Work============== */}
                    {data && data.length === 0 ? (
                      <tr>
                        <td>
                          No data found
                        </td>
                      </tr>
                    ):
                      // eslint-disable-next-line
                      currentItems[0].filter((item) => {
                          if (filter === "") {
                            return item;
                          } else if (
                            item.first_name
                              .toLowerCase()
                              .includes(filter.toLowerCase())
                          ) {
                            return item;
                          }
                        }).map((item, index) =>(
                        <tr key={index}>
                          <td>{item.id}</td>
                          {/* <td style={{padding:"0px",paddingLeft:"7px"}} ><img style={{width:"35px", height:"35px",borderRadius:"50%"}}  src={item.image} alt=""/> </td> */}
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.email}</td>
                          <td>{item.phone_no}</td>
                          <td className="text-right">
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
                                onChange={() =>
                                  handleDisable(item.id, item.isDis)
                                }
                                style={{ margin: "0 20px" }}
                              >
                                {item.isDis ? (
                                  <input type="checkbox" defaultChecked  />
                                ) : (
                                  <input type="checkbox" />
                                )}
                              </div> */}
                            </div>
                          </td>
                        </tr>
                      ))
                    }
                    {/* =================Custom Work============== */}
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

export default Customers;
