import {useSelector} from 'react-redux';

import styles from './Products.module.css'
import ProductCard from '../ProductCard/ProductCard'




export default function Products(){
    const products = useSelector(state=> state.productReducer.filteredProducts)
    // console.log(products);
    

    return(
        <div className={styles.products}>
            {products.map((item, index)=>(<ProductCard value={item} key={index}/>))}
        </div>
    )
}