import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  MenuItem,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TablePagination,
  Button,
  Typography,
} from '@mui/material';
import {
  Clear as ClearIcon,
  Inventory as InventoryIcon,
} from '@mui/icons-material';
import SearchBar from '../common/SearchBar';

export default function StockHistory({ products = [], stockHistory = [] }) {
  const [selectedProductId, setSelectedProductId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleClearAll = () => {
    setSelectedProductId('');
    setSearchQuery('');
    setPage(0);
  };

  const getProductDetails = useCallback((productId, productName) => {
    const product = products.find((p) => p.id === productId);
    return {
      name: product ? product.name : productName || 'Deleted Product',
      sku: product ? product.sku : 'N/A',
    };
  }, [products]);

  const filteredHistory = useMemo(() => {
    let result = stockHistory;

    if (selectedProductId) {
      result = result.filter((log) => log.productId === selectedProductId);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((log) => {
        const details = getProductDetails(log.productId, log.productName);
        return (
          details.name.toLowerCase().includes(query) ||
          details.sku.toLowerCase().includes(query) ||
          (log.reason && log.reason.toLowerCase().includes(query))
        );
      });
    }

    return result;
  }, [stockHistory, selectedProductId, searchQuery, getProductDetails]);

  const totalPages = Math.ceil(filteredHistory.length / rowsPerPage);
  React.useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
      setPage(totalPages - 1);
    }
  }, [filteredHistory.length, rowsPerPage, page, totalPages]);

  const paginatedHistory = useMemo(() => {
    return filteredHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredHistory, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const hasActiveFilters = Boolean(selectedProductId || searchQuery);

  return (
    <Box>
      <Box
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 3.5,
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) =>
            theme.palette.mode === 'light' ? 'rgba(241, 245, 249, 0.4)' : 'rgba(30, 41, 59, 0.3)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Box sx={{ flexGrow: { xs: 1, sm: 1, md: 0 }, minWidth: { xs: '100%', sm: 300, md: 320 } }}>
            <SearchBar
              placeholder="Search logs by name, SKU, or reason..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
            />
          </Box>

          <TextField
            select
            value={selectedProductId}
            onChange={(e) => {
              setSelectedProductId(e.target.value);
              setPage(0);
            }}
            size="small"
            variant="outlined"
            slotProps={{
              select: {
                displayEmpty: true,
              },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <InventoryIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }
            }}
            sx={{
              minWidth: { xs: '100%', sm: 250 },
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease-in-out',
                pl: 1.5,
                height: 40,
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.08)',
                },
              },
            }}
          >
            <MenuItem value="">All Products</MenuItem>
            {products.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name} ({p.sku})
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {hasActiveFilters && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 2,
              pt: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Found <strong>{filteredHistory.length}</strong> transaction{filteredHistory.length === 1 ? '' : 's'}{' '}
              <Typography component="span" variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                (filtered from {stockHistory.length} total)
              </Typography>
            </Typography>

            <Button
              size="small"
              color="primary"
              onClick={handleClearAll}
              startIcon={<ClearIcon />}
              sx={{
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </Box>

      {filteredHistory.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 4,
            bgcolor: 'background.default',
          }}
        >
          <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            No stock transactions found matching your criteria.
          </Typography>
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflowX: 'auto' }}
          >
            <Table aria-label="stock history ledger">
              <TableHead sx={{ bgcolor: 'action.hover' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Date & Time</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Product Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, display: { xs: 'none', md: 'table-cell' } }}>SKU</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="center">Type</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Qty Changed</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">New Total</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Reason / Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedHistory.map((log) => {
                  const details = getProductDetails(log.productId, log.productName);
                  const isStockIn = log.type === 'STOCK_IN';

                  return (
                    <TableRow
                      key={log.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s',
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <TableCell sx={{ color: 'text.secondary', fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {details.name}
                        <Box
                          component="span"
                          sx={{
                            display: { xs: 'block', md: 'none' },
                            fontSize: '0.75rem',
                            color: 'text.secondary',
                            fontFamily: 'monospace',
                            mt: 0.5,
                          }}
                        >
                          {details.sku}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.secondary', display: { xs: 'none', md: 'table-cell' } }}>
                        {details.sku}
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={isStockIn ? 'Restock' : 'Sale'}
                          color={isStockIn ? 'success' : 'error'}
                          size="small"
                          sx={{ fontWeight: 700, minWidth: 80 }}
                        />
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: isStockIn ? 'success.main' : 'error.main' }}>
                        {isStockIn ? '+' : '-'}{log.quantityChanged}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>
                        {log.newQuantity}
                      </TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                        {log.reason}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredHistory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              mt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
              '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                fontWeight: 500,
              },
            }}
          />
        </>
      )}
    </Box>
  );
}

StockHistory.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
    })
  ).isRequired,
  stockHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      productId: PropTypes.string.isRequired,
      productName: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['STOCK_IN', 'STOCK_OUT']).isRequired,
      quantityChanged: PropTypes.number.isRequired,
      newQuantity: PropTypes.number.isRequired,
      reason: PropTypes.string,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};
