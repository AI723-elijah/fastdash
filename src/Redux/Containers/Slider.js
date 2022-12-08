import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Slider } from '../../Pages/Slider';
import { getSliders, saveSlider, deleteSlider, editRep, updateSlider } from '../Actions/Slider';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    sliders: state.sliderReducer.sliders,
    rep: state.sliderReducer.rep
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editRep: bindActionCreators(editRep, dispatch),
    updateSlider: bindActionCreators(updateSlider, dispatch),
    getSliders: bindActionCreators(getSliders, dispatch),
    saveSlider: bindActionCreators(saveSlider, dispatch),
    deleteSlider: bindActionCreators(deleteSlider, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const SliderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Slider));
export { SliderContainer };
