import React, { useEffect } from "react";
import styles from "./Header.module.css";
import Search, { SearchProps } from "antd/es/input/Search";
import { Link, useNavigate } from "react-router-dom";
import MoneyModal from "../Modals/MoneyModal/MoneyModal";
import { Button } from "antd";
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
}

const Header = ({
  showTitle = true,
  showSearch = true,
  showMoney = true,
  showInfo = true,
  title,
}: HeaderProps) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, []);



  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  const [moneyModal, setMoneyModal] = React.useState(false);

  const user = useSelector(
    (state: IRootState) => state.user.profileData.profile
  );


  const navigate = useNavigate();

  function handleModal() {
    setMoneyModal((modal) => !modal);
  }
  function logoutHandle() {
    dispatch(logoutUser());
    navigate("/login");

  }
  return (
    <nav className={styles.NavBar}>
      <Link
        to="../"
        className={styles.left}
        style={{ opacity: showTitle ? 1 : 0 }}
      >
        <h1>{title ?? 'MegaMarket'}</h1>
      </Link>

      <Search
        className={styles.search}
        onSearch={onSearch}
        placeholder="Search"
        style={{ opacity: showSearch ? 1 : 0 }}
      ></Search>

      {user ?
        <div className={styles.infoWrapper}>
          <div
            className={styles.icon}
            onClick={handleModal}
            style={{ opacity: showMoney ? 1 : 0 }}
          >
            <div className="primary2">{user.balance}$</div>
          </div>

          <Link
            to="../profile"
            style={{ opacity: showInfo ? 1 : 0 }}
          >
            <div className={styles.info}>
              <div>
                <div className="primary">{user.firstname}</div>
                <div className="secondary">{user.lastname}</div>
              </div>
              <img
                className={styles.photo}
                src="https://38s.musify.club/img/68/22744618/58256306.jpg"
                alt="icon"
                height={48}
              />
            </div>
          </Link>
          <Button onClick={logoutHandle}>LogOut</Button>
        </div>
        : <h1>Loading</h1>}
      <MoneyModal
        modal={moneyModal}
        setModal={setMoneyModal}
      />
    </nav>
  );
};

export default Header;
