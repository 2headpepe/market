import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import { IRootState, useAppDispatch } from "../../store";
import { getDeposits, getUsers, getWithdraws } from "../../store/admin/actionCreators";
import { useSelector } from "react-redux";
import { IDeposit, IUser, IWithdraw } from "../../api/admin/types";
import { Button, Card, Input } from "antd";
import { createCategory, deleteCategory, deleteDeposit, deleteUser, deleteWithdraw } from "../../api/admin";
import { getCategories } from "../../store/category/actionCreators";
import { ICategory } from "../../api/category/types";
import CategoryBadge from "../../components/CategoryBadge/CategoryBadge";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";


const AdminPage = () => {
  const navRoutes = [{
    name: 'Users',
    route: "users"
  },
  {
    name: 'Categories',
    route: "categories"
  },
  {
    name: 'Deposits',
    route: "deposits"
  },
  {
    name: 'Withdraws',
    route: 'withdraws'
  }
  ]
  const [currentPage,setCurrentPage] = React.useState<string|null>(null)

  const navigate = useNavigate();
  const handleNavigate = ({route,name}:{route:string,name:string})=>{
    setCurrentPage(name);
    navigate(route);
  }
  return (
    <div>
      <Header
        showSearch={false}
        showMoney={false}
        showInfo={false}
        title={"ADMIN MegaMarket"}
      ></Header>
      <div style={{marginTop:"40px",display:"flex",justifyContent:"center",gap:"40px"}}>{navRoutes.map((route) => <Button key={route.name} onClick={() => handleNavigate(route)} type={currentPage===route.name?'primary':'default'}>{route.name}</Button>)}
      </div><Outlet></Outlet>
    </div>

  );
};

export default AdminPage;
