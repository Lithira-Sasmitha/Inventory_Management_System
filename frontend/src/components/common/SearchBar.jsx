import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function SearchBar({ placeholder = 'Search...', value, onChange, delay = 350 }) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange({ target: { value: localValue } });
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [localValue, onChange, value, delay]);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        px: 2,
        py: 0.75,
        width: { xs: '100%', sm: 380 },
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
        '&:focus-within': {
          borderColor: 'primary.main',
          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)',
        },
      }}
    >
      <SearchIcon
        sx={{
          color: 'text.secondary',
          mr: 1.5,
          fontSize: 20,
        }}
        aria-hidden="true"
      />
      <InputBase
        placeholder={placeholder}
        value={localValue}
        onChange={handleChange}
        inputProps={{
          'aria-label': placeholder,
          type: 'search',
        }}
        sx={{
          width: '100%',
          fontSize: '0.875rem',
          color: 'text.primary',
          '& input::placeholder': {
            color: 'text.secondary',
            opacity: 0.7,
          },
        }}
      />
    </Box>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  delay: PropTypes.number,
};
