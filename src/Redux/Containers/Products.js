import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Products } from '../../Pages/Products';
import {
  getProducts, 
  getMasterProducts, 
  searchProducts, 
  bulkUpload, 
  publish, 
  emptyProducts, 
  applyFilter, 
  refreshTierPricing, 
  getProductsVariations, 
  saveSearchCriteria,
  downloadOrders,
  BulkUploadElasticSearch,
  deleteIndex,
  createMapping
} from '../Actions/Products';
import { amazonLookUp } from '../Actions/ProductForm';
import { getCategories } from '../Actions/Categories';
import { getChannels } from '../Actions/Channels';
import { syncAttributesToSite } from '../Actions/Attributes';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    products: state.productReducer.products,
    categories: state.categoryReducer.categories,
    channels: state.channelReducer.channels,
    productVariations: state.productReducer.productVariations,
    query: state.productReducer.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: bindActionCreators(getProducts, dispatch),
    getMasterProducts: bindActionCreators(getMasterProducts, dispatch),
    getProductsVariations: bindActionCreators(getProductsVariations, dispatch),
    searchProducts: bindActionCreators(searchProducts, dispatch),
    emptyProducts: bindActionCreators(emptyProducts, dispatch),
    applyFilter: bindActionCreators(applyFilter, dispatch),
    refreshTierPricing: bindActionCreators(refreshTierPricing, dispatch),
    publish: bindActionCreators(publish, dispatch),
    bulkUpload: bindActionCreators(bulkUpload, dispatch),
    amazonLookUp: bindActionCreators(amazonLookUp, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch),
    getChannels: bindActionCreators(getChannels, dispatch),
    saveSearchCriteria: bindActionCreators(saveSearchCriteria, dispatch),
    syncAttributesToSite: bindActionCreators(syncAttributesToSite, dispatch),
    downloadOrders: bindActionCreators(downloadOrders, dispatch),
    BulkUploadElasticSearch: bindActionCreators(BulkUploadElasticSearch, dispatch),
    createMapping: bindActionCreators(createMapping, dispatch),
    deleteIndex: bindActionCreators(deleteIndex, dispatch)
  }
}

const ProductsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));
export { ProductsContainer };
