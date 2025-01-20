"use client"
import React, { useState } from 'react';
import { API_URL } from '@/http/intex';
import UserProfileService from '@/modules/services/UserProfileService';
import FileUploadService from '@/modules/services/FileUploadService';
import { useRouter } from 'next/navigation';
import { Context } from '@/store/provider';
import MyInput from '@/components/ui-kit/MyInput';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'
import styles from '@/styles/forms.module.scss'

export default function ProfileEdit({ params }: { params: Promise<{ id: string }> }) {
  const { store } = React.useContext(Context)
  const { id } = React.use(params)
  const { push } = useRouter();
  const [name, setName] = useState<string>(store.user.firstName);
  const [surname, setSurname] = useState<string>(store.user.lastName);
  const [phoneNumber, setPhone] = React.useState<any>(String(store.user.phoneNumber) || '')
  const [email, setEmail] = useState<string>(store.user.email);
  const [about, setAbout] = useState<string>(store.user.ownProfiles[0].description)
  const [image, setImage] = React.useState(store.user.photo ? `${API_URL}/storage/images/${id}/${store.user.photo}` : "")

  const [selectedImage, setSelectedImage] = React.useState<File>()

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0])
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const ResetImg = () => setImage("")


  const Update = async () => {
    var avatar = ""
    try {
      if (selectedImage) {
        const UploadAvatar = await FileUploadService.saveOne(selectedImage, Number(id), "images")

        avatar = UploadAvatar.data.savedFiles.savedFiles[0].savedName

        if (store.user?.photo) {
          FileUploadService.delete(id, store.user.photo, "images")
        }
      }
      const UpdateUser = await UserProfileService.updateUserById({
        id: store.user.id,
        username: store.user.username,
        firstName: name,
        lastName: surname,
        photo: avatar || store.user.photo,
        phoneNumber: phoneNumber || store.user.phoneNumber,
        email: email,
      })

      if (about && store.user?.ownProfiles[0].id) {
        const profile = await UserProfileService.editProfile({
          id: store.user?.ownProfiles[0].id,
          description: about,
          photos: store.user?.ownProfiles[0].photos,
          type: store.user?.ownProfiles[0].type
        })
      }
      push('/profile')

    } catch (e) {
      console.log(e);
    }
  }


  return (
    <main>
      <div className={styles.container}>
        <div className={styles.settings} >
          <div className={styles.settings__top}>
            <a href="javascript:history.back()" className="back-link mob">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                <rect width="28" height="28" rx="14" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0959 19.7071C16.4865 19.3166 16.4865 18.6834 16.0959 18.2929L11.8031 14L16.0959 9.70711C16.4865 9.31658 16.4865 8.68342 16.0959 8.29289C15.7054 7.90237 15.0723 7.90237 14.6817 8.29289L10.0353 12.9393C9.4495 13.5251 9.4495 14.4749 10.0353 15.0607L14.6817 19.7071C15.0723 20.0976 15.7054 20.0976 16.0959 19.7071Z" fill="#7786A5" />
              </svg>
            </a>
            <h4>Customize your profile</h4>
          </div>
          <div className={styles.form__inner}>
            <div className={styles.form__heading}>
              Profile photo <span className={styles.red}>*</span>
            </div>
            <div className={styles.form__line}>
              Upload a minimum of one profile photo. Weight up to 10 mb. Optimal resolution 600 x 600px. Available format jpg / png
            </div>
            <div className={styles.form__body}>
              {!image &&
                <div className={styles.image__input}>
                  <input type="file" onChange={onImageChange} id='img-file' />
                  <label htmlFor="img-file">
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

              {image &&
                <div className={styles.avatar__box}>
                  <img alt="preview image" src={image} className={styles.avatar} />
                  <button onClick={ResetImg}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.7735 4.22702C14.0664 4.51992 14.0664 4.99479 13.7735 5.28768L10.0611 9.0001L13.7734 12.7124C14.0663 13.0053 14.0663 13.4802 13.7734 13.7731C13.4805 14.066 13.0057 14.066 12.7128 13.7731L9.00045 10.0608L5.28824 13.773C4.99535 14.0659 4.52048 14.0659 4.22758 13.773C3.93469 13.4801 3.93469 13.0052 4.22758 12.7123L7.93979 9.0001L4.22748 5.28779C3.93459 4.9949 3.93459 4.52002 4.22748 4.22713C4.52038 3.93424 4.99525 3.93424 5.28814 4.22713L9.00045 7.93944L12.7129 4.22702C13.0058 3.93413 13.4806 3.93413 13.7735 4.22702Z" fill="white" />
                    </svg>
                  </button>
                </div>
              }
            </div>

          </div>
          <div className={styles.form__inner}>
            <div className={styles.form__heading}>
              Personal information <span className={styles.red}>*</span>
            </div>
            <div className={styles.form__line}>
              Your personal data will be available to all users of the platform
            </div>
            <div className={styles.form__body}>
              <div className={styles.form__grid__optional}>
                <MyInput label='First name'
                  value={name}
                  required
                  onChange={e => { setName(e.target.value.trim()) }}
                />
                <MyInput label='Last name'
                  value={surname}
                  required
                  onChange={e => { setSurname(e.target.value.trim()) }}
                />


              </div>
            </div>

          </div>
          <div className={styles.form__inner}>
            <div className={styles.form__heading}>
              Contacts
            </div>
            <div className={styles.form__line}>
              All data except email is visible to users who open their contacts to you
            </div>
            <div className={styles.form__body}>
              <div className={styles.form__grid__optional}>
                <div className={'Phone ' + (phoneNumber ? styles.activeBorder : "")}>
                  {!phoneNumber && <p>Telephone <span className='required'>*</span></p>}
                  <PhoneInput
                    defaultCountry="FR"
                    value={phoneNumber}
                    onChange={setPhone}
                  />
                </div>

                <MyInput label='E-mail'
                  value={email}
                  type='email'
                  required
                  onChange={e => { setEmail(e.target.value) }}
                />

              </div>

            </div>

          </div>

          <div className={styles.form__inner}>
            <div className={styles.form__heading}>
              About me
            </div>
            <div className={styles.form__line}>
              Write about yourself and the benefits of working with you
            </div>
            <div className={styles.form__body}>
              <div className={styles.text__box}>
                <div className={styles.text__counter}>
                  {about.length}/500
                </div>
                <textarea onChange={e => { setAbout(e.target.value) }} value={about} placeholder='About' maxLength={500} className={about ? styles.activeBorder : ""} />
              </div>

            </div>

          </div>
          <button className={styles.send + (name || surname || image ? ' blue-btn' : "")} onClick={Update}>Save</button>


        </div>


      </div >

    </main >
  );
}
