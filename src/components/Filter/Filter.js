import { useRef, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';

import styles from './Filter.module.css'
import { data } from '../../utils/data';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import { setMaxPrice, setCategory,removeCategory,
         setSearchQuery, filterProducts, sortLowToHigh,
         sortHighToLow } from '../../redux/reducers/productReducer';


export default function Filter(){
    const categories = Array.from(new Set(data.map(item => item.category)));
    // const products = useSelector(state=> state.productReducer.products);
    const maxProductPrice = useSelector(state=> state.productReducer.maxProductPrice);
    const minProductPrice = useSelector(state=> state.productReducer.minProductPrice);

    const [priceInput, setPriceInput] = useState(maxProductPrice);
    const [sort, setSort] = useState();
    const dispatch = useDispatch();
  

    // const priceFilterRef = useRef();
    // const priceMobileFilter = useRef();
    const searchFiltertRef = useRef();
    const searchMobileFiltertRef = useRef();

    const handleProductSearch = ()=>{
        const value = searchFiltertRef.current.value.trim();
            dispatch(setSearchQuery(value))
            dispatch(filterProducts())
            setSort(null)
    }

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        const isChecked = event.target.checked;
        if(isChecked){
            dispatch(setCategory(value))
            dispatch(filterProducts())
            setSort(null)
        }else{
            dispatch(removeCategory(value))
            dispatch(filterProducts())
            setSort(null)
        } 
    };

    const handlePriceChange = (e) => {
        const filteredPrice = e.target.value;
        dispatch(setMaxPrice(filteredPrice));
        dispatch(filterProducts());
        setSort(null)
        setPriceInput(filteredPrice);
    };

    const handleLow = () =>{
        if(sort == 'low'){
            return;
        }
        dispatch(sortLowToHigh());
        setSort("low")

    }
    const handleHigh = () =>{
        if(sort == 'high'){
            return;
        }
        dispatch(sortHighToLow());
        setSort("high")
    }

    return(
        <>
        <div className={styles.filters}>
            <div className={styles.search}>
                <input type="text" placeholder='searchProduct' onChange={handleProductSearch} ref={searchFiltertRef}/>
            </div>

           <div className={styles.categories}>
            <h2>Categories</h2>
            <ul>
                {categories.map((item)=>(
                    <li>
                    <input type="checkbox" name={item} value={item} onChange={handleCheckboxChange}/>
                    <label htmlFor={item}>{item}</label>
                    </li>
                ))}
                
            </ul>
           </div>

           <div className={styles.priceFilter}>
                <h4>Filter by price</h4>
                <p>&#8377; {priceInput}</p>
                <input type="range"   min={minProductPrice} max={maxProductPrice} value={priceInput} onChange={handlePriceChange}/>
           </div>
           <div className={styles.sortPrice}>
                <h4>Sort By Price</h4>
                <div className={styles.sortName}>
                    <p className={sort =="low" ? styles.sortActive : styles.sortIncative}
                        onClick={handleLow}>Low to High</p>
                    <p className={sort == "high" ? styles.sortActive : styles.sortIncative}
                        onClick={handleHigh}>High to Low</p> 
                </div>
           </div>

        </div>

        <div className={styles.filtersMobile}>

            <div className={styles.mFilterTop}>

                <input type="text" placeholder='search product' ref={searchMobileFiltertRef} className={styles.mSearch}/>
                <Dropdown autoClose="outside" className={styles.dropdown}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                   <span className={styles.dropdownHeader}>Categories</span> 
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.catMenu}>
                {categories.map((category, index) => (
                    <Dropdown.Item key={index} as="div" >
                     <input type="checkbox" key={index} value={category} name={category} id={category} 
                      onChange={handleCheckboxChange}/>
                            <span>{category}</span>
                    </Dropdown.Item>
                ))}
                    
                </Dropdown.Menu>
                </Dropdown>

            </div>

            <div className={styles.mFilterBottom}>
        
                <div className={styles.priceFilter}>
                    <h4 className={styles.priceDesc}>Filter by price: &#8377; 10000</h4>
                    {/* <p>&#8377; 10000</p> */}
                    <input type="range"  value={10000} min="5000" max="20000" />
                </div>

                <div className={styles.mSortName}>
                    <p className={sort =="low" ? styles.sortActive : styles.sortIncative}
                        onClick={handleLow}>Low to High</p>
                    <p className={sort == "high" ? styles.sortActive : styles.sortIncative}
                        onClick={handleHigh}>High to Low</p> 
                </div>

            </div>
            
        </div>
        </>
    )
}






{/* <Dropdown autoClose="outside">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Categories
                </Dropdown.Toggle>
                <Dropdown.Menu className={styles.catMenu}>
                {categories.map((category, index) => (
                    <Dropdown.Item key={index} as="div" >
                        <Form.Check
                            type="checkbox"
                            id={`checkbox-${index}`}
                            label={category}
                            value={category}
                            // onChange={handleCheckboxChange}
                        />
                    </Dropdown.Item>
                ))}
                    
                </Dropdown.Menu>
                </Dropdown> */}



                // <div className={styles.mCatFilter}>
                //     <div className={styles.mCatFilterHeader}><p>Categories &#8595;</p></div>

                //     <ul className={styles.catMenu}>
                //     {categories.map((category, index) => (
                //         <li className={styles.catList}>
                //             <input type="checkbox" key={index} value={category} name={category} id={category} />
                //             <span>{category}</span>
                //          </li>
                //     ))}
                //     </ul>
                // </div>