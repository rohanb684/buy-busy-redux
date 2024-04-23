import styles from './SignInPage.module.css';
import { useEffect, useRef } from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';


import { signIn , resetAuthState} from '../../redux/reducers/authReducer';

export default function SignInPage(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const authStatus = useSelector(state => state.auth.status);
    const authError = useSelector(state => state.auth.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (authStatus === 'succeeded') {
            navigate('/'); // Navigate to home page on successful signup
            return () => {
                dispatch(resetAuthState()); // Reset auth state on component unmount
            };
        }

    }, [authStatus, navigate, dispatch]);

    const handleSignIn = (e) =>{
        e.preventDefault();
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        if(!email || !password){
            return;
        }
        dispatch(signIn({email, password}))
    }

    return(
        <div className={styles.signUpContainer}>
            <div className={styles.formContainer}>
                <h1>Login Now!</h1>
                <form onSubmit={handleSignIn}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' ref={emailRef} required/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' ref={passwordRef} required/>
                    <button type='submit'>Sign In</button>
                </form>
                <p>Not Registered ? <Link to={'/signUp'} >SignUp</Link></p>
                {authStatus === 'loading' && <p>Signing In...</p>}
                {authStatus === 'failed' && authError=="Firebase: Error (auth/email-already-in-use)." && <p>Email Already In use</p>} 
            </div>
        </div>
    )
}