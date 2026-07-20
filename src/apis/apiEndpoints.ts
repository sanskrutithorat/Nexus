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

  },
  TASK: {
    TASKS: "api/tasks/",
  },
  USER: {
    USERS: "api/users/",
  },
  ROLE: {
    ROLES: "api/roles/",
  }
} as const;