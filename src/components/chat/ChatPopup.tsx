'use client'
import ChatService from '@/modules/services/ChatService';
import React from 'react'
import styles from './index.module.scss'
import { CahtRoom } from '@/modules/types/Chat';
import { User } from '@/modules/types/User';
import { Context } from '@/store/provider';
import UserProfileService from '@/modules/services/UserProfileService';
import { API_URL } from '@/http/intex';



export default function ChatPopup({ chatId }: { chatId?: number }) {

  const [rooms, setRooms] = React.useState<CahtRoom[]>()
  const [users, setUsers] = React.useState<{ [key: number]: User }>({})
  const [load, setLoad] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<number>()

  const { store } = React.useContext(Context)

  const getUser = async (id: number, chatRoomId: number) => {
    const response = await UserProfileService.getUserById(id)
    return setUsers({ ...users, [chatRoomId]: response.data })
  }

  const getChats = async () => {
    const response = await ChatService.getByuser()
    setRooms(response.data)
    setLoad(true)

    response.data.forEach((e) => {
      const user = e.chatUsers?.filter(a => a != store.user.id)
      if (user && e.id) getUser(user[0], e.id)
    })
  }

  React.useEffect(() => {
    getChats()
  }, [])
  console.log(users);


  return (
    <div className={styles.wrap}>
      <div className={styles.body}>
        {(load) &&
          <>
            <div className={styles.left}>
              {rooms?.map((e, index) => {
                if (e.id) {
                  return (
                    <button
                      className={styles.avatarBtn + ' ' + (selected == e.id ? styles.active : "")}
                      key={e.id} onClick={() => setSelected(e.id)}>
                      {users[e.id] &&
                        <img src={users[e.id].photo ? `${API_URL}/storage/images/${users[e.id].id}/${users[e.id].photo}` : "/img/static/grey.png"} alt="" />
                      }
                    </button>
                  )
                }
              })}
            </div>
            {/* {selected &&
              <div className={styles.info}>
                <div className={styles.top}>
                  <span>{users[selected].firstName} {users[selected].lastName}</span>
                </div>
              </div>
            } */}

            <div className={styles.chat}>
              <div className={styles.messagesBooby}>
                <div className={styles.messages}></div>
              </div>
              <div className={styles.bottom}>
                <button className={styles.add}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0.25C7.41421 0.25 7.75 0.585786 7.75 1V6.25014H13C13.4142 6.25014 13.75 6.58593 13.75 7.00014C13.75 7.41436 13.4142 7.75014 13 7.75014H7.75V13C7.75 13.4142 7.41421 13.75 7 13.75C6.58578 13.75 6.25 13.4142 6.25 13V7.75014H1C0.585786 7.75014 0.25 7.41436 0.25 7.00014C0.25 6.58593 0.585786 6.25014 1 6.25014H6.25V1C6.25 0.585786 6.58578 0.25 7 0.25Z" fill="white" />
                  </svg>
                </button>
                <input type="text" placeholder='Write a message...' className={styles.input} />
                <button className={styles.send}>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.087 8.91913C14.1649 8.38017 14.1649 6.8419 13.087 6.30294L2.36028 0.9396C1.22826 0.37359 -0.0395091 1.41516 0.296084 2.63549L1.54131 7.16355C1.54919 7.19222 1.5563 7.22105 1.56265 7.25H4C4.20711 7.25 4.375 7.41789 4.375 7.625C4.375 7.83211 4.20711 8 4 8H1.55627C1.55163 8.01955 1.54665 8.03904 1.54131 8.05846L0.296076 12.5866C-0.0395134 13.8069 1.22826 14.8485 2.36028 14.2825L13.087 8.91913Z" fill="#B8C6E3" />
                  </svg>

                </button>
              </div>
            </div>
          </>
        }

      </div>
    </div>
  )
}
