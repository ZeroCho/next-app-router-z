# Next App Router
가장 크게 다른 점
- 각종 폴더 유형 추가로 디렉토리 라우팅이 편해짐
- 레이아웃 기능
- 페이지별 권한 체크
- 서버 컴포넌트 분리로 인한 최적화
- 데이터 캐시

# Getting Started
Next.js, CSS Modules 사용

- 프로젝트 폴더를 만들고 싶은 곳으로 가서
```
npx create-next-app@latest
```

- vanilla-extract를 사용하려 했으나 Windows에서 Server Component 지원하지 않음
[링크](https://github.com/vanilla-extract-css/vanilla-extract/issues/1086)
- WSL을 쓰면 되나 Hot reloading이 문제가 생김

# 기획자와 디자이너가 기획서를 던져주었다.

## 디렉토리 구성하기
- [username]은 사용자 프로필
- i/flow/signup이나 compose/tweet은 페이지 전환 없이 모달 띄워야 함
- 로그인 후에는 /home으로 redirect
- /login도 /i/flow/login으로 redirect 

### Routing Group
- (afterLogin), (beforeLogin) 폴더는 실제로 경로에 반영되지는 않음
- 하위 폴더들에 layout 적용 용도

### layout에서 현재 라우트 확인하기
```
  const segment = useSelectedLayoutSegment();
```
- 바로 하위만 나옴(compose/tweet의 경우 compose만 나옴)
- 모든 depth를 가져오고 싶다면 useSelectedLayoutSegments (['compose', 'tweet'])
- layout의 state는 모든 페이지에 공유됨
- 공유하기 싫다면 layout 대신 template.ts 쓰기

### parallel router, intercepting routes 적용
[링크](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

i/flow/signup과 i/flow/login은 이걸로 처리

### i/flow/signup, i/flow/login 모달 시 주의
- (beforeLogin) 내부의 @modal 안에 (.)/flow/signup을 만들어야 함
- (beforeLogin)과 동등 레벨에 만드는 경우 The default export is not a React Component in page 에러 발생
- /login에서 /i/flow/login으로 가기 위해서는 redirect로는 안 되고, router.replace를 해야 함. "use client" 사용 필요.

### compose/tweet 처리
compose/tweet도 이걸로 처리
- @modal/compose/tweet으로 바꾸고 parallel router 적용
- @modal이라는 slot 사용하면 props.modal로 접근 가능
- parallel router 적용 시 default.tsx 꼭 넣어주어야 함!!!
  새로고침할 때 주의할 것!!!
- 새로고침 시에도 백그라운드는 home이 보여야 함
- compose/tweet 폴더 한 번 더 만들어주기

### home/@modal/(..)compose/tweet은 안 되나요?
- home 폴더 안에 @modal은 app/(afterLogin)/layout.tsx에서 인식되지 않아서 사용 불가

## 서버 컴포넌트와 클라이언트 컴포넌트 구분하기
### use client vs use server
다음 에러가 나는 부분은 분리하자(Client Component로 분리 후 import하면 됨)
```
Error: usePathname only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component   
at RootLayout (./src/app/layout.tsx:29:86)
at stringify (<anonymous>)
```
NavIcons로 아이콘들 분리

- _components 폴더에 주로 Client Component 생성
- useState, useRef, useEffect, useContext, useRouter, useSearchParams, onClick 등등 많다

## 서버 컴포넌트와 클라이언트 컴포넌트 같이 쓰기
- Client Component에서 Server Component import하면 안 됨
- props(children이나 기타 props)로 넘길 것

# 백엔드 개발자가 API를 아직 못 만들었다.
## MSW
```
npm install msw @faker-js/faker -D
npx msw init public/ --save
```
[해당 이슈로 msw 서버에서 사용 불가](https://github.com/mswjs/msw/issues/1644)
- 위 이슈 해결되기 전까지는 http 서버 직접 생성

- faker.js는 더미데이터 생성용

## 페이지 접근 권한
middleware.ts로 페이지 접근 제어

- (afterLogin) 내부의 [username]과 [username]/status/[id] 페이지는 모두 공개
- 그 외 (afterLogin) 페이지들은 로그인한 사람만 접근 가능

## Zustand
"use client" 아래에서만 사용 가능
- client component에서는 async component 불가능
- 도입 후 새로고침 한 번씩 해볼 것

## Form
server action이 안정화되면 해볼 것. 아직은 use client로 하는 게 편한 듯 하다.

## route.ts
/src/app/api/revalidate/route.ts 생성

## React Query 도입하기
```
npm i @tanstack/react-query @tanstack/react-query-devtools
```
UserPosts, SearchResult에서 type 잘 맞춰주기

### Optimistic Update
[링크](https://tanstack.com/query/v4/docs/react/guides/optimistic-updates#updating-a-list-of-todos-when-adding-a-new-todo)

### 인피니트 스크롤링
[링크](https://tanstack.com/query/v4/docs/react/guides/infinite-queries)
```
npm install react-intersection-observer
```