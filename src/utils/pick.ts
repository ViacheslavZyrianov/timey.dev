export default <T extends object, K extends Partial<T>>(
  obj: T,
  props: (keyof T)[],
): K => {
  return props.reduce((acc, val) => {
    if (obj !== null && typeof obj[val] !== "undefined") {
      const key = val as keyof K;
      acc[key] = obj[val] as unknown as K[keyof K]; // Type assertion using unknown
    }
    return acc;
  }, {} as K);
};
