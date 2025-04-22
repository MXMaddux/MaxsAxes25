import { ActionTypes, Guitar, AppAction } from "../actions";

interface GuitarsState {
  isSidebarOpen: boolean;
  guitars_loading: boolean;
  guitars_error: boolean;
  featured: boolean;
  guitars: Guitar[];
  featured_guitars: Guitar[];
  single_guitar_loading: boolean;
  single_guitar_error: boolean;
  single_guitar?: Guitar;
  grid_view: boolean;
  sort: string;
  filters: {
    [key: string]: string | number | boolean;
  };
}

export const initialGuitarsState: GuitarsState = {
  isSidebarOpen: false,
  guitars_loading: false,
  guitars_error: false,
  featured: false,
  guitars: [],
  featured_guitars: [],
  single_guitar_loading: false,
  single_guitar_error: false,
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    brand: "all",
    price: 0,
    max_price: 0,
    shipping: false,
  },
};

const guitarsReducer = (
  state: GuitarsState,
  action: AppAction
): GuitarsState => {
  switch (action.type) {
    case ActionTypes.SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };

    case ActionTypes.SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };

    case ActionTypes.SET_GRIDVIEW:
      return { ...state, grid_view: true };

    case ActionTypes.SET_LISTVIEW:
      return { ...state, grid_view: false };

    case ActionTypes.GET_GUITARS_BEGIN:
      return { ...state, guitars_loading: true };

    case ActionTypes.GET_GUITARS_SUCCESS:
      const featured_guitars = action.payload.filter(
        (guitar) => guitar.featured === true
      );
      return {
        ...state,
        guitars_loading: false,
        guitars: action.payload,
        featured_guitars,
      };

    case ActionTypes.GET_GUITARS_ERROR:
      return { ...state, guitars_loading: false, guitars_error: true };

    case ActionTypes.GET_SINGLE_GUITAR_BEGIN:
      return {
        ...state,
        single_guitar_loading: true,
        single_guitar_error: false,
      };

    case ActionTypes.GET_SINGLE_GUITAR_SUCCESS:
      return {
        ...state,
        single_guitar_loading: false,
        single_guitar: action.payload,
      };

    case ActionTypes.GET_SINGLE_GUITAR_ERROR:
      return {
        ...state,
        single_guitar_loading: false,
        single_guitar_error: true,
      };

    case ActionTypes.UPDATE_SORT:
      return { ...state, sort: action.payload };

    case ActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case ActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...initialGuitarsState.filters,
          max_price: state.filters.max_price,
        },
      };

    default:
      const exhaustiveCheck: never = action;
      throw new Error(
        `No Matching "${(exhaustiveCheck as any).type}" - action type`
      );
  }
};

export default guitarsReducer;
