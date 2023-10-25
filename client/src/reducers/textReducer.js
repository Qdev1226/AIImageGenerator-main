import { 
  GENERATED_TEXT_RESULT,
  TEXT_SESSION
} from "../actions/config";

const initialState = {
  loading: false,
  chioces: [],
  text_sessions: [],
  error: "", // Error Message
};

export default function modelReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATED_TEXT_RESULT:
      return {
        ...state,
        loading: false,
        chioces: action?.payload?.choices,
      };
    case TEXT_SESSION:
      return {
        ...state,
        loading: false,
        text_sessions: action?.payload
      }
    default:
      return state;
  }
}

