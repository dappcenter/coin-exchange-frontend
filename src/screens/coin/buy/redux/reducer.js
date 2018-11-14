import { GET_REVIEW } from './type';

const initState = {
  numReview: 0,
  sellPrice: {},
  buyPrice: {},
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case `${GET_REVIEW}_SUCCESS`:
      return {
        ...state,
        numReview: payload,
      };
    default:
      return state;
  }
};