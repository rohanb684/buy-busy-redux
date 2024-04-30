import {createSlice} from '@reduxjs/toolkit';

import { data } from '../../utils/data';

const maxProductPrice = data.reduce((max, product) => Math.max(max, product.price), 0);
const minProductPrice = data.reduce((max, product) => Math.min(max, product.price), Infinity);

const initialState = {
    products: data,
    maxProductPrice : maxProductPrice,
    minProductPrice:minProductPrice,
    filteredProducts: data,
    maxPrice: null,
    category: [],
    searchQuery: ''
};

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers: {
        setMaxPrice: (state, action)=>{
            state.maxPrice = action.payload;
        },
        setCategory: (state, action) =>{
            // console.log("action.payload Cat: ")
            // console.log(action.payload)
            if (!state.category.includes(action.payload)) {
                state.category = [...state.category, action.payload]
            }
        },
        removeCategory: (state, action)=>{
            state.category = state.category.filter(cat => cat !== action.payload);

        },
        setSearchQuery: (state, action) =>{
            state.searchQuery = action.payload;
        },
        sortLowToHigh(state) {
            state.filteredProducts.sort((a, b) => a.price - b.price);
        },
        sortHighToLow(state) {
            state.filteredProducts.sort((a, b) => b.price - a.price);
        },
        filterProducts: (state) =>{
            let filtered = state.products;

           // Filter by max price if set
            if (state.maxPrice !== null) {
                    filtered = filtered.filter(product => product.price <= state.maxPrice);
            }

            // Filter by category if set
            if ( state.category && state.category.length > 0) {
    
                filtered = filtered.filter(product =>  state.category.includes(product.category));
            }

            // Filter by search query if set
            if (state.searchQuery) {
                // console.log(state.searchQuery)
              
                filtered = filtered.filter(product =>
                    product.product.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            }
            
            // console.log("filtered: ")
            // console.log(filtered)
            state.filteredProducts = filtered;
        }
    }
    
})

export const productReducer = productSlice.reducer;

export const {setMaxPrice, setCategory,removeCategory,
              setSearchQuery, filterProducts, sortLowToHigh, sortHighToLow} = productSlice.actions;