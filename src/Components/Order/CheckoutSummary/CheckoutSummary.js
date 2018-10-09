import React from 'react';

import Pizza from '../../Pizza/Pizza';
import Button from '../../UI/Button/Button';

import cls from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    // console.log(props);
    return (
        <div className={cls.CheckoutSummary}>
            <h1>Enjoy your meal</h1>
            <div>
                <Pizza ingredients={props.ingredients}/>
                <div className={cls.checkoutButtons}>
                    <Button buttonType='Danger' clicked={props.checkoutCanceled}>CANCEL</Button>
                    <Button buttonType='Success' clicked={props.checkoutContinue}>CONTINUE</Button>
                </div>
            </div>
        </div>
    )
}

export default checkoutSummary;