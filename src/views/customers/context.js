import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";

import axios from "axios";
const api = "http://51.68.167.212:3003/admin/get-customer";
const UpdateApi = "http://51.68.167.212:3003/admin/update-customer"
const DeleteApi = "http://51.68.167.212:3003/admin/delete-customer"
// const api = "http://localhost:3001/customers";

const initialState = {
  first_name: "",
  last_name: "",
  email:"",
  phone:""
  // isDis:false
};
const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [state, setState] = useState(initialState);
    const [editMood, setEditMood] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter , setFilter] = useState("");
    const {first_name, last_name, email, phone_no } = state;



    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ first_name: "", last_name: "", email:"", phone_no:"" });
    };


  const loadUsers = async () => {
    const response = await axios.get(api);
      setData(response.data);
    };
    useEffect(() => {
    loadUsers();
  }, []);


  const handleDelete = async(id) => {
    if (window.confirm("Are you sure, you want to delete it?")) {
      axios.delete(`${DeleteApi}/${id}`);
      // toast.success("Deleted Successfully");
      setTimeout(() => {
        loadUsers();
      }, 500);
    }
  };

  const handleUpdate = (id) => {
    const singleUser = data[0].find((item) => item.id === id);
      openModal();
      setState({ ...singleUser });
      setUserId(id);
      setEditMood(true);
  };

  // const handleDisable = async(id,isDis) => {
  //   const singleUser = data.find((item) => item.id === id);
  //   singleUser.isDis = isDis?false : true 
  //   setState({...singleUser});
  //   axios.put(`${api}/${id}`, {...singleUser} );
  //   // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
  //   setState({ first_name: "", last_name: "",email:"",phone:"" });
  //   // setState({ first_name: "", last_name: "", date_of_birth: "", country: "",isDis:false });
  //   setUserId(null);
  // }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !phone_no ) {
      // toast.error("Please fill all input fields")
    } else {
      if (!editMood) {
        axios.post(api, state);
        // toast.success("Added Successfully");
        setState({ first_name: "", last_name: "",email:"",phone_no:"" });
       setTimeout(() => {
          loadUsers();
        }, 500);
        closeModal();
      } else {
        axios.put(`${UpdateApi}/${userId} `, state);

        setState({ first_name: "", last_name: "",email:"",phone_no:"" });
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
    setState({ ...state, [name]: value });
  };
 
  const handleSearchChange = (e) => {
    let { name, value } = e.target;
    setFilter(e.target.value)
    setState({ ...state, [name]: value });
  };

  return (
    <CustomerContext.Provider
      value={{
        openModal,
        closeModal,
        setData,
        handleDelete,
        handleUpdate,
        // handleDisable,
        loadUsers,
        handleSubmit,
        handleChange,
        api,
        isModalOpen,
        data,
        state,
        setState,
        editMood,
        setEditMood,
        initialState,
        filter,
        setFilter,
        handleSearchChange,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

//Custom Hook
export const useGlobalContext = () => {
  return useContext(CustomerContext);
};

export { CustomerContext, CustomerProvider };
