'use client'
import GlobalMap from '@/components/maps/Global'
import React from 'react'
import styles from '../index.module.scss'
import { useRouter } from "next/navigation";
import Filter from '@/components/ui-kit/Filter';
import Search from '@/components/ui-kit/SearchBox';

export default function ObjectsMap() {

  const router = useRouter()
  const [search, setSearch] = React.useState<string>()
  console.log(search);


  return (
    <>
      <button className={styles.back} onClick={() => router.back()}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.09619 11.7071C7.48672 11.3166 7.48672 10.6834 7.09619 10.2929L2.8033 6L7.09619 1.70711C7.48672 1.31658 7.48672 0.683417 7.09619 0.292893C6.70567 -0.097631 6.0725 -0.097631 5.68198 0.292893L1.03553 4.93934C0.449743 5.52513 0.449746 6.47487 1.03553 7.06066L5.68198 11.7071C6.0725 12.0976 6.70567 12.0976 7.09619 11.7071Z" fill="#0000E6" />
        </svg>
      </button>
      <div className={styles.searchWrap}>
        <Search value={search} onChange={setSearch} />
      </div>
      <Filter />
      <GlobalMap coordinates={[37.59061637, 55.76402909]} />
    </>
  )
}
