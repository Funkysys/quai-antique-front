import React, { useState } from 'react'
import styles from './DishiesCard.module.css'
import { Markup } from 'interweave';

const DishiesCard = ({ categories }) => {
  const allCategories = categories['hydra:member'].map(elt => elt)
  const [selectedCategory, setSeletedCategory] = useState(allCategories[0])

  console.log(selectedCategory);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        {
          allCategories.map(elt => {
            return (
              <button
                key={elt.id}
                className={styles.categories}
                onClick={() => setSeletedCategory(elt)}
              >
                {elt.title}
              </button>
            )
          })
        }
      </div>
      <div className={styles.dishesContainer}>
        {
          selectedCategory.dishes.map(elt => {
            return (
              <div className={styles.dishes}>
                <div className={styles.dishesTitleAndPrice}>
                  <p className={styles.dishesTitle}>{elt.title} </p>
                  <p className={styles.dishesPrice}>{elt.price > 0 && `: ${elt.price} €`}</p>
                </div>
                <Markup className={styles.dishesDescription} content={elt.description} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DishiesCard