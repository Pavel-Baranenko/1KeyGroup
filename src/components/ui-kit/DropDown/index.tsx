'use client'
import React from 'react'
import styles from "./index.module.scss"

interface Options { title: string; value: string; }

interface DropDown {
  value?: string | number,
  options?: Options[],
  onChange: (e: any) => void,
  direction?: boolean
}

export default function DropDown({ value, onChange, options, direction }: DropDown) {

  const [open, setOpen] = React.useState<boolean>(false)

  return (
    <div className={styles.wrap}>
      {direction ?
        <>
          {open &&
            <div className={`${styles.list} ${styles.upper}`} onClick={() => setOpen(false)}>
              {options?.map((obj: Options) => {
                if (obj.title != value) {
                  return (
                    <div
                      className={styles.item}
                      key={obj.value} onClick={() => { onChange(obj.title) }} >
                      {obj.title}
                    </div>
                  )
                }
              })}
            </div>
          }
          <div className={`${styles.top} ${open && styles.reverce}`} onClick={() => setOpen(!open)}>
            <span>{value}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 7.75L8.64645 11.8964C8.84171 12.0917 9.15829 12.0917 9.35355 11.8964L13.5 7.75" stroke="#7786A5" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
        </>
        :
        <>
          <div className={`${styles.top} ${open && styles.reverce}`} onClick={() => setOpen(!open)}>
            <span>{value}</span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4.5 7.75L8.64645 11.8964C8.84171 12.0917 9.15829 12.0917 9.35355 11.8964L13.5 7.75" stroke="#7786A5" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </div>
          {open &&
            <div className={styles.list} onClick={() => setOpen(false)}>
              {options?.map((obj: Options) => {
                if (obj.title != value) {
                  return (
                    <div
                      className={styles.item}
                      key={obj.value} onClick={() => { onChange(obj.title) }} >
                      {obj.title}
                    </div>
                  )
                }
              })}
            </div>
          }

        </>
      }


    </div >
  )
}
