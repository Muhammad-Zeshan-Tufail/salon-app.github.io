import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
// import { toast } from "react-toastify";
import axios from "axios";

const vendorApi = "http://localhost:3001/vendors";

const initialState = {
  name: "",
  address: "",
  details: "",
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
    
    const { name, address, details  } = state; 


    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ name: "", address: "",details: "" });
  };

  const loadUsers = async () => {
    const response = await axios.get(vendorApi);
    setData(response.data);
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
  };

  const handleDisable = async(id,isDis) => {
    const singleUser = data.find((item) => item.id === id);
    singleUser.isDis = isDis?false : true 
    setState({...singleUser});
    axios.put(`${vendorApi}/${id}`, {...singleUser} );
    // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
    setState({ name: "",address: "",details: "",isDis:false });
    setUserId(null);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address || !details ) {
      // toast.error("Please fill all input fields");
    } else {
      if (!editMood) {
        axios.post(vendorApi, state);
        // toast.success("Added Successfully");
        setState({ name: "", address: "", details: "",isDis:false });
        setTimeout(() => {
          loadUsers();
        }, 500);
        closeModal();
      } else {
        axios.put(`${vendorApi}/${userId} `, state);
        // toast.success("Updated Successfully");
        setState({ name: "", address: "", details: "",isDis:false });
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
    <VendorContext.Provider
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
        vendorApi,
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
    </VendorContext.Provider>
  );
};

//Custom Hook
export const useGlobalContext = () => {
  return useContext(VendorContext);
};

export { VendorContext, VendorProvider };
