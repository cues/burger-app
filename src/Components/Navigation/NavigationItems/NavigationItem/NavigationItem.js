import React from 'react';
import cls from './NavigationItem.css';

const navigationItem = (props) =>  (
    <li className={cls.navigationItem}>
        <a 
            className={props.active ? cls.active : null}
            href={props.link}>
            {props.children}</a>
    </li>
)


export default navigationItem;