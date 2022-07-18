import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
// import { toast } from "react-toastify";
import axios from "axios";

const categoryApi = "http://localhost:3001/category";

const initialState = {
  category_name: "",
  brand: "",
  color: "",
  quantity: "",
  isDis:false
};
const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [state, setState] = useState(initialState);
    const [editMood, setEditMood] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter , setFilter] = useState("");
    const {category_name, brand, color, quantity  } = state; 

    const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ category_name: "", brand: "", color: "", quantity: "",isDis:false });
  };

  const loadUsers = async () => {
    const response = await axios.get(categoryApi);
    setData(response.data);
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async(id) => {
    
    // console.log(id ,"this is Delete action ");

    if (window.confirm("Are you sure, you want to delete it?")) {
      axios.delete(`${categoryApi}/${id}`);
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
    axios.put(`${categoryApi}/${id}`, {...singleUser} );
    // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
    setState({ category_name: "", brand: "", color: "", quantity: "",isDis:false });
    setUserId(null);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category_name || !brand || !color || !quantity) {
      // toast.error("Please fill all input fields");
    } else {
      if (!editMood) {
        axios.post(categoryApi, state);
        // toast.success("Added Successfully");
        setState({ category_name: "", brand: "", color: "", quantity: "",isDis:false });
        setTimeout(() => {
          loadUsers();
        }, 500);
        closeModal();
      } else {
        axios.put(`${categoryApi}/${userId} `, state);
        // console.log(`${api}/${userId} ` , state);
        // toast.success("Updated Successfully");
        setState({ category_name: "", brand: "", color: "", quantity: "",isDis:false });
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
    <CategoryContext.Provider
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
        categoryApi,
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
    </CategoryContext.Provider>
  );
};

//Custom Hook
export const useGlobalContext = () => {
  return useContext(CategoryContext);
};

export { CategoryContext, CategoryProvider };
