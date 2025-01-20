"use client"
import { IUser } from '@/modules/types/User'
import React from 'react'
import styles from "../index.module.scss"


export default function ProfileSecurity({ user }: { user: IUser }) {

  return (
    <>
      <div className="container-fluid">

        <div className={styles.box}>
          <h4 className={styles.heading}>Authorization data</h4>
          <div className={styles.options}>
            <div className={styles.options__item}>
              <span className={styles.grey}>E-mail</span>
              <div className={styles.options__value}>{user.email}</div>
              <button>Change</button>
            </div>
            <div className={styles.options__item}>
              <span className={styles.grey}>Phone number</span>
              <div className={styles.options__value}>{user.phoneNumber}</div>
              <button>Change</button>
            </div>
            <div className={styles.options__item}>
              <span className={styles.grey}>Password</span>
              <div className={styles.options__value}>••••••••••••••</div>
              <button>Change</button>
            </div>
          </div>

        </div>
        <div className={styles.box}>
          <div className={styles.heading}>Delete profile</div>
          <div className={styles.boxWrap}>
            <div className={styles.grey}>
              When you delete a profile, the data associated with it will be deleted. The account will be suspended for 30 days, during which time you can undo the deletion
            </div>
            <button className={styles.delete}>Delete account</button>
          </div>
        </div>
      </div>
    </>
  )
}
