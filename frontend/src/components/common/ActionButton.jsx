import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const STYLES = {
  actionButton: {
    borderRadius: '10px',
    px: 3,
    py: 1.2,
    fontSize: '0.875rem',
    fontWeight: 600,
    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
    '&:hover': {
      boxShadow: '0 6px 16px rgba(79, 70, 229, 0.3)',
    },
  },
};

export default function ActionButton({
  label,
  icon = null,
  onClick,
  color = 'primary',
  variant = 'contained',
}) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      startIcon={icon}
      sx={STYLES.actionButton}
      aria-label={label}
    >
      {label}
    </Button>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
};
