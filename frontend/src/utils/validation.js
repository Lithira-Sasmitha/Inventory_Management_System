import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .required('Product name is required')
    .max(100, 'Product name cannot exceed 100 characters'),
  category: yup.string()
    .required('Please select a category'),
  price: yup.number()
    .typeError('Price must be a valid number')
    .positive('Price must be greater than $0.00')
    .max(999999.99, 'Price cannot exceed $999,999.99')
    .required('Price is required'),
  quantity: yup.number()
    .typeError('Stock quantity must be a valid number')
    .integer('Stock quantity must be a whole number')
    .min(0, 'Stock quantity cannot be negative')
    .required('Stock quantity is required'),
  minStock: yup.number()
    .typeError('Min stock alert must be a valid number')
    .integer('Min stock alert must be a whole number')
    .min(0, 'Min stock alert cannot be negative')
    .default(5),
});

export const createCategorySchema = (existingCategoryNames = []) => {
  const normalizedExisting = existingCategoryNames.map(
    (name) => name.trim().toLowerCase()
  );

  return yup.object().shape({
    name: yup.string()
      .trim()
      .required('Category name is required')
      .test(
        'unique-category-name',
        'A category with this name already exists',
        (value) => !normalizedExisting.includes((value || '').trim().toLowerCase())
      ),
  });
};

export const stockAdjustmentSchema = yup.object().shape({
  quantity: yup.number()
    .typeError('Adjustment quantity must be a valid number')
    .integer('Adjustment quantity must be a whole number')
    .positive('Adjustment quantity must be greater than 0')
    .required('Adjustment quantity is required'),
});

export const bulkRestockSchema = yup.object().shape({
  quantity: yup.number()
    .typeError('Quantity must be a valid number')
    .integer('Quantity must be a whole number')
    .positive('Quantity must be greater than 0')
    .required('Quantity is required'),
  reason: yup.string().trim(),
});
