"use client"
import { IUser } from '@/modules/types/User';
import React from 'react'
import styles from '../index.module.scss'


export default function ProfileNotice({ user }: { user: IUser }) {

  return (
    <>
      <div className="container-fluid">


        <div className={styles.box}>
          <h4 className={styles.heading}>Your notifications</h4>
          <div className={styles.options}>
            <div className={styles.options__item}>
              <span>All incoming messages</span>
              <input type="checkbox" className={styles.checkbox} checked={true} />
            </div>
            <div className={styles.options__item}>
              <span>New, appropriate applications for me</span>
              <input type="checkbox" className={styles.checkbox} checked={true} />
            </div>
            <div className={styles.options__item}>
              <span>Responses to my applications</span>
              <input type="checkbox" className={styles.checkbox} checked={true} />
            </div>
            <div className={styles.options__item}>
              <span>Receiving contacts</span>
              <input type="checkbox" className={styles.checkbox} checked={true} />
            </div>

            <div className={styles.options__item}>
              <span>Promotions and news of 1Key</span>
              <input type="checkbox" className={styles.checkbox} />
              {/* <label htmlFor=""></label> */}
            </div>
          </div>

        </div>
        <div className={styles.box}>
          <h4 className={styles.heading}>Where you get notifications</h4>
          <div className={styles.options}>
            <div className={styles.options__item}>
              <span>By e-mail — {user.email}</span>
              <button className="profile-opion__choice btn-reset">Change</button>
              <input type="checkbox" className={styles.checkbox} checked={true} />
            </div>

            <div className={styles.options__item}>
              <span>In Telegram</span>
              <button className="profile-opion__choice btn-reset">Add Telegram</button>
              <input type="checkbox" className={styles.checkbox} />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
