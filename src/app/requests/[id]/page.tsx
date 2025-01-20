"use client"
import { Footer } from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import React from 'react'
import RequestService from '@/modules/types/RequestService';
import { Request } from '@/modules/types/Requests';
import RequestPage from '@/components/layouts/Requests/Request';
import styles from '../index.module.scss'


export default function OpenRequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const [request, setRequest] = React.useState<Request>();

  const getLead = async () => {
    const response = await RequestService.getById(Number(id))
    setRequest(response.data)
  }

  React.useEffect(() => { getLead() }, [])
  return (
    <div className='page__wrapper-leads'>
      <Header />
      <main>
        <div className={styles.feed}>
          {request ?
            <>
              <div className="container-fluid">
                <div className="tabs white-box">
                  <div className="tabs__title">
                    <a href="javascript:history.back()" className="back-link mob">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                        <rect width="28" height="28" rx="14" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0959 19.7071C16.4865 19.3166 16.4865 18.6834 16.0959 18.2929L11.8031 14L16.0959 9.70711C16.4865 9.31658 16.4865 8.68342 16.0959 8.29289C15.7054 7.90237 15.0723 7.90237 14.6817 8.29289L10.0353 12.9393C9.4495 13.5251 9.4495 14.4749 10.0353 15.0607L14.6817 19.7071C15.0723 20.0976 15.7054 20.0976 16.0959 19.7071Z" fill="#7786A5" />
                      </svg>
                    </a>
                    <h1>
                      {request?.dealFormat} {request?.propertyType} in {request?.location.city}
                    </h1>

                  </div>
                  {/* <div className="tabs__buttons">
                    <button className={`tabs__btn btn-reset  ${checkActive(1) ? "active" : ""}`}
                      onClick={() => handleClick(1)}>Request</button>
                    <button className={`tabs__btn btn-reset  ${checkActive(2) ? "active" : ""}`}
                      onClick={() => handleClick(2)}>Offerings <span className='blue'>5</span></button>
                    <button className={`tabs__btn btn-reset  ${checkActive(3) ? "active" : ""}`}
                      onClick={() => handleClick(3)}>Performers <span>2</span></button>
                    <button className={`tabs__btn btn-reset  ${checkActive(4) ? "active" : ""}`}
                      onClick={() => handleClick(4)}>Rejections <span>1</span></button>
                    <button className={`tabs__btn btn-reset  ${checkActive(5) ? "active" : ""}`}
                      onClick={() => handleClick(5)}>Recommended <span>193</span></button>
                  </div> */}
                </div>
              </div>
              <div className="panels">
                <RequestPage request={request} />
              </div>
            </>
            :
            <>
              <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
              </svg>
            </>
          }
        </div>

      </main>
      <Footer />
    </div>
  )
}
