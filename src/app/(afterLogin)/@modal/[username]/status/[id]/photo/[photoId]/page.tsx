import PhotoModal from "@/app/(afterLogin)/_component/PhotoModal";

type Props = {
  params: { username: string, id: string, photoId: string }
}
export default function Page({ params }: Props) {
  return (
    <>root
      <PhotoModal params={params} />
    </>
  )
}