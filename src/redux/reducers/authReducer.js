import {createSlice, createAsyncThunk} from'@reduxjs/toolkit';
import db, { auth } from '../../firebaseInit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const signUp = createAsyncThunk(
    'auth/signUp',
    async({name, email, password}, thunkAPI) =>{
        console.log("In signup auth reducer")
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const {user} = userCredential;

            await updateProfile(user, {
                displayName: name
            });

            const currentUser = {
                name: name,
                email: email,
                password: password,
                cart: {
                    count: 0,
                    cost: 0,
                    items: []
                },
                orders: []
            }

            await setDoc(doc(db, 'users', currentUser.email), currentUser);
            // console.log("userCredential: ")
            // console.log(userCredential)
            console.log(currentUser);
            return currentUser;
        }catch(error){
            console.log(error.message);
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const signIn = createAsyncThunk(
    'auth/signIn',
    async({email, password}, thunkAPI) =>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email, password);
            return userCredential.user;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
   async()=>{
    await signOut(auth);
   }
)


const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        status:'idle',
        error:null
    },
    reducers:{
        setUser:(state, action)=>{
            state.user  = action.payload;
        },
        clearUser:(state)=>{
            state.user = null
        },
        resetAuthState: (state) => {
            state.user = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(signUp.pending, (state)=>{
                state.status='loading'
            })
            .addCase(signUp.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.user = action.payload
            })
            .addCase(signUp.rejected, (state, action) => {
                console.log("signUp rejected")
                state.status = 'failed';
                state.error = action.payload; // error message is received from rejectWithValue
            })
            .addCase(signIn.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.status = 'idle';
            });
    }
})

export const authReducer = authSlice.reducer;

export const {setUser, clearUser, resetAuthState} =  authSlice.actions;