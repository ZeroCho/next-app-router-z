# Next App Router
가장 크게 다른 점
- 각종 폴더 유형 추가로 디렉토리 라우팅이 편해짐
- 레이아웃 기능
- 페이지별 권한 체크
- 서버 컴포넌트 분리로 인한 최적화

# Getting Started
Next.js, CSS Modules 사용

- 프로젝트 폴더를 만들고 싶은 곳으로 가서
```
npx create-next-app@latest
```

- vanilla-extract를 사용하려 했으나 Windows에서 Server Component 지원하지 않음
[링크](https://github.com/vanilla-extract-css/vanilla-extract/issues/1086)
- WSL을 쓰면 되나 Hot reloading이 문제가 생김

# 디렉토리 구성하기
- [username]은 사용자 프로필
- i/flow/signup이나 compose/tweet은 페이지 전환 없이 모달 띄워야 함
- 로그인 후에는 /home으로 redirect
- /login도 /i/flow/login으로 redirect 

## Routing Group
- (afterLogin), (beforeLogin) 폴더는 실제로 경로에 반영되지는 않음
- 하위 폴더들에 layout 적용 용도

## parallel router, intercepting routes 적용
[링크](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

i/flow/signup과 i/flow/login은 이걸로 처리

### i/flow/signup, i/flow/login 모달 시 주의
- (beforeLogin) 내부의 @modal 안에 (.)/flow/signup을 만들어야 함
- (beforeLogin)과 동등 레벨에 만드는 경우 The default export is not a React Component in page 에러 발생
- /login에서 /i/flow/login으로 가기 위해서는 redirect로는 안 되고, router.replace를 해야 함. "use client" 사용 필요.


# use client vs use server
다음 에러가 나는 부분은 분리하자
```
Error: usePathname only works in Client Components. Add the "use client" directive at the top of the file to use it. Read more: https://nextjs.org/docs/messages/react-client-hook-in-server-component   
at RootLayout (./src/app/layout.tsx:29:86)
at stringify (<anonymous>)
```
NavIcons로 아이콘들 분리

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

# 페이지 접근 권한
// TODO: 확인 필요
- (afterLogin) 내부의 [username]/status/[id] 페이지는 모두 공개
- 그 외 (afterLogin) 페이지들은 로그인한 사람만 접근 가능

// TODO: 왼쪽 메뉴 바꾸기