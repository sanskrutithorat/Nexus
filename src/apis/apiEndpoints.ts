export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: "/auth/login",
      ME: "/auth/me",
      REFRESH: "/auth/refresh",
    },
    PRODUCTS:{
        GET_PRODUCTS:'/products'
    }
  } as const;