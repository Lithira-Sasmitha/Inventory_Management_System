import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export default function DeleteConfirm({ open, onClose, onConfirm, productName }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Delete Product</DialogTitle>
      <DialogContent sx={{ py: 1 }}>
        <DialogContentText variant="body2">
          Are you sure you want to delete <strong>{productName}</strong>? This will permanently
          remove the product from the inventory database and this action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1.5 }}>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          autoFocus
          sx={{ borderRadius: 2, px: 3, fontWeight: 600 }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  productName: PropTypes.string,
};
