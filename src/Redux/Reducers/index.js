import { combineReducers } from 'redux';
import { loadingReducer } from './Loading';
import { attributeReducer } from './Attributes';
import { categoryReducer } from './Categories';
import { channelReducer } from './Channels';
import { productReducer } from './Products';
import { supplierReducer } from './Suppliers';
import { notificationReducer } from './Notification';
import { iconsReducer } from './Icons';
import { salesReducer } from './Sales';
import { authReducer } from './Login';
import { bannerReducer } from './Banners';
import { pdfsReducer } from './Pdfs';
import { sliderReducer } from './Slider';
import { catalogsReducer } from './Catalogs';
import { brandsReducer } from './Brands';
import { newsReducer } from './News';
import { storeLocatorsReducer } from './StoreLocator';
import { videosReducer } from './Videos';
import { literaturesReducer } from './PromotionalLiterature';
import { slideInReducer } from './SlideIn';
import { careersReducer } from './Careers';
import { variationReducer } from './Variations';
import { siteMapReducer } from './SiteMap';
import { optionsReducer } from './options';
import { QandAReducer } from './QandA';
import { contactsReducer } from './Contacts';
import { accessoriesReducer } from './accessories';
import { servicesReducer } from './Services';
import { brandstoreReducer } from './BrandStore';
import { portalReducer } from './Portal';
import { usersReducer } from './Users';
import { couponsReducer } from './Coupons';
import { websitesReducer } from './Websites';
import { ordersReducer } from './Orders';

export default combineReducers({
  loadingReducer,
  attributeReducer,
  categoryReducer,
  channelReducer,
  productReducer,
  portalReducer,
  couponsReducer,
  websitesReducer,
  usersReducer,
  supplierReducer,
  notificationReducer,
  storeLocatorsReducer,
  iconsReducer,
  salesReducer,
  bannerReducer,
  pdfsReducer,
  sliderReducer,
  catalogsReducer,
  brandsReducer,
  newsReducer,
  literaturesReducer,
  videosReducer,
  authReducer,
  slideInReducer,
  careersReducer,
  variationReducer,
  siteMapReducer,
  optionsReducer,
  QandAReducer,
  contactsReducer,
  accessoriesReducer,
  servicesReducer,
  brandstoreReducer,
  ordersReducer
});
