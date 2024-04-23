import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Navbar.module.css'
import { useEffect, useState } from 'react';
import  {Outlet, Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../redux/reducers/authReducer';
import { fetchCart } from '../../redux/reducers/cartReducer';

import { FaCartShopping } from "react-icons/fa6";

 
 export  function Navbar() {
    // adding the states 
    const [isActive, setIsActive] = useState(false);
    const { count} = useSelector(state=> state.cartReducer);
    
    // const [activeUser, setActiveUser] = useState();
    
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    
    const user = useSelector(state => state.auth.user);  // Assuming user details are stored here
    useEffect(()=>{
      dispatch(fetchCart());
  },[dispatch,user]);


    //add the active class
    const toggleActiveClass = () => {
      setIsActive(!isActive);
    };
    //clean up function to remove the active class
    const removeActive = () => {
      setIsActive(false)
    }

    const handleLogout = () =>{
      dispatch(logout());
    }

    return (
      <div className={styles.wrapper}>
          <nav className={`${styles.navbar}`}>
            {/* logo */}
            <Link to={'/'} className={`${styles.logo}`}>Buy-Busy </Link>
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
            {user && <li onClick={removeActive}>
                <Link to={'/'} className={styles.displayName}>Welcome {user.name}</Link>
              </li>}
              {user && <li onClick={removeActive}>
                <Link to={'/orders'} className={styles.orders}>Orders
                </Link>
              </li>}
              {user && <li onClick={removeActive}>
                <Link to={'/cart'} className={styles.cartIcon}><FaCartShopping />
                {count > 0 && <div className={styles.itemCount}><p>{count}</p></div>}
                </Link>
              </li>}
              {/* <li onClick={removeActive}>
                <a href='#home' className={`${styles.navLink}`}>Hello {}</a>
              </li> */}
              {/* <li onClick={removeActive}>
                <a href='#home' className={`${styles.navLink}`}>All products</a>
              </li> */}
             { user ? <li onClick={removeActive}>
                <Link  to={'signIn'} className={styles.logout} onClick={handleLogout}>Logout</Link>
              </li> :
              <li onClick={removeActive}>
                <Link  to={'signIn'} className={`${styles.signIn}`} >SignIn</Link>
              </li>}
              
            </ul>
            <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
        {/* <SignIn
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      /> */}
      <Outlet/>
        </div>
    );
  }
  export default Navbar;