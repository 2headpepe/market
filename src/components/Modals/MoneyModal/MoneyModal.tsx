import { Button, InputNumber, Select, message } from "antd";
import styles from "./MoneyModal.module.css";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import React from "react";
import { deposit } from "../../../api/deposit";
import { withdraws } from "../../../api/withdraw";
import { Modal as AntdModal } from "antd";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store";
const { Option } = Select;

const MoneyModal = (props: ModalProps & {message:any}) => {
  const [moneyAmount, setMoneyAmount] = React.useState(0);
  const [operation, setOperation] = React.useState<string>("plus");
  const currentMoney = useSelector((state:IRootState)=>state.user.profileData.profile?.balance);

  const selectOperation = (
    <Select
      defaultValue={operation}
      style={{ width: 60 }}
      onChange={(value) => setOperation(value)}
    >
      <Option value="plus">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );

  function clickHandle() {
    if(moneyAmount<1){
      message.error({content:"Minimal sum is 1$"},2,()=>{
        return;
      })
    }
    if (operation === "minus") {
      if(currentMoney===undefined) return;
      if(+moneyAmount>currentMoney){
        message.error({content:"Not enough money"},2)
      }else{
        withdraws({ sum: +moneyAmount });
      }
    } else {
      deposit({ sum: +moneyAmount });
      setSuccessRequest(true);
    }
    props.setModal(false);
  }

  const [successRequest, setSuccessRequest] = React.useState(false);

  return (
    <div>
      <Modal
        {...props}
        position={{ position: "absolute", right: "150px", top: "100px" }}
      >
        <InputNumber
          className={styles.input}
          addonBefore={selectOperation}
          value={moneyAmount}
          onChange={(value) => setMoneyAmount(value ?? 0)}
        />
        <div className={styles.buttonWrapper}>
          <Button
            type="primary"
            onClick={() => {
              clickHandle();
              props.setModal(false);
            }}
          >
            Apply
          </Button>
        </div>
      </Modal>
      <AntdModal
        open={successRequest}
        onOk={() => {
          setSuccessRequest(false);
        }}
        footer={(_, { OkBtn }) => <OkBtn />}
        title={"Send money"}
      >
        <p>
          Now send <b>{moneyAmount}$</b> to <b>+7(962)174-01-20</b> and we will
          confirm your request
        </p>
      </AntdModal>
    </div>
  );
};

export default MoneyModal;
