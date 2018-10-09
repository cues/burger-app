import React from 'react';
import cls from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) =>  (
    <li className={cls.navigationItem}>
        <NavLink exact activeClassName={cls.active} to={props.link}>{props.children}</NavLink>
    </li>
)


export default navigationItem;