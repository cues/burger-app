import React from 'react';
import cls from './Modal.css';
import Aux from '../../../hoc/aux';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  return(
    <Aux>

          <Backdrop show={props.show} clicked={props.modalClosed}/>

          <div  className={cls.Modal} 
                style={{
                  top: props.show ? '30%' : '-100vh',
                  opacity: props.show ? '1' : '0' 
                }}>
              {props.children}
          </div>
    </Aux>
   
  )
}

export default modal;
