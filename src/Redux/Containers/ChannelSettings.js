import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ChannelSettings } from '../../Pages/ChannelSettings';

const ChannelSettingsContainer = withRouter(connect()(ChannelSettings));
export { ChannelSettingsContainer };
