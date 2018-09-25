import React from 'react';

import cls from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label:'Salad' , type :'salad'},
  {label:'Bacon' , type :'bacon'},
  {label:'Cheese' , type :'cheese'},
  {label:'Meat' , type :'meat'},
];



const buildControls = (props) => {

return(
  <div className={cls.BuildControls}>

          <div>Price : {props.price.toFixed(2)}</div>

          {controls.map(ctrl => (
            <BuildControl
              key={ctrl.label}
              label={ctrl.label}
              add={() => props.addIngredient(ctrl.type)}
              sub={() => props.subIngredient(ctrl.type)}
              disabled = {props.disabled[ctrl.type]}
            />
          ))}

          <button className={cls.OrderButton} disabled={!props.purchase} onClick={props.clicked}>Order Now</button>


  </div>
)


};

export default buildControls ;
