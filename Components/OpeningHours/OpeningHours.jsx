
import { useState } from 'react';
import styles from './OpeningHours.module.css'
import { Button } from 'react-bootstrap';

const OpeningHours = ({ opening_hours }) => {
  const [toggle, setToggle] = useState()
  const opening1 = {};
  const opening2 = {}
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
        opening1[`${elt.day.day}`] = [`${elt.openingHours.hour} H ${openMinutes}`, `${elt.closeHours.hour} H ${openMinutes}`, dayIndex]
      } else if (elt.diner) {
        opening2[`${elt.day.day}`] = [`${elt.openingHours.hour} H ${openMinutes}`, `${elt.closeHours.hour} H ${closeMinutes}`, dayIndex]
      }
    } else if (elt.close && elt.lunch) {
      return opening1[elt.day.day] = ["on a aqua-poney", dayIndex]
    } else if (elt.close && elt.diner) {
      return opening2[elt.day.day] = ["Ce soir, on fait la bringue !", dayIndex]
    } else if (elt.close) {
      opening1[elt.day.day] = ["on a aqua-poney", dayIndex]
      opening2[elt.day.day] = ["même le soir !", dayIndex]
    }
  })

  const openingArr1 = Object.entries(opening1)
  const openingArr2 = Object.entries(opening2)
  openingArr1.sort(function (a, b) {
    if (a[1][2]) {
      if (a[1][2] > b[1][2]) {
        return 1
      } else if (a[1][2] < b[1][2]) {
        return -1
      }
    } else {
      if (a[1][1] > b[1][2]) {
        return 1
      } else if (a[1][1] < b[1][2]) {
        return -1
      }
    }
  })
  openingArr2.sort(function (a, b) {
    if (a[1][2]) {
      if (a[1][2] > b[1][2]) {
        return 1
      } else if (a[1][2] < b[1][2]) {
        return -1
      }
    } else {
      if (a[1][1] > b[1][2]) {
        return 1
      } else if (a[1][1] < b[1][2]) {
        return -1
      }
    }
  })

  return (
    <div className={styles.openingContainer}>
      <h2 className={styles.openingTitle}>Horaires d'ouverture</h2>

      <div className={styles.openingContainerLunchAndDiner}>
        <div className={styles.openingLunch}>
          {
            openingArr1.map(elt => {
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
            openingArr2.map(elt => {
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