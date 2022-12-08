import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Catalogs } from '../../Pages/Catalogs';
import { getCatalogs, saveCatalogs, editRep, updateCatalogs, deleteCatalogs } from '../Actions/Catalogs';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    catalogs: state.catalogsReducer.catalogs,
    rep: state.salesReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    getCatalogs: bindActionCreators(getCatalogs, dispatch),
    deleteCatalogs: bindActionCreators(deleteCatalogs, dispatch),
    saveCatalogs: bindActionCreators(saveCatalogs, dispatch),
    updateCatalogs: bindActionCreators(updateCatalogs, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const CatalogsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Catalogs));
export { CatalogsContainer };
