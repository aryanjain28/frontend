import { taskParentTypes } from "../constants/clients.constants";

export const getTableData = (
  allTaskTypes: {
    id: string;
    childName: string;
    parentId: number;
  }[]
) => {
  let currentId = -1;
  let final: any = [];
  let arrIndex = 0;
  let temp: any = {};
  (allTaskTypes || []).forEach(({ parentId, childName }, index) => {
    arrIndex = currentId === parentId && index ? arrIndex + 1 : 0;
    temp = final[arrIndex] || {};
    temp[`${taskParentTypes[parentId as keyof typeof taskParentTypes].key}`] =
      childName;
    final[arrIndex] = temp;
    currentId = parentId;
  });

  return final;
};
