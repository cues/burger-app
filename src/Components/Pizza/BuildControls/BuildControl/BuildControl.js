import React from 'react';
import cls from './BuildControl.css';

const buildControl = (props) => {
return(
  <div className={cls.BuildControl}>
      <div className={cls.Label}>{props.label}</div>
      <button className={cls.Less} onClick={props.sub} disabled={props.disabled}>Less</button>
      <button className={cls.More} onClick={props.add}>More</button>
  </div>
)


}

export default buildControl;
