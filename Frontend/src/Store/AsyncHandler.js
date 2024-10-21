export const handlePending = (state) => {
  state.status = 'loading';
};

export const handleFulfilled = (state, action, key) => {
  state.status = 'succeeded';
  state[key] = action.payload;
};

export const handleRejected = (state, action) => {
  state.status = 'failed';
  state.error = action.payload;
};