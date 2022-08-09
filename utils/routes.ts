export const createRoute = (
  url: string,
  object: { [key: string]: string }
): string => {
  try {
    Object.entries(object).forEach(([key, value]) => {
      url = url.replace(":" + key, value.toString());
    });
  } catch (error) {
    console.log("Could not create URL.");
  }
  return url;
};
