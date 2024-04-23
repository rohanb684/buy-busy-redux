import { useState } from 'react';

import styles from './Home.module.css';
import Filter from '../Filter/Filter';
import Products from '../Products/Products';

export default function Home(){
    const [checkedItems, setCheckedItems] = useState([]);
    const [priceFilter, setPriceFilter] = useState(10000);
    
    return(
        <div className={styles.homeContainer}>
            <div className={styles.homeLeft}>
                <Filter/>
            </div>
            <div className={styles.homeRight}>
                <Products/>
            </div>
        </div>    
    )
}