"use client"
import React from 'react'
import Header from '@/components/layouts/Header';
import ProfileInfo from '@/components/layouts/Profile/ProfileInfo';
import ProfileNotice from '@/components/layouts/Profile/ProfileNotice';
import ProfileSecurity from '@/components/layouts/Profile/ProfileSecurity';
import { useState } from 'react';
import { Footer } from '@/components/layouts/Footer';
import { Context } from '@/store/provider';
import styles from './index.module.scss';

const Profile = () => {

  const { store } = React.useContext(Context)
  const user = store.user

  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index: number) => setActiveIndex(index);
  const checkActive = (index: number) => activeIndex === index ? true : false;

  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className="container-fluid">
          <div className="tabs white-box">
            <div className="tabs__title">My profile</div>
            <div className="tabs__buttons">
              <button className={`tabs__btn btn-reset  ${checkActive(1) ? "active" : ""}`}
                onClick={() => handleClick(1)}>Personal data</button>
              <button className={`tabs__btn btn-reset  ${checkActive(2) ? "active" : ""}`}
                onClick={() => handleClick(2)}>Notices</button>
              <button className={`tabs__btn btn-reset  ${checkActive(3) ? "active" : ""}`}
                onClick={() => handleClick(3)}>Safety</button>
            </div>
          </div>
        </div>
        <div className={styles.panels}>
          {checkActive(1) ? <ProfileInfo user={user} /> : ""}
          {checkActive(2) && <ProfileNotice user={user} />}
          {checkActive(3) && <ProfileSecurity user={user} />}
        </div>


      </div>
      <Footer />
    </>
  )
}


export default Profile;
