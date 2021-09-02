export const initialState = {
  wallet: localStorage.getItem("Wallet"),
  balance: 0,
  popupWalletState: "",
  cadBalance: 0,
  loading: false,
  toggle: false,
  totalTokens: 0,
  listOfTokens: {},
  popup: true,
  newSeed: "",
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "setWallet": {
      return {
        ...state,
        wallet: action.value,
      };
    }
    case "setBalance": {
      return {
        ...state,
        balance: action.value,
      };
    }
    case "setPopupWalletState": {
      return {
        ...state,
        popupWalletState: action.value,
      };
    }
    case "setCadBalance": {
      return {
        ...state,
        cadBalance: action.value,
      };
    }
    case "setLoading": {
      return {
        ...state,
        loading: action.value,
      };
    }
    case "setToggle": {
      return {
        ...state,
        toggle: action.value,
      };
    }
    case "setTotalTokens": {
      return {
        ...state,
        totalTokens: action.value,
      };
    }
    case "setListOfTokens": {
      return {
        ...state,
        listOfTokens: action.value,
      };
    }
    case "setPopup": {
      return {
        ...state,
        popup: action.value,
      };
    }
    case "setNewSeed": {
      return {
        ...state,
        newSeed: action.value,
      };
    }
    default:
      return state;
  }
};
