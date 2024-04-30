import styles from './SignUp.module.css';
import { signUp, resetAuthState } from '../../redux/reducers/authReducer';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';

export default function SignUp(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const displayNameRef = useRef();
    const navigate = useNavigate();
        
    const dispatch = useDispatch();

    const authStatus = useSelector(state => state.auth.status);
    const authError = useSelector(state => state.auth.error);

    useEffect(() => {
        if (authStatus === 'succeeded') {
            dispatch(resetAuthState()); // Reset auth state on component unmount
            navigate('/signIn'); // Navigate to home page on successful signup
        }
    }, [authStatus, navigate, dispatch]);


    const handleSignUp = (e) =>{
        e.preventDefault();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const name = displayNameRef.current.value.trim();
        if(!email || !password || !name){
            return;
        }

        dispatch(signUp({name, email, password}));
    }

        return(
            <div className={styles.signUpContainer}>
                <div className={styles.formContainer}>
                    <h1>Register Now!</h1>
                    <form onSubmit={handleSignUp}>
                    <label htmlFor="name">Name</label>
                        <input type="text" name='name' id='name' ref={displayNameRef} required/>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' ref={emailRef} required/>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' ref={passwordRef} required/>
                        <button type='submit'>Sign up</button>
                    </form>
                    {authStatus === 'loading' && <p>Registering...</p>}
                    {authStatus === 'failed' && authError==="Firebase: Error (auth/email-already-in-use)." && <p>Email Already In use</p>}
                </div>
            </div>
        )
}