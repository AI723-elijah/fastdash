import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { PDFs } from '../../Pages/PDFs';
import { getPdfs, addPdf, editRep, updatePdf, deletePdf, ChangePdfPassword, verifyPDF } from '../Actions/Pdfs';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    pdfs: state.pdfsReducer.pdfs,
    rep: state.pdfsReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    getPdfs: bindActionCreators(getPdfs, dispatch),
    updatePdf: bindActionCreators(updatePdf, dispatch),
    addPdf: bindActionCreators(addPdf, dispatch),
    deletePdf: bindActionCreators(deletePdf, dispatch),
    ChangePdfPassword: bindActionCreators(ChangePdfPassword, dispatch),
    verifyPDF: bindActionCreators(verifyPDF, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const PdfsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PDFs));
export { PdfsContainer };
