const Endpoints = {
  AUTH: {
    LOGIN: "/api/auth/authenticate",
    REGISTER: "/api/auth/register",
    REFRESH: "/refresh",
    LOGOUT: "/logout",
    PROFILE: "/api/users/profile",
  },
  LISTINGS:{
    MY_LISTINGS:"/api/listings/myListings",
    CREATE_LISTING:"/api/listings",
    GET_LISTING:"/api/listings/",
    BUY_LISTING:"/api/listings/",
    DELETE_LISTING:"/api/listings/",
    USER_LISTINGS:"/api/listings/userListings/",
    SEARCH_LISTINGS:"/api/listings/search",
  },
  IMAGES:{
    LISTING_IMAGES:"/api/images"
  },
  ORDERS:{
    SELLS:"/api/orders/sells",
    BUYS:"/api/orders/buys"
  },
  ADMIN:{
    GET_USERS:"/api/admin/users",
    CREATE_CATEGORY:"/api/admin/categories",
    DELETE_CATEGORY:"/api/admin/categories/",
    DELETE_USER:"/api/admin/users/",
    GET_WITHDRAWS:"/api/admin/withdraws",
    DELETE_WITHDRAW:"/api/admin/withdraws/",
    GET_DEPOSITS:"/api/admin/deposits",
    DELETE_DEPOSITS:"/api/admin/deposits/",
  },
  DEPOSIT:"/api/deposits",
  WITHDRAW:"/api/withdraws",
  CATEGORY:{
    GET_CATEGORIES:"/api/categories",
    GET_CATEGORY:"/api/categories/",
  }
};

export default Endpoints;
