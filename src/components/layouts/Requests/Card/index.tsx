"use client"
import { Request } from '@/modules/types/Requests'
import Link from 'next/link'
import React from 'react'
import { capitalizeFirstLetter } from '@/modules/lib/common'
import RequestService from '@/modules/types/RequestService'

export default function Card({ offer, my }: { offer: Request, my?: boolean }) {

  const [open, setOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(true)

  const deleteOffer = async () => {
    setOpen(!open)
    const response = await RequestService.delete(offer.id)
    if (response.status == 200) return setVisible(false)
  }

  return (
    <>
      {visible &&

        <div className="leads__item" key={offer.id}>
          <div className="lead-top">
            <Link href={`/requests/${my ? `my/${offer.id}` : offer.id}`} className="lead-title">
              {capitalizeFirstLetter(offer.dealFormat)} {offer.propertyType} in {offer.location.city}
            </Link>
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
                    <button onClick={deleteOffer} >Delete</button>
                    <Link href={`/objects/edit/${offer.id}`} onClick={() => setOpen(!open)}>Edit</Link>
                  </div>
                }

              </div>
            }
          </div>
          <div className="lead-location">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" >
              <path fillRule="evenodd" clipRule="evenodd" d="M9.9987 2.83301C6.72359 2.83301 4.08203 5.45828 4.08203 8.68023C4.08203 10.6742 5.27664 12.8114 6.73393 14.5054C7.45141 15.3394 8.20332 16.0313 8.84279 16.508C9.16322 16.7468 9.4433 16.9226 9.66677 17.0351C9.87054 17.1378 9.97386 17.1604 9.99567 17.1651C9.99696 17.1654 9.99797 17.1656 9.9987 17.1658C9.99942 17.1656 10.0004 17.1654 10.0017 17.1651C10.0235 17.1604 10.1269 17.1378 10.3306 17.0351C10.5541 16.9226 10.8342 16.7468 11.1546 16.508C11.7941 16.0313 12.546 15.3394 13.2635 14.5054C14.7208 12.8114 15.9154 10.6742 15.9154 8.68023C15.9154 5.45828 13.2738 2.83301 9.9987 2.83301ZM2.58203 8.68023C2.58203 4.61509 5.91001 1.33301 9.9987 1.33301C14.0874 1.33301 17.4154 4.61509 17.4154 8.68023C17.4154 11.2094 15.9433 13.6903 14.4006 15.4836C13.6181 16.3932 12.7867 17.1623 12.0511 17.7106C11.6841 17.9842 11.3287 18.212 11.0053 18.3748C10.7055 18.5258 10.3466 18.6663 9.9987 18.6663C9.65079 18.6663 9.29185 18.5258 8.99209 18.3748C8.66868 18.212 8.31334 17.9842 7.94628 17.7106C7.21074 17.1623 6.37932 16.3932 5.5968 15.4836C4.05409 13.6903 2.58203 11.2094 2.58203 8.68023ZM8.52572 6.36833C9.03651 6.00928 9.61938 5.91634 9.9987 5.91634C10.378 5.91634 10.9609 6.00928 11.4717 6.36833C12.025 6.75729 12.4154 7.40625 12.4154 8.33301C12.4154 9.25976 12.025 9.90873 11.4717 10.2977C10.9609 10.6567 10.378 10.7497 9.9987 10.7497C9.61938 10.7497 9.03651 10.6567 8.52572 10.2977C7.9724 9.90873 7.58203 9.25976 7.58203 8.33301C7.58203 7.40625 7.9724 6.75729 8.52572 6.36833ZM9.38834 7.59548C9.24721 7.69468 9.08203 7.87905 9.08203 8.33301C9.08203 8.78696 9.24721 8.97133 9.38834 9.07053C9.572 9.19964 9.82246 9.24967 9.9987 9.24967C10.1749 9.24967 10.4254 9.19964 10.6091 9.07053C10.7502 8.97133 10.9154 8.78696 10.9154 8.33301C10.9154 7.87905 10.7502 7.69468 10.6091 7.59548C10.4254 7.46638 10.1749 7.41634 9.9987 7.41634C9.82246 7.41634 9.572 7.46638 9.38834 7.59548Z" fill="#7786A5" />
            </svg>

            <span>{offer.location.city} / {offer.location.region}</span>
          </div>
          <div className="lead-grid">
            <div className="lead-grid__item lead-grid__item-home">{offer.propertySubType}</div>
            <div className="lead-grid__item lead-grid__item-coast">{offer.condition.status}</div>
            <div className="lead-grid__item lead-grid__item-count">{offer.roomsCount.count}</div>
            <div className="lead-grid__item lead-grid__item-square">{offer.square.common.min} m2</div>
            <div className="lead-grid__item lead-grid__item-goal">{offer.purchaseGoal}</div>
            <div className="lead-grid__item lead-grid__item-date">{offer.urgency}</div>


          </div>
          <div className="lead-bottom">
            <div className="lead-price">
              {offer.budget.min} – {offer.budget.max} €
            </div>
            {my
              ?
              <Link href={`/requests/edit/${offer.id}`} className="blue-btn">Edit</Link>
              :
              <div className="blue-btn">Offer </div>
            }


          </div>
        </div>
      }

    </>
  )
}
