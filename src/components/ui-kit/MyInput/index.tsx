'use client'
import React from 'react'

import styles from "./index.module.scss"

interface InputProps {
  type?: string;
  value?: string | number;
  label: string;
  required?: boolean;
  name?: string;
  // onChange?: void
  onChange?: (e: any) => void;
  className?: string
}

const MyInput = ({ value, label, required, type, name, onChange, className }: InputProps) => {
  const [pass, setPass] = React.useState(true)

  return (
    <div className={`input text-input ${value ? "active" : ""} ${className}`}>
      <p>{label}{required && <span className='required'>*</span>}</p>
      <input
        type={type == "password" ? (pass ? "password" : "text") : type || 'text'}
        value={value}
        name={name || ""}
        onChange={onChange}
        className={value ? styles.active : ""}
      />
      {type == "password" && value ?
        <div className={styles.pass_btn} onClick={() => { setPass(!pass) }}>
          {pass ?
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M1.40043 6.58832C1.19985 6.22155 1.19986 5.77834 1.40044 5.41158C2.675 3.08102 5.15252 1.5 7.99998 1.5C10.8475 1.5 13.325 3.08107 14.5996 5.41169C14.8001 5.77845 14.8001 6.22166 14.5996 6.58842C13.325 8.91898 10.8475 10.5 8.00003 10.5C5.15252 10.5 2.67498 8.91893 1.40043 6.58832Z" stroke="#7786A5" stroke-width="1.5" />
              <path d="M10.25 6C10.25 7.24264 9.24264 8.25 8 8.25C6.75736 8.25 5.75 7.24264 5.75 6C5.75 4.75736 6.75736 3.75 8 3.75C9.24264 3.75 10.25 4.75736 10.25 6Z" stroke="#7786A5" stroke-width="1.5" />
            </svg>
            :
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.40044 6.4116L2.05846 6.77146L1.40044 6.4116ZM14.5996 7.58844L15.2576 7.94831L15.2576 7.94831L14.5996 7.58844ZM14.5996 6.4117L15.2576 6.05184V6.05184L14.5996 6.4117ZM1.40043 7.58833L0.742397 7.94819L1.40043 7.58833ZM13.7736 4.09757C13.477 3.8084 13.0022 3.8144 12.713 4.11097C12.4238 4.40754 12.4298 4.88237 12.7264 5.17154L13.7736 4.09757ZM6.31128 10.5381C5.91005 10.4352 5.50138 10.6771 5.3985 11.0783C5.29562 11.4796 5.53749 11.8882 5.93872 11.9911L6.31128 10.5381ZM9.953 2.75587L10.1471 2.03143L9.953 2.75587ZM3.07929 9.66807L2.5884 10.2351H2.5884L3.07929 9.66807ZM4.30448 10.5317L3.93558 11.1847L4.73659 9.91867L4.30448 10.5317ZM14.1287 1.87896C14.4216 1.58607 14.4216 1.1112 14.1287 0.818303C13.8358 0.52541 13.3609 0.52541 13.068 0.818303L14.1287 1.87896ZM5 7.00002C5 7.41423 5.33579 7.75002 5.75 7.75002C6.16421 7.75002 6.5 7.41423 6.5 7.00002H5ZM8 5.50002C8.41421 5.50002 8.75 5.16423 8.75 4.75002C8.75 4.3358 8.41421 4.00002 8 4.00002V5.50002ZM2.05846 6.77146C3.20653 4.6722 5.43706 3.25002 7.99998 3.25002V1.75002C4.86798 1.75002 2.14347 3.48987 0.742412 6.05173L2.05846 6.77146ZM13.9415 7.22857C12.7935 9.32784 10.5629 10.75 8.00002 10.75V12.25C11.132 12.25 13.8565 10.5102 15.2576 7.94831L13.9415 7.22857ZM13.9415 6.77156C14.0195 6.91408 14.0195 7.08605 13.9415 7.22857L15.2576 7.94831C15.5808 7.35731 15.5808 6.64285 15.2576 6.05184L13.9415 6.77156ZM0.742412 6.05173C0.419201 6.64272 0.419196 7.35719 0.742397 7.94819L2.05846 7.22847C1.98051 7.08595 1.98051 6.91399 2.05846 6.77146L0.742412 6.05173ZM12.7264 5.17154C13.2069 5.64003 13.6175 6.17908 13.9415 6.77156L15.2576 6.05184C14.8614 5.3274 14.3598 4.66919 13.7736 4.09757L12.7264 5.17154ZM8.00002 10.75C7.41598 10.75 6.85028 10.6763 6.31128 10.5381L5.93872 11.9911C6.59844 12.1603 7.28928 12.25 8.00002 12.25V10.75ZM7.99998 3.25002C8.60939 3.25002 9.19887 3.33026 9.75889 3.48032L10.1471 2.03143C9.4616 1.84774 8.74164 1.75002 7.99998 1.75002V3.25002ZM3.57019 9.10104C2.96095 8.5736 2.44732 7.93954 2.05846 7.22847L0.742397 7.94819C1.21783 8.81756 1.8451 9.5916 2.5884 10.2351L3.57019 9.10104ZM4.67338 9.87868C4.27951 9.65617 3.91006 9.39528 3.57019 9.10103L2.5884 10.2351C3.00319 10.5942 3.45429 10.9128 3.93558 11.1847L4.67338 9.87868ZM2.64719 10.2811L3.87238 11.1447L4.73659 9.91867L3.5114 9.05505L2.64719 10.2811ZM9.75889 3.48032C10.282 3.62049 10.7802 3.82178 11.2453 4.07616L11.9651 2.76012C11.3965 2.44919 10.7872 2.20294 10.1471 2.03143L9.75889 3.48032ZM2.87868 13.129L14.1287 1.87896L13.068 0.818303L1.81802 12.0683L2.87868 13.129ZM6.5 7.00002C6.5 6.17159 7.17157 5.50002 8 5.50002V4.00002C6.34315 4.00002 5 5.34316 5 7.00002H6.5Z" fill="#7786A5" />
            </svg>


          }

        </div>
        : ""}
    </div>
  )
}

export default MyInput;
