import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
// import { toast } from "react-toastify";

import axios from "axios";

const api = "http://localhost:3001/customers";

const initialState = {
  first_name: "",
  last_name: "",
  date_of_birth: "",
  country: "",
  isDis:false
};
const CustomerContext = createContext();

const CustomerProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [state, setState] = useState(initialState);
    const [editMood, setEditMood] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter , setFilter] = useState("");
    const {first_name, last_name, date_of_birth, country  } = state; 

    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ first_name: "", last_name: "", date_of_birth: "", country: "",isDis:false });
  };

  const loadUsers = async () => {
    const response = await axios.get(api);
    setData(response.data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async(id) => {
    
    // console.log(id ,"this is Delete action ");

    if (window.confirm("Are you sure, you want to delete it?")) {
      axios.delete(`${api}/${id}`);
      // toast.success("Deleted Successfully");
      setTimeout(() => {
        loadUsers();
      }, 500);
    }
  };

  const handleUpdate = (id) => {
    
    // console.log(id ,"this is item id");
    const singleUser = data.find((item) => item.id === id);
    console.log(singleUser);
    openModal();
    setState({ ...singleUser });
    // console.log({ ...singleUser });
    setUserId(id);
    setEditMood(true);
  };

  const handleDisable = async(id,isDis) => {
    const singleUser = data.find((item) => item.id === id);
    singleUser.isDis = isDis?false : true 
    setState({...singleUser});
    axios.put(`${api}/${id}`, {...singleUser} );
    // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
    setState({ first_name: "", last_name: "", date_of_birth: "", country: "",isDis:false });
    setUserId(null);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !date_of_birth || !country) {
      // toast.error("Please fill all input fields")
    } else {
      if (!editMood) {
        axios.post(api, state);
        // toast.success("Added Successfully");
        setState({ first_name: "", last_name: "", date_of_birth: "", country: "",isDis:false });
        setTimeout(() => {
          loadUsers();
        }, 500);
        
      
        closeModal();
      } else {
        axios.put(`${api}/${userId} `, state);
        // toast.success("Updated Successfully");
        setState({ first_name: "", last_name: "", date_of_birth: "", country: "",isDis:false });
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

  return (
    <CustomerContext.Provider
      value={{
        openModal,
        closeModal,
        setData,
        handleDelete,
        handleUpdate,
        handleDisable,
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
