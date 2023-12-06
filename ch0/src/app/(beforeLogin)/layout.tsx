import {ReactNode} from "react";

type Props = { children: ReactNode, modal: ReactNode };
export default function Layout({ children }: Props) {
  return (
    <div>
      {children}
    </div>
  )
}

// 주소가 localhost:3001일 때는 children->page.tsx, modal->@modal/default.tsx
// 주소가 localhost:3001/i/flow/login 때는 chldren->i/flow/login/page.tsx, modal->@modal/i/flow/login/page.tsx
