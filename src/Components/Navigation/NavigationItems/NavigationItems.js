import React from 'react';
import cls from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () =>  (

        <ul className={cls.navigationItems}>
            <NavigationItem link='/' active >Burger builder</NavigationItem>
            <NavigationItem link='/'>Checkout</NavigationItem>
        </ul>

    )


export default navigationItems;