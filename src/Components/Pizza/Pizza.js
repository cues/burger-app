import React from 'react';
import cls from './Pizza.css';

import PizzaIngredients from './PizzaIngredients/PizzaIngredients';

const pizza = (props) => {
  // console.log(props)
  let transformedIng = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_,i) => {
      return <PizzaIngredients key = {igKey + i} type = {igKey} />;
    })
  })
  .reduce((arr, el) => {
    return arr.concat(el)
  }, [] )
  // console.log(transformedIng.length);

  if(transformedIng.length === 0){
    transformedIng = <p>please start adding ingredients!</p>
  }

  return (
    <div className={cls.Pizza}>
      <PizzaIngredients type='bread-top' />
      {transformedIng}
      <PizzaIngredients type='bread-bottom' />
    </div>

  );
}


export default pizza;
