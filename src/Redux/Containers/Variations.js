import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Variations } from '../../Pages/Variations';
import { getVariations, emptyProducts, updateVariationsPriceInBulk } from '../Actions/Products';
import { searchVariations, saveSearchCriteria } from '../Actions/Variations';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    variations: state.productReducer.variations,
    pagination: state.productReducer.pagination,
    query: state.variationReducer.query
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVariations: bindActionCreators(getVariations, dispatch),
    emptyProducts: bindActionCreators(emptyProducts, dispatch),
    searchVariations: bindActionCreators(searchVariations, dispatch),
    saveSearchCriteria: bindActionCreators(saveSearchCriteria, dispatch), //updateVariationsPriceInBulk
    updateVariationsPriceInBulk: bindActionCreators(updateVariationsPriceInBulk, dispatch)
  }
}

const VariationsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Variations));
export { VariationsContainer };
