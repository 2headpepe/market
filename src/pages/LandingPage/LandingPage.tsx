import styles from "./LandingPage.module.css";
import Header from "../../components/Header/Header";
import Main from "./components/Main/Main";
import React from "react";
import MoneyModal from "../../components/Modals/MoneyModal/MoneyModal";

const LandingPage: React.FC = () => {
  const [moneyModal, setMoneyModal] = React.useState(false);
  return (
    <div className={styles.LandingPage}>
      <Header setMoneyModal={setMoneyModal} ></Header>
      <Main></Main>
      <MoneyModal modal={moneyModal} setModal={setMoneyModal} />
    </div>
  );
};

export default LandingPage;
