import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Orders } from './../../Pages/Orders'

import { getOrders } from './../Actions/Orders'
import { deleteOrder } from './../Actions/Orders'

const mapStateToProps = state => {
    return { 
        loading: state.loadingReducer.loading,
        orders: state.ordersReducer.orders,
        count: state.ordersReducer.count 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: bindActionCreators(getOrders, dispatch),
        deleteOrder: bindActionCreators(deleteOrder, dispatch)
    }
}

const OrdersContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));

export { OrdersContainer }