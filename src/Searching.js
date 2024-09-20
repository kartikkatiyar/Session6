import { useEffect, useState } from "react";

export const Searching = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const response = await fetch("https://dummyjson.com/users");
    const { users } = await response.json();
    return users;
  };

  useEffect(() => {
    fetchUsers().then((users) => {
      setData(users);
    });
  }, []);

  const dataToDisplay = () => {
    const filteredData = data.filter((item) =>
      search
        ? item.firstName.toLowerCase().includes(search.toLowerCase())
        : item
    );
    return filteredData.map((item) => {
      const { id, firstName, age } = item;
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={handleSearch}
      ></input>

      {dataToDisplay()}
    </>
  );
};
