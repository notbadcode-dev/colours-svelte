import HttpService from './http.service'

const appAuthUrl = 'app/'

export const getToken = async () => {
    try {
      const response = await HttpService.post(appAuthUrl + 'getToken', {id: 1});
      return response;
    } catch (error) {
      console.error(error);
    }
};