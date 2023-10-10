import './globals.css'
import {Inter} from 'next/font/google'
import {NextPage} from "next";

const inter = Inter({subsets: ['latin']})

interface Props {
  children: React.ReactNode,
}

const RootLayout: NextPage<Props> = ({
                                       children
                                     }) => {
  return (
    <html lang="en">
    <body className={inter.className}>
    {children}
    </body>
    </html>
  )
}

export default RootLayout;