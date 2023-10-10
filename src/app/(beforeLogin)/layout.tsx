import {NextPage} from "next";

interface Props {
  children: React.ReactNode,
  modal: React.ReactNode,
}

const Layout: NextPage<Props> = ({
                                       children, modal
                                     }) => {
  return (
    <div>
    {children}
    {modal}
    </div>
  )
}

export default Layout;