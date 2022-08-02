import axios from "axios";

export const getAllPersons = () => {
  return axios.get("/api/persons").then((response) => {
    const { data } = response;
    return data;
  });
};
