import axios from "axios";

export const createNewPerson = ({ name, number }) => {
  return axios
    .post("/api/persons", { name, number })
    .then((response) => {
      const { data } = response;
      return data;
    })    ;
};
