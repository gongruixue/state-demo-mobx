export const mockApi = <D>(resData: D): Promise<D> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(resData);
    }, 500 + Math.random() * 500);
  });
};
