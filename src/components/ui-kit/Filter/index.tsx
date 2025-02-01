import React from 'react'
import styles from './index.module.scss'
import TabButtons from '../TabButtons'
import MyInput from '../MyInput'
import CheckBoxButtons from '../CheckBoxButtons'


export default function Filter() {
  const filterOptions = {
    type: [
      { value: 'rent', title: "Rent" },
      { value: 'buy', title: "Buy" }
    ],
    condition: [
      { value: 'all', title: "All" },
      { value: 'new', title: "New" },
      { value: 'recycling', title: "Recycling" }
    ],
    rooms: [
      { value: '1', title: "1" },
      { value: '2', title: "2" },
      { value: '3', title: "3" },
      { value: '4', title: "4" },
      { value: '5+', title: "5+" }
    ]
  }
  const [type, setType] = React.useState<string>('buy')
  const [condition, setСondition] = React.useState<string>('all')
  const [minPrice, setMinPrice] = React.useState<number>()
  const [maxPrice, setMaxPrice] = React.useState<number>()
  const [rooms, setRooms] = React.useState<string[]>()

  return (
    <div className={styles.box}>
      <div className={styles.top}>
        <h6 className={styles.title}>Filter off</h6>
        <button className={styles.close}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3637 0.635667C13.7542 1.02619 13.7542 1.65936 13.3637 2.04988L8.41384 6.99976L13.3636 11.9495C13.7541 12.34 13.7541 12.9732 13.3636 13.3637C12.9731 13.7543 12.3399 13.7543 11.9494 13.3637L6.99962 8.41398L2.05001 13.3636C1.65949 13.7541 1.02632 13.7541 0.6358 13.3636C0.245275 12.9731 0.245276 12.3399 0.6358 11.9494L5.58541 6.99976L0.635667 2.05002C0.245142 1.6595 0.245143 1.02633 0.635667 0.635807C1.02619 0.245283 1.65936 0.245283 2.04988 0.635807L6.99962 5.58555L11.9495 0.635667C12.34 0.245142 12.9732 0.245142 13.3637 0.635667Z" fill="#7786A5" />
          </svg>
        </button>
      </div>
      <div className={styles.wrap}>
        <TabButtons options={filterOptions.type} value={type} onClick={setType} />
      </div>
      <div className={styles.wrap}>
        <span className={styles.heading}>Price</span>
        <div className={styles.grid}>
          <MyInput label='min' type='number' value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <MyInput label='max' type='number' value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
        </div>
      </div>
      <div className={styles.wrap}>
        <span className={styles.heading}>Type of real estate</span>
        <TabButtons options={filterOptions.condition} value={condition} onClick={setСondition} />
      </div>
      <div className={styles.wrap}>
        <span className={styles.heading}>Rooms</span>
        <CheckBoxButtons options={filterOptions.rooms} onChange={setRooms} values={rooms} />
      </div>
    </div>
  )
}
