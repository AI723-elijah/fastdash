import { SuppliersTab } from './Suppliers';
import { IconsTab } from './Icons';
import { CatalogsTab } from './Catalog';

const featureTabs = [
  {
    Component: SuppliersTab,
    title: 'Suppliers',
    key: 'suppliers',
    feature: '/suppliers'
  },
  {
    Component: IconsTab,
    title: 'Icons',
    key: 'icons',
    feature: '/icons'
  },
  {
    Component: CatalogsTab,
    title: 'Catalog',
    key: 'catalog',
    feature: '/parentCatalog'
  }
];

export { featureTabs };
