import { useEffect, useState } from "react";

const SORTING = {
  DEFAULT: "default",
  NAME: {
    ASC: "name albhabetically ascending",
    DSC: "name albhabetically descending ",
  },
  AGE: {
    ASC: "age numerically ascending",
    DSC: "age numerically descending",
  },
};

export const Sorting = () => {
  const [data, setData] = useState([]);

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
    return data.map((item) => {
      const { firstName, age, id } = item;
      return (
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
    });
  };
  const handleSorting = (basis) => {
    if (basis === SORTING.DEFAULT) {
      fetchUsers().then((res) => {
        setData(res);
      });
    } else if (basis === SORTING.NAME.ASC) {
      const sortedData = [...data].sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
      setData(sortedData);
    } else if (basis === SORTING.NAME.DSC) {
      const sortedData = [...data].sort((a, b) =>
        b.firstName.localeCompare(a.firstName)
      );
      setData(sortedData);
    } else if (basis === SORTING.AGE.ASC) {
      const sortedData = [...data].sort((a, b) => a.age - b.age);
      setData(sortedData);
    } else if (basis === SORTING.AGE.DSC) {
      const sortedData = [...data].sort((a, b) => b.age - a.age);
      setData(sortedData);
    }
  };
  return (
    <>
      {" "}
      <div>
        <label htmlFor="sorting">Choose sorting:</label>
        <select
          name="sorting"
          id="sorting"
          defaultValue={SORTING.DEFAULT}
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option value={SORTING.DEFAULT}>{SORTING.DEFAULT}</option>
          <option value={SORTING.NAME.ASC}>{SORTING.NAME.ASC}</option>
          <option value={SORTING.NAME.DSC}>{SORTING.NAME.DSC}</option>
          <option value={SORTING.AGE.ASC}>{SORTING.AGE.ASC}</option>
          <option value={SORTING.AGE.DSC}>{SORTING.AGE.DSC}</option>
        </select>
      </div>
      {dataToDisplay()}
    </>
  );
};
