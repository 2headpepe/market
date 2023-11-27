const Endpoints = {
  AUTH: {
    LOGIN: "/api/auth/authenticate",
    REGISTER: "/api/auth/register",
    REFRESH: "/refresh",
    LOGOUT: "/logout",
  },
  LISTINGS: {
    MY_LISTINGS: "/api/listings/myListings",
    CREATE_LISTING: "/api/listings",
    GET_LISTING: "/api/listings/",
    BUY_LISTING: "/api/listings/",
    DELETE_LISTING: "/api/listings/delete",
    USER_LISTINGS: "/api/listings/userListings/",
    SEARCH_LISTINGS: "/api/listings/search",
  },
  IMAGES: {
    LISTING_IMAGES: "/api/images",
    POST_IMAGE: "/api/images",
    DELETE_IMAGE: "/api/images"
  },
  ORDERS: {
    DISAPPROVE: "/api/orders/disapprove/",
    APPROVE: "/api/orders/approve/",
    DISAPPROVED_SELLS: "/api/orders/disapprove-sells",
    DISAPPROVED_BUYS: "/api/orders/disapprove-buys",
    APPROVED_SELLS: "/api/orders/approved-sells",
    APPROVED_BUYS: "/api/orders/approved-buys",
    ACTIVE_SELLS: "/api/orders/active-sells",
    ACTIVE_BUYS: "/api/orders/active-buys",
  },
  ADMIN: {
    GET_USERS: "/api/admin/users",
    CREATE_CATEGORY: "/api/admin/categories",
    DELETE_CATEGORY: "/api/admin/categories/",
    DELETE_USER: "/api/admin/users/",
    GET_WITHDRAWS: "/api/admin/withdraws",
    DELETE_WITHDRAW: "/api/admin/withdraws/",
    GET_DEPOSITS: "/api/admin/deposits",
    DELETE_DEPOSITS: "/api/admin/deposits/",
  },
  DEPOSIT: "/api/deposits",
  WITHDRAW: "/api/withdraws",
  CATEGORY: {
    GET_CATEGORIES: "/api/categories",
    GET_CATEGORY: "/api/categories/",
  },
  USER: {
    GET_USER: "/api/users/",
    PROFILE: "/api/users/profile",
    DELETE_USER: "/api/users",
    PATCH_USER: "/api/users"
  },
};

export default Endpoints;
