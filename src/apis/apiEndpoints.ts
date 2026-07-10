export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "api/auth/login/",
    LOGOUT: "api/auth/logout/",
    ME: "api/auth/profile/",
    REFRESH: "api/auth/refresh/",
  },
  CUSTOMER: {
    CUSTOMERS: "api/customers/",
  },
  PROJECT: {
    PROJECTS: "api/projects/",

  }
} as const;