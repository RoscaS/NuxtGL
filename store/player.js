
export const state = () => ({
  enable: false,
  playing: false,
  elapsed: 0,
  speed: 1,
});

export const mutations = {
  SET_ENABLE(state, value) {
    state.enable = value;
  },

  SET_PLAYING(state, value) {
    state.playing = value;
  },
  SET_ELAPSED(state, value) {
    state.elapsed += value * state.speed;
  },
  SET_SPEED(state, value) {
    state.speed = value;
  },
};

export const actions = {

};
