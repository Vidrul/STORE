import httpService from "./http.service";

const endpoint = "/user/";

const userService = {
  getUser: async (payload: string) => {
    const { data } = await httpService.get(endpoint + payload);

    return data;
  },
};

export default userService;
