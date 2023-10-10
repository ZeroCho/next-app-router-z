"use client";

import style from './modal.module.css';
import {useRouter} from "next/navigation";

export default function TweetModal() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <button className={style.closeButton} onClick={onClickClose}>
            <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                 className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
              <g>
                <path
                  d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </button>
          <div className={style.modalBody}>
            <div className={style.postUserSection}>
              <div className={style.postUserImage}>
                <img src="/5Udwvqim.jpg" alt="zerocho"/>
              </div>
            </div>
            <div className={style.inputDiv}>
              <input className={style.input} type="text" placeholder="무슨 일이 일어나고 있나요?"/>
            </div>
          </div>
          <div className={style.modalFooter}>
            <div className={style.modalDivider}/>
            <div className={style.footerButtons}>
              <div className={style.footerButtonLeft}>
                <button className={style.uploadButton}>
                  <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path
                        d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <button className={style.actionButton} disabled>게시하기</button>
            </div>
          </div>
        </div>
      </div>
    </>)
}