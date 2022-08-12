import React, { useState, useEffect, createContext } from "react";
import { useContext } from "react";
// import { toast } from "react-toastify";
import axios from "axios";

const categoryApi = "http://localhost:4000/admin/get-category";
const subCategoryApi = "http://localhost:4000/admin/add-subservice";
// const getSubCategoryApi = "http://51.68.167.212:3003/admin/get-subservices";

const initialState = {
  sub_service_name: "",
  image_url: "",
  service_id: "",
  // isDis:false
};

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [data, setData] = useState([]);
  // const [subData, setSubData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [state, setState] = useState(initialState);
  const [editMood, setEditMood] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [subservicename, setSubServiceName] = useState("");
  const [addMain, setAddMain] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { service_id } = state;
  const handleMainCat = () => {
    setAddMain(!addMain);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setState({ sub_service_name: "", subservicename: "", image_url: "" });
  };

  const loadCategories = async () => {
    const response = await axios.get(categoryApi);
    setData(response.data);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const fileSelectedHandler = (event) => {
    let file = event.target.files[0].name;
    setSelectedFile(event.target.files[0]);
    console.log(file);
    console.log(selectedFile);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure, you want to delete it?")) {
      axios.delete(`${categoryApi}/${id}`);
      //   toast.success("Deleted Successfully");
      setTimeout(() => {
        loadCategories();
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

  // const handleDisable = async(id,isDis) => {
  //   const singleUser = data.find((item) => item.id === id);
  //   singleUser.isDis = isDis?false : true
  //   setState({...singleUser});
  //   axios.put(`${categoryApi}/${id}`, {...singleUser} );
  //   // toast.success(isDis?"Enabled Successfully":"Disabled Successfully");
  //   setState({ category_name: "", brand: "", color: "", quantity: "",isDis:false });
  //   setUserId(null);
  // }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // console.log("clicked");
    if (!subservicename) {
      return <h2>No item to add</h2>;

      // toast.error("Please fill all input fields");
    } else {
      // console.log("in else");
      if (!addMain && serviceId === "") {
        // console.log("Please select Main Category");
        window.alert("Please Select Main Category first");
      } else if (!editMood) {
        // console.log("in inner else");

        axios.post(subCategoryApi, {
          service_id: serviceId,
          sub_service_name: subservicename,
          image: selectedFile,
        });
        // toast.success("Added Successfully");
        setSubServiceName({ sub_service_name: "" });
        setState({ sub_service_name: "", service_id });
        setTimeout(() => {
          loadCategories();
        }, 500);
        closeModal();
      } else {
        axios.put(`${subCategoryApi}/${userId} `, state);
        // console.log(`${api}/${userId} ` , state);
        // toast.success("Updated Successfully");
        setState({ sub_service_name: "", image_url: "" });
        setTimeout(() => {
          loadCategories();
        }, 500);
        setUserId(null);
        setEditMood(false);
        closeModal();
      }
    }
  };
  const handleChange = (e) => {
    setServiceId(e.target.value);
  };
  // input update method
  const updateInputValue = (evt) => {
    const val = evt.target.value;

    // ...
    setSubServiceName(val);
  };
  const handleSearchChange = (e) => {
    let { name, value } = e.target;
    setFilter(e.target.value);
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
        // handleDisable,
        loadCategories,
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
        handleSearchChange,
        updateInputValue,
        subservicename,
        serviceId,
        addMain,
        handleMainCat,
        fileSelectedHandler,
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
