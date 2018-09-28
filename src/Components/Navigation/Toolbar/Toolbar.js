import React from 'react'

import cls from './Toolbar.css';
import classes from '../../../index.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from './Menu/Menu';

const toolbar = (props) => {


    return(
        <header className={`${cls.toolbar} , ${classes.display_flex}`}>

                <Menu clicked={props.clicked} />

                <div className={cls.logo}>
                    <Logo/>
                </div>

                <nav className={classes.none_small}>
                    <NavigationItems/>
                </nav>
    
        </header>
    )
    
  

}


export default toolbar;