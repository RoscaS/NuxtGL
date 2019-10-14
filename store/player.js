
export const state = () => ({
  enable: false,
  playing: false,
  speed: 1,
  dt: 0,
});

export const mutations = {
  SET_ENABLE(state, value) {
    state.enable = value;
  },

  SET_PLAYING(state, value) {
    state.playing = value;
  },
  UPDATE_DT(state, value) {
    state.dt += value * state.speed;
  },
  SET_SPEED(state, value) {
    state.speed = value;
  },
};

export const actions = {

};
