export const imageGenAgent = async (params) => {
  return {
    ...params,
    images: params.images || [],
  };
};
