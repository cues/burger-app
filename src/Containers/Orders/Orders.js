import React , { Component} from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axiosOrder';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{
    

    componentDidMount(){
        this.props.onFetchOrders();
    }


    render(){
        const {orders, loading} = this.props;

        const all_order = loading ? <Spinner/> :
                orders.map(order => (
                    <Order key={order.id}
                        id={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))

        console.log(orders)
        return(
            <div>
                {all_order}
            </div>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));