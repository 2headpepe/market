// import {SearchOutlined} from "antd";
import styles from "./LandingPage.module.css";
import Header from "../../components/Header/Header";
import Main from "./components/Main/Main";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.LandingPage}>
      <Header></Header>
      <Main></Main>
    </div>
  );
};

export default LandingPage;
