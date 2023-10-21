import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string, id: string, photoId: string }
}
export default function Page({ params }: Props) {
  return (
    <Home />
  )
}