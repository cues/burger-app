import React , { Component } from 'react';
import Aux from '../../../hoc/aux';

import Button from '../../UI/Button/Button';
import cls from './OrderSummary.css';


class OrderSummary extends Component {

  componentWillUpdate(){
    console.log('order summary')
  }


  render(){

          const ingredientSummary = Object.keys(this.props.ingredients)
          .map(igkey => {
            return (
              <li key={igkey}>
                  <span className={cls.ingredientSummary} >
                      {igkey} : {this.props.ingredients[igkey]}
                  </span>
              </li>
            )
          })


          return (
            <Aux>
                <h3>Your order</h3>
                <p>Burger with the following ingredients :</p>
                <ul>{ingredientSummary}</ul>
                <p>Total Price: $ {this.props.price.toFixed(2)}</p>
                <p>Continue to checkout</p>
                <div className={cls.checkoutButtons}>
                    <Button clicked={this.props.clicked_cancel} buttonType="Danger">CANCEL</Button>
                    <Button clicked={this.props.clicked_success} buttonType="Success">CONTINUE</Button>
                </div>
                
            </Aux>
          )
  }
 
}



export default OrderSummary;
