import axios from "axios";
import { BACKEND_BASE_URL } from "../helpers/variables";

const useAuth = () => {
  // Upload Image
  const uploadImage = async image => {
    const fd = new FormData();
    fd.append("image", image, image.name);
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/apis/uploads/single`,
        fd
      );
      return response.data;
    } catch (err) {
      alert("Upload failed!");
    }
  };

  // Airline APIS

  // Register Airline

  const registerAirline = async data => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/airline/auth/register`,
        data
      );
      return response.data;
    } catch (err) {
      alert("Registration failed!");
    }
  };

  // Login Airline
  const loginAirline = async data => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/airline/auth/login`,
        data
      );
      return response.data;
    } catch (err) {
      alert("Login failed!");
    }
  };

  //   User APIs

  // Register User
  const registerUser = async data => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/user/auth/register`,
        data
      );
      return response.data;
    } catch (err) {
      alert("Registration failed!");
    }
  };

  // Login Airline
  const loginUser = async data => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/user/auth/login`,
        data
      );
      console.log(data);
      
      localStorage.setItem("userEmail",data.email)
      
      return response.data;
    } catch (err) {
      alert(err);
    }
  };
  return {
    uploadImage,
    registerUser,
    registerAirline,
    loginAirline,
    loginUser,
  };
};

export default useAuth;
