import React , { Component} from 'react';
import Order from '../../Components/Order/Order';
import axios from '../../axiosOrder';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{
    state = {
        orders : [],
        loading: true
    }

    componentDidMount(){
        axios.get('/orders.json')
        .then(response => {
            const fetchedData = [];
            for(let key in response.data){
                fetchedData.push({
                    ...response.data[key],
                    id : key,
                });
            }
            console.log(fetchedData)
            this.setState({loading:false, orders:fetchedData});
        })
        .catch(error => {
            this.setState({loading:false});
        })
    }


    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        id={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))}
            </div>
           
        )
    }
}

export default withErrorHandler(Orders, axios);