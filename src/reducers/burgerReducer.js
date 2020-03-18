import * as actionTypes from '../actions';
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    price: 15
}
const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 60,
    bacon: 30
}
const reducer = ( state = initialState, action ) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            console.log('add_ingredient',action)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            console.log('remove_ingredient',action)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[action.ingredientName]
            };
        default: 
            return state;
    }
}
export default reducer;