import React from 'react';
import Aux from '../../../hoc/aux';

import Button from '../../UI/Button/Button';
import cls from './OrderSummary.css';


const orderSummary = (props) => {


  const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey => {
      return (
        <li key={igkey}>
            <span className={cls.ingredientSummary} >
                {igkey} : {props.ingredients[igkey]}
            </span>
        </li>
      )
    })


  return (
    <Aux>
        <h3>Your order</h3>
        <p>Burger with the following ingredients :</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to checkout</p>
        <div className={cls.checkoutButtons}>
            <Button clicked={props.clicked_cancel} buttonType="Danger">CANCEL</Button>
            <Button clicked={props.clicked_success} buttonType="Success">CONTINUE</Button>
        </div>
        
    </Aux>
  )
}

export default orderSummary;
