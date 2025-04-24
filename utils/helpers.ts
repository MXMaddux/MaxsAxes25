// Function to format a price (number) into USD currency
export const formatPrice = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

// Function to get unique values from an array of objects based on a specific property
export const getUniqueValues = <T extends Record<string, any>>(
  data: T[],
  type: keyof T
): string[] => {
  // Extract the values for the specified property (`type`) from each item in the array
  let unique = data.map((item) => item[type]);

  // If the property is "colors" (assumed to be an array), flatten the nested arrays
  if (type === "colors") {
    unique = unique.flat();
  }

  // Return an array with "all" as the first element, followed by unique values
  return ["all", ...new Set(unique)];
};
