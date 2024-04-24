import React, { useState } from "react";

const Filter = ({items}) => {
  const [searchText, setSearchText] = useState('')

  
  return (
    <input
      type="text"
      defaultValue={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="form-control"
    />
  );
};

export default Filter;