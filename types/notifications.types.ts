export interface Notification {
  id: string;
  notification: "NEW" | "UPDATE";
  name: string;
  type: string;
  parentId: number;
  updatedAt: Date;
  updatedBy: string;
}

export interface GetNotificationsResponse {
  status: number;
  message: string;
  data: Notification[];
}

export interface PatchNotificationsResponse {
  status: number;
  message: string;
}
