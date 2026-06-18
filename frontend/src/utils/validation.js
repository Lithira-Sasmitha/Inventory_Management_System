import * as yup from 'yup';

export const productSchema = yup.object().shape({
  name: yup.string()
    .trim()
    .required('Product name is required'),
  price: yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  quantity: yup.number()
    .typeError('Stock quantity must be a number')
    .integer('Stock quantity must be an integer')
    .min(0, 'Stock quantity cannot be negative')
    .required('Stock quantity is required'),
  category: yup.string()
    .required('Category selection is required'),
});

export const createCategorySchema = (existingCategoryNames = []) => {
  const normalizedExisting = existingCategoryNames.map(name => name.trim().toLowerCase());
  
  return yup.object().shape({
    name: yup.string()
      .trim()
      .required('Category name is required')
      .test(
        'unique-category-name',
        'Category name already exists',
        (value) => !normalizedExisting.includes((value || '').trim().toLowerCase())
      ),
  });
};

export const stockAdjustmentSchema = yup.object().shape({
  quantity: yup.number()
    .typeError('Adjustment quantity must be a number')
    .integer('Adjustment quantity must be an integer')
    .positive('Adjustment quantity must be greater than 0')
    .required('Adjustment quantity is required'),
});
