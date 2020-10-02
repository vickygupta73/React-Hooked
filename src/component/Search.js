import React, {useState} from 'react';

const Search = (props) => {

  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("");
  }

  const searchCallFuncton = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
    <form>
      <input value={searchValue} onChange={handleSearchInputChanges} type='text' />
      <input onClick={searchCallFuncton} type='submit' value='Submit' />
    </form>
  )

}
export default Search;
