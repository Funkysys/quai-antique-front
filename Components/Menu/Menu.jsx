import React, { useEffect, useState } from 'react'
import styles from "./Menu.module.css"
import DishesCard from '../DishesCard/DishiesCard'

const Menu = ({ formulas, categories }) => {
    const [toggle, setToggle] = useState(true)
    const [formules, setFormules] = useState(true)
    const [menu, setMenu] = useState(false)

    const handleOnFormules = () => {
        if (!toggle) {
            setToggle(true)
            setFormules(true)
            setMenu(false)
        }
    }
    const handleOnMenu = () => {
        if (toggle) {
            setToggle(false)
            setFormules(false)
            setMenu(true)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.navbarMenu}>
                <button
                    onClick={handleOnFormules}
                    className={!formules ? styles.link : styles.activeButton}
                >
                    Nos formules
                </button>
                <button
                    onClick={handleOnMenu}
                    className={!menu ? styles.link : styles.activeButton}
                >
                    La carte des plats
                </button>
            </div>
            {
                formules &&
                <div className={styles.formulasContainer}>
                    {formulas['hydra:member'].map(elt => {
                        return (
                            <div key={elt.id} className={styles.formulas}>
                                <p className={styles.formulasTitle}>{elt.title} : </p>
                                <p className={styles.formulasPrice}>{elt.price} €</p>
                            </div>
                        )
                    })}
                </div>
            }
            {
                menu &&
                <DishesCard categories={categories}/>
            }
        </div >
    )
}

export default Menu