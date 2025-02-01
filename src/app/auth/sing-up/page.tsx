"use client"
import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import PhoneInput from 'react-phone-number-input';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useRouter } from 'next/navigation';
import AuthService from '@/modules/services/AuthService';
import RadioButtonGroup from '@/components/ui-kit/RadioButtonGroup';
import MyInput from '@/components/ui-kit/MyInput';
import 'react-phone-number-input/style.css'
import styles from '../auth.module.scss'
import { API_URL } from '@/http/intex';

var time = 60;
var typeCode = "";

export default function SingIn() {
  const { push } = useRouter();

  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [phoneNumber, setPhone] = React.useState<string>()
  const [verify, setVerify] = React.useState(false)
  const [code, setCode] = React.useState<string>("")
  const [role, setRole] = React.useState<string>('')
  const [error, setError] = React.useState(false)
  const [timer, setTimer] = React.useState<number>()

  const options = [
    { title: "I'm a client", value: "CUSTOMER" },
    { title: "I'm a broker", value: "REALTOR" },
    { title: "Real Estate Agency", value: "REAL_ESTATE_AGENCY" },
    { title: "Developer", value: "DEVELOPER" }
  ]

  const auth = username && phoneNumber && role && password && email

  const sendCode = async (type: string) => {
    if (auth) {
      const response = await AuthService.verificationCode(phoneNumber, type)

      if (response) {
        typeCode = type
        setVerify(true)
        runTime()
      } else {
        setError(response)
      }

    }
  }

  const Registration = async () => {
    if (code && code?.length > 3) {
      try {
        const response = await axios.post(`${API_URL}/auth/registration`, {
          "phoneNumber": phoneNumber,
          "username": username,
          "password": password,
          "firstName": "",
          "lastName": "",
          "photo": "",
          "email": email,
          "role": "USER",
          "ownProfiles": [],
          "verifyCode": code,
          "type": typeCode
        })
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('user_role', role);
        localStorage.setItem('username', username);
        push('/profile/create')
        if (response.status !== 200) {
          setError(response.data.message)
        }

      } catch (error) {
        setError(true)
      }
    }
  }

  const runTime = () => {
    setInterval(() => {

      if (time > 0) {
        time -= 1
        setTimer(time)
      }
    }, 1000);

  }

  return (

    <main >
      <div className={styles.container}>
        <form className={styles.form} autoComplete="off">
          <div className={styles.form__inner}>
            <div className={styles.form__heading}>
              Complete simple registration
            </div>
            <div className={styles.form__line}>
              Enter your login details or <Link href='/auth/login'>log in to your profile</Link>
            </div>
            <div className={styles.form__body}>
              <RadioButtonGroup options={options} onChange={setRole} />
              <div className={styles.grid}>
                <MyInput
                  label="Username "
                  value={username}
                  required
                  onChange={e => { setUsername(e.target.value.trim()) }}
                />
                <div className={`Phone ${phoneNumber ? "active" : ""}`}>
                  {!phoneNumber && <p>Phone number <span className='required'>*</span></p>}
                  <PhoneInput
                    value={phoneNumber}
                    onChange={setPhone}
                  />
                </div>
                <MyInput
                  label="E-mail "
                  value={email}
                  type='text'
                  required
                  onChange={e => { setEmail(e.target.value.trim()) }}
                />
                <MyInput
                  label="Password "
                  value={password}
                  type="password"
                  required
                  onChange={e => { setPassword(e.target.value.trim()) }}
                />
              </div>
              {error &&
                <div className={styles.error}>
                  {error}
                </div>
              }
            </div>
          </div>
        </form>

        {verify ? <form className={styles.verify}>
          <div className={styles.form__heading}>
            Confirm phone number
          </div>
          <div className={styles.form__line}>
            A confirmation SMS code has been sent to {phoneNumber}. If the code was not received, then write to <Link href="/tg">support</Link>
          </div>

          <div className={styles.verify__body}>
            <ReactInputVerificationCode placeholder="" onChange={setCode} value={code} />
            <span> {timer && timer > 1 ? "retry the code" : ""} ({timer || <button onClick={() => { setVerify(false); runTime(); time = 60 }}>retry the code</button>})</span>
          </div>
        </form> : ""}
        {!verify &&
          <div className={styles.bottom_grid + (auth ? " " + styles.auth : "")} >
            <button className={styles.send} onClick={() => sendCode("VERIFY_BY_SMS")}>
              <svg width="19" height="18" viewBox="0 0 19 18" fill="none"  >
                <path d="M14.7965 15.1637C13.3308 16.6295 9.57712 15.2522 6.41245 12.0875C3.24779 8.92288 1.87054 5.1692 3.33628 3.70346L4.30135 2.73839C4.9676 2.07214 6.06541 2.08975 6.75338 2.77772L8.24819 4.27254C8.93616 4.96051 8.95378 6.05832 8.28753 6.72456L8.08024 6.93185C7.72053 7.29157 7.68534 7.87186 8.01958 8.2769C8.34198 8.66759 8.68955 9.05674 9.06641 9.43359C9.44326 9.81045 9.83241 10.158 10.2231 10.4804C10.6281 10.8147 11.2084 10.7795 11.5681 10.4198L11.7754 10.2125C12.4417 9.54622 13.5395 9.56384 14.2275 10.2518L15.7223 11.7466C16.4102 12.4346 16.4279 13.5324 15.7616 14.1986L14.7965 15.1637Z" fill="white" />
              </svg>
              <span>SMS code</span>
            </button>
            <button className={styles.send} onClick={() => sendCode("VERIFY_BY_WHATSAPP")}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"  >
                <path d="M14.6594 2.78255C13.1542 1.28255 11.1472 0.449219 9.02877 0.449219C4.62458 0.449219 1.05664 4.00477 1.05664 8.39366C1.05664 9.78255 1.44689 11.1714 2.11588 12.3381L1.22698 15.6156C1.12636 15.9866 1.46456 16.3276 1.83638 16.2301L5.23783 15.3381C6.40856 15.9492 7.69079 16.2826 9.02877 16.2826C13.4329 16.2826 17.0009 12.727 17.0009 8.33811C16.9451 6.28255 16.1647 4.28255 14.6594 2.78255ZM12.8755 11.227C12.7082 11.6714 11.9277 12.1159 11.5375 12.1714C11.203 12.227 10.757 12.227 10.311 12.1159C10.0323 12.0048 9.64201 11.8937 9.19602 11.6714C7.18905 10.8381 5.90682 8.83811 5.79532 8.67144C5.68382 8.56033 4.95908 7.61588 4.95908 6.61588C4.95908 5.61588 5.46082 5.17144 5.62807 4.94922C5.79532 4.727 6.01831 4.727 6.18556 4.727C6.29706 4.727 6.46431 4.727 6.5758 4.727C6.6873 4.727 6.85455 4.67144 7.0218 5.06033C7.18905 5.44922 7.57929 6.44922 7.63504 6.50477C7.69079 6.61589 7.69079 6.727 7.63504 6.83811C7.57929 6.94922 7.52354 7.06033 7.41204 7.17144C7.30054 7.28255 7.18904 7.44922 7.13329 7.50477C7.0218 7.61589 6.9103 7.727 7.0218 7.89366C7.1333 8.11588 7.52354 8.727 8.13678 9.28255C8.91727 9.94922 9.53051 10.1714 9.75351 10.2826C9.9765 10.3937 10.088 10.3381 10.1995 10.227C10.311 10.1159 10.7012 9.67144 10.8127 9.44922C10.9242 9.227 11.0915 9.28255 11.2587 9.33811C11.426 9.39366 12.4295 9.89366 12.5967 10.0048C12.8197 10.1159 12.9312 10.1714 12.987 10.227C13.0427 10.3937 13.0427 10.7826 12.8755 11.227Z" fill="white" />
              </svg>
              <span>Code to WhatsApp</span>
            </button>
          </div>
        }

        {verify &&
          <div className={styles.bottom__box + (code && code.length == 4 ? " " + styles.auth : "")}>
            <button className={styles.send} onClick={Registration}>Send</button>

          </div>
        }

        <p className={styles.bottom__text}>By clicking on the button, you agree to the processing of  <span >personal data</span> and <span>privacy policy</span></p>
      </div>

    </main >

  );
}
