import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'; 
import cls from './Logo.css';

const logo = (props) => (
        <div className={cls.logo}>
            <img src={burgerLogo} alt='myBurger'/>
        </div>
    )

export default logo;
