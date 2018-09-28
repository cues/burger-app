import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cls from './SideDrawer.css';
import classes from '../../../index.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/aux';

const sideDrawer = (props) => {
    let newClass = [cls.sideDrawer , classes.transition_3, cls.Close];
    if(props.showBackDrawer){
         newClass = [cls.sideDrawer , classes.transition_3, cls.Open];
    }

    return(
        <Aux>
            <Backdrop show={props.showBackDrawer} clicked = {props.closed}/>
            <div className={newClass.join(' ')}>
                <div className={[cls.logo , classes.display_flex].join(' ')}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer; 