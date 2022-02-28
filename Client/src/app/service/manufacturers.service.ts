import httpService from "./http.service";

interface IManufacturer {
  content: [];
}
const manufacturerEndpoint = "/manufacturer/";

const manufacturerService = {
  get: async () => {
    const { data } = await httpService.get<IManufacturer>(manufacturerEndpoint);
    return data;
  },
};

export default manufacturerService;
