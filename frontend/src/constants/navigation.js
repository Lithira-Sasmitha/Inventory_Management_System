import {
  Dashboard as DashboardIcon,
  AssignmentTurnedIn as ProductsIcon,
  Category as CategoriesIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

export const DRAWER_WIDTH = 260;

export const NAV_MENU_ITEMS = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'Products', icon: ProductsIcon, path: '/products' },
  { text: 'Categories', icon: CategoriesIcon, path: '/categories' },
  { text: 'Stock History', icon: HistoryIcon, path: '/stock-history' },
];
