import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import styles from './GalleryImages.module.css'

const GalleryImages = ({ images }) => {
  const [page, setPage] = useState(1)
  const [img, setImg] = useState([])
  const nbPages = Math.ceil(images['hydra:totalItems'] / 6)
  const paginationNumber = []
  for (let i = 1; i <= nbPages; i++) {
    paginationNumber.push(i)
  }
  useEffect(() => {
    if (page === 1) {
      setImg([])
      images['hydra:member'].map(elt => {
        const tempImg = { title: elt.title, url: `https://quai-antique.xyz/asset/images/gallery/${elt.imageName}`, alt: elt.imageAlt }
        if (!img.includes(tempImg)) {
          setImg(img => [...img, tempImg])
        }
      })
    } else {
      const getImagesByPagination = async () => {
        console.log("on est al");
        const res2 = await fetch(`https://quai-antique.xyz/api/images?page=${page}`)
        const result = await res2.json()
        setImg([])
        result['hydra:member'].map(elt => {
          const tempImg = { title: elt.title, url: `https://quai-antique.xyz/asset/images/gallery/${elt.imageName}`, alt: elt.imageAlt }
          if (!img.includes(tempImg)) {
            setImg(img => [...img, tempImg])
          }
        })
      }
      getImagesByPagination()
    }
  }, [page])
  const handleOnClick = () => {
    console.log(event.target.innerText);
    setPage(event.target.innerText)
  }
  return (
    <div className={styles.container}>
      <div className="row">
        {
          img.map(elt => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-4" key={elt.url}>
                <div className="card bg-white p-4 m-3">
                  <Image
                    src={elt.url}
                    alt={elt.alt}
                    fill
                    className={styles.customImg}
                    sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  />
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={styles.pagination} onClick={handleOnClick}>
        {
          paginationNumber.length > 1 &&
          paginationNumber.map(elt => {
            return (
              <Button key={elt}>{elt}</Button>
            )
          })
        }
      </div>
    </div>
  )
}

export default GalleryImages