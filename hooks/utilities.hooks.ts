import { useQuery } from "react-query";
import { taskParentTypes } from "../constants/clients.constants";
import { QUERY_KEYS } from "../constants/queryKeys";
import {
  getAllOptions,
  getDashboardDetails,
} from "../services/utilities.services";

export const useGetAllOptions = () => {
  return useQuery([QUERY_KEYS.GET_OPTIONS], () => getAllOptions(), {
    placeholderData: null,
    refetchOnMount: true,
  });
};

export const useGetDashboardDetails = () => {
  const { data, isLoading } = useQuery(
    [QUERY_KEYS.GET_DASHBOARD],
    () => getDashboardDetails(),
    {
      placeholderData: null,
    }
  );

  const allStatus = {
    PENDING: 0,
    COMPLETED: 0,
    INCOMPLETE: 0,
    APPROVED: 0,
    INPROGRESS: 0,
  };

  const typesObj = {
    gst: 0,
    it: 0,
    tally: 0,
    reports: 0,
    registrations: 0,
    others: 0,
  };

  Object.entries(data?.types || {}).forEach(([k, value]) => {
    typesObj[
      taskParentTypes[Number(k) as keyof typeof taskParentTypes]
        .key as keyof typeof typesObj
    ] = value;
  });

  const modData = {
    status: { ...allStatus, ...data?.status },
    types: typesObj,
    amount: {
      ...{ totalAmount: 0, paidAmount: 0, balanceAmount: 0 },
      ...data?.amount,
    },
  };

  return { data: modData, isLoading };
};
