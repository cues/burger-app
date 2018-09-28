import React from 'react';
import cls from './Backdrop.css';
import classes from '../../../index.css';

const backdrop = (props) => {
    let newClass = [cls.Backdrop_dummy];
        setTimeout(() => 
             newClass = [cls.Backdrop , cls.Backdrop_close]
        ,300)
        let newClass_inner = [cls.Backdrop_inner, cls.Backdrop_inner_close , classes.transition_3];
    if(props.show){
            newClass = [cls.Backdrop, cls.Backdrop_open];
            newClass_inner = [cls.Backdrop_inner , classes.transition_3]
    }
    
    return  (
                <div className={newClass.join(' ')} onClick={props.clicked}>
                    <div className={newClass_inner.join(' ')}></div>
                </div>

    ) 
}

export default backdrop;