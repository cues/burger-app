import React, {Component} from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    // state = {
    //     ingredients :null,
    //     totalPrice: 0,
    // }

    // componentWillMount(){
    //     const string = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let parameters of string.entries()){
    //         if(parameters[0] === 'price'){
    //             price = parameters[1];
    //         }else{
    //             ingredients[parameters[0]] = +parameters[1]; 
    //         }
    //     }
    //     // console.log(string)
    //     this.setState({ingredients : ingredients, totalPrice:price});
    //     setTimeout(() =>
    //         console.log(this.state.ingredients),
    //         console.log(this.state.totalPrice)
    //      ,1000)
    // }

    checkoutCanceledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinueHandler = () => {
        this.props.history.push(this.props.match.path + '/ContactData')
    }


    render(){
        // console.log(this.state.ingredients)
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinue={this.checkoutContinueHandler}/>
                    <Route 
                        path={this.props.match.path + '/ContactData'}
                        component={ContactData}/>)}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.ingredients
    }
}


export default connect(mapStateToProps)(Checkout);