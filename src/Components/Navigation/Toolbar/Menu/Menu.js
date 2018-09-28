import React from 'react';
import classes from '../../../../index.css';
import cls from './Menu.css'

const menu = (props) => {
    const width = window.innerWidth
    let cursor = null;
    width < 769  ?
    cursor = [classes.cursor_pointer] :
    cursor = [classes.cursor_default]

    return (
        <div className={[cursor , cls.DrawerToggle].join(' ')} onClick={props.clicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default menu;