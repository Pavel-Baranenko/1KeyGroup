import React from 'react'
import styles from './index.module.scss'
import DropDown from '../DropDown'

interface SearchI {
  value?: string,
  onChange: (e: string) => void
}

export default function Search({ value, onChange }: SearchI) {
  const searchOptions = [
    { title: 'Cheaper', value: "priceDown" },
    { title: 'Expensive', value: "priceUp" }
  ]
  const [options, setOptions] = React.useState<string>('Cheaper')

  return (
    <>
      <div className={styles.box}>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.25 2C4.3505 2 2 4.3505 2 7.25C2 10.1495 4.3505 12.5 7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.3505 10.1495 2 7.25 2ZM0.5 7.25C0.5 3.52208 3.52208 0.5 7.25 0.5C10.9779 0.5 14 3.52208 14 7.25C14 8.93142 13.3852 10.4693 12.3682 11.651L15.6553 14.9382C15.9482 15.2311 15.9482 15.7059 15.6553 15.9988C15.3624 16.2917 14.8876 16.2917 14.5947 15.9988L11.2693 12.6734C10.1465 13.5069 8.75581 14 7.25 14C3.52208 14 0.5 10.9779 0.5 7.25Z" fill="#7786A5" />
        </svg>

        <input
          type="text"
          className={styles.search}
          value={value}
          onChange={e => onChange(e.target.value)}
        />

        <DropDown value={options} onChange={setOptions} options={searchOptions} className='mini' />
        <button className={styles.open}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 2.25C0.5 1.00736 1.50736 0 2.75 0C3.99264 0 5 1.00736 5 2.25C5 3.49264 3.99264 4.5 2.75 4.5C1.50736 4.5 0.5 3.49264 0.5 2.25ZM2.75 1.5C2.33579 1.5 2 1.83579 2 2.25C2 2.66421 2.33579 3 2.75 3C3.16421 3 3.5 2.66421 3.5 2.25C3.5 1.83579 3.16421 1.5 2.75 1.5ZM14.75 3L7.25 3V1.5L14.75 1.5C15.1642 1.5 15.5 1.83579 15.5 2.25C15.5 2.66421 15.1642 3 14.75 3ZM13.25 9C12.8358 9 12.5 9.33579 12.5 9.75C12.5 10.1642 12.8358 10.5 13.25 10.5C13.6642 10.5 14 10.1642 14 9.75C14 9.33579 13.6642 9 13.25 9ZM11 9.75C11 8.50736 12.0074 7.5 13.25 7.5C14.4926 7.5 15.5 8.50736 15.5 9.75C15.5 10.9926 14.4926 12 13.25 12C12.0074 12 11 10.9926 11 9.75ZM8.75 9V10.5L1.25 10.5C0.835787 10.5 0.5 10.1642 0.5 9.75C0.5 9.33579 0.835786 9 1.25 9L8.75 9Z" fill="#7786A5" />
          </svg>
        </button>
      </div>
    </>
  )
}
