
import { useState } from 'react';
import styles from './OpeningHours.module.css'
import useSortByDay from '@/hooks/useSortByDay'

const OpeningHours = ({ opening_hours }) => {
  const [toggle, setToggle] = useState()
  const openningLunch = {};
  const openningDiner = {}
  opening_hours['hydra:member'].map(elt => {
    let closeMinutes = elt.closeMinutes.minutes
    let openMinutes = elt.openMinutes.minutes
    let dayIndex;
    if (elt.day.day === "Lundi") {
      dayIndex = 1
    }
    if (elt.day.day === "Mardi") {
      dayIndex = 2
    }
    if (elt.day.day === "Mercredi") {
      dayIndex = 3
    }
    if (elt.day.day === "Jeudi") {
      dayIndex = 4
    }
    if (elt.day.day === "Vendredi") {
      dayIndex = 5
    }
    if (elt.day.day === "Samedi") {
      dayIndex = 6
    }
    if (elt.day.day === "Dimanche") {
      dayIndex = 7
    }
    closeMinutes === 0 ? closeMinutes = "" : closeMinutes = elt.closeMinutes.minutes
    openMinutes === 0 ? openMinutes = "" : openMinutes = elt.openMinutes.minutes
    if (!elt.close) {
      if (elt.lunch) {
        openningLunch[`${elt.day.day}`] = [`${elt.openingHours.hour} H ${openMinutes}`, `${elt.closeHours.hour} H ${closeMinutes}`, dayIndex]
      } else if (elt.diner) {
        openningDiner[`${elt.day.day}`] = [`${elt.openingHours.hour} H ${openMinutes}`, `${elt.closeHours.hour} H ${closeMinutes}`, dayIndex]
      }
    } else if (elt.close && elt.lunch) {
      return openningLunch[elt.day.day] = ["on a aqua-poney", dayIndex]
    } else if (elt.close && elt.diner) {
      return openningDiner[elt.day.day] = ["Ce soir, on fait la bringue !", dayIndex]
    } else if (elt.close) {
      openningLunch[elt.day.day] = ["on a aqua-poney", dayIndex]
      openningDiner[elt.day.day] = ["même le soir !", dayIndex]
    }
  })
  const openingArrLunch = Object.entries(openningLunch)
  const openingArrDiner = Object.entries(openningDiner)
  useSortByDay(openingArrLunch)
  useSortByDay(openingArrDiner)
  

  return (
    <div className={styles.openingContainer}>
      <h2 className={styles.openingTitle}>{`Horaires d'ouverture`}</h2>

      <div className={styles.openingContainerLunchAndDiner}>
        <div className={styles.openingLunch}>
          {
            openingArrLunch.map(elt => {
              return (
                <>
                  {
                    elt[1][0] !== "on a aqua-poney" ?
                      <div className={styles.lunchContainer} key={elt[1][2]}>
                        <div className={styles.lunchDay}>
                          <p >{elt[0]} : </p>
                        </div>
                        <div className={styles.lunchHour}>
                          <p> {elt[1][0]} - {elt[1][1]}</p>
                        </div>
                      </div>
                      :
                      <div className={styles.lunchContainer} key={elt[1][1]}>
                        <div className={styles.lunchDay}>
                          <p >{elt[0]} : </p>
                        </div>
                        <div className={styles.lunchHour}>
                          <p>{elt[1][0]}</p>
                        </div>
                      </div>
                  }
                </>
              )
            })
          }
        </div>
        <div >
          {
            openingArrDiner.map(elt => {
              return (
                <>
                  {
                    elt[1][0].length < 10 ?
                      <div key={elt[1][2]} className={styles.dinerHour}>
                        <p>{elt[1][0]} - {elt[1][1]}</p>
                      </div>
                      :
                      <div className={styles.dinerHour}>
                        <p key={elt[1][1]}>{elt[1][0]}</p>
                      </div>
                  }
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default OpeningHours