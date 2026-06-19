import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

const PALETTES = [
  { light: { text: '#4f46e5', bg: '#f5f3ff', border: '#ddd6fe' }, dark: { text: '#a5b4fc', bg: 'rgba(99, 102, 241, 0.15)', border: 'rgba(99, 102, 241, 0.3)' } },
  { light: { text: '#0d9488', bg: '#f0fdfa', border: '#ccfbf1' }, dark: { text: '#5eead4', bg: 'rgba(20, 184, 166, 0.15)', border: 'rgba(20, 184, 166, 0.3)' } },
  { light: { text: '#ea580c', bg: '#fff7ed', border: '#ffedd5' }, dark: { text: '#fdba74', bg: 'rgba(249, 115, 22, 0.15)', border: 'rgba(249, 115, 22, 0.3)' } },
  { light: { text: '#16a34a', bg: '#f0fdf4', border: '#dcfce7' }, dark: { text: '#86efac', bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' } },
  { light: { text: '#e11d48', bg: '#fff1f2', border: '#ffe4e6' }, dark: { text: '#fda4af', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.3)' } },
  { light: { text: '#9333ea', bg: '#faf5ff', border: '#f3e8ff' }, dark: { text: '#d8b4fe', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.3)' } },
  { light: { text: '#2563eb', bg: '#eff6ff', border: '#dbeafe' }, dark: { text: '#93c5fd', bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' } },
];

const getPalette = (name) => {
  if (!name) return PALETTES[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTES.length;
  return PALETTES[index];
};

export default function CategoryChip({ label, size = 'small', ...props }) {
  const palette = getPalette(label);

  return (
    <Chip
      label={label}
      size={size}
      variant="outlined"
      {...props}
      sx={{
        fontSize: '0.75rem',
        fontWeight: 700,
        transition: 'all 0.2s',
        height: size === 'small' ? 24 : 32,
        borderColor: (theme) =>
          theme.palette.mode === 'light' ? palette.light.border : palette.dark.border,
        color: (theme) =>
          theme.palette.mode === 'light' ? palette.light.text : palette.dark.text,
        bgcolor: (theme) =>
          theme.palette.mode === 'light' ? palette.light.bg : palette.dark.bg,
        '&:hover': {
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? palette.light.border : palette.dark.border,
        },
        ...props.sx,
      }}
    />
  );
}

CategoryChip.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium']),
  sx: PropTypes.object,
};
