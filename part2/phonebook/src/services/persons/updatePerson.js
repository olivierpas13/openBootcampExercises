import axios from "axios";

export const updatePerson = (id, number) => {
  return axios
    .patch(`http://localhost:3001/persons/${id}`, {
      number: `${number}`,
    })
    .then((response) => {
      const { data } = response;
      return data;
    });
};
