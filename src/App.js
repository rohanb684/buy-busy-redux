import './App.css';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import {useDispatch} from 'react-redux';
import { setUser, clearUser } from './redux/reducers/authReducer';
import db, { auth } from './firebaseInit';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged} from "firebase/auth";


import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignInPage from './components/SignIn/SignInPage';
import Cart from './components/Cart/Cart';
import Orders from './components/Orders/Orders';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
      const unsubscriber = onAuthStateChanged(auth, async(user) => {
          if (user) {
            let docSnap = await getDoc(doc(db, "users", user.email));
            let userDetails = docSnap.data();
              dispatch(setUser(userDetails));
          }
      });

      return unsubscriber // Cleanup subscription on unmount
  }, []);


  const router = createBrowserRouter([
    {
      path:'/', element: <Navbar/>, children:[
        {index:true, element: <Home/>},
        {path:'/signUp', element:<SignUp/>},
        {path:'/signIn', element:<SignInPage/>},
        {path:'/cart', element:<Cart/>},
        {path:'/orders', element:<Orders/>}
      ]
    }
  ])


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
