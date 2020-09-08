/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory, useLocation } from 'react-router-dom';

import { useVideo } from '../../providers/Video';
import useStyles from './SearchBar.styled';

function SearchBar() {
  const classes = useStyles();

  const { searchTerm, setSearchTerm, fetchVideos } = useVideo();

  const { push } = useHistory();
  const location = useLocation();

  const handleSearchTermChanged = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchVideos(searchTerm);

      if (location.pathname !== '/') {
        push('/');
      }
    }
  };

  useEffect(() => {
    fetchVideos(searchTerm);
  }, []);

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchTermChanged}
        onKeyDown={handleKeyDown}
        value={searchTerm}
      />
    </div>
  );
}

export default SearchBar;
