import * as actionTypes from '../actions/actionTypes';
const initialState = {
    ingredients: null,
    price: 15,
    error: false,
    building: false
}
const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    meat: 60,
    bacon: 30
}
const addIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        price: state.price + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
}
const removeIngredient = (state,action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        price: state.price - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };    
}
const storeIngredients = (state,action) => {
    let updatedPrice = initialState.price;
    for(let ingredient in action.ingredientData){
        updatedPrice += INGREDIENT_PRICES[ingredient] * action.ingredientData[ingredient]
    }
    return {
        ...state,
        ingredients: {
            salad: action.ingredientData.salad,
            ...action.ingredientData
        },
        price: updatedPrice,
        error: false,
        building: false
    }
}
const reducer = ( state = initialState, action ) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
        case actionTypes.STORE_INGREDIENTS: return storeIngredients(state,action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return {...state, error: true}
        default: return state;
    }
}
export default reducer;