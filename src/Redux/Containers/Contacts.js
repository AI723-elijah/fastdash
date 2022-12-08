import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Contacts } from '../../Pages/Contacts';
import { getContacts, createContact, updateContact } from '../Actions/Contacts';
import { startLoading, stopLoading } from '../Actions/Loading';

const mapStateToProps = state => {
  return {
    loading: state.loadingReducer.loading,
    contacts: state.contactsReducer.contacts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getContacts: bindActionCreators(getContacts, dispatch),
    createContact: bindActionCreators(createContact, dispatch),
    updateContact: bindActionCreators(updateContact, dispatch),
    startLoading: bindActionCreators(startLoading, dispatch),
    stopLoading: bindActionCreators(stopLoading, dispatch)
  }
}

const ContactsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));
export { ContactsContainer };
