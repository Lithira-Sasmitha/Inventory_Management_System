import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Tooltip } from '@mui/material';

export default function StatCard({ title, value, rawValue, icon, color = 'primary.main' }) {
  const content = (
    <Typography
      sx={{
        fontWeight: 700,
        color: 'text.primary',
        fontSize: { xs: '1.25rem', sm: '1.35rem', md: '1.6rem', lg: '1.75rem' },
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {value}
    </Typography>
  );

  return (
    <Card sx={{ height: '100%', minHeight: 120 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', p: 3 }}>
        <Box sx={{ minWidth: 0, flex: 1, mr: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{
              fontWeight: 600,
              textTransform: 'uppercase',
              mb: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
          {rawValue ? (
            <Tooltip title={rawValue} placement="top" arrow>
              {content}
            </Tooltip>
          ) : (
            content
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '12px',
            bgcolor: 'action.hover',
            color: color,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  rawValue: PropTypes.string,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
};

