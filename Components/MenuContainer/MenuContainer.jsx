import React, { useEffect, useState } from 'react'
import styles from './MenuContainer.module.css'
import Menu from '../Menu/Menu'

const MenuContainer = ({formulas, categories}) => {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    useEffect(() => {
        setWidth(window.innerHeight)
        setHeight(window.innerWidth)
    }, [width, height])
    return (
        width < height ?
        <div className={styles.menu} >
            <div className={styles.dishes}><Menu categories={categories} formulas={formulas}/></div>
            <div className={styles.photoMenu}></div>
        </div>
        : 
        <div className={styles.menu}>
            <div className={styles.photoMenu}></div>
            <div className={styles.dishes}><Menu categories={categories} formulas={formulas}/></div>
        </div>
    )
}

export default MenuContainer