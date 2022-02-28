import httpService from "./http.service";

const goodsEndpoint = "/goods/";

const goodsService = {
  get: async () => {
    const { data } = await httpService.get(goodsEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(goodsEndpoint, payload);
    return data;
  },

  update: async (payload) => {
    const { data } = await httpService.patch(
      goodsEndpoint + payload._id,
      payload
    );
    return data;
  },

  remove: async (payload) => {
    const { data } = await httpService.delete(goodsEndpoint + payload);
    return data;
  },
};

export default goodsService;
