"use client"
import React from 'react'
import Link from 'next/link';
import { useState } from 'react';
import { IUser } from '@/modules/types/User';
import styles from '../index.module.scss'
import { API_URL } from '@/http/intex';

export default function ProfileInfo({ user }: { user: IUser }) {

  const profile = user?.ownProfiles?.length > 0 ? user?.ownProfiles[0] : null

  const [read, setRead] = useState(false)

  const readMore = () => {
    if (read === false) {
      setRead(true)
    } else {
      setRead(false)
    }
  }
  const userDate = () => {
    const date = profile?.created ?? 0
    let currentDate = Math.floor(((new Date()).getTime() - (new Date(date)).getTime()) / 2592000000);
    let temp = ""

    if (currentDate >= 12) {
      temp = `${Math.floor(currentDate / 12)} years${currentDate > 12 ? `, ${currentDate % 12} months` : ""} `
    }
    else if (currentDate > 0) {
      temp = `${currentDate} months`
    }
    else {
      temp = "under a month"
    }

    return temp;
  }

  return (
    <>
      <div className="container-fluid ">
        {profile &&

          <>
            <div className={styles.head}>
              <div className={styles.top}>

                <img src={user.photo ? `${API_URL}/storage/images/${user.id}/${user.photo}` : "/img/static/grey.png"} alt="" className='profilepic' />
                <div className={styles.info}>
                  <div className={styles.info__left}>
                    <div className={styles.info__name}>{user.firstName} {user.lastName}</div>
                    <div>
                      {profile.type.replace(/_/gi, ' ')}
                    </div>
                    <div >Country / City</div>
                    <div className={styles.info__pass}>Passport validated</div>
                    <div className={styles.feeds}>No reviews</div>
                  </div>
                  <div className={styles.info__right}>
                    <div>ID: <span>{user.id}</span></div>
                    <div>On the site: <span>{userDate()}</span></div>
                  </div>
                </div>
              </div>
              <div className={styles.contacts}>
                {user.phoneNumber &&
                  <a className={styles.contacts__item + " " + styles.tel} href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a>
                }
                {user.email &&
                  <a className={styles.contacts__item + " " + styles.email} href={`mailto:${user.email}`}>{user.email}</a>
                }
                {/* <Link className='profile-contact tg' href="">Telegram</Link>
                <Link className='profile-contact ws' href="">WhatsApp</Link>
                <Link className='profile-contact vb' href="">Viber</Link>
                <Link className='profile-contact zm' href="">Zoom</Link> */}
              </div>
            </div>

            {/* <div className="profile-info-wrap">
          <div className="profile__info-box white-box">
            <div className="profile__info-item">
              <span>176</span>
              <p>Отправлено предложений</p>
            </div>
            <div className="profile__info-item">
              <span>19</span>
              <p>Получено предложений</p>
            </div>
            <div className="profile__info-item">
              <span>45</span>
              <p>Получено контактов</p>
            </div>
            <div className="profile__info-item">
              <span>16</span>
              <p>Совершено сделок</p>
            </div>
            <div className="profile__info-item">
              <span>0</span>
              <p>Создано объектов</p>
            </div>
            <div className="profile__info-item">
              <span>228</span>
              <p>Просмотров профиля</p>
            </div>
          </div>
        </div> */}

            <div className={styles.box}>
              <div >
                <h4 className={styles.heading}>About me</h4>
              </div>
              {
                profile.description &&
                <div className="about__box">
                  <div className={read ? "readmore-box readmore-open" : "readmore-box"}>
                    <div className="readmore">
                      <p>{profile.description}</p>
                    </div>
                    {profile.description.length > 300 &&
                      <button className='btn-reset readmore-btn' onClick={readMore}>
                        {read ? "Close" : "More"}
                      </button>
                    }

                  </div>
                </div>
              }


              {/* <div className="video">
            <h6 className="video-heading">Видео<span>1</span></h6>
            <div className="video-box">
              <div className="video-item">
                <img src="./img/video.png" alt="Video preview" />
                <button className='video-play-video'></button>
              </div>
            </div>
          </div> */}
            </div>
            {/* <div className="estate white-box">

          <div className="estate-title">Параметры недвижимости</div>
          <div className="profile-line">Параметры недвижимости, которой сейчас занимаюсь</div>

          <div className="estate-grid">
            <div className="estate-item">
              <span className="estate-item-title">Город недвижимости</span>
              <div className="estate-item-list">
                <div className="estate-list__item">Москва</div>
                <div className="estate-list__item">Санкт-Петербург</div>
              </div>
            </div>
            <div className="estate-item">
              <span className="estate-item-title">Формат сделки</span>
              <div className="estate-item-list">
                <div className="estate-list__item">Покупка</div>
              </div>
            </div>
            <div className="estate-item">
              <span className="estate-item-title">Тип недвижимости</span>
              <div className="estate-item-list">
                <div className="estate-list__item">Квартира</div>
                <div className="estate-list__item">Апартаменты</div>
                <div className="estate-list__item">Дуплекс</div>
                <div className="estate-list__item">Вилла</div>
                <div className="estate-list__item">Пентхаус</div>
                <div className="estate-list__item">Коттедж</div>
                <div className="estate-list__item">Особняк</div>
                <div className="estate-list__item">Виноградник</div>
                <div className="estate-list__item">Остров</div>
              </div>
            </div>
            <div className="estate-item">
              <span className="estate-item-title">Состояние</span>
              <div className="estate-item-list">
                <div className="estate-list__item">Новая</div>
              </div>
            </div>
          </div>
        </div>
        <div className="license white-box">
          <div className="section-head">
            <h4 className='section-head__title'>Лицензии и сертификаты <span>2</span></h4>
          </div>
          <div className="license-box">
            <div className="license-item">
              <img src="./img/license.jpg" alt="" />
            </div>
          </div>
        </div> */}
            <Link href={`/profile/edit/${user.id}`} className={styles.settings__btn}><span>Edit profile</span></Link>

          </>

        }


      </div>
    </>
  )
}
