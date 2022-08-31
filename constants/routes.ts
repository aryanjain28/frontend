export const API_ROUTES = {
  GET_CUSTOMERS: "/customers",
  GET_CUSTOMER_DETAILS: "/customers/:customerId",
  POST_CUSTOMER: "/customers",
  PATCH_CUSTOMER: "/customers/:customerId",
  DELETE_CUSTOMER: "/customers/:customerId",

  GET_USERS_INFO: "/users",
  GET_USER_DETAILS: "/users/user/:userId",
  POST_USER: "/users/user/signUp",
  POST_LOGIN_USER: "/users/user/login",

  //Tasks
  GET_TASKS: "/tasks",
  GET_MY_TASKS: "/tasks/myTasks",
  POST_TASK: "/tasks/task/create",
  UPDATE_TASK: "/tasks/task/:taskId",
  DELETE_TASK: "/tasks/task/:taskId",

  // Task Types
  GET_TASKS_TYPES: "/taskTypes",
  POST_TASKS_TYPE: "/taskTypes/taskType/create",

  // Clients
  GET_ALL_CLIENTS: "/clients",
  GET_CLIENT_DETAILS: "/clients/client/:clientId",
  GET_CLIENT_TASKS: "/tasks/:clientId",
  GET_ALL_TAXPAYER_TYPES: "/clients/taxpayerTypes",
  GET_ALL_PINCODES: "/clients/pincodes",
  POST_CLIENT: "/clients/client",

  // Utilities
  GET_OPTIONS: "/utilities/options",
  GET_DASHBOARD: "/utilities/dashboard",

  // Notifications
  GET_NOTIFICATIONS: "/notifications/:userId",
  REMOVE_NOTIFICATIONS: "/notifications/:userId",
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
  clientUpdate: "/app/clients/:clientId",
  createClient: "/app/clients/create",
  hr: "/app/hr",
  links: "/app/links",
  settings: "/app/settings",
  reports: "/app/reports",

  tasks: "/app/tasks",
  myTasks: "/app/tasks/myTasks",
  createTask: "/app/tasks/create",
  taskTypes: "/app/tasks/taskTypes",

  messages: "messages",
  messagesSent: "/app/messages/sent",
  messagesSend: "/app/messages/send",
};
