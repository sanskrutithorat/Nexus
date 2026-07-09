export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: "api/auth/login/",
      LOGOUT: "api/auth/logout/",
      ME: "api/auth/profile/",
      REFRESH: "api/auth/refresh/",
    },
    PRODUCTS:{
        GET_PRODUCTS:'/products'
    },
    CUSTOMER: {
        CUSTOMERS: "api/customers/"
    }
  } as const;