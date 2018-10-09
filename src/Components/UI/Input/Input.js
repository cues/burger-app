import React from 'react';
import cls from './Input.css';

const input = (props) => {
    let inputElement = null

    switch(props.elementType){
        case ('input'):
            inputElement = <input className={cls.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={cls.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                    <select className={cls.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.dislayValue}
                            </option>   
                        ))}
                    </select>
            );
            break;  
        default:
            inputElement = <input className={cls.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }

    return (
        <div className={cls.Input}>
            <label className={cls.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}


export default input;