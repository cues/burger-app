import React from 'react';

import cls from './Button.css';


const button = (props) => {
    return (
            
            <button className={[cls.Button , cls[props.buttonType]].join(' ')}  
            onClick={props.clicked} disabled={props.disabled}>{props.children}</button>

    )
}
        // props.show ? <button className={[cls.Button,  cls[props.buttontype]].join('') onClick={props.clicked_cancel}>{props.children}</button> : null

export default button