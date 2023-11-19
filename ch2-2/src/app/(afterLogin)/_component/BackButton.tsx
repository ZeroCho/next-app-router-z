"use client"

import style from "@/app/(afterLogin)/[username]/profile.module.css";

export default function BackButton() {
  return (
    <button className={style.backButton}>
      <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
           className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
        <g>
          <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
        </g>
      </svg>
    </button>
  )
}