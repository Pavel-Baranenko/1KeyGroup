'use client'
import UserProfileService from '@/modules/services/UserProfileService'
import { User } from '@/modules/types/User'
import { Context } from '@/store/provider'
import React from 'react'
import styles from './index.module.scss'
import { API_URL } from '@/http/intex'
import ChatService from '@/modules/services/ChatService'


export default function UserContacts({ userID, title }: { userID: number, title: string }) {
  const [user, setUser] = React.useState<User>()
  const { store } = React.useContext(Context)

  const getUSer = async () => {
    const response = await UserProfileService.getUserById(userID)
    setUser(response.data)
  }

  const Chat = async (user: User) => {
    const response = await ChatService.create({
      name: title,
      type: "",
      invitedUsers: [
        {
          id: store.user.id,
          username: store.user.username
        },
        {
          id: user.id,
          username: user.username
        }
      ]
    })
    console.log(response);

  }

  React.useEffect(() => {
    getUSer()
  })

  return (
    <>
      {
        ((user && store.user) && (user.id != store.user.id)) ?
          < div className={styles.box}>
            <div className={styles.avatar}>
              <img src={user.photo ? `${API_URL}/storage/images/${userID}/${user.photo}` : "/img/static/grey.png"} alt="" />
            </div>
            <p className={styles.name}>{user.firstName} {user.lastName}</p>

            <a href={`tel:${user.phoneNumber}`} className={styles.link}>{user.phoneNumber}</a>
            <a href={`mailto:${user.email}`} className={styles.link}>{user.email}</a>

            <button className={`blue-btn`} onClick={() => Chat(user)}>Contact</button>
          </div>
          : ""
      }
    </>
  )
}
