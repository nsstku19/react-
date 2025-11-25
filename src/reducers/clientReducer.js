
  export function clientReducer(state, action) {
    switch (action.type) {
      case 'SET_CLIENTS':
        return { ...state, clients: action.payload };
      case 'ADD_CLIENT':
        return { ...state, clients: [...state.clients, action.payload] };
      case 'DELETE_CLIENT':
        return {
          ...state,
          clients: state.clients.filter(client => client.id !== action.payload),
        };
      default:
        return state;
    }
  }
  