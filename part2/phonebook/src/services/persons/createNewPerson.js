import axios from "axios";

export const createNewPerson = ({ name, number }) => {
  return axios
    .post("http://localhost:3001/persons", { name, number })
    .then((response) => {
      const { data } = response;
      return data;
    });
};
