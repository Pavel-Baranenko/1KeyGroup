"use client"
import React from 'react';
import Header from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import RequestService from '@/modules/types/RequestService';
import { Request } from '@/modules/types/Requests';
import Listing from '@/components/layouts/Requests/Listing';
import { Context } from '@/store/provider';
import NoItems from '@/components/ui-kit/NoItems';
import styles from '../index.module.scss'

export default function MyRequests() {

  const { store } = React.useContext(Context)
  const [requests, setRequests] = React.useState<Request[]>()

  const getLeads = async () => {
    try {
      if (store.user.id) {
        const response = await RequestService.getLeadsByProfile(store.user.id)
        setRequests(response.data)
      }
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
                  <>
                    {requests.length > 0 ?
                      <Listing list={requests} withBtn />
                      : <NoItems type='request' my />
                    }
                  </>
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
