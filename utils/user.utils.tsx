export const validateUserRegisterFields = (userDetails: {
  [key: string]: { label: string; value: string; error: string };
}) => {
  const { fName, lName, email, password, cnfPassword } = userDetails;
};
