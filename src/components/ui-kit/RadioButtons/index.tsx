"use client"
import React from 'react'

import styles from "./index.module.scss"


const RadioButtons = ({ options, value, onChange }: { options: string[], value?: string, onChange: (e: string) => void; }) => {

  const [selected, setSelected] = React.useState(value)
  return (
    <div className={styles.box}>
      {options.map((obj: string) => {
        return (
          <div key={obj} className={styles.btn}>
            <label
              htmlFor={obj}
              className={(selected === obj) ? styles.active : ""}

            >{obj}</label>
            <input
              type="checkbox"
              checked={selected === obj ? true : false}
              id={obj}
              value={obj}
              onChange={() => {
                onChange(obj)
                setSelected(obj)
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
export default RadioButtons;

