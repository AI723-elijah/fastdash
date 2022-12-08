import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { VariationForm } from '../../Pages/VariationForm';
import { getAttributes, getDropDownValues } from '../Actions/Attributes';
import { getCategories } from '../Actions/Categories';
import { getVariation, updateVariation, handleVariationChange, changeAttributeKey, selectCategory, addNewItem } from '../Actions/Variations';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    selectLoading: state.loadingReducer.selectLoading,
    variation: state.variationReducer.variation,
    attributes: state.attributeReducer.attributes,
    dropdown: state.attributeReducer.dropdown,
    categories: state.categoryReducer.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAttributes: bindActionCreators(getAttributes, dispatch),
    getDropDownValues: bindActionCreators(getDropDownValues, dispatch),
    getCategories: bindActionCreators(getCategories, dispatch),
    getVariation: bindActionCreators(getVariation, dispatch),
    updateVariation: bindActionCreators(updateVariation, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch),
    handleVariationChange: bindActionCreators(handleVariationChange, dispatch),
    changeAttributeKey: bindActionCreators(changeAttributeKey, dispatch),
    selectCategory: bindActionCreators(selectCategory, dispatch),
    addNewItem: bindActionCreators(addNewItem, dispatch)
  }
}

const VariationFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(VariationForm));
export { VariationFormContainer };
