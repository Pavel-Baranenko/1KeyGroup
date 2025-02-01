import React from 'react'
import styles from './index.module.scss'

interface Options {
  value: string;
  title: string;
}
interface TabButtonsI {
  value?: string;
  options: Options[],
  onClick: (e: string) => void
}

export default function TabButtons({ value, options, onClick }: TabButtonsI) {


  return (
    <div className={styles.box}>
      {options.map((e) => {
        return (
          <button
            className={e.value == value ? styles.active : ""}
            key={e.value}
            onClick={() => onClick(e.value)}
          >{e.title}</button>
        )
      })}
    </div>
  )
}
