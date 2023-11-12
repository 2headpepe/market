import { Button, Input, InputNumber, Select } from "antd";
import styles from "./MoneyModal.module.css";
import Modal from "../Modal/Modal";
import ModalProps from "../ModalTypes";
import React from "react";
import { useAppDispatch } from "../../../store";
import { deposit } from "../../../api/deposit";
import { withdraws } from "../../../api/withdraw";

const { Option } = Select;

const MoneyModal = (props: ModalProps) => {
  const [moneyAmount,setMoneyAmount] = React.useState(0);
  const [operation,setOperation] = React.useState<string>("plus");
  const selectOperation = (
    <Select
      defaultValue={operation}
      style={{ width: 60 }}
      onChange={(value)=>setOperation(value)}
    >
      <Option value="plus">+</Option>
      <Option value="minus">-</Option>
    </Select>
  );

  function clickHandle(){
    console.log(operation);
    if(operation==='minus'){
      withdraws({sum:+moneyAmount})
    }else{
      deposit({sum:+moneyAmount});
    }
  }

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
          onChange={(value)=>setMoneyAmount(value??0)}
        />
        <div className={styles.buttonWrapper}>
          <Button type="primary" onClick={clickHandle}>Apply</Button>
        </div>
      </Modal>
    </div>
  );
};

export default MoneyModal;
