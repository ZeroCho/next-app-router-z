import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import style from './photoModal.module.css';
import PhotoModalCloseButton
  from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/PhotoModalCloseButton";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getSinglePost} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import {getComments} from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import React from "react";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import ImageZone from "@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/_component/ImageZone";

type Props = {
  params: { id: string }
}
export default async function Default({params}: Props) {
  const {id} = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', id], queryFn: getSinglePost})
  await queryClient.prefetchQuery({queryKey: ['posts', id, 'comments'], queryFn: getComments})
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className={style.container}>
      <HydrationBoundary state={dehydratedState}>
        <PhotoModalCloseButton/>
        <ImageZone id={id} />
        <div className={style.commentZone}>
          <SinglePost id={id} noImage />
          <CommentForm id={id} />
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}