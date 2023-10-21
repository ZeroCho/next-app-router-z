import style from './photoModal.module.css';
import {getPhoto} from "@/app/(afterLogin)/_lib/getPhoto";
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import getQueryClient from "@/app/(afterLogin)/_lib/getQueryClient";
import {dehydrate, HydrationBoundary} from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import React from "react";
import {PostImage} from "@/model/PostImage";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PhotoModalCloseButton from "@/app/(afterLogin)/_component/PhotoModalCloseButton";

type Props = {
  params: { username: string, id: string, photoId: string }
}
export default async function PhotoModal({params}: Props) {
  const photo: PostImage = await getPhoto(params);
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({ queryKey: ['posts', 'comments', {id: params.username, postId: params.id}], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={style.container}>
        <PhotoModalCloseButton />
        <div className={style.imageZone}>
          <img src={photo.link} alt={photo.Post?.content} />
          <div className={style.image} style={{backgroundImage: `url(${photo.link})`}} />
          <div className={style.buttonZone}>
            <div className={style.buttonInner}>
              {photo.Post && <ActionButtons post={photo.Post} white />}
            </div>
          </div>
        </div>
        <div className={style.commentZone}>
          {photo.Post && <Post post={photo.Post}/>}
          <CommentForm id={params.username} postId={params.id}/>
          <Comments id={params.username} postId={params.id}/>
        </div>
      </div>
    </HydrationBoundary>
  )
}