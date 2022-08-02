import axios from "axios";

export const deletePerson = (id) => {
  return axios
    .delete(`/api/persons/${id}`)
    .then((response) => {
      const { data } = response;
      return data;
    });
};
