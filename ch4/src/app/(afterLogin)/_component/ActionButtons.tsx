"use client"
import style from './post.module.css';
import cx from 'classnames';
import {MouseEventHandler} from "react";
import {InfiniteData, useMutation, useQueryClient} from "@tanstack/react-query";
import {Post} from "@/model/Post";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useModalStore} from "@/store/modal";

type Props = {
  white?: boolean,
  post: Post,
}
export default function ActionButtons({ white, post }: Props) {
  const queryClient = useQueryClient();
  const { data: session }  = useSession();
  const router = useRouter();
  const modalStore = useModalStore();

  const reposted = !!post.Reposts?.find((v) => v.userId === session?.user?.email);
  const liked = !!post.Hearts?.find((v) => v.userId === session?.user?.email);
  const { postId } = post;

  const heart = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`, {
        method: 'post',
        credentials: 'include',
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      })
    },
    onError() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: shallow.pages[pageIndex][index].Hearts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: value.Hearts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts - 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      })
    },
    onSettled() {
      // queryClient.invalidateQueries({
      //   queryKey: ['posts']
      // })
    },
  });

  const unheart = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}/heart`, {
        method: 'delete',
        credentials: 'include',
      })
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: shallow.pages[pageIndex][index].Hearts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts - 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: value.Hearts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts - 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      })
    },
    onError() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Hearts: shallow.pages[pageIndex][index]._count.Hearts + 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Hearts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Hearts: value._count.Hearts + 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      })
    },
    onSettled() {

    },
  })

  const repost = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`, {
        method: 'post',
        credentials: 'include',
      });
    },
    async onSuccess(response) {
      const data = await response.json();
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          console.log(queryKey[0]);
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Reposts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Reposts: shallow.pages[pageIndex][index]._count.Reposts + 1,
                }
              }
              shallow.pages[0].unshift(data);
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Reposts: [{ userId: session?.user?.email as string }],
                _count: {
                  ...value._count,
                  Reposts: value._count.Reposts + 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      })
    }
  });

  const deleteRepost = useMutation({
    mutationFn: () => {
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/reposts`, {
        method: 'delete',
        credentials: 'include',
      });
    },
    onSuccess() {
      const queryCache = queryClient.getQueryCache()
      const queryKeys = queryCache.getAll().map(cache => cache.queryKey)
      console.log('queryKeys', queryKeys);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === 'posts') {
          const value: Post | InfiniteData<Post[]> | undefined = queryClient.getQueryData(queryKey);
          if (value && 'pages' in value) {
            console.log('array', value);
            const obj = value.pages.flat().find((v) => v.postId === postId);
            const repost = value.pages.flat().find((v) => v.Original?.postId === postId && v.User.id === session?.user?.email);
            if (obj) { // 존재는 하는지
              const pageIndex = value.pages.findIndex((page) => page.includes(obj));
              const index = value.pages[pageIndex].findIndex((v) => v.postId === postId);
              console.log('found index', index);
              const shallow = { ...value };
              value.pages = {...value.pages }
              value.pages[pageIndex] = [...value.pages[pageIndex]];
              shallow.pages[pageIndex][index] = {
                ...shallow.pages[pageIndex][index],
                Reposts: shallow.pages[pageIndex][index].Reposts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...shallow.pages[pageIndex][index]._count,
                  Reposts: shallow.pages[pageIndex][index]._count.Reposts - 1,
                }
              }
              // 재게시 삭제
              shallow.pages = shallow.pages.map((page) => {
                return page.filter((v) => v.postId !== repost?.postId);
              })
              queryClient.setQueryData(queryKey, shallow);
            }
          } else if (value) {
            // 싱글 포스트인 경우
            if (value.postId === postId) {
              const shallow = {
                ...value,
                Reposts: value.Reposts.filter((v) => v.userId !== session?.user?.email),
                _count: {
                  ...value._count,
                  Reposts: value._count.Reposts - 1,
                }
              }
              queryClient.setQueryData(queryKey, shallow);
            }
          }
        }
      })
    }
  })

  const onClickComment: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    modalStore.setMode('comment');
    modalStore.setData(post);
    router.push('/compose/tweet');
    // const formData = new FormData();
    // formData.append('content', '답글 테스트');
    // fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${post.postId}/comments`, {
    //   method: 'post',
    //   credentials: 'include',
    //   body: formData
    // });
  }
  const onClickRepost: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (!reposted) {
      repost.mutate();
    } else {
      deleteRepost.mutate();
    }
  }
  const onClickHeart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (liked) {
      unheart.mutate();
    } else {
      heart.mutate();
    }
  }

  return (
    <div className={style.actionButtons}>
      <div className={cx(style.commentButton, white && style.white)}>
        <button onClick={onClickComment}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count?.Comments || ''}</div>
      </div>
      <div className={cx(style.repostButton, reposted && style.reposted, white && style.white)}>
        <button onClick={onClickRepost}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count?.Reposts || ''}</div>
      </div>
      <div className={cx([style.heartButton, liked && style.liked, white && style.white])}>
        <button onClick={onClickHeart}>
          <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
            <g>
              <path
                d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
            </g>
          </svg>
        </button>
        <div className={style.count}>{post._count?.Hearts || ''}</div>
      </div>
    </div>
  )
}