import React from 'react';
import cls from './Order.css'

const order = (props) => {
    const ingredients = [];

    for(let ing in props.ingredients){
        ingredients.push({
            name: ing,
            amount : props.ingredients[ing]
        })
    }

    const ingredients_output = ingredients.map(ig =>{
        return <span key={ig.name}>{ig.name} : {ig.amount} </span> 
    })

    return( 
        <div className={[cls.Order]}>
        <p>Ingredients: {ingredients_output}</p>
        <p>Price : {Number.parseFloat(props.price).toFixed(2)}</p>
    </div>
)
}
    

export default order;