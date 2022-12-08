import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Attributes } from '../../Pages/Attributes';
import { 
  searchAttributes,
  getAttributes, 
  saveAttribute, 
  deleteAttribute, 
  updateAttribute,
  syncAttributesToSite,
  setSelectedAttributes,
  createAttributesMagento,
  updateAttributeSort
 } from '../Actions/Attributes';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    attributes: state.attributeReducer.attributes,
    selectedAttributes: state.attributeReducer.selectedAttributes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchAttributes: bindActionCreators(searchAttributes, dispatch),
    getAttributes: bindActionCreators(getAttributes, dispatch),
    saveAttribute: bindActionCreators(saveAttribute, dispatch),
    deleteAttribute: bindActionCreators(deleteAttribute, dispatch),
    updateAttribute: bindActionCreators(updateAttribute, dispatch), 
    setSelectedAttributes: bindActionCreators(setSelectedAttributes, dispatch),
    syncAttributesToSite: bindActionCreators(syncAttributesToSite, dispatch),
    createAttributesMagento: bindActionCreators(createAttributesMagento, dispatch),
    updateAttributeSort:bindActionCreators(updateAttributeSort,dispatch)
  }
}

const AttributesContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Attributes));
export { AttributesContainer };
