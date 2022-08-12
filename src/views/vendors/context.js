import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
import axios from "axios";

const vendorApi = "http://51.68.167.212:3003/admin/get-customer";


const initialState = {
  first_name: "",
  email: "",
  last_name: "",
  isDis:false
};
const VendorContext = createContext();

const VendorProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [state, setState] = useState(initialState);
    const [editMood, setEditMood] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter , setFilter] = useState("");
    
    const { first_name, email, last_name  } = state; 

    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ first_name: "", email: "",last_name: "" });
  };

  const loadUsers = async () => {
    const response = await axios.get(vendorApi);
    setData(response.data[0]);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async(id) => {

    if (window.confirm("Are you sure, you want to delete it?")) {
      axios.delete(`${vendorApi}/${id}`);
    //   toast.success("Deleted Successfully");
      setTimeout(() => {
        loadUsers();
      }, 500);
    }
  };

  const handleUpdate = (id) => {
    const singleUser = data.find((item) => item.id === id);
    openModal();
    setState({ ...singleUser });
    setUserId(id);
    setEditMood(true);
  }

  // const handleDisable = async(id,isDis) => {
  //   const singleUser = data.find((item) => item.id === id);
  //   singleUser.isDis = isDis?false : true 
  //   setState({...singleUser});
  //   axios.put(`${vendorApi}/${id}`, {...singleUser} );
  //   // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
  //   setState({ first_name: "",email: "",last_name: "",isDis:false });
  //   setUserId(null);
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !email || !last_name ) {
      //Show Error Toast
    } else {
      if (!editMood) {
        axios.post(vendorApi, state);
        setState({ first_name: "", email: "", last_name: "",isDis:false });
        setTimeout(() => {
          loadUsers();
        }, 500);
        closeModal();
      } else {
        axios.put(`${vendorApi}/${userId} `, state);
        setState({ first_name: "", email: "", last_name: "",isDis:false });
        setTimeout(() => {
          loadUsers();
        }, 500);
        setUserId(null);
        setEditMood(false);
        closeModal();
      }
    }
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    // setFilter(e.target.value)
    setState({ ...state, [name]: value });
  };
  const handleSearchChange = (e) => {
    let { name, value } = e.target;
    setFilter(e.target.value)
    setState({ ...state, [name]: value });
  };

  return (
    <VendorContext.Provider
      value={{
        openModal,
        closeModal,
        handleDelete,
        handleUpdate,
        // handleDisable,
        loadUsers,
        handleSubmit,
        handleChange,
        vendorApi,
        isModalOpen,
        data,
        state,
        setState,
        editMood,
        setEditMood,
        initialState,
        filter,
        setData,
        setFilter,
        handleSearchChange
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

//Custom Hook
export const useGlobalContext = () => {
  return useContext(VendorContext);
};

export { VendorContext, VendorProvider };
