import style from './modal.module.css';
import {useRouter} from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  }

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <button className={style.closeButton} onClick={onClickClose}>닫기</button>
          <div className={style.inputDiv}>
            <input className={style.input} type="text" placeholder="무슨 일이 일어나고 있나요?"/>
          </div>
          <button className={style.actionButton}>가입하기</button>
        </div>
      </div>
    </>)
}