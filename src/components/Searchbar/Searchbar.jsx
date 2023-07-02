import { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';

import style from './Searchbar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);

    onSubmit(inputValue);
  };

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const isBtnDisable = inputValue === '';
  return (
    <header className={style.searchbar}>
      <form className={style.form} onSubmit={handleSubmit}>
        <button type="submit" className={style.button} disabled={isBtnDisable}>
          <span className={style['button-label']}>Search</span>
          <BiSearchAlt className={style.searchIcon} />
        </button>

        <input
          className={style.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
