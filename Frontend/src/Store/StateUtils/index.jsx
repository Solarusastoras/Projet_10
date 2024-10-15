export const handlePending = (state) => {
    state.loading = true;
    state.error = null;
  };
  
  export const handleFulfilled = (state, action, key) => {
    state.loading = false;
    state[key] = action.payload;
  };
  
  export const handleRejected = (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || 'An error occurred';
  };