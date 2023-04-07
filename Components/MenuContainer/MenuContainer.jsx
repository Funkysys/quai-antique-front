import React, { useEffect, useState } from 'react'
import styles from './MenuContainer.module.css'
import Menu from '../Menu/Menu'
import Image from 'next/image'

const MenuContainer = ({ formulas, categories }) => {
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    useEffect(() => {
        setWidth(window.innerHeight)
        setHeight(window.innerWidth)
    }, [width, height])
    return (
        width < height ?
            <div className={styles.menu} >
                <div className={styles.dishes}><Menu categories={categories} formulas={formulas} /></div>
                <div className={styles.photoMenu}>
                    <Image
                        src={"/Images/pexels-rajesh-tp-1600727.jpg"}
                        alt="photo du menu"
                        fill
                        className={styles.customImg}
                        sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw"
                    />
                </div>
            </div>
            :
            <div className={styles.menu}>
                <div className={styles.photoMenu}>
                    <Image
                        src={"/Images/pexels-rajesh-tp-1600727.jpg"}
                        alt="photo du menu"
                        fill
                        className={styles.customImg}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={styles.dishes}><Menu categories={categories} formulas={formulas} /></div>
            </div>
    )
}

export default MenuContainer