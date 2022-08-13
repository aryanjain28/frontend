export const API_ROUTES = {
  GET_CUSTOMERS: "/customers",
  GET_CUSTOMER_DETAILS: "/customers/:customerId",
  POST_CUSTOMER: "/customers",
  PATCH_CUSTOMER: "/customers/:customerId",
  DELETE_CUSTOMER: "/customers/:customerId",

  GET_USERS: "/users",
  GET_USER_DETAILS: "/users/user/:userId",
  POST_USER: "/users/user/signUp",
  POST_LOGIN_USER: "/users/user/login",

  //Tasks
  GET_TASKS: "/tasks",
  GET_MY_TASKS: "/tasks/myTasks",
  UPDATE_TASK: "/tasks/task/:taskId",
  DELETE_TASK: "/tasks/task/:taskId",
};

export const ROUTES = {
  login: "/app/login",
  signUp: "/app/registerUser",
  forgotPassword: "/app/forgotPassword",
  dashboard: "/app/dashboard",
  myFirm: "/app/myFirm",
  dayBook: "/app/daybook",
  gstInvoice: "/app/gstInvoice",
  clients: "/app/clients",
  hr: "/app/hr",
  links: "/app/links",
  settings: "/app/settings",
  reports: "/app/reports",

  tasks: "/app/tasks",
  myTasks: "/app/tasks/myTasks",
  createTask: "/app/tasks/createTask",
};
