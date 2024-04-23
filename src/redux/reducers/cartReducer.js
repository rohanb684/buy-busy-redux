import {createSlice, createAsyncThunk} from'@reduxjs/toolkit';
import db from '../../firebaseInit';
import { doc, getDoc, updateDoc } from "firebase/firestore"


export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async(product, thunkApi)=>{
        try{
            // console.log("addToCart called")
            // console.log(product);
            const cartState = thunkApi.getState().cartReducer;
            // console.log("cartState: ");
            // console.log(cartState);
            const user =  thunkApi.getState().auth.user;
            const items = cartState.items;
            // console.log("items in addToCart(): ")
            // console.log(items);
            
            const itemIndex = items.findIndex((item)=> item.productId==product.productId);
            if(itemIndex != -1){
                // console.log("found product");
                const updatedItems = items.map((item, index) =>
        index === itemIndex ? { ...item, count: item.count + 1 } : item
    ); //check

                const updatedCart = {
                    cost: cartState.cost + items[itemIndex].price,
                    count: cartState.count + 1,
                    items: updatedItems
                }
                await updateDoc(doc(db, 'users', user.email),{
                    cart:updatedCart
                })

                return updatedCart;
            }else{
                console.log("not found product");
                // console.log("addtocart else");
                const item = { category: product.category, productId: product.productId, image: product.image, price: product.price, product: product.product, count: 1 };

                const newCart = {
                    cost: cartState.cost + item.price,
                    count: cartState.count + 1,
                    items: [...items, item]
                }
                // console.log("newCart: ")
                // console.log(newCart)
                await updateDoc(doc(db, "users", user.email), {
                    cart: newCart
                });

                return newCart;
            }

        }catch(error){
            console.log(error.message);
            thunkApi.rejectWithValue(error.message);
        }
    }
)

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async(_,thunkApi)=>{
        try{
            // console.log("fetch function called")
            const user =  thunkApi.getState().auth.user;
            if(user){
                const docRef = doc(db, "users", user.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    return docSnap.data().cart;  // Return the cart data
                } else {
                    console.log("No such document!");
                    return thunkApi.rejectWithValue("No such document!");
                }
            } else {
                return thunkApi.rejectWithValue("No user found");
            }

        }catch(error){
            console.log(error.message);
            thunkApi.rejectWithValue(error.message);
        }
    }
)

export const decreaseQuantity = createAsyncThunk(
    'cart/decreaseQuantity',
    async(data, thunkApi)=>{
        try{
            const cartState = thunkApi.getState().cartReducer;
            const items = cartState.items;
            const user =  thunkApi.getState().auth.user;

            const itemIndex = items.findIndex((item)=>item.productId == data.productId);

            if(itemIndex != -1){
                let updatedItems;
                if(items[itemIndex].count >1 ){
                    updatedItems = items.map((item, index) =>
                    index === itemIndex ? { ...item, count: item.count -1 } : item
                );
                }else{
                    updatedItems = items.filter((item)=>item.productId != data.productId);
                }
                
            const updatedCart = {
                cost: cartState.cost - data.price,
                count: cartState.count - 1,
                items: updatedItems
            }

            await updateDoc(doc(db, 'users', user.email),{
                cart:updatedCart
            })

            return updatedCart;
            }
        }catch(error){
            console.log(error.message);
            thunkApi.rejectWithValue(error.message);
        }
    }
)

export const removeProduct = createAsyncThunk(
    'cart/removeProduct',
    async(data, thunkApi)=>{
        try{
            const cartState = thunkApi.getState().cartReducer;
            const items = cartState.items;
            const user =  thunkApi.getState().auth.user;

            const removedItem = items.find((item)=>item.productId == data.productId);
            

            if(removedItem){
            const updatedItems = items.filter((item)=>item.productId != data.productId);

            const updatedCart = {
                cost: cartState.cost - (data.price * removedItem.count),
                count: cartState.count - removedItem.count,
                items: updatedItems
            }

            await updateDoc(doc(db, 'users', user.email),{
                cart:updatedCart
            })

            return updatedCart;
            }
        }catch(error){
            console.log(error.message);
            thunkApi.rejectWithValue(error.message);
        }
    }
)

export const placeOrder = createAsyncThunk(
    'cart/placeOrder',
    async(data, thunkAPI) => {
        try{
            console.log("place order called");
            const user =  thunkAPI.getState().auth.user;
            const date = new Date();
            const currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

            const order = {
                orderDate: currentDate,
                totalCost: data.cost,
                totalItems:data.count,
                orderItems: data.items
            }
            const updatedCart = {
                cost: 0,
                count: 0,
                items: []
            }

            const docSnap = await getDoc(doc(db, 'users', user.email))
            console.log(docSnap.data());

            if(docSnap.exists()){
                const prevOrders= docSnap.data().orders
                await updateDoc(doc(db, 'users', user.email),{
                    orders:[order, ...prevOrders],
                    cart:updatedCart
                })

                return(order)
            }else{
                thunkAPI.rejectWithValue("Unable to find the user");
            }

          
        }catch(error){
            console.log(error.message);
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const fetchOrders = createAsyncThunk(
    'cart/fetchOrders',
    async(_, thunkAPI)=>{
        try{
            const user =  thunkAPI.getState().auth.user;
            const docSnap = await getDoc(doc(db, 'users', user.email))

            if(docSnap.exists()){
                const orders= docSnap.data().orders
                return(orders)
            }else{
                thunkAPI.rejectWithValue("Unable to find the user");
            }
            
        }catch(error){
            console.log(error.message);
            thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async(_, thunkApi)=>{
        try{

            const user =  thunkApi.getState().auth.user;
            const updatedCart = {
                cost: 0,
                count: 0,
                items: []
            }
            await updateDoc(doc(db, 'users', user.email),{
                cart: updatedCart
            })
        }catch(error){
            console.log(error.message);
            thunkApi.rejectWithValue(error.message);
        }
    }
)

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        items:[],
        cost:0,
        count:0,
        status:'idle',
        error:null,
        orders: []
    },
    reducers:{
    },
    extraReducers: (builder) =>{
        builder
        .addCase(addToCart.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addToCart.fulfilled, (state, action) => {
            // console.log("action.payload: ")
            // console.log(action.payload)
            state.items = action.payload.items;
            state.cost = action.payload.cost;
            state.count = action.payload.count;
            state.error = null;
            state.status = 'idle';
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchCart.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(fetchCart.fulfilled, (state, action)=>{
            // console.log("action.payload: ")
            // console.log(action.payload)
            state.items = [...action.payload.items];
            state.cost = action.payload.cost;
            state.count = action.payload.count;
            state.status = 'idle';
            state.error = null;
        })
        .addCase(fetchCart.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(decreaseQuantity.fulfilled, (state, action)=>{
            state.items = [...action.payload.items];
            state.cost = action.payload.cost;
            state.count = action.payload.count;
            state.status = 'idle';
            state.error = null;
        })
        .addCase(decreaseQuantity.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(removeProduct.fulfilled, (state, action)=>{
            state.items = [...action.payload.items];
            state.cost = action.payload.cost;
            state.count = action.payload.count;
            state.status = 'idle';
            state.error = null;
        })
        .addCase(removeProduct.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(clearCart.fulfilled, (state)=>{
            state.items = [];
            state.cost = 0;
            state.count = 0;
            state.status = 'idle';
            state.error = null;
        })
        .addCase(placeOrder.fulfilled, (state, action)=>{
            state.items = [];
            state.cost = 0;
            state.count = 0;
            state.status = 'idle';
            state.error = null;
            state.orders = [action.payload, ...state.orders];
        })
        .addCase(placeOrder.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchOrders.fulfilled, (state, action)=>{
            state.orders = [...action.payload];
        })
        .addCase(fetchOrders.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const cartReducer = cartSlice.reducer;
