
import styles from './OpeningHours.module.css'

const OpeningHours = ({ opening_hours }) => {
  const opening = {};
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
    if (elt.close) {
      opening[elt.day.day] = ["on a aqua-poney", dayIndex]
    } else {
      if (elt.lunch) {
        opening[`${elt.day.day} midi`] = [`${elt.openingHours.hour} H ${openMinutes}`, `${elt.closeHours.hour} H ${openMinutes}`, dayIndex]
      } else if (elt.diner) {
        opening[`${elt.day.day} soir`] = [`${elt.openingHours.hour} H ${openMinutes}`, `${elt.closeHours.hour} H ${closeMinutes}`, dayIndex]
      }
    }
  })

  const openingArr = Object.entries(opening)
  openingArr.sort(function(a, b) {
    if(a[1][2] > b[1][2]){
      return 1
    } else if (a[1][2] < b[1][2]) {
      return -1
    }
  })


  return (
    <div className={styles.openingContainer}>
      <h2 className={styles.openingTitle}>Horaires d'ouverture</h2>
      {
        openingArr.map(elt => {
          return (
            <>
              {
                elt[1][0] !== "on a aqua-poney" ?
                  <p key={elt[1][2]}>{elt[0]} : {elt[1][0]} - {elt[1][1]}</p>
                  :
                  <p key={elt[1][1]}>{elt[0]} : {elt[1][0]}</p>
              }
            </>
          )
        })
      }
    </div>
  )
}

export default OpeningHours