import React from 'react';
import cls from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () =>  (

        <ul className={cls.navigationItems}>
            <NavigationItem link='/' exact>Burger builder</NavigationItem>
            <NavigationItem link='/Orders'>Orders</NavigationItem>
        </ul>

)


export default navigationItems;