export const calculatePaginationLength = (totalCount: number): number => {
  return Math.ceil(totalCount / 10);
};
