import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
import axios from "axios";

const productsApi = "http://localhost:3001/users";

const initialState = {
  product_name: "",
  brand: "",
  color: "",
  quantity: "",
  isDis:false
};
const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [state, setState] = useState(initialState);
    const [editMood, setEditMood] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter , setFilter] = useState("");
    const {product_name, brand, color, quantity  } = state; 

    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ product_name: "", brand: "", color: "", quantity: "",isDis:false });
  };

  const loadUsers = async () => {
    const response = await axios.get(productsApi);
    setData(response.data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async(id) => {
    
    // console.log(id ,"this is Delete action ");

    if (window.confirm("Are you sure, you want to delete it?")) {
      axios.delete(`${productsApi}/${id}`);
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
    axios.put(`${productsApi}/${id}`, {...singleUser} );
    // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
    setState({ product_name: "", brand: "", color: "", quantity: "",isDis:false });
    setUserId(null);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product_name || !brand || !color || !quantity) {
      // toast.error("Please fill all input fields");
    } else {
      if (!editMood) {
        axios.post(productsApi, state);
        // toast.success("Added Successfully");
        setState({ product_name: "", brand: "", color: "", quantity: "",isDis:false });
        setTimeout(() => {
          loadUsers();
        }, 500);
        closeModal();
      } else {
        axios.put(`${productsApi}/${userId} `, state);
        // console.log(`${api}/${userId} ` , state);
        // toast.success("Updated Successfully");
        setState({ product_name: "", brand: "", color: "", quantity: "",isDis:false });
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
    <ProductContext.Provider
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
        productsApi,
        isModalOpen,
        data,
        state,
        setState,
        editMood,
        setEditMood,
        initialState,
        filter,
        setFilter,
        handleSearchChange
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

//Custom Hook
export const useGlobalContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider };
