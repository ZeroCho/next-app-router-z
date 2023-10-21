"use client";

import style from "./postForm.module.css";
import React, {ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useRef, useState} from "react";
import {useUserStore} from "@/store/user";
import {getMyInfo} from "@/app/(afterLogin)/layout";
import {Post} from "@/model/Post";
import {usePostStore} from "@/store/post";
import {useSession} from "next-auth/react";

export default function PostForm() {
  const me = useUserStore(store => store.me);
  const add = useUserStore(store => store.add);
  const imageRef = useRef<HTMLInputElement>(null);
  const addPost = usePostStore(store => store.add);
  const [content, setContent] = useState('');
  const { data: session, status } = useSession()

  useEffect(() => {
    if (!me && session?.user) {
      const { email, name, image } = session.user;
      if (email && name && image) {
        add({
          id: email,
          nickname: name,
          image: image,
        });
      }
    }
  }, [me, add, session]);

  const onClickButton = () => {
    imageRef.current?.click();
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setContent(e.target.value);
  }

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch('http://localhost:9090/api/posts', {
      method: 'post',
      body: JSON.stringify({
        content
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((response: Response) => {
      console.log(response.status);
      if (response.status === 201) {
        return response.json();
      }
    })
      .then((data: Post) => {
        if (data) {
          addPost(data);
          setContent('');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (!me) {
    return null;
  }

  return (
    <form className={style.postForm} onSubmit={onSubmit}>
      <div className={style.postUserSection}>
        <div className={style.postUserImage}>
          <img src={me.image} alt={me.id} />
        </div>
      </div>
      <div className={style.postInputSection}>
        <input type="text" value={content} onChange={onChange} placeholder="무슨 일이 일어나고 있나요?"/>
        <div className={style.postButtonSection}>
          <div className={style.footerButtons}>
            <div className={style.footerButtonLeft}>
              <input type="file" name="imageFiles" multiple hidden ref={imageRef} />
              <button className={style.uploadButton} type="button" onClick={onClickButton}>
                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                  </g>
                </svg>
              </button>
            </div>
            <button className={style.actionButton} disabled={!content}>게시하기</button>
          </div>
        </div>
      </div>
    </form>
  )
}