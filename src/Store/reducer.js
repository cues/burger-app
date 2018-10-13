import * as actionTypes  from './actions';



const initialState = {
    ingredients : {
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice : 4,
    purchase : false,
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
        default:
            return state;
    }
}


export default reducer;