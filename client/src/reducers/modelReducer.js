import { 
  CATEGORY_GET_ALL,
  MODEL_GET_BY_CATEGORY
} from "../actions/config";

const initialState = {
  loading: false,
  categories: [],
  models: [],
  error: "", // Error Message
};

export default function modelReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORY_GET_ALL:
      return {
        ...state,
        loading: false,
        categories: action?.payload?.categories,
      };
    case MODEL_GET_BY_CATEGORY:
      return {
        ...state,
        loading: false,
        models: action?.payload?.models,
      };
    default:
      return state;
  }
}
