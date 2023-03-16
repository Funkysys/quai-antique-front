import React, { useEffect, useState } from 'react'
import styles from './MenuContainer.module.css'
import Menu from '../Menu/Menu'

const MenuContainer = () => {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    useEffect(() => {
        setWidth(window.innerHeight)
        setHeight(window.innerWidth)
    }, [width, height])
    console.log(width);
    return (
        width < height ?
        <div className={styles.menu}>
            <div className={styles.dishes}><Menu /></div>
            <div className={styles.photoMenu}></div>
        </div>
        : 
        <div className={styles.menu}>
            <div className={styles.photoMenu}></div>
            <div className={styles.dishes}><Menu /></div>
        </div>
    )
}

export default MenuContainer