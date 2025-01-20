import React from 'react'
import styles from "./index.module.scss"

interface InputProps {
  label: string,
  required?: boolean,
  type?: string,
  placeholder?: string,
  onChange: (e: any) => void,
  value?: number | string | undefined
}
export default function Specs({ label, required, type, placeholder, onChange, value }: InputProps) {
  return (
    <div className={styles.item}>
      <span>{label} {required && <span className="red">*</span>}</span>
      <input type={type || "number"} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
