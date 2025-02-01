"use client"
import React from 'react'
import styles from "../index.module.scss"
import { motion, AnimatePresence } from "framer-motion";
import ObjectsService from '@/modules/services/ObjectsService';
import { Object } from '@/modules/types/Objects';
import { API_URL } from '@/http/intex';
import ObjectLocation from '@/components/maps/ObjectLocation';
import MapsService from '@/modules/services/MapService';
import { MapFeature } from '@/modules/types/Maps';
import { useRouter } from 'next/navigation'
import UserContacts from '@/components/ui-kit/UserContacts';
import { formatDate } from '@/modules/lib/common';

export default function ObjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()

  const [object, setObject] = React.useState<Object>();
  const [openDescription, setOpenDescription] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [openTerInfo, setOpenTerInfo] = React.useState(false);
  const [openServices, setOpenServices] = React.useState(false);
  const [mapLoad, setMapLoad] = React.useState(true);
  const [mapCoords, setMapCoords] = React.useState<MapFeature>();

  const handleMapLoading = () => setMapLoad(false);

  let mapAdress = object?.location.address.split('/')

  const getObject = async () => {
    const response = await ObjectsService.getById(Number(id))
    setObject(response.data)
    getPosition(response.data.location.address.split('/')[1])
  }

  const getPosition = async (adress: string) => {
    const response = await MapsService.getPosition(adress)
    setMapCoords(response.data.features[0])
  }

  console.log(object);

  React.useEffect(() => {
    getObject()
  }, [])

  return (
    <main>

      <div className="object-page">
        {object ?
          <div className="grid-container">
            <div className="box-wrapper">
              <section className={styles.section}>
                <div className={styles.top}>
                  <a onClick={() => router.back()} className="back-link mob">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                      <rect width="28" height="28" rx="14" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0959 19.7071C16.4865 19.3166 16.4865 18.6834 16.0959 18.2929L11.8031 14L16.0959 9.70711C16.4865 9.31658 16.4865 8.68342 16.0959 8.29289C15.7054 7.90237 15.0723 7.90237 14.6817 8.29289L10.0353 12.9393C9.4495 13.5251 9.4495 14.4749 10.0353 15.0607L14.6817 19.7071C15.0723 20.0976 15.7054 20.0976 16.0959 19.7071Z" fill="#7786A5" />
                    </svg>
                  </a>
                  <h1>{object?.title}</h1>

                </div>
                <div className={styles.box}>
                  <span className={styles.id}>ID {id}</span>
                  {object.created &&
                    <span className={styles.date}>{formatDate(object.created)}</span>
                  }
                </div>
                <div className={styles.images}>
                  <div className={styles.images__main}>
                    <img src={object?.photos[0] ? `${API_URL}/storage/images/${object?.photos[0]}` : "/img/static/object-card.jpg"} alt="" />
                  </div>
                  <div className={styles.images__box}>
                    <img src={object?.photos[1] ? `${API_URL}/storage/images/${object?.photos[1]}` : "/img/static/object-card.jpg"} alt="" />
                    <img src={object?.photos[2] ? `${API_URL}/storage/images/${object?.photos[2]}` : "/img/static/object-card.jpg"} alt="" />
                  </div>
                </div>
                <div className={styles.box}>
                  <span className={styles.price}>{object?.price.cost} {object?.price.currency}</span>
                  {object?.services.map((e: string) => {
                    return (
                      <div className={styles.additional__item} key={e}>{e}</div>
                    )
                  })}

                </div>
                <div className={styles.info}>
                  {object?.condition.buildingYear ?
                    <div className={styles.info__item}>
                      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.61049 0.321908C4.25185 0.152603 3.82339 0.291771 3.6327 0.639507L0.748411 5.89909C0.306915 6.70417 0.855098 7.68202 1.74999 7.74674V10.5001V16.0001C1.74999 16.4143 2.08577 16.7501 2.49999 16.7501C2.9142 16.7501 3.24999 16.4143 3.24999 16.0001V14.7501H6.24999V16.0001C6.24999 16.4143 6.58577 16.7501 6.99999 16.7501C7.4142 16.7501 7.74999 16.4143 7.74999 16.0001V14.0001V10.5001V7.75013H7.99999H12.25V9.25013V11.5001C12.25 11.9143 12.5858 12.2501 13 12.2501C13.4142 12.2501 13.75 11.9143 13.75 11.5001V9.25013V7.75013H14.7696C16.104 7.75013 16.5099 5.93942 15.3032 5.36976L4.61049 0.321908ZM13 6.25013H13.6544L6.25969 2.75921L8.41805 6.25013H13ZM6.24999 7.75013H3.24999V9.75013H6.24999V7.75013ZM2.49999 6.25013H6.6545L4.32914 2.48911L2.26665 6.25013H2.49999ZM6.24999 13.2501H3.24999V11.2501H6.24999V13.2501Z" fill="#7786A5" />
                      </svg>
                      <span>{object?.condition.buildingYear}</span>
                      <p>Year built</p>
                    </div>
                    : ""
                  }

                  {object?.square.common ?
                    <div className={styles.info__item}>
                      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 4.75C0.75 2.26472 2.76472 0.25 5.25 0.25H12.75C15.2353 0.25 17.25 2.26472 17.25 4.75V12.25C17.25 14.7353 15.2353 16.75 12.75 16.75H5.25C2.76472 16.75 0.75 14.7353 0.75 12.25V4.75ZM5.25 1.75C3.59315 1.75 2.25 3.09315 2.25 4.75V12.25C2.25 13.9069 3.59315 15.25 5.25 15.25H12.75C14.4069 15.25 15.75 13.9069 15.75 12.25V4.75C15.75 3.09315 14.4069 1.75 12.75 1.75H5.25ZM9.84997 4.5C9.84997 4.08579 10.1858 3.75 10.6 3.75H12.48C13.1814 3.75 13.75 4.31857 13.75 5.01999V6.89996C13.75 7.31418 13.4142 7.64996 13 7.64996C12.5858 7.64996 12.25 7.31418 12.25 6.89996V6.31063L10.7407 7.81985C10.7373 7.82341 10.7339 7.82694 10.7303 7.83044L6.81072 11.75H7.40003C7.81425 11.75 8.15003 12.0858 8.15003 12.5C8.15003 12.9142 7.81425 13.25 7.40003 13.25H5.52001C4.81862 13.25 4.25 12.6814 4.25 11.98V10.1C4.25 9.68582 4.58579 9.35004 5 9.35004C5.41421 9.35004 5.75 9.68582 5.75 10.1V10.6894L9.25912 7.18034C9.26258 7.17674 9.26608 7.17318 9.26962 7.16963L11.1893 5.25H10.6C10.1858 5.25 9.84997 4.91421 9.84997 4.5Z" fill="#7786A5" />
                      </svg>

                      <span>{object?.square.common}</span>
                      <p>Common</p>
                    </div>
                    : ""
                  }

                  {object?.square.living ?
                    <div className={styles.info__item}>
                      <svg width="18" height="17" viewBox="0 0 18 17" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.5192 2.23401C8.70175 1.58866 7.54825 1.58866 6.7308 2.23401L2.6058 5.49059C2.06533 5.91728 1.75 6.56797 1.75 7.25658V12.1778C1.75 13.4204 2.75736 14.4278 4 14.4278H5.125V12.1778C5.125 10.9351 6.13236 9.92777 7.375 9.92777H9.33009C9.7443 9.92777 10.0801 10.2636 10.0801 10.6778C10.0801 11.092 9.7443 11.4278 9.33009 11.4278H7.375C6.96079 11.4278 6.625 11.7636 6.625 12.1778V14.4278C6.625 15.2562 5.95343 15.9278 5.125 15.9278H4C1.92893 15.9278 0.25 14.2488 0.25 12.1778V7.25658C0.25 6.1089 0.775543 5.02442 1.67633 4.31327L5.80134 1.05669C7.16374 -0.0188975 9.08626 -0.0188956 10.4487 1.05669L14.5737 4.31327C14.8988 4.56993 14.9543 5.04156 14.6976 5.36667C14.4409 5.69177 13.9693 5.74726 13.6442 5.49059L9.5192 2.23401ZM13.85 8C13.85 7.58579 14.1858 7.25 14.6 7.25H16.48C17.1814 7.25 17.75 7.81857 17.75 8.51999V10.4C17.75 10.8142 17.4142 11.15 17 11.15C16.5858 11.15 16.25 10.8142 16.25 10.4V9.81063L14.7407 11.3199C14.7373 11.3234 14.7338 11.3269 14.7303 11.3304L10.8107 15.25H11.4C11.8142 15.25 12.15 15.5858 12.15 16C12.15 16.4142 11.8142 16.75 11.4 16.75H9.52001C8.81862 16.75 8.25 16.1814 8.25 15.48V13.6C8.25 13.1858 8.58579 12.85 9 12.85C9.41421 12.85 9.75 13.1858 9.75 13.6V14.1894L13.2591 10.6803C13.2626 10.6767 13.2661 10.6732 13.2696 10.6696L15.1893 8.75H14.6C14.1858 8.75 13.85 8.41421 13.85 8Z" fill="#7786A5" />
                      </svg>

                      <span>{object?.square.living}</span>
                      <p>Living</p>
                    </div>
                    : ""
                  }

                  {object?.rooms.count ?
                    <div className={styles.info__item}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 4.75C0.75 2.4437 2.86907 0.75 5.25 0.75H12.75C15.1309 0.75 17.25 2.4437 17.25 4.75V7V11.25C17.25 13.5563 15.1309 15.25 12.75 15.25C12.3358 15.25 12 14.9142 12 14.5C12 14.0858 12.3358 13.75 12.75 13.75C14.5112 13.75 15.75 12.5335 15.75 11.25V7.75H13.75C13.3358 7.75 13 7.41421 13 7C13 6.58579 13.3358 6.25 13.75 6.25H15.75V4.75C15.75 3.46645 14.5112 2.25 12.75 2.25H5.25C3.48879 2.25 2.25 3.46645 2.25 4.75V6.25H5.25H6H10C10.4142 6.25 10.75 6.58579 10.75 7C10.75 7.41421 10.4142 7.75 10 7.75H6.75V9.25C6.75 9.66421 6.41421 10 6 10C5.58579 10 5.25 9.66421 5.25 9.25V7.75H2.25V11.25C2.25 12.5335 3.48879 13.75 5.25 13.75V12C5.25 11.5858 5.58579 11.25 6 11.25C6.41421 11.25 6.75 11.5858 6.75 12V13.75H8C8.14807 13.75 8.29282 13.7938 8.41603 13.876L11.416 15.876C11.7607 16.1057 11.8538 16.5714 11.624 16.916C11.3943 17.2607 10.9286 17.3538 10.584 17.124L7.77292 15.25H6H5.25C2.86907 15.25 0.75 13.5563 0.75 11.25V7V4.75Z" fill="#7786A5" />
                      </svg>

                      <span>{object?.rooms.count}</span>
                      <p>Rooms</p>
                    </div>
                    : ""
                  }

                  {object?.rooms.bedroom ?
                    <div className={styles.info__item}>
                      <svg width="19" height="15" viewBox="0 0 19 15" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4444 0.75C3.85862 0.75 4.1944 1.08579 4.1944 1.5V2.46429H6.36982C6.49326 2.08768 6.70862 1.74325 7.00006 1.46222C7.47603 1.00325 8.11595 0.75 8.77774 0.75H10.5555C11.2173 0.75 11.8572 1.00325 12.3332 1.46222C12.6246 1.74325 12.84 2.08768 12.9634 2.46429H15.1388V1.5C15.1388 1.08579 15.4746 0.75 15.8888 0.75C16.3031 0.75 16.6388 1.08579 16.6388 1.5V3.21429V7.71809C17.0212 7.83387 17.3747 8.03795 17.6665 8.31936C18.1434 8.77923 18.4166 9.40888 18.4166 10.0714V11.7857C18.4166 12.1999 18.0808 12.5357 17.6666 12.5357H16.6388V13.5C16.6388 13.9142 16.3031 14.25 15.8888 14.25C15.4746 14.25 15.1388 13.9142 15.1388 13.5V12.5357H4.1944V13.5C4.1944 13.9142 3.85862 14.25 3.4444 14.25C3.03019 14.25 2.6944 13.9142 2.6944 13.5V12.5357H1.66663C1.25241 12.5357 0.916626 12.1999 0.916626 11.7857V10.0714C0.916626 9.40888 1.18983 8.77923 1.66672 8.31936C1.95856 8.03795 2.31204 7.83387 2.6944 7.71809V3.21429V1.5C2.6944 1.08579 3.03019 0.75 3.4444 0.75ZM4.1944 3.96429V7.60714H15.1388V3.96429H12.3333C11.9191 3.96429 11.5833 3.6285 11.5833 3.21429C11.5833 2.96752 11.4819 2.7251 11.292 2.54199C11.1012 2.35798 10.8367 2.25 10.5555 2.25H8.77774C8.49653 2.25 8.23209 2.35798 8.04126 2.54199C7.85136 2.7251 7.74996 2.96752 7.74996 3.21429C7.74996 3.6285 7.41417 3.96429 6.99996 3.96429H4.1944ZM3.4444 9.10714C3.1632 9.10714 2.89875 9.21512 2.70793 9.39913C2.51803 9.58225 2.41663 9.82467 2.41663 10.0714V11.0357H3.4444H15.8888H16.9166V10.0714C16.9166 9.82467 16.8152 9.58225 16.6253 9.39913C16.4345 9.21512 16.1701 9.10714 15.8888 9.10714H3.4444Z" fill="#7786A5" />
                      </svg>

                      <span>{object?.rooms.bedroom}</span>
                      <p>Bedrooms</p>
                    </div> : ""
                  }

                  {object?.rooms.bathroom ?
                    <div className={styles.info__item}>
                      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.8027 1.45732C3.2323 1.00855 3.82212 0.75 4.44442 0.75C5.06673 0.75 5.65655 1.00855 6.08615 1.45732C6.51468 1.90499 6.74998 2.50542 6.74998 3.125C6.74998 3.53921 6.41419 3.875 5.99998 3.875C5.58577 3.875 5.24998 3.53921 5.24998 3.125C5.24998 2.88262 5.1575 2.65641 5.00259 2.49458C4.84874 2.33386 4.64724 2.25 4.44442 2.25C4.24161 2.25 4.04011 2.33386 3.88626 2.49458C3.73134 2.65641 3.63887 2.88262 3.63887 3.125V5.625H14.5555H15.3333C15.7475 5.625 16.0833 5.96079 16.0833 6.375C16.0833 6.78921 15.7475 7.125 15.3333 7.125H15.3055V9.625C15.3055 10.6756 14.9063 11.6893 14.1861 12.4417C13.9571 12.6809 13.7015 12.8875 13.4261 13.0581L13.7294 14.3254C13.8258 14.7283 13.5774 15.133 13.1745 15.2294C12.7717 15.3258 12.367 15.0774 12.2706 14.6746L12.0091 13.582C11.8234 13.6105 11.6348 13.625 11.4444 13.625H5.2222C5.03185 13.625 4.84318 13.6105 4.65751 13.582L4.39605 14.6746C4.29964 15.0774 3.89493 15.3258 3.49209 15.2294C3.08925 15.133 2.84084 14.7283 2.93724 14.3254L3.24054 13.0581C2.96516 12.8875 2.70953 12.6809 2.48053 12.4417C1.76028 11.6893 1.36109 10.6756 1.36109 9.625V7.125H1.33331C0.919099 7.125 0.583313 6.78921 0.583313 6.375C0.583313 5.96079 0.919099 5.625 1.33331 5.625H2.11109H2.13887V3.125C2.13887 2.50542 2.37417 1.90499 2.8027 1.45732ZM2.86109 7.125V9.625C2.86109 10.2984 3.11746 10.9379 3.56409 11.4045C4.00967 11.8699 4.60683 12.125 5.2222 12.125H11.4444C12.0598 12.125 12.657 11.8699 13.1025 11.4045C13.5492 10.9379 13.8055 10.2984 13.8055 9.625V7.125H2.88887H2.86109Z" fill="#7786A5" />
                      </svg>
                      <span>{object?.rooms.bathroom}</span>
                      <p>Bathrooms</p>
                    </div> : ""
                  }

                </div>
                <div className={styles.specs}>
                  {mapAdress &&
                    <div className={styles.specs__item}>
                      <div className={styles.specs__left}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M9 2.625C6.09308 2.625 3.75 4.95491 3.75 7.8125C3.75 9.58031 4.81128 11.4866 6.11856 13.0062C6.76105 13.753 7.43379 14.3719 8.00451 14.7973C8.29057 15.0106 8.53887 15.1662 8.735 15.2649C8.89295 15.3445 8.97688 15.3665 9 15.3727C9.02313 15.3665 9.10705 15.3445 9.265 15.2649C9.46113 15.1662 9.70943 15.0106 9.99549 14.7973C10.5662 14.3719 11.239 13.753 11.8814 13.0062C13.1887 11.4866 14.25 9.58031 14.25 7.8125C14.25 4.95491 11.9069 2.625 9 2.625ZM2.25 7.8125C2.25 4.11171 5.2795 1.125 9 1.125C12.7205 1.125 15.75 4.11171 15.75 7.8125C15.75 10.1156 14.4113 12.3655 13.0186 13.9844C12.311 14.8069 11.5588 15.5029 10.892 15.9999C10.5593 16.248 10.2357 16.4555 9.93968 16.6046C9.66727 16.7418 9.33124 16.875 9 16.875C8.66876 16.875 8.33273 16.7418 8.06032 16.6046C7.76425 16.4555 7.44068 16.248 7.10799 15.9999C6.44121 15.5029 5.68895 14.8069 4.98144 13.9844C3.58872 12.3655 2.25 10.1156 2.25 7.8125ZM7.63119 5.67044C8.10725 5.33579 8.64846 5.25 9 5.25C9.35154 5.25 9.89275 5.33579 10.3688 5.67044C10.8874 6.03498 11.25 6.64228 11.25 7.5C11.25 8.35772 10.8874 8.96502 10.3688 9.32956C9.89275 9.66421 9.35154 9.75 9 9.75C8.64846 9.75 8.10725 9.66421 7.63119 9.32956C7.1126 8.96502 6.75 8.35772 6.75 7.5C6.75 6.64228 7.1126 6.03498 7.63119 5.67044ZM8.49381 6.89758C8.3874 6.97238 8.25 7.11508 8.25 7.5C8.25 7.88492 8.3874 8.02762 8.49381 8.10242C8.64275 8.20711 8.85154 8.25 9 8.25C9.14846 8.25 9.35725 8.20711 9.50619 8.10242C9.6126 8.02762 9.75 7.88492 9.75 7.5C9.75 7.11508 9.6126 6.97238 9.50619 6.89758C9.35725 6.79289 9.14846 6.75 9 6.75C8.85154 6.75 8.64275 6.79289 8.49381 6.89758Z" fill="#7786A5" />
                        </svg>
                        <span>Location</span>
                      </div>
                      <div className={styles.specs__right}>
                        <span>{mapAdress[0].split(',')[3]} / {mapAdress[0].split(',')[1]}</span>
                      </div>
                    </div>
                  }

                  <div className={styles.specs__item}>
                    <div className={styles.specs__left}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8 2.7002C12 2.7002 13.125 3.2252 13.95 4.0502C14.775 4.8752 15.3 6.00019 15.3 7.2752C15.3 8.47519 14.775 9.6002 13.95 10.4252C12.825 11.5502 11.175 12.0002 9.60002 11.5502L6.00002 15.1502C5.92502 15.3002 5.70002 15.3752 5.55002 15.3752L3.22502 15.6002H3.15002C2.92502 15.6002 2.77502 15.5252 2.62502 15.3752C2.47502 15.2252 2.40002 15.0002 2.40002 14.7752L2.62502 12.4502C2.62502 12.3002 2.70002 12.1502 2.85002 12.0002L6.45002 8.4002C6.00002 6.8252 6.45002 5.1752 7.65002 4.0502C8.47502 3.1502 9.60002 2.7002 10.8 2.7002ZM9.97502 10.1252C11.025 10.4252 12.15 10.1252 12.9 9.37519C13.425 8.7752 13.8 8.0252 13.8 7.1252C13.8 6.3752 13.5 5.62519 12.9 5.0252C11.7 3.9002 9.75002 3.9002 8.62502 5.0252C7.87502 5.7752 7.57502 6.9002 7.87502 7.9502V8.0252C7.87502 8.06269 7.89377 8.1002 7.91252 8.1377C7.93127 8.1752 7.95002 8.2127 7.95002 8.2502C8.10002 8.4752 8.02502 8.8502 7.80002 9.0752L4.05002 12.8252L3.97502 14.0252L5.17502 13.9502L8.92502 10.2002C9.15002 9.9752 9.45002 9.90019 9.75002 10.0502C9.78752 10.0502 9.82503 10.0689 9.86252 10.0877C9.90002 10.1064 9.93752 10.1252 9.97502 10.1252ZM12.375 6.3752C12.375 6.78941 12.0392 7.1252 11.625 7.1252C11.2108 7.1252 10.875 6.78941 10.875 6.3752C10.875 5.96098 11.2108 5.6252 11.625 5.6252C12.0392 5.6252 12.375 5.96098 12.375 6.3752Z" fill="#7786A5" />
                      </svg>

                      <span>Deal format</span>
                    </div>
                    <div className={styles.specs__right}>
                      <span>{object?.dealFormat}</span>
                    </div>
                  </div>
                  <div className={styles.specs__item}>
                    <div className={styles.specs__left}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 3C6.25 2.0335 7.0335 1.25 8 1.25H15C15.9665 1.25 16.75 2.0335 16.75 3V15C16.75 15.9665 15.9665 16.75 15 16.75H10H7H3C2.0335 16.75 1.25 15.9665 1.25 15V11.5662C1.25 10.9515 1.57252 10.3818 2.09963 10.0656L6.25 7.57536V3ZM6.25 9.32464L2.87138 11.3518C2.79607 11.397 2.75 11.4784 2.75 11.5662V15C2.75 15.1381 2.86193 15.25 3 15.25H6.25V9.32464ZM7.75 15.25H9.25V14C9.25 13.0335 10.0335 12.25 11 12.25H12C12.9665 12.25 13.75 13.0335 13.75 14V15.25H15C15.1381 15.25 15.25 15.1381 15.25 15V3C15.25 2.86193 15.1381 2.75 15 2.75H8C7.86193 2.75 7.75 2.86193 7.75 3V8V15.25ZM12.25 15.25V14C12.25 13.8619 12.1381 13.75 12 13.75H11C10.8619 13.75 10.75 13.8619 10.75 14V15.25H12.25ZM9.25 5C9.25 4.58579 9.58579 4.25 10 4.25H13C13.4142 4.25 13.75 4.58579 13.75 5C13.75 5.41421 13.4142 5.75 13 5.75H10C9.58579 5.75 9.25 5.41421 9.25 5ZM9.25 8C9.25 7.58579 9.58579 7.25 10 7.25H13C13.4142 7.25 13.75 7.58579 13.75 8C13.75 8.41421 13.4142 8.75 13 8.75H10C9.58579 8.75 9.25 8.41421 9.25 8Z" fill="#7786A5" />
                      </svg>


                      <span>Property type </span>
                    </div>
                    <div className={styles.specs__right}>
                      <span>{object?.propertyType}</span>
                      {object?.propertySubType &&
                        <span>{object?.propertySubType}</span>
                      }
                    </div>
                  </div>
                  <div className={styles.specs__item}>
                    <div className={styles.specs__left}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.61049 0.821908C5.25185 0.652603 4.82339 0.791771 4.6327 1.13951L1.74841 6.39909C1.30692 7.20417 1.8551 8.18202 2.74999 8.24674V11.0001V16.5001C2.74999 16.9143 3.08577 17.2501 3.49999 17.2501C3.9142 17.2501 4.24999 16.9143 4.24999 16.5001V15.2501H7.24999V16.5001C7.24999 16.9143 7.58577 17.2501 7.99999 17.2501C8.4142 17.2501 8.74999 16.9143 8.74999 16.5001V14.5001V11.0001V8.25013H8.99999H13.25V9.75013V12.0001C13.25 12.4143 13.5858 12.7501 14 12.7501C14.4142 12.7501 14.75 12.4143 14.75 12.0001V9.75013V8.25013H15.7696C17.104 8.25013 17.5099 6.43942 16.3032 5.86976L5.61049 0.821908ZM14 6.75013H14.6544L7.25969 3.25921L9.41805 6.75013H14ZM7.24999 8.25013H4.24999V10.2501H7.24999V8.25013ZM3.49999 6.75013H7.6545L5.32914 2.98911L3.26665 6.75013H3.49999ZM7.24999 13.7501H4.24999V11.7501H7.24999V13.7501Z" fill="#7786A5" />
                      </svg>
                      <span>Condition</span>
                    </div>

                    <div className={styles.specs__right}>
                      <span>{object?.condition.status}</span>
                      {object?.condition.buildingYear ?
                        <span>
                          {object?.condition.buildingYear}
                          {object?.condition.buildingQuarter &&
                            <span> quarter {object?.condition.buildingQuarter}</span>
                          }
                        </span>
                        : ""
                      }
                    </div>
                  </div>
                  <div className={styles.specs__item}>
                    <div className={styles.specs__left}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                      </svg>
                      <span>Assignment</span>
                    </div>

                    <div className={styles.specs__right}>
                      <span>{object?.appointment}</span>
                    </div>
                  </div>
                  {(object?.territory.view.length != undefined && object?.territory.view.length > 0) ?
                    <div className={styles.specs__item}>
                      <div className={styles.specs__left}>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 5.25C0.75 2.76472 2.76472 0.75 5.25 0.75H12.75C15.2353 0.75 17.25 2.76472 17.25 5.25V11.9955C17.25 11.9988 17.25 12.002 17.25 12.0053V12.75C17.25 15.2353 15.2353 17.25 12.75 17.25H5.25C2.76472 17.25 0.75 15.2353 0.75 12.75V5.25ZM15.75 10.3987V5.25C15.75 3.59315 14.4069 2.25 12.75 2.25H5.25C3.59315 2.25 2.25 3.59315 2.25 5.25V11.9355L3.13347 11.3044C3.96881 10.7077 5.1131 10.8024 5.83899 11.5283L6.64393 12.3333C6.70251 12.3919 6.79749 12.3919 6.85606 12.3333L10.5979 8.59142C11.3659 7.82341 12.5928 7.76776 13.4272 8.46308L15.75 10.3987ZM2.39532 13.675L4.00532 12.525C4.24399 12.3545 4.57093 12.3816 4.77833 12.589L5.58327 13.3939C6.22763 14.0383 7.27236 14.0383 7.91672 13.3939L11.6586 9.65208C11.878 9.43265 12.2286 9.41675 12.467 9.61541L15.75 12.3513V12.75C15.75 14.4069 14.4069 15.75 12.75 15.75H5.25C3.91593 15.75 2.78524 14.8792 2.39532 13.675ZM3.75 6C3.75 4.75736 4.75736 3.75 6 3.75C7.24264 3.75 8.25 4.75736 8.25 6C8.25 7.24264 7.24264 8.25 6 8.25C4.75736 8.25 3.75 7.24264 3.75 6ZM6 5.25C5.58578 5.25 5.25 5.58579 5.25 6C5.25 6.41421 5.58578 6.75 6 6.75C6.41421 6.75 6.75 6.41421 6.75 6C6.75 5.58579 6.41421 5.25 6 5.25Z" fill="#7786A5" />
                        </svg>
                        <span>Views</span>
                      </div>

                      <div className={styles.specs__right}>
                        {object?.territory.view.map((e: string) => {
                          return (
                            <span key={e}>{e}</span>
                          )
                        })}
                      </div>
                    </div>
                    : ""
                  }

                </div>
              </section>
              {object?.subTitle &&
                <section className={styles.section}>
                  <div className={styles.section__top}>
                    <h6 className={styles.heading}>Description</h6>
                    <button className={`${openDescription && styles.more}`} onClick={() => { setOpenDescription(!openDescription) }}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                        <rect width="28" height="28" rx="14" fill="white" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 11.9042C8.68342 11.5137 9.31658 11.5137 9.70711 11.9042L14 16.1971L18.2929 11.9042C18.6834 11.5137 19.3166 11.5137 19.7071 11.9042C20.0976 12.2947 20.0976 12.9279 19.7071 13.3184L15.0607 17.9649C14.4749 18.5507 13.5251 18.5507 12.9393 17.9649L8.29289 13.3184C7.90237 12.9279 7.90237 12.2947 8.29289 11.9042Z" fill="#7786A5" />
                      </svg>
                    </button>

                  </div>
                  <AnimatePresence initial={false}>
                    {openDescription && (
                      <motion.div
                        key='content'
                        initial='collapsed'
                        animate='open'
                        exit='collapsed'
                        variants={{
                          open: { opacity: 1, height: 'auto' },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        className={styles.section__content}
                        style={{ overflow: 'hidden' }}
                        transition={{ duration: 0.2, linear: [] }}
                      >
                        <p className={styles.desc}>{object?.subTitle}</p>
                      </motion.div>
                    )}

                  </AnimatePresence>

                </section>
              }
              <section className={styles.section}>
                <div className={styles.section__top}>
                  <h6 className={styles.heading}>Location</h6>
                  <button className={`${openServices && styles.more}`} onClick={() => { setOpenServices(!openServices) }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                      <rect width="28" height="28" rx="14" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 11.9042C8.68342 11.5137 9.31658 11.5137 9.70711 11.9042L14 16.1971L18.2929 11.9042C18.6834 11.5137 19.3166 11.5137 19.7071 11.9042C20.0976 12.2947 20.0976 12.9279 19.7071 13.3184L15.0607 17.9649C14.4749 18.5507 13.5251 18.5507 12.9393 17.9649L8.29289 13.3184C7.90237 12.9279 7.90237 12.2947 8.29289 11.9042Z" fill="#7786A5" />
                    </svg>
                  </button>

                </div>

                <AnimatePresence initial={false}>
                  {openServices && (
                    <motion.div
                      key='content'
                      initial='collapsed'
                      animate='open'
                      exit='collapsed'
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      style={{ overflow: 'hidden' }}
                      transition={{ duration: 0.2, linear: [] }}
                    >
                      <div className={styles.specs}>
                        <div className={styles.specs__item}>
                          <div className={styles.specs__left}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                            </svg>
                            <span>Address</span>
                          </div>
                          <div className={styles.specs__right}>
                            <span>{mapAdress && mapAdress[0].split(',')[0]}</span>
                          </div>
                        </div>
                      </div>
                      {mapCoords &&
                        <div className={styles.section__map}>

                          <ObjectLocation onLoaded={handleMapLoading} coordinates={mapCoords?.geometry.coordinates} />
                          {mapLoad &&
                            <div className={styles.map__loader}>
                              <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
                                <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                              </svg>
                            </div>
                          }
                        </div>
                      }

                    </motion.div>
                  )}

                </AnimatePresence>

              </section>
              <section className={styles.section}>
                <div className={styles.section__top}>
                  <h6 className={styles.heading}>In the apartment</h6>
                  <button className={`${openInfo && styles.more}`} onClick={() => { setOpenInfo(!openInfo) }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                      <rect width="28" height="28" rx="14" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 11.9042C8.68342 11.5137 9.31658 11.5137 9.70711 11.9042L14 16.1971L18.2929 11.9042C18.6834 11.5137 19.3166 11.5137 19.7071 11.9042C20.0976 12.2947 20.0976 12.9279 19.7071 13.3184L15.0607 17.9649C14.4749 18.5507 13.5251 18.5507 12.9393 17.9649L8.29289 13.3184C7.90237 12.9279 7.90237 12.2947 8.29289 11.9042Z" fill="#7786A5" />
                    </svg>
                  </button>

                </div>

                <AnimatePresence initial={false}>
                  {openInfo && (
                    <motion.div
                      key='content'
                      initial='collapsed'
                      animate='open'
                      exit='collapsed'
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      style={{ overflow: 'hidden' }}
                      transition={{ duration: 0.2, linear: [] }}
                    >
                      <div className={styles.section__content}>
                        <div className={styles.specs}>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>floor</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.floor}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Total area</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.square.common || '-'}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Living area</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.square.living || '-'}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Kitchen area</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.square.kitchen || '-'}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Ceiling heights</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.height || '-'}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Total rooms</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.rooms.count || '-'}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Bedrooms</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.rooms.bedroom || '-'}</span>
                            </div>
                          </div>
                          <div className={styles.specs__item}>
                            <div className={styles.specs__left}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                              </svg>

                              <span>Bathrooms</span>
                            </div>
                            <div className={styles.specs__right}>
                              <span>{object?.rooms.bathroom || '-'}</span>
                            </div>
                          </div>

                        </div>
                        <h6 className={styles.sub__heading}>Equipment</h6>
                        <div className={styles.specs}>
                          {object?.equipment.map((e: string) => {
                            return (
                              <div className={styles.specs__item} key={e}>
                                <div className={styles.specs__left}>
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                                  </svg>

                                  <span>{e}</span>
                                </div>
                              </div>
                            )
                          })}

                        </div>
                        {/* <h6 className={styles.sub__heading}>Apartment layout</h6>
               <div className={styles.slider}>
                 <div className={styles.image__wrap}>
                   <div className={styles.image__item}>
                     <img src={`${API_URL}/storage/images/${object?.layout[0]}`} alt="" />
                   </div>
                   <div className={styles.image__item}>
                     <img src={`${API_URL}/storage/images/${object?.layout[0]}`} alt="" />
                   </div>
                 </div>
               </div> */}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </section>
              <section className={styles.section}>
                <div className={styles.section__top}>
                  <h6 className={styles.heading}>On the territory</h6>
                  <button className={`${openTerInfo && styles.more}`} onClick={() => { setOpenTerInfo(!openTerInfo) }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                      <rect width="28" height="28" rx="14" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 11.9042C8.68342 11.5137 9.31658 11.5137 9.70711 11.9042L14 16.1971L18.2929 11.9042C18.6834 11.5137 19.3166 11.5137 19.7071 11.9042C20.0976 12.2947 20.0976 12.9279 19.7071 13.3184L15.0607 17.9649C14.4749 18.5507 13.5251 18.5507 12.9393 17.9649L8.29289 13.3184C7.90237 12.9279 7.90237 12.2947 8.29289 11.9042Z" fill="#7786A5" />
                    </svg>
                  </button>

                </div>

                <AnimatePresence initial={false}>
                  {openTerInfo && (
                    <motion.div
                      key='content'
                      initial='collapsed'
                      animate='open'
                      exit='collapsed'
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      style={{ overflow: 'hidden' }}
                      transition={{ duration: 0.2, linear: [] }}
                    >
                      <div className={styles.section__content}>
                        {(object?.territory.additional.length != undefined && object?.territory.additional.length > 0) &&
                          <div className={styles.specs}>
                            {object?.territory.additional.map((e: string) => {
                              return (
                                <div className={styles.specs__item} key={e}>
                                  <div className={styles.specs__left}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                                    </svg>

                                    <span>{e}</span>
                                  </div>

                                </div>
                              )
                            })}
                          </div>
                        }
                        {(object?.territory.near != undefined) &&
                          <>
                            <h6 className={styles.sub__heading}>Places nearby</h6>
                            <div className={styles.specs}>
                              {object?.territory.near.map((e: string) => {
                                return (
                                  <div className={styles.specs__item} key={e}>
                                    <div className={styles.specs__left}>
                                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                                      </svg>

                                      <span>{e}</span>
                                    </div>
                                  </div>
                                )
                              })}

                            </div>
                          </>
                        }
                        {(object?.territory.view != undefined && object?.territory.view.length > 0) &&
                          <>
                            <h6 className={styles.sub__heading}>Views on</h6>
                            <div className={styles.specs}>
                              {object?.territory.view.map((e: string) => {
                                return (
                                  <div className={styles.specs__item} key={e}>
                                    <div className={styles.specs__left}>
                                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" >
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 4.44365 4.44365 0.75 9 0.75C13.5563 0.75 17.25 4.44365 17.25 9C17.25 13.5563 13.5563 17.25 9 17.25C4.44365 17.25 0.75 13.5563 0.75 9ZM9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25ZM12.2803 6.71967C12.5732 7.01256 12.5732 7.48744 12.2803 7.78033L9.03033 11.0303C8.73743 11.3232 8.26256 11.3232 7.96967 11.0303L6.34467 9.40533C6.05178 9.11244 6.05178 8.63756 6.34467 8.34467C6.63756 8.05178 7.11244 8.05178 7.40533 8.34467L8.5 9.43934L11.2197 6.71967C11.5126 6.42678 11.9874 6.42678 12.2803 6.71967Z" fill="#7786A5" />
                                      </svg>

                                      <span>{e}</span>
                                    </div>
                                  </div>
                                )
                              })}

                            </div>
                          </>

                        }

                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </section>
              <section className={styles.section}>
                <div className={styles.section__top}>
                  <h6 className={styles.heading}>Services</h6>
                  <button className={`${openServices && styles.more}`} onClick={() => { setOpenServices(!openServices) }}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" >
                      <rect width="28" height="28" rx="14" fill="white" />
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.29289 11.9042C8.68342 11.5137 9.31658 11.5137 9.70711 11.9042L14 16.1971L18.2929 11.9042C18.6834 11.5137 19.3166 11.5137 19.7071 11.9042C20.0976 12.2947 20.0976 12.9279 19.7071 13.3184L15.0607 17.9649C14.4749 18.5507 13.5251 18.5507 12.9393 17.9649L8.29289 13.3184C7.90237 12.9279 7.90237 12.2947 8.29289 11.9042Z" fill="#7786A5" />
                    </svg>
                  </button>

                </div>

                <AnimatePresence initial={false}>
                  {openServices && (
                    <motion.div
                      key='content'
                      initial='collapsed'
                      animate='open'
                      exit='collapsed'
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      style={{ overflow: 'hidden' }}
                      transition={{ duration: 0.2, linear: [] }}
                    >
                      <div className={styles.section__content}>
                        <div className={styles.specs}>
                          {object?.services.map((e: string) => {
                            return (
                              <div className={styles.specs__item} key={e}>
                                <div className={styles.specs__right}>
                                  <svg width="40" height="41" viewBox="0 0 40 41" fill="none">
                                    <rect y="0.671875" width="40" height="40" rx="10" fill="#EAFFF3" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.75 20.6719C11.75 16.1155 15.4437 12.4219 20 12.4219C24.5563 12.4219 28.25 16.1155 28.25 20.6719C28.25 25.2282 24.5563 28.9219 20 28.9219C15.4437 28.9219 11.75 25.2282 11.75 20.6719ZM20 13.9219C16.2721 13.9219 13.25 16.944 13.25 20.6719C13.25 24.3998 16.2721 27.4219 20 27.4219C23.7279 27.4219 26.75 24.3998 26.75 20.6719C26.75 16.944 23.7279 13.9219 20 13.9219ZM23.2803 18.3915C23.5732 18.6844 23.5732 19.1593 23.2803 19.4522L20.0303 22.7022C19.7374 22.9951 19.2626 22.9951 18.9697 22.7022L17.3447 21.0772C17.0518 20.7843 17.0518 20.3094 17.3447 20.0165C17.6376 19.7237 18.1124 19.7237 18.4053 20.0165L19.5 21.1112L22.2197 18.3915C22.5126 18.0987 22.9874 18.0987 23.2803 18.3915Z" fill="#0AB258" />
                                  </svg>

                                  <p>{e}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

              </section>
            </div>
            {object?.creator &&
              // <div className="right-wrapper">
              <UserContacts userID={object.creator} title={object.title} />
              // </div>
            }

          </div>
          :
          <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" >
            <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
          </svg>
        }

      </div >



    </main >
  )
}
