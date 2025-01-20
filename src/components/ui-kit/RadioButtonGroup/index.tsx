"use client"
import React from 'react'

import styles from "./index.module.scss"

interface RadioButtons { title: string; value: string }

interface RadioButtonGroup {
  options: RadioButtons[];
  onChange: (e: string) => void;
  value?: string
}



const RadioButtonGroup = ({ options, onChange, value }: RadioButtonGroup) => {

  const [selected, setSelected] = React.useState(value)

  return (
    <div className={styles.box}>
      {options.map((obj: RadioButtons) => {
        return (
          <div key={obj.value} className={styles.btn}>
            <label
              htmlFor={obj.value}
              className={(selected === obj.value) ? styles.active : ""}
            >{obj.title}</label>
            <input
              type="checkbox"
              checked={selected === obj.value ? true : false}
              id={obj.value}
              value={obj.value}
              onChange={() => {
                onChange(obj.value)
                setSelected(obj.value)
              }}
            />
          </div>
        )
      })}

    </div>
  )
}
export default RadioButtonGroup;


/// options = [{title:"",value:""},{}]