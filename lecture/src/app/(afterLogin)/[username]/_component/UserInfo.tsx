"use client";

import style from "@/app/(afterLogin)/[username]/profile.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query";
import {User} from "@/model/User";
import {getUser} from "@/app/(afterLogin)/[username]/_lib/getUser";
import cx from "classnames";
import {MouseEventHandler} from "react";
import {Session} from "@auth/core/types";
import {useRouter} from "next/navigation";

type Props = {
  username: string;
  session: Session | null;
}
export default function UserInfo({username, session }: Props) {
  const router = useRouter();
  const {data: user, error} = useQuery<User, Object, User, [_1: string, _2: string]>({
    queryKey: ['users', username],
    queryFn: getUser,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });
  const queryClient = useQueryClient();
  const follow = useMutation({
    mutationFn: (userId: string) => {
      console.log('follow', userId);
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'post',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        if (index > -1) {
          console.log(value, userId, index);
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            }
          }
          queryClient.setQueryData(["users", "followRecommends"], shallow)
        }
      }
      const value2: User | undefined = queryClient.getQueryData(["users", userId]);
      if (value2) {
        const shallow: User = {
          ...value2,
          Followers: [{ id: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          }
        }
        queryClient.setQueryData(["users", userId], shallow)
      }
    },
    onError(error, userId: string) {
      console.error(error);
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log(value, userId, index);
        if (index > -1) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            }
          }
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
        const value2: User | undefined = queryClient.getQueryData(["users", userId]);
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            }
          }
          queryClient.setQueryData(["users", userId], shallow)
        }
      }
    },
  })
  const unfollow = useMutation({
    mutationFn: (userId: string) => {
      console.log('unfollow', userId);
      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/follow`, {
        credentials: 'include',
        method: 'delete',
      })
    },
    onMutate(userId: string) {
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log(value, userId, index);
        if (index > -1) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: shallow[index].Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers - 1,
            }
          }
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
        const value2: User | undefined = queryClient.getQueryData(["users", userId]);
        if (value2) {
          const shallow = {
            ...value2,
            Followers: value2.Followers.filter((v) => v.id !== session?.user?.email),
            _count: {
              ...value2._count,
              Followers: value2._count?.Followers - 1,
            }
          }
          queryClient.setQueryData(["users", userId], shallow)
        }
      }
    },
    onError(error, userId: string) {
      console.error(error);
      const value: User[] | undefined = queryClient.getQueryData(["users", "followRecommends"]);
      if (value) {
        const index = value.findIndex((v) => v.id === userId);
        console.log(value, userId, index);
        if (index > -1) {
          const shallow = [...value];
          shallow[index] = {
            ...shallow[index],
            Followers: [{ id: session?.user?.email as string }],
            _count: {
              ...shallow[index]._count,
              Followers: shallow[index]._count?.Followers + 1,
            }
          }
          queryClient.setQueryData(["users", "followRecommends"], shallow);
        }
      }
      const value2: User | undefined = queryClient.getQueryData(["users", userId]);
      if (value2) {
        const shallow = {
          ...value2,
          Followers: [{ userId: session?.user?.email as string }],
          _count: {
            ...value2._count,
            Followers: value2._count?.Followers + 1,
          }
        }
        queryClient.setQueryData(["users", userId], shallow)
      }
    },
  })

  console.log('error');
  console.dir(error);
  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
        </div>
        <div style={{
          height: 100,
          alignItems: 'center',
          fontSize: 31,
          fontWeight: 'bold',
          justifyContent: 'center',
          display: 'flex'
        }}>
          계정이 존재하지 않음
        </div>
      </>
    )
  }
  if (!user) {
    return null;
  }

  const followed = user.Followers?.find((v) => v.id === session?.user?.email);
  console.log(session?.user?.email, followed);

  const onFollow: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('follow', followed, user.id);
    if (followed) {
      unfollow.mutate(user.id);
    } else {
      follow.mutate(user.id);
    }
  };

  const onMessage = () => {
    const ids = [session?.user?.email, user.id];
    ids.sort();
    router.push(`/messages/${ids.join('-')}`)
  }

  return (
    <>
      <div className={style.header}>
        <BackButton/>
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userRow}>
          <div className={style.userImage}>
            <img src={user.image} alt={user.id}/>
          </div>
          <div className={style.userName}>
            <div>{user.nickname}</div>
            <div>@{user.id}</div>
          </div>
          {user.id !== session?.user?.email &&
            <>
              <button onClick={onMessage} className={style.messageButton}>
                <svg viewBox="0 0 24 24" width={18} aria-hidden="true" className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-z80fyv r-19wmn03"><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path></g></svg>
              </button>
              <button
                onClick={onFollow}
                className={cx(style.followButton, followed && style.followed)}>{followed ? '팔로잉' : '팔로우'}</button>
            </>}
        </div>
        <div className={style.userFollower}>
          <div>
            {user._count.Followers} 팔로워
          </div>
          &nbsp;
          <div>
            {user._count.Followings} 팔로우 중
          </div>
        </div>
      </div>
    </>
  )
}