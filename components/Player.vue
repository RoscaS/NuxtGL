<template>
  <div class="player-wrapper">
    <div class="buttons">
      <div class="play-btn">
<!--        <transition name="fade">-->
<!--          <v-btn v-if="playing" outlined color="black" disabled>-->
<!--            {{ elapsed.toFixed(2) }}-->
<!--          </v-btn>-->
<!--        </transition>-->
      </div>
      <div class="timer">
        <v-btn outlined :color="playing? 'red' : 'success'" @click="playing = !playing">
          <v-icon v-if="playing">mdi-pause</v-icon>
          <v-icon v-else>mdi-play</v-icon>
        </v-btn>
      </div>
      <div class="speed-slider">
        <transition name="fade">
          <v-slider v-if="playing"
                    v-model="speed"
                    class="slider"
                    prepend-icon="mdi-speedometer"
                    min="0"
                    max="100"
                    step="1"
                    hide-details
          />
        </transition>
      </div>
      <div class="speed-text">
        <transition name="fade">
          <span v-if="playing">{{ speed }}%</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    computed: {
      playing: {
        get() {
          return this.$store.state.player.playing;
        },
        set(value) {
          this.$store.commit("player/SET_PLAYING", value);
        }
      },
      elapsed: {
        get() {
          return this.$store.state.player.elapsed;
          
        },
        set(value) {
          this.$store.commit("player/SET_ELAPSED", value);
        }
      },
      speed: {
        get() {
          return this.$store.state.player.speed;
        },
        set(value) {
          this.$store.commit("player/SET_SPEED", value);
        }
      },
    },

  };
</script>

<style lang="scss" scoped>
  
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .player-wrapper {
    display: flex;
    margin-left: auto;
    margin-right: auto;
  
  
    .buttons {
      display: flex;
      align-items: center;
      margin-left: 180px;
    
      .play-btn {
        min-width: 100px;
      }
    
      .timer {
        min-width: 100px;
      
      }
    
      .speed-slider {
        min-width: 200px;
      }
    
      .speed-text {
        min-width: 50px;
      }
    }
  }

</style>
