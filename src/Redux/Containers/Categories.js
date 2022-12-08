import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Categories } from '../../Pages/Categories';
import { getCategories, saveCategory, updateCategory, removeCategory } from '../Actions/Categories';
import { getByCategory, quickSearch, associateToProduct, removeAssociatedProduct, updateProductSort } from '../Actions/Products';
import { updateElasticSearchIndex } from '../Actions/ProductForm';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    categories: state.categoryReducer.categories,
    associatedTo: state.categoryReducer.associatedTo,
    products: state.categoryReducer.products,
    flattened: state.categoryReducer.flattened
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: bindActionCreators(getCategories, dispatch),
    saveCategory: bindActionCreators(saveCategory, dispatch),
    updateCategory: bindActionCreators(updateCategory, dispatch),
    removeCategory: bindActionCreators(removeCategory, dispatch),
    getByCategory: bindActionCreators(getByCategory, dispatch),
    quickSearch: bindActionCreators(quickSearch, dispatch),
    associateToProduct: bindActionCreators(associateToProduct, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
    removeAssociatedProduct: bindActionCreators(removeAssociatedProduct, dispatch),
    updateProductSort:bindActionCreators(updateProductSort, dispatch),
    updateElasticSearchIndex: bindActionCreators(updateElasticSearchIndex, dispatch)
  }
}

const CategoriesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));
export { CategoriesContainer };
