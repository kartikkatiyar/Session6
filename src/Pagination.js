import { useEffect, useState } from "react";

const DATA_PER_PAGE = 10;

export const Pagination = () => {
  const [data, setData] = useState([]);
  const [currPage, setCurrPage] = useState(1);

  const fetchUsers = async () => {
    const response = await fetch("https://dummyjson.com/users");
    const { users } = await response.json();
    return users;
  };

  useEffect(() => {
    fetchUsers().then((users) => {
      setData(users);
    });
  },[]);

  const dataToDisplay = () => {
    const endIdx = currPage * DATA_PER_PAGE;
    const startIdx = endIdx - DATA_PER_PAGE;
    if (data.length > 0) {
      let arr = [];
      for (let i = startIdx; i < endIdx; i++) {
        const { id, firstName, age } = data[i];
        arr.push(
          <div
            key={id}
            style={{
              display: "flex",
              width: "100px",
              justifyContent: "space-between",
            }}
          >
            <h3>{firstName}</h3>
            <h4>{age}</h4>
          </div>
        );
      }
      return arr;
    } else {
      return data;
    }
  };

  return (
    <>
      <input type="text" placeholder="search"></input>
      {currPage > 1 && (
        <button onClick={() => setCurrPage((prev) => prev - 1)}>PREV</button>
      )}
      {currPage}
      {currPage < 3 && (
        <button onClick={() => setCurrPage((prev) => prev + 1)}>NEXT</button>
      )}

      {dataToDisplay()}
    </>
  );
};
