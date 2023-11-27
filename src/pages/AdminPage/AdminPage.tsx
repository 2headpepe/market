import React from "react";
import Header from "../../components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "antd";


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
