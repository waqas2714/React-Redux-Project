import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartItems from "../../../cartItems"
import axios from 'axios'

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
    cartItems : [],
    amount : 1,
    total : 0,
    isLoading : true
}

export const getItems = createAsyncThunk(
    "cart/getCartItems",async ()=>{
        try {
            // fetch(url)
            // .then((res)=>res.json())
            // .catch((err)=>console.log(err))
            const response = await axios.get(url);
            // console.log(response.data);
            return response.data
        } catch (error) {
            
        }
    }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart : (state)=>{
        state.cartItems=[];
    },
    removeItem : (state, action)=>{
        const itemId = action.payload;
        state.cartItems = state.cartItems.filter((item)=>itemId!==item.id);
    },
    increase: (state, {payload})=>{
        const cartItem = state.cartItems.find((item)=>item.id===payload.id);
        cartItem.amount= cartItem.amount + 1; 
    },
    decrease: (state, {payload})=>{
        const cartItem = state.cartItems.find((item)=>item.id===payload.id);        
        cartItem.amount= cartItem.amount - 1; 
    },
    calcTotals: (state)=>{
        let amount = 0;
        let total = 0;
        state.cartItems.forEach((item)=>{
            amount += item.amount;
            total += item.amount * item.price;
        })
        state.amount = amount;
        state.total = total;
    }
  },
  extraReducers : {
    [getItems.pending] : (state)=>{
        state.isLoading = true;
    },
    [getItems.fulfilled] : (state, action)=>{
        state.isLoading = false;
        state.cartItems = action.payload;
    },
    [getItems.pending] : (state)=>{
        state.isLoading = false;
    }
  }
});

export const {clearCart, removeItem, increase, decrease, calcTotals} = cartSlice.actions

export default cartSlice.reducer