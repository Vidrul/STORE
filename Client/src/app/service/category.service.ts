import httpService from "./http.service";

interface ICategory {
  content: [];
}
const categoryEndpoint = "/categories/";

const categoryService = {
  get: async () => {
    const { data } = await httpService.get<ICategory>(categoryEndpoint);
    return data;
  },
};

export default categoryService;
