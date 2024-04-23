import {useSelector} from 'react-redux';

import styles from './Products.module.css'
import ProductCard from '../ProductCard/ProductCard'
import { useEffect } from 'react';




export default function Products(){
    const products = useSelector(state=> state.productReducer.filteredProducts)
    console.log(products);
    

    return(
        <div className={styles.products}>
            {products.map((item)=>(<ProductCard value={item}/>))}
        </div>
    )
}