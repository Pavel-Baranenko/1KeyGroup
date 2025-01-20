import { Request } from '@/modules/types/Requests'
import React from 'react'
import styles from "./index.module.scss"
import Link from 'next/link'
import RequestService from '@/modules/types/RequestService'
import { useRouter } from 'next/navigation'


export default function RequestPage({ request, my }: { request: Request, my?: boolean }) {

  const { push } = useRouter();

  const [open, setOpen] = React.useState(false)

  const deleteOffer = async () => {
    const response = await RequestService.delete(request.id)
    if (response.status == 200) return push('/requests/my')
  }


  return (
    <>
      <div className="container-fluid">
        <div className={styles.wrap}>
          <div className={styles.top}>
            <div className={styles.id}>Request #{request.id}</div>
            {/* <div className="offer-date">Создана 12 января, 12:09</div> */}
            {/* <div className="offer-views">
                      <img src="./img/eye-offer.svg" alt="" />
                      <span>294</span>
                    </div> */}
            {/* <button className="offer-menu btn-reset">
                      <img src="./img/open-submenu.svg" alt="" />
                    </button> */}
            {my &&
              <div className="objects-item__menu">
                <button className="object-items__menu-btn" onClick={() => setOpen(!open)}>
                  <svg width="4" height="14" viewBox="0 0 4 14" fill="none" >
                    <path d="M2.00033 2.99967C1.26395 2.99967 0.666993 2.40272 0.666993 1.66634C0.666993 0.929961 1.26395 0.333008 2.00033 0.333008C2.73671 0.333008 3.33366 0.929961 3.33366 1.66634C3.33366 2.40272 2.73671 2.99967 2.00033 2.99967Z" fill="#2A344A" />
                    <path d="M2.00033 8.33301C1.26395 8.33301 0.666992 7.73605 0.666992 6.99967C0.666992 6.26329 1.26395 5.66634 2.00033 5.66634C2.73671 5.66634 3.33366 6.26329 3.33366 6.99967C3.33366 7.73605 2.7367 8.33301 2.00033 8.33301Z" fill="#2A344A" />
                    <path d="M2.00033 13.6663C1.26395 13.6663 0.666992 13.0694 0.666992 12.333C0.666992 11.5966 1.26395 10.9997 2.00033 10.9997C2.7367 10.9997 3.33366 11.5966 3.33366 12.333C3.33366 13.0694 2.7367 13.6663 2.00033 13.6663Z" fill="#2A344A" />
                  </svg>

                </button>
                {open &&
                  <div className="objects-item__menu-list">
                    <button onClick={deleteOffer}>Delete</button>
                    <Link href={`/objects/edit/${request.id}`} onClick={() => setOpen(!open)}>Edit</Link>
                  </div>
                }

              </div>
            }
          </div>
          <div className={styles.middle}>
            <div className={styles.price}>{request?.budget.min} – {request?.budget.max} €</div>
          </div>
          <div>
            <div className={styles.info__item}>
              <span>City</span>
              <p>{request?.location.city}</p>
            </div>
            <div className={styles.info__item}>
              <span>regions</span>
              <p>{request?.location.region}</p>
            </div>
            <div className={styles.info__item}>
              <span>Deal format</span>
              <p>{request?.dealFormat}</p>
            </div>
            <div className={styles.info__item}>
              <span>Type</span>
              <p>{request?.propertySubType}</p>
            </div>
            <div className={styles.info__item}>
              <span>Condition</span>
              <p>{request?.condition.status}</p>
            </div>
            <div className={styles.info__item}>
              <span>Year built</span>
              <p>{request?.condition.buildingYear} / {request?.condition.buildingQuarter} quarter</p>
            </div>
            <div className={styles.info__item}>
              <span>Total area</span>
              <p>{request?.square.common.min} m²</p>
            </div>

            <div className={styles.info__item}>
              <span>Purpose of purchase</span>
              <p>{request?.purchaseGoal}</p>
            </div>
            <div className={styles.info__item}>
              <span>Urgency of purchase</span>
              <p>{request?.urgency}</p>
            </div>
            <div className={styles.info__item}>
              <span>Method of purchase</span>
              <p>{request?.purchaseMethod}</p>
            </div>
            <div className={styles.info__item}>
              <span>Wishes</span>
              <p>{request?.description}</p>
            </div>
          </div>
        </div>
        {my &&
          <button className={`blue-btn ${styles.full}`} >
            <span>Edit request</span>
          </button>
        }
      </div >
    </>
  )
}
