import React, { useState, useContext, useEffect } from 'react';
import { Context } from '@/lib/context';
import styles from './DishiesCard.module.css';
import { Markup } from 'interweave';

const DishiesCard = ({ categories }) => {
  const { state } = useContext(Context);
  const allCategories = categories['hydra:member'].map(elt => elt);
  const [selectedCategory, setSeletedCategory] = useState(allCategories[0]);
  const [user, setUser] = useState();
  const [userAllergies, setUserAllergies] = useState([]);
  useEffect(() => {
    const userInfosFunc = async () => {
      const endpoint = `https://quai-antique.xyz/api/users/${state?.user.id} `;

      const options = {
        method: 'GET',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${localStorage.token}`
        },
      };
      const response = await fetch(endpoint, options);
      if (response.status == 200) {
        const result = await response.json();
        await setUser({
          name: result.name,
          allergies: result.allergies,
        });

      } else {
        return <h1>Veuillez vous reconnectez</h1>;
      }
    }
    userInfosFunc();
  }, [state]);
  useEffect(() => {
    if (user?.allergies !== []) {
      user?.allergies.filter(elt => {
        if (!userAllergies.includes(elt.id)) {
          setUserAllergies(el => [...el, elt.id]);
        };
      });
    }

  }, [user]);
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
            if (elt.allergies.length) {
              elt.allergens = []
              elt.allergies.map(el => {
                if (userAllergies.includes(el.id)) {
                  elt.allergens.push(el)
                }
              })
              return (
                elt.allergens.length ?
                  <div className={styles.dishes} key={elt.id}>

                    <div className={styles.dishesTitleAndPriceAllergens}>
                      <p className={styles.dishesTitle}>* {elt.title} </p>
                      <p className={styles.dishesPrice}>{elt.price > 0 && `: ${elt.price} €`}</p>
                    </div>
                    <p className='text-danger fs-6'> Ce plat contient des allergènes que vous avez signalé <span>( {elt.allergens.map(elt => `${elt.name} `)})</span></p>
                    <Markup className={styles.dishesDescriptionAllergens} content={elt.description} />
                  </div>
                  :
                  <div className={styles.dishes} key={elt.id}>
                    <div className={styles.dishesTitleAndPrice}>
                      <p className={styles.dishesTitle}>{elt.title} </p>
                      <p className={styles.dishesPrice}>{elt.price > 0 && `: ${elt.price} €`}</p>
                    </div>
                    <Markup className={styles.dishesDescription} content={elt.description} />
                  </div>
              )
            } else {
              return (
                <div className={styles.dishes} key={elt.id}>
                  <div className={styles.dishesTitleAndPrice}>
                    <p className={styles.dishesTitle}>{elt.title} </p>
                    <p className={styles.dishesPrice}>{elt.price > 0 && `: ${elt.price} €`}</p>
                  </div>
                  <Markup className={styles.dishesDescription} content={elt.description} />
                </div>
              )
            }

          })
        }
      </div>
    </div>
  )
}

export default DishiesCard