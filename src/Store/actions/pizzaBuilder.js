import * as actionTypes from './actionTypes';
import axios from '../../axiosOrder';

export const add_ingredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENT, 
        ingredientName:name
    }
}


export const remove_ingredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT, 
        ingredientName:name
    }
}




export const setIngredients = (ingredients) => {
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients : ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type:actionTypes.FETCH_INGREDIENT_FAILED
    } 
}

export const initIngredients = () => {
    return  dispatch => {
        axios.get('https://burger-app-1707.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}