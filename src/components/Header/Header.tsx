import React, { useEffect } from "react";
import styles from "./Header.module.css";
import Search, { SearchProps } from "antd/es/input/Search";
import { Link, useNavigate } from "react-router-dom";
import MoneyModal from "../Modals/MoneyModal/MoneyModal";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { logoutUser } from "../../store/auth/actionCreators";
import { IRootState, useAppDispatch } from "../../store";
import { getProfile } from "../../store/user/actionCreators";

interface HeaderProps {
  showTitle?: boolean;
  showSearch?: boolean;
  showMoney?: boolean;
  showInfo?: boolean;
  title?: string;
  setMoneyModal?: Function;
}

const Header = ({
  showTitle = true,
  showSearch = true,
  showMoney = true,
  showInfo = true,
  setMoneyModal,
  title,
}: HeaderProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const user = useSelector(
    (state: IRootState) => state.user.profileData.profile
  );

  const navigate = useNavigate();

  function handleModal() {
    if (setMoneyModal) {
      setMoneyModal((modal) => !modal);
    }
  }
  function logoutHandle() {
    dispatch(logoutUser());
    navigate("/login");
  }
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <nav className={styles.NavBar}>
      {contextHolder}
      <Link
        to="../"
        className={styles.left}
        style={{ opacity: showTitle ? 1 : 0 }}
      >
        <h1>{title ?? "MegaMarket"}</h1>
      </Link>

      {user ? (
        <div className={styles.infoWrapper}>
          <Button
            className={styles.icon}
            onClick={handleModal}
            style={{
              opacity: showMoney ? 1 : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="primary2">{user.balance}$</div>
          </Button>

          <Link to="../profile" style={{ opacity: showInfo ? 1 : 0 }}>
            <div className={styles.info}>
              <div>
                <div className="primary">{user.firstname}</div>
                <div className="secondary">{user.lastname}</div>
              </div>
              <img
                className={styles.photo}
                src={user.image ?? "images/user.png"}
                alt="icon"
                height={48}
                width={48}
              />
            </div>
          </Link>
          <Button onClick={logoutHandle}>LogOut</Button>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </nav>
  );
};

export default Header;
