import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'
export const addIngredient = type => ({
    type: actionTypes.ADD_INGREDIENT, 
    ingredientName: type
})
export const removeIngredient = type => ({
    type: actionTypes.REMOVE_INGREDIENT, 
    ingredientName: type
})
const storeIngredients = ingredientData => ({
    type: actionTypes.STORE_INGREDIENTS,
    ingredientData: ingredientData
})
const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
})
export const loadIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response=> dispatch(storeIngredients(response.data)))
            .catch(error=>dispatch(fetchIngredientsFailed()))
    }
}
