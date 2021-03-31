import HttpService from './http.service'
import { ResponseHelper } from '../clases/reponse.class'

const paletteUrl = 'app-colours/palettes';

export const getPalleteList = async () => {
    try {
      const response = await HttpService.get(paletteUrl);
      return response;
    } catch (error) {
      console.error(error);
    }
};

export const getFamousPalleteList = async () => {
  try {
    const response = await HttpService.get(paletteUrl + '/famous');
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createPalette = async (palette) => {
  try {
    const response = await HttpService.post(paletteUrl + '/', palette);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const addLikedPalette = async (paletteId) => {
  try {
    const response = await HttpService.post(paletteUrl + '/addLiked?id=' + paletteId);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export const substractLikedPalette = async (paletteId) => {
  try {
    const response = await HttpService.post(paletteUrl + '/substractLiked?id=' + paletteId);
    return response;
  } catch (error) {
    console.error(error);
  }
}