import { ProductFormContainer } from '../Redux/Containers/ProductForm';
import { VariationFormContainer } from '../Redux/Containers/VariationForm';
import { NotFound } from '../Pages/404';

export const dynamicRoutes = [
  { key: '/product/new', path: '/product/new', Component: ProductFormContainer },
  { key: '/master-product/new', path: '/master-product/new', Component: ProductFormContainer },
  { key: '/product/edit', path: '/product/edit/:id', Component: ProductFormContainer },
  { key: '/master-product/edit', path: '/master-product/edit/:id', Component: ProductFormContainer },
  { key: '/variation/edit', path: '/variation/edit/:id', Component: VariationFormContainer },
  { key: '/404', path: '/404', Component: NotFound }
];