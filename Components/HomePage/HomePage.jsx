import React from 'react'
import styles from './HomePage.module.css'
import img from '@/public/Images/3.jpg'

const HomePage = () => {
    const styling = {
        marginTop: "-10px",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundAttachement: "fixed"
    }

    return (
        <div className={styles.homePage}>
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>Bienvenu chez <br /><span className={styles.titleSpan}>Quai-Antique</span></h1>
            </div>
        </div>
    )
}

export default HomePage