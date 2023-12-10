import axios from "axios";
import { BACKEND_BASE_URL } from "../helpers/variables";

const useGeneral = () => {
  const getFilteredSchedules = async filters => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/user/filteredFlights?from=${
          filters?.from || ""
        }&to=${filters?.to || ""}&date=${filters?.date || ""}`,
        filters
      );
      return response.data;
    } catch (err) {
      alert("Error!");
    }
  };

  const getAllAirLines = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/user/airlines`);
      return response.data;
    } catch (err) {
      alert("Error!");
    }
  };

  return { getFilteredSchedules, getAllAirLines };
};

export default useGeneral;
