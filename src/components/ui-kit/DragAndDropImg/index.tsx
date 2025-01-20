


import React from "react";
import styles from "./index.module.scss"
import { API_URL } from '@/http/intex';

interface ImageUploadProps {
  multiple?: boolean,
  onChange: (e: FileList) => void,
  id?: string,
  srcList?: string[]
}

const src = API_URL + '/storage/images/'

const ImageUpload = ({ multiple, onChange, id, srcList }: ImageUploadProps) => {

  const [images, setImages] = React.useState<string[]>(srcList || [])
  // const [selectedImage, setSelectedImage] = React.useState<FileList>()

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // setSelectedImage(event.target.files)
      let urls: string[] = []
      Array.from(event.target.files).forEach(file => {
        urls.push(URL.createObjectURL(file))
      })
      setImages(urls)
      onChange(event.target.files)
    }
  }

  // const ResetImg = () => setImages([])


  return (
    <div className={styles.uploader}>
      {images.length > 0 &&
        <div className={styles.selected__box}>
          {images.map((link: string, index: number) => {
            return (
              <div className={styles.selected__image} key={index}>
                {
                  (srcList && srcList.includes(link)) ?
                    < img src={src + link} alt="1Key object image" />
                    :
                    < img src={link} alt="1Key object image" />

                }
              </div>
            )
          })}
          <div className={styles.boxed_input}>
            <input type="file" onChange={onImageChange} id={`img-file${id}`} multiple />
            <label htmlFor={`img-file${id}`}>
              <svg width="39" height="36" viewBox="0 0 39 36" fill="none" >
                <path d="M10.5938 20.1736C9.75993 17.0617 11.8443 13.7995 15.2492 12.8871L27.5797 9.58316C30.9846 8.6708 34.4209 10.4539 35.2547 13.5658L38.2742 24.8349C39.1081 27.9468 37.0237 31.2091 33.6188 32.1214L21.2883 35.4254C17.8834 36.3377 14.4471 34.5547 13.6133 31.4428L10.5938 20.1736Z" fill="#E1EDFD" />
                <path d="M30.666 13.1663C30.666 9.94468 28.0543 7.33301 24.8327 7.33301H13.166C9.94435 7.33301 7.33268 9.94468 7.33268 13.1663V24.833C7.33268 28.0547 9.94435 30.6663 13.166 30.6663H24.8327C28.0543 30.6663 30.666 28.0547 30.666 24.833V13.1663Z" fill="white" />
                <path d="M25.9994 14.333C25.9994 15.6217 24.9547 16.6663 23.666 16.6663C22.3774 16.6663 21.3327 15.6217 21.3327 14.333C21.3327 13.0443 22.3774 11.9997 23.666 11.9997C24.9547 11.9997 25.9994 13.0443 25.9994 14.333Z" fill="white" />
                <path d="M30.0827 25.4163L27.447 23.5337C26.6116 22.937 25.4673 23.0317 24.7414 23.7576L23.4893 25.0097C22.9426 25.5565 22.0561 25.5565 21.5094 25.0097L15.6887 19.1891C14.9207 18.4211 13.6938 18.3654 12.8594 19.0607L7.33269 23.6663M24.8327 30.6663H13.166C9.94435 30.6663 7.33268 28.0547 7.33268 24.833V13.1663C7.33268 9.94468 9.94435 7.33301 13.166 7.33301H24.8327C28.0543 7.33301 30.666 9.94468 30.666 13.1663V24.833C30.666 28.0547 28.0543 30.6663 24.8327 30.6663ZM25.9994 14.333C25.9994 15.6217 24.9547 16.6663 23.666 16.6663C22.3774 16.6663 21.3327 15.6217 21.3327 14.333C21.3327 13.0443 22.3774 11.9997 23.666 11.9997C24.9547 11.9997 25.9994 13.0443 25.9994 14.333Z" stroke="#2A344A" stroke-width="1.78125" stroke-linecap="round" />
                <rect x="1" y="1" width="14" height="14" rx="7" fill="#E1EDFD" />
                <rect x="1" y="1" width="14" height="14" rx="7" stroke="white" stroke-width="2" />
                <path d="M10.4234 8.31233H6.20117M8.31228 10.4234V6.20117" stroke="#0000FF" stroke-width="1.1875" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </label>
          </div>
        </div>
      }

      {images.length == 0 &&
        <div className={styles.image__input}>
          <input type="file" onChange={onImageChange} id={`img-file${id}`} multiple />
          <label htmlFor={`img-file${id}`}>
            <svg width="39" height="36" viewBox="0 0 39 36" fill="none" >
              <path d="M10.5938 20.1736C9.75993 17.0617 11.8443 13.7995 15.2492 12.8871L27.5797 9.58316C30.9846 8.6708 34.4209 10.4539 35.2547 13.5658L38.2742 24.8349C39.1081 27.9468 37.0237 31.2091 33.6188 32.1214L21.2883 35.4254C17.8834 36.3377 14.4471 34.5547 13.6133 31.4428L10.5938 20.1736Z" fill="#E1EDFD" />
              <path d="M30.666 13.1663C30.666 9.94468 28.0543 7.33301 24.8327 7.33301H13.166C9.94435 7.33301 7.33268 9.94468 7.33268 13.1663V24.833C7.33268 28.0547 9.94435 30.6663 13.166 30.6663H24.8327C28.0543 30.6663 30.666 28.0547 30.666 24.833V13.1663Z" fill="white" />
              <path d="M25.9994 14.333C25.9994 15.6217 24.9547 16.6663 23.666 16.6663C22.3774 16.6663 21.3327 15.6217 21.3327 14.333C21.3327 13.0443 22.3774 11.9997 23.666 11.9997C24.9547 11.9997 25.9994 13.0443 25.9994 14.333Z" fill="white" />
              <path d="M30.0827 25.4163L27.447 23.5337C26.6116 22.937 25.4673 23.0317 24.7414 23.7576L23.4893 25.0097C22.9426 25.5565 22.0561 25.5565 21.5094 25.0097L15.6887 19.1891C14.9207 18.4211 13.6938 18.3654 12.8594 19.0607L7.33269 23.6663M24.8327 30.6663H13.166C9.94435 30.6663 7.33268 28.0547 7.33268 24.833V13.1663C7.33268 9.94468 9.94435 7.33301 13.166 7.33301H24.8327C28.0543 7.33301 30.666 9.94468 30.666 13.1663V24.833C30.666 28.0547 28.0543 30.6663 24.8327 30.6663ZM25.9994 14.333C25.9994 15.6217 24.9547 16.6663 23.666 16.6663C22.3774 16.6663 21.3327 15.6217 21.3327 14.333C21.3327 13.0443 22.3774 11.9997 23.666 11.9997C24.9547 11.9997 25.9994 13.0443 25.9994 14.333Z" stroke="#2A344A" stroke-width="1.78125" stroke-linecap="round" />
              <rect x="1" y="1" width="14" height="14" rx="7" fill="#E1EDFD" />
              <rect x="1" y="1" width="14" height="14" rx="7" stroke="white" stroke-width="2" />
              <path d="M10.4234 8.31233H6.20117M8.31228 10.4234V6.20117" stroke="#0000FF" stroke-width="1.1875" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <span>Select an image</span>
          </label>

        </div>
      }
    </div>
  )
}

export default ImageUpload;
