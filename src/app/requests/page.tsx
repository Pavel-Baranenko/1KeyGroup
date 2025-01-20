"use client"
import React from 'react';
import Header from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import RequestService from '@/modules/types/RequestService';
import { Request } from '@/modules/types/Requests';
import Listing from '@/components/layouts/Requests/Listing';
import styles from "./index.module.scss"

export default function Requests() {

  const [load, setLoad] = React.useState(false)
  const [requests, setRequests] = React.useState<Request[]>()

  const getLeads = async () => {
    try {
      const response = await RequestService.getAllLeads()
      setRequests(response.data)
      setLoad(true)
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getLeads()
  }, [])


  return (
    <>
      <div className='page__wrapper-leads'>
        <Header />
        <main>
          <div className="offers__wrap">
            <div className="container-fluid">
              <div className="tabs white-box">
                <div className="tabs__title">Requests</div>
              </div>
            </div>
            <div className="panels">
              <div className={styles.feed}>
                {requests ?
                  <Listing list={requests} />
                  :
                  <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
                    <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                  </svg>
                }

              </div>

            </div>
          </div>

        </main>

        <Footer />
      </div>
    </>
  )
}
