<template>
  <div class="player" i>
    <audio :src="src" :id="id" controls>
        <!--<source :src="src" type="audio/mpeg">-->
    </audio>


    <div class="controls">
      <button class="play-pause" @click="togglePlayPause">
        <div v-if="this.isPlaying"><i class="fas fa-pause"></i></div>
        <div v-else><i class="fas fa-play"></i></div>
      </button>
      <div class="progress-container">
        <span class="bar"><span class="fill"/></span>
        <input id="slider" type="range" min="0" :max="duration" step="0.01" v-model="currentTime" class="progress-bar" @input="seekTo" @change="seekTo" />
      </div>
      <div class="time-labels">
        <span class="start-time">{{ currentTimeDisplay }} / </span>
        <span class="end-time">{{ durationDisplay }}</span>
      </div>
      <!--
      <button class="volume-up" @click="volumeUp">
        <i class="fas fa-volume-up"></i>
      </button>
      <button class="volume-down" @click="volumeDown">
        <i class="fas fa-volume-down"></i>
      </button>
      -->
    </div>
    
  </div>
</template>

<script>
export default {
  name: "PlayerComponent",
  props: {
    src: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
    };
  },
  mounted() {
    if (this.id) {
      this.fetchAudioFromYoutube(this.id);
    }

    const audio = this.$el.querySelector("audio");

    audio.addEventListener("timeupdate", () => {
      this.currentTime = audio.currentTime;
      fill.style.width = `${(slider.value/this.duration)*100}%`;
    });

    audio.addEventListener("durationchange", () => {
      this.duration = audio.duration;
    });

    const slider = document.querySelector("#slider");
    const fill = document.querySelector(".bar .fill");

    //fill.style.width = `${(slider.value/this.duration)*100}%`;
    slider.addEventListener("input", () => {
        fill.style.width = `${(slider.value/this.duration)*100}%`;
    });
  },
  methods: {
    autoPlay() {
      if(!this.isPlaying) this.togglePlayPause();
    },
    togglePlayPause() {
      const audio = this.$el.querySelector("audio");
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
      //alert(this.isPlaying?"reproduciendo":"pausado");
    },
    volumeUp() {
      const audio = this.$el.querySelector("audio");
      if (audio.volume < 1) {
        audio.volume += 0.1;
      }
    },
    volumeDown() {
      const audio = this.$el.querySelector("audio");
      if (audio.volume > 0) {
        audio.volume -= 0.1;
      }
    },
    updateProgress() {
      const rangeInput = this.$el.querySelector("input[type=range]");
      const audio = this.$el.querySelector("audio");
      this.audioCurrentTime = audio.currentTime;
      this.audioDuration = audio.duration;
      const progress = (this.audioCurrentTime / this.audioDuration) * rangeInput.max;
     
      rangeInput.value = progress;
    },
    seekTo() {
        var audio = this.$el.querySelector("audio");
        audio.currentTime = this.currentTime;
    },
  },
  computed: {
    currentTimeDisplay() {
      const minutes = Math.floor(this.currentTime / 60);
      const seconds = Math.floor(this.currentTime % 60);

      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    },
    durationDisplay() {
      const minutes = Math.floor(this.duration / 60);
      const seconds = Math.floor(this.duration % 60);
      return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  beforeUnmount() {
    const progressBar = this.$el.querySelector('.progress-bar');
    progressBar.removeEventListener('click', this.updateProgress);
    progressBar.removeEventListener('mousemove', this.updateProgress);
    progressBar.removeEventListener('mouseup', this.updateProgress);
  },
};
</script>

<style lang="scss">
// audio
audio {
    display: none;
}

.time-labels {
    color: #fff;
    font-size: 12px;
}
.controls {
    display: grid;
    justify-content: center;

    .play-pause         { grid-column: 1 / 1; grid-row: 1 / 1; display: flex; align-items: center; }
    .time-labels        { grid-column: 2 / 2; grid-row: 2 / 2; }
    .volume-up          { grid-column: 3 / 3; grid-row: 1 / 1; }
    .volume-down        { grid-column: 4 / 4; grid-row: 1 / 1; }
    .progress-container { grid-column: 2 / 2; grid-row: 1 / 1; 
        display: flex; 
        align-items: center; 
        margin-top: -2px; 
    }


    button {
    background: none;
    color: #fff;
    border: none;
}
}

// input range
.progress-bar {
    z-index: 2;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    outline: none;
    margin-left: -100%;
    background-color: transparent;
}

.progress-container .bar {
	z-index: 1;
	left: 2px;
	top: 7px;
	width: 100%;
	height: 3px;
	border-radius: 5px;
	background-color: #30303071;
	overflow: hidden;
    display: flex;

    .fill {
        display: block;
        width: 0%;
        height: 100%;
        background-color: #cccccc;
    }
}

.progress-bar::-webkit-slider-thumb {
    -webkit-appearance: none;
	width: 10px;
	height: 10px;
	background-color: #dadada;
	border-radius: 50%;
	cursor: pointer;
	outline: none;
	box-shadow: 0 0 0 0 rgba(167, 167, 167, 0.1);
	transition: .3s ease-in-out;
}

.progress-bar::-webkit-slider-thumb:hover {
	box-shadow: 0 0 0 10px rgba(80, 80, 80, 0.1);
}

.progress-bar:active::-webkit-slider-thumb {
	box-shadow: 0 0 0 15px rgba(97, 97, 97, 0.2);
}





</style>
