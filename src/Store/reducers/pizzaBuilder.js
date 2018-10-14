import * as actionTypes  from '../actions/actionTypes';



const initialState = {
    ingredients : null,
    totalPrice : 4,
    purchase : false,
    error:false
}

const ingredientPrice = {
    salad : .5,
    bacon : .8,
    cheese :.6,
    meat : 1.3
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + ingredientPrice[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - ingredientPrice[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients : action.ingredients,
                totalPrice: 4,
                error: false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}


export default reducer;