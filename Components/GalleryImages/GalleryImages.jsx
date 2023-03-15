import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from './GalleryImages.module.css'

const GalleryImages = ({ images }) => {
  const [page, setPage] = useState(1)
  const [img, setImg] = useState([])

  console.log(img);
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
        const res2 = await fetch('https://quai-antique.xyz/api/images')
        const images = await res2.json()
      }
    }
  }, [page])
  return (
    <div className={styles.container}>
      <div class="row">
        {
          img.map(elt => {
            console.log(elt.url);
            return (
              <div className="col-md-4">
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
    </div>
  )
}

export default GalleryImages