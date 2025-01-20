"use client"
import React from 'react'

import styles from "./index.module.scss"

interface data { title: string; value: string }

interface CheckBoxButtons {
  options: data[];
  onChange: (e: string[]) => void;
  editable?: boolean;
  values?: string[]
}

const CheckBoxButtons = ({ options, onChange, editable, values }: CheckBoxButtons) => {

  const [list, setList] = React.useState(options)
  const [selected, setSelected] = React.useState<string[]>(values || [])
  const [label, setLabel] = React.useState('')
  const [add, setAdd] = React.useState(true)

  const addItem = () => {
    if (label.length > 0) {
      setList([...list, { title: label, value: label }]);
      setAdd(true)
      setLabel('')
    }
  }

  const handleClick = (str: string) => {

    if (selected.indexOf(str) != -1) {
      setSelected(selected => selected.filter(item => item !== str));
    }
    else {
      setSelected([...selected, str])
    }

    onChange(selected)
  }

  return (
    <div className={styles.box}>
      {list.map((obj: data) => {
        return (
          <div key={obj.value} className={styles.btn}>
            <input
              type="checkbox"
              id={obj.value}
              value={obj.value}
              checked={selected.includes(obj.value)}
            />
            <label
              htmlFor={obj.value}
              onClick={() => { handleClick(obj.value) }}
            >{obj.title}</label>
          </div>
        )
      })}
      {editable &&
        <>
          {add ?
            <button className={styles.add} onClick={() => setAdd(false)}>
              <span>Add</span>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 4.25C9.41421 4.25 9.75 4.58579 9.75 5V8.2501H13C13.4142 8.2501 13.75 8.58588 13.75 9.0001C13.75 9.41431 13.4142 9.7501 13 9.7501H9.75V13C9.75 13.4142 9.41421 13.75 9 13.75C8.58578 13.75 8.25 13.4142 8.25 13V9.7501H5C4.58579 9.7501 4.25 9.41431 4.25 9.0001C4.25 8.58588 4.58579 8.2501 5 8.2501H8.25V5C8.25 4.58579 8.58578 4.25 9 4.25Z" fill="#0000FF" />
              </svg>

            </button>
            :
            <div className={styles.add_box}>
              <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
              <button onClick={addItem}>
                <span>Add</span>
              </button>
            </div>
          }

        </>

      }
    </div>
  )
}
export default CheckBoxButtons;

