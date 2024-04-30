import styles from './OrderCard.module.css';


export default function OrderCard ({orderNum, order}){
    const {orderDate, orderItems, totalCost} = order;
    
    return(
        <div className={styles.orderCard}>

            <div className={styles.cardTop}>
                <h4>#Order: {orderNum}</h4>
                <p>Date: {orderDate}</p>
            </div>
            {orderItems.map((item)=>(
                 <div className={styles.cardBottom}>
                 <div className={styles.cardLeft}>
                     <p className={styles.name}>{item.product}</p>
                     <p className={styles.itemCount}>X {item.count}</p>
                 </div>
 
                 <div className={styles.cardRight}>
                     <p>&#8377; {item.price * item.count}</p>
                 </div>
             </div>
            ))}

            <hr />
            <div className={styles.footer}>
                <div className={styles.footerLeft}>
                    <h6>Total Amount:</h6>
                </div>
                <div className={styles.footerRight}>
                    <h6>&#8377; {totalCost}</h6>
                </div>
            </div>

        </div>
    )
}