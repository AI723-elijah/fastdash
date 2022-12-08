import { SuppliersContainer } from '../Redux/Containers/Suppliers';
import { SalesContainer } from '../Redux/Containers/Sales';
import { IconsContainer } from '../Redux/Containers/Icons';
import { NotificationsContainer } from '../Redux/Containers/Notifications';
import { BannersContainer } from '../Redux/Containers/Banners';
import { SliderContainer } from '../Redux/Containers/Slider';
import { CatalogsContainer } from '../Redux/Containers/Catalogs';
import { BrandsContainer } from '../Redux/Containers/Brands';
import { NewsContainer } from '../Redux/Containers/News';
import { StoreLocatorsContainer } from '../Redux/Containers/StoreLocator';
import { OnlineRetailersContainer } from '../Redux/Containers/OnlineRetailers';
import { LiteratureContainer } from '../Redux/Containers/PromotionalLiterature';
import { SlideInContainer } from '../Redux/Containers/SlideIn';
import { VideosContainer } from '../Redux/Containers/Videos';
import { CareersContainer } from '../Redux/Containers/Careers';
import { VariationsContainer } from '../Redux/Containers/Variations';
import { ContactsContainer } from '../Redux/Containers/Contacts';
import { ServicesContainer } from '../Redux/Containers/Services';
import { BrandstoreContainer } from '../Redux/Containers/Brandstore';
import SiteMap from '../Pages/SiteMap';

export const featureRoutes = [
  { key: '/suppliers', path: '/suppliers', Component: SuppliersContainer, label: 'Suppliers', icon: 'box-plot' },
  { key: '/notifications', path: '/notifications', Component: NotificationsContainer, label: 'Notifications', icon: 'notification' },
  { key: '/salesrep', path: '/salesrep', Component: SalesContainer, label: 'Sales Rep', icon: 'user' },
  { key: '/icons', path: '/icons', Component: IconsContainer, label: 'Icons', icon: 'pie-chart' }, 
  { key: '/banners', path: '/banners', Component: BannersContainer, label: 'Banners', icon: 'file-image' },
  { key: '/catalogs', path: '/catalogs', Component: CatalogsContainer, label: 'Catalogs', icon: 'file-add' },
  { key: '/brands', path: '/brands', Component: BrandsContainer, label: 'Brands', icon: 'contacts' },
  { key: '/news', path: '/news', Component: NewsContainer, label: 'News', icon: 'file-text' },
  { key: '/storelocator', path: '/storelocator', Component: StoreLocatorsContainer, label: 'Store Locator', icon: 'shop' },
  { key: '/online-retailers', path: '/online-retailers', Component: OnlineRetailersContainer, label: 'Online Retailer', icon: 'cloud' },
  { key: '/videos', path: '/videos', Component: VideosContainer, label: 'Videos', icon: 'video-camera' },
  { key: '/promotionalliterature', path: '/promotionalliterature', Component: LiteratureContainer, label: 'Promotional Literature', icon: 'file-add' },
  { key: '/slider', path: '/slider', Component: SliderContainer, label: 'Slider', icon: 'layout' },
  { key: '/slideIn', path: '/slideIn', Component: SlideInContainer, label: 'Slide In', icon: 'bank' },
  { key: '/careers', path: '/careers', Component: CareersContainer, label: 'Careers', icon: 'notification' },
  { key: '/variations', path: '/variations', Component: VariationsContainer, label: 'Variations', icon: 'share-alt' },
  { key: '/sitemap', path: '/sitemap', Component: SiteMap, label: 'SiteMap', icon: 'setting' },
  { key: '/contacts', path: '/contacts', Component: ContactsContainer, label: 'Contacts', icon: 'contacts' },
  { key: '/services', path: '/services', Component: ServicesContainer, label: 'Services', icon: 'customer-service' },
  { key: '/brandstore', path: '/brandstore', Component: BrandstoreContainer, label: 'Brand Store', icon: 'appstore' }
];
