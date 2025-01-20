"use client"
import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import { Context } from '@/store/provider';
import { useRouter } from 'next/navigation';
import MyInput from '@/components/ui-kit/MyInput';
import ReactInputVerificationCode from 'react-input-verification-code';
import 'react-phone-number-input/style.css'
import styles from '../auth.module.scss'



export default function Login() {

  const { store } = React.useContext(Context)


  const { push } = useRouter();
  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [verify, setVerify] = React.useState<boolean>(false)
  const [code, setCode] = React.useState<string>("")
  const [info, setInfo] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")

  const SendCode = async () => {
    try {
      if (username) {
        const response = await axios.post("https://rest.1key.group/auth/change_password/request", {
          "username": username,
          "password": "password",
        })
        setVerify(true)
      }
    } catch (error) {
      setInfo("User not found")
    }
  }

  const UserLogin = async () => {
    if (auth) {
      const response = await store.login(username, password)
      response ? setError(response) : push('/')
    }
  }


  const auth = username && password


  return (

    <main >
      <div className={styles.container}>
        <form className={styles.form} autoComplete="off">
          <div className={styles.form__inner}>
            <div className={styles.form__heading}>
              Login
            </div>
            <div className={styles.form__line}>
              If you don't have a profile yet, then go through the <Link href='/auth/sing-up'>registration process </Link>
            </div>
            <div className={styles.form__body}>

              <div className={styles.grid}>
                <MyInput
                  label="username"
                  value={username}
                  type='text'
                  required
                  onChange={e => { setUsername(e.target.value) }}
                />
                <MyInput
                  label="password"
                  value={password}
                  type='password'
                  required
                  onChange={e => { setPassword(e.target.value) }}
                />
                <div className={styles.error}>
                  {info}
                </div>

              </div>
              {error &&
                <div className={styles.error}>
                  {error}
                </div>
              }
              <div className={styles.forgot__passowrd}>
                <span onClick={SendCode}>forgot password</span>
              </div>
            </div>

          </div>
        </form>

        {verify ? <form className={styles.verify}>
          <div className={styles.form__heading}>
            Confirm phone number
          </div>
          <div className={styles.form__line}> A confirmation SMS code has been sent to the number. If the code has not been received, then write to
            A confirmation SMS code has been sent to the number. If the code has not been received, then write to <Link href="/tg">support</Link>
          </div>
          <div className={styles.verify__body}>
            <ReactInputVerificationCode placeholder="" onChange={setCode} value={code} />
          </div>
        </form> : ""}

        <button className={styles.send + (auth ? " " + styles.auth : "")} onClick={UserLogin}>Login</button>

      </div>

    </main >

  );
}
