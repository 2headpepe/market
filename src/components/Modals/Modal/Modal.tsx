import { CloseOutlined } from "@ant-design/icons";
import "./Modal.css";
import { colors } from "react-select/dist/declarations/src/theme";
interface ModalProps {
  modal: boolean;
  setModal: Function;
  children: JSX.Element | JSX.Element[] | string;
  position?: {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
    position?: "absolute";
  };
  height?:string;
}

const Modal = ({ modal, setModal, children, position,height }: ModalProps) => {
  function onClick(event: React.MouseEvent) {
    if (
      event.target instanceof HTMLElement &&
      event.target.className === "Modal"
    ) {
      setModal(false);
    }
  }
  return (
    <div>
      {modal && (
        <div
          className="Modal"
          onClick={onClick}
        >
          <div
            className="Modal--content"
            style={{ ...position,minHeight:height }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
