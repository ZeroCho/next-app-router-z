import './globals.css'
import {Inter} from 'next/font/google'
import {NextPage} from "next";

const inter = Inter({subsets: ['latin']})

interface Props {
  children: React.ReactNode,
  modal: React.ReactNode,
}

const RootLayout: NextPage<Props> = ({
                                       children, modal
                                     }) => {
  return (
    <html lang="en">
    <body className={inter.className}>
    {children}
    {modal}
    </body>
    </html>
  )
}

export default RootLayout;