import { makeRequest } from 'src/redux/action';
import { API_URL } from 'src/resources/constants/url';
import { GET_BUY_PRICE, GET_SELL_PRICE } from './type';

export const coinGetSellPrice = (data) => makeRequest({
  type: GET_SELL_PRICE,
  url: `${API_URL.COIN.GET_QUOTE}`,
  params: data.params,
  withAuth: false,
  more: {name: data.params.currency}
});

export const coinGetBuyPrice = (data) => makeRequest({
  type: GET_BUY_PRICE,
  url: `${API_URL.COIN.GET_QUOTE}`,
  params: data.params,
  withAuth: false,
  more: {name: data.params.currency}
});
