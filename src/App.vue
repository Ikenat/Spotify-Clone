<template>
  <div class="bg-dark h-screen text-white overflow-hidden" @keyup.enter="ToggleAudio">
    <div class="flex">
      <!--  Side Bar   -->
      <aside
        class="bg-black w-96 flex flex-col items-center"
        style="height: 90vh"
      >
        <div
          class="wrapper w-72 mt-6 flex flex-col items-center"
          style="height: 90vh"
        >
          <!-- Header -->
          <div class="header min-h-0 flex-grow-0">
            <header class="w-2/5 grid place-items-center">
              <img
                src="./assets/logo-large/Spotify_Logo_RGB_White.png"
                alt=""
                srcset=""
              />
            </header>
            <!-- NAV -->
            <nav class="navigation flex flex-col mt-8">
              <router-link
                v-for="(view, index) in views"
                :key="index"
                :to="view.path"
                class="
                  h-8
                  w-full
                  font-semibold
                  text-sm
                  rounded
                  px-3
                  py-5
                  flex
                  items-center
                  justify-start
                  text-lightest
                  hover:text-white
                "
              >
                <i
                  :class="view.icon"
                  class="mr-4 w-10 h-10 text-2xl grid place-items-center"
                ></i>
                {{ view.name }}
              </router-link>
            </nav>

            <!-- Liked Stuff -->
            <div class="mt-12 border-b border-light">
              <div
                class="
                  h-8
                  w-full
                  font-semibold
                  text-sm
                  rounded
                  px-3
                  py-6
                  flex
                  items-center
                  justify-start
                  text-lightest
                  hover:text-white
                "
              >
                <router-link class="flex items-center" to="/NewPlaylist">
                  <div
                    class="
                      w-10
                      h-10
                      mr-4
                      bg-lightest
                      rounded-sm
                      grid
                      place-items-center
                    "
                  >
                    <i class="fas fa-plus text-dark text-2lg"></i>
                  </div>
                  Créer une playlist
                </router-link>
              </div>
              <div
                class="
                  h-8
                  w-full
                  mb-4
                  font-semibold
                  text-base
                  rounded
                  px-3
                  py-6
                  flex
                  items-center
                  justify-start
                  text-lightest
                  hover:text-white
                "
              >
                <router-link class="flex items-center" to="/LikedSong">
                  <div
                    class="
                      w-10
                      h-10
                      mr-4
                      bg-gradient-to-br
                      from-purple-800
                      via-purple-500
                      to-white
                      rounded-sm
                      grid
                      place-items-center
                    "
                  >
                    <i class="fas fa-heart text-base"></i>
                  </div>
                  Titre Likés
                </router-link>
              </div>
            </div>
          </div>
          <!-- PLaylist -->
          <div
            class="
              w-full
              mt-2
              text-lightest
              px-3
              flex-grow
              relative
              overflow-auto
              md:px-9
            "
          >
            <div class="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
              <router-link
                class="mt-2 hover:text-white"
                v-for="(Playlist, index) in Playlists"
                :key="index"
                to="playlist"
              >
                {{ Playlist.name }}
              </router-link>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="overflow-y-scroll w-full relative" style="height: 90vh">
        <!-- Sticky Header -->
        <div class="sticky top-0 flex justify-end px-8 py-4 z-50">
          <img
            src="./assets/img/seraphine.jpg"
            alt=""
            class="w-12 rounded-full"
          />
        </div>
        <div class="Home">
          <router-view @PickaSong="PickASong" />
        </div>
      </main>
    </div>
    <!-- Music Player -->
    <div
      class="
        bg-light
        w-full
        border-t border-gray-600
        flex
        items-center
        pl-4
        justify-between
      "
      style="height: 10vh"
    >
      <!-- Music Information -->
      <div class="Music-information flex" style="width: 30%">
        <img
          :src="ImageUrl(this.Songs[this.indexSong].img)"
          alt="sépaphine"
          class="w-14 mr-4 contain"
        />
        <div class="flex flex-col justify-center w-3/5">
          <router-link
            to="/"
            class="truncate text-white text-sm font-semibold hover:underline"
          >
            {{this.Songs[this.indexSong].name}}
          </router-link>
          <div class="flex">
            <router-link
            to="/"
            class="truncate inline-block text-lightest text-xs font-light hover:underline"
            v-for="(artist, index) in this.Songs[this.indexSong].author" :key="index"
          >
          {{ artist }} 
          <span v-if="Songs[indexSong].author.length != 1">
            <span v-if="(index +1) != Songs[indexSong].author.length">,</span>
          </span>
          </router-link>
          </div>
        </div>
        <button class="ml-2">
          <i
            id="test"
            class="fa-heart text-lightest hover:text-white"
            v-bind:class="{ far: !isLiked, green: isLiked, fas: isLiked }"
            @click="Liked()"
          ></i>
        </button>
      </div>
      <!-- Music Player -->
      <div
        class="
          Music-Player
          w-2/5
          flex flex-col
          items-center
          justify-between
          h-14
        "
      >
        <div class="text-lightest text-lg flex justify-evenly w-auto">
          <button class="Random grid place-items-center w-8 h-8" @click="Random">
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path
                d="M4.5 6.8l.7-.8C4.1 4.7 2.5 4 .9 4v1c1.3 0 2.6.6 3.5 1.6l.1.2zm7.5 4.7c-1.2 0-2.3-.5-3.2-1.3l-.6.8c1 1 2.4 1.5 3.8 1.5V14l3.5-2-3.5-2v1.5zm0-6V7l3.5-2L12 3v1.5c-1.6 0-3.2.7-4.2 2l-3.4 3.9c-.9 1-2.2 1.6-3.5 1.6v1c1.6 0 3.2-.7 4.2-2l3.4-3.9c.9-1 2.2-1.6 3.5-1.6z"
              ></path>
            </svg>
          </button>
          <button class="Prev grid place-items-center w-8 h-8" @click="PrevSong">
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z"></path>
            </svg>
          </button>
          <button class="ToggleAudio grid place-items-center bg-white rounded-full w-8 h-8 " @click="ToggleAudio">
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-dark"
            >
              <path d="M3 2h3v12H3zm7 0h3v12h-3z" v-if="isPLayed == true"></path>
              <path d="M4.018 14L14.41 8 4.018 2z" v-else></path>
            </svg>
          </button>
          <button class="Next grid place-items-center w-8 h-8" @click="NextSong">
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path d="M11 3v4.119L3 2.5v11l8-4.619V13h2V3z"></path>
            </svg>
          </button>
          <button class="Loop grid place-items-center w-8 h-8" @click="Loop">
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path
                d="M5.5 5H10v1.5l3.5-2-3.5-2V4H5.5C3 4 1 6 1 8.5c0 .6.1 1.2.4 1.8l.9-.5C2.1 9.4 2 9 2 8.5 2 6.6 3.6 5 5.5 5zm9.1 1.7l-.9.5c.2.4.3.8.3 1.3 0 1.9-1.6 3.5-3.5 3.5H6v-1.5l-3.5 2 3.5 2V13h4.5C13 13 15 11 15 8.5c0-.6-.1-1.2-.4-1.8z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="flex w-full justify-center items-center text-xs text-lightest"
        >
          <p class="mr-2">{{ AudioPlayed }}</p>
          <div id="AudioTimeBar" class="group wrapper-Progress-bar w-4/5 h-1 rounded-full bg-grey" v-on:mousedown.left="ChangeTrackTimeEnter">
            <div 
              class="Progress-bar Track-bar h-full rounded-full bg-lightest group-hover:bg-green" 
              v-bind:style="{ width: RatioListen + '%' }"  
              >
            </div>
          </div>
          <p class="ml-2">{{ AudioLenght }}</p>
        </div>
      </div>
      <!-- Music Setting -->
      <div class="Music-Settings flex justify-end mr-8 h-8" style="width: 30%">
        <div class="flex justify-around w-1/2 sm:w-3/4">
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path
                d="M2 2v5l4.33-2.5L2 2zm0 12h14v-1H2v1zm0-4h14V9H2v1zm7-5v1h7V5H9z"
              ></path>
            </svg>
          </button>
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              aria-label="Se connecter à un appareil"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path
                d="M0 3v8c0 .55.45 1 1 1h5v-1H1V3h5V2H1c-.55 0-1 .45-1 1zm3 11.5c0 .275.225.5.5.5H6v-1H3.5c-.275 0-.5.225-.5.5zM15 2H9c-.55 0-1 .45-1 1v11c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 12H9V3h6v11zm-3-8a.75.75 0 100-1.5.75.75 0 000 1.5zm0 6a2 2 0 100-4 2 2 0 000 4zm0-3c.551 0 1 .449 1 1s-.449 1-1 1-1-.449-1-1 .449-1 1-1z"
              ></path>
            </svg>
          </button>
          <div class="Volume flex items-center w-2/4">
            <button class="mr-4" @click="Mute()">
              <svg
                v-if="!isMuted"
                role="presentation"
                height="16"
                width="16"
                aria-label="Volume élevé"
                id="volume-icon"
                viewBox="0 0 16 16"
                class="fill-current text-lightest hover:text-white"
              >
                <path
                  d="M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z"
                ></path>
              </svg>
              <svg
                v-else
                role="presentation"
                height="16"
                width="16"
                aria-label="Volume désactivé"
                id="volume-icon"
                viewBox="0 0 16 16"
                class="fill-current text-lightest hover:text-white"
              >
                <path
                  d="M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z"
                ></path>
              </svg>
            </button>
            <div 
              class="group wrapper-Progress-bar w-full h-1 rounded-full bg-grey relative"
              @mousedown.left="ChangeTrackVolume"
              @mouseover="StepVolume"
              id="AudioVolumeBar"
              >
              <div 
                class="Progress-bar Volume-bar h-full rounded-full bg-lightest group-hover:bg-green" 
                v-bind:style="{ width: Volume * 100 + '%' }"
                >
              </div>
            </div>
          </div>
          <button>
            <svg
              role="img"
              height="16"
              width="16"
              viewBox="0 0 16 16"
              class="fill-current text-lightest hover:text-white"
            >
              <path
                d="M6.064 10.229l-2.418 2.418L2 11v4h4l-1.647-1.646 2.418-2.418-.707-.707zM11 2l1.647 1.647-2.418 2.418.707.707 2.418-2.418L15 6V2h-4z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Playlists from "./library/playlists.json";
import { mapGetters } from 'vuex';



export default {
  name: "Spotify-UI",
  data() {
    return {
      indexSong: 0,
      isPLayed: false,
      isLiked: true,
      isMuted: false,
      isRandomActif: false,
      Repeat: false,
      Track: new Audio(),
      AudioLenght: '00:00',
      AudioPlayed: '00:00',
      RatioListen: 0,
      Volume: 0.5,
      Playlists: [],
      Songs: [],
      views: [
        { name: "Home", path: "/", icon: "fas fa-home" },
        { name: "Rechercher", path: "/Rechercher", icon: "fas fa-search" },
        { name: "Bibliothèque", path: "/Bibliothèque", icon: "fas fa-book" },
      ],
    };
  },
  methods: {
    Liked() {
      this.isLiked = !this.isLiked;
    },
    ToggleAudio() {
      if (this.isPLayed) {
        this.Track.pause();
        this.isPLayed = !this.isPLayed;
      } else {
        this.Track.play();
        this.isPLayed = !this.isPLayed;
      }
      
    },
    Mute() {
      this.isMuted = !this.isMuted;
      this.Track.muted = this.isMuted;
    },
    Loop(e) {
      const target = e.target.closest('.Loop');
      !this.Repeat ? target.classList.add("active") : target.classList.remove("active");
      this.Repeat = !this.Repeat;
      this.Track.loop = this.Repeat;
    },
    Random(e) {
      const target = e.target.closest('.Random');
      !this.isRandomActif ? target.classList.add("active") : target.classList.remove("active");
      this.isRandomActif = !this.isRandomActif;
      console.log(this.isRandomActif);
    },
    GetAudioLenght() {
        var duration = this.Track.duration;
        var minutes = Math.trunc(duration / 60);
        var secs = Math.trunc(duration % 60);

        minutes = minutes >= 10 ? minutes : '0'+minutes;
        secs = secs >= 10 ? secs : '0' +secs;

        return minutes +":" + secs;
    },
    AudioUpdate() {
        var duration = this.Track.currentTime;
        if (duration === this.Track.duration) {
          this.Track.removeEventListener("timeupdate", this.AudioUpdate);
          this.NextSong();
        }
        var minutes = Math.trunc(duration / 60);
        var secs = Math.trunc(duration % 60);

        minutes = minutes >= 10 ? minutes : '0'+minutes;
        secs = secs >= 10 ? secs : '0' +secs;


        this.AudioPlayed = minutes +":" + secs;

        this.RatioListen = (100 * this.Track.currentTime)/ this.Track.duration;

    },
    NextSong() {
      if (this.indexSong % (this.Songs.length - 1) != 0 || this.indexSong == 0) {
        this.indexSong ++;
      } else {
        this.indexSong = 0;
      }

      //random
      if (this.isRandomActif) {
        this.indexSong = this.randomIndex(this.Songs.length);
      }
      this.Track.src = this.AudioSource(this.Songs[this.indexSong].srcName, this.Songs[this.indexSong].filetype);
      this.Track.currentTime = 0;
      this.Track.load(); //preload l'audio sans la jouer 
      this.Track.title = "Time Time"

      this.Track.onloadedmetadata = () => {
        this.AudioLenght = this.GetAudioLenght();
      };

      this.Track.play();

      this.isPLayed = true;

      this.Track.addEventListener("timeupdate", this.AudioUpdate);
    },
    PrevSong() {
      if (this.indexSong % this.Songs.length != 0 || this.indexSong == this.Songs.length - 1) {
        this.indexSong --;
      } else {
        this.indexSong = this.Songs.length - 1;
      }

      //random
      if (this.isRandomActif) {
        this.indexSong = this.randomIndex(this.Songs.length);
      }
      this.Track.src = this.AudioSource(this.Songs[this.indexSong].srcName, this.Songs[this.indexSong].filetype);
      this.Track.currentTime = 0;
      this.Track.load(); //preload l'audio sans la jouer 

      this.Track.onloadedmetadata = () => {
        this.AudioLenght = this.GetAudioLenght();
      };

      this.Track.play();
      this.isPLayed = true;

      this.Track.addEventListener("timeupdate", this.AudioUpdate);
    },
    PickASong(index) {
      console.log(index);
    },
    ChangeTrackTimeEnter() {
      this.Track.removeEventListener("timeupdate", this.AudioUpdate);
      document.addEventListener("mouseup", this.ChangeTrackTimeExit);
      document.addEventListener("mousemove", this.ChangeTrackTime);
    },
    ChangeTrackTimeExit() {
      const target = document.getElementById('AudioTimeBar');
      target.classList.remove("active");
      document.removeEventListener("mousemove", this.ChangeTrackTime);
      document.removeEventListener("mouseup", this.ChangeTrackTimeExit);
      this.Track.addEventListener("timeupdate", this.AudioUpdate);


      //change le time code de la musique 
      this.Track.currentTime = this.Track.duration * (this.RatioListen / 100);
    },
    ChangeTrackTime(e) {
      //get la div
      //je n'utilise pas e.target car il y a des conflit avec l'enfant, soit il prend l'enfant plutot que le parent, soit j'utilise @click.self pour prévenir cela or 
      //je ne peux plus cliquer en arrière car l'enfant passe devant.
      const target = document.getElementById('AudioTimeBar');
      target.classList.add("active");
      //get information sur la taille de la div + position
      var rect = target.getBoundingClientRect();

      //get la position x de la souris sur l'écran
      const posX = e.clientX ;


      //équivaut a faire position max - position initial = longueur de la div
      var longueurDiv = rect.right - rect.left;

      //Position de la souris dans la div et non plus sur l'écran
      var longueur = posX - rect.left;

      //change le ratio de la div timer -> le if me permet de ne pas depasser la longueur de ma div parente  
      this.RatioListen = longueurDiv > longueur ? (longueur*100)/longueurDiv : 100 ;

      document.addEventListener("mouseup", this.ChangeTrackTimeExit);
    },
    ChangeTrackVolume(e) {
      //get la div
      const target = document.getElementById('AudioVolumeBar');

      //get la position x de la souris sur l'écran
      const posX = e.clientX;

      //get information sur la taille de la div + position
      var rect = target.getBoundingClientRect();

      //équivaut a faire position max - position initial = longueur de la div
      var longueurDiv = rect.right - rect.left;

      //Position de la souris dans la div et non plus sur l'écran
      var longueur = posX - rect.left;

      //change le ratio de la div timer 
      this.Volume = ((longueur*100)/longueurDiv) / 100 ;

      //change le time code de la musique 
      this.Track.volume = this.Volume;
    },
    StepVolume() {
      document.addEventListener("wheel", this.MouseWheelHandler, false);
    },
    StepVolumeExit() {
      document.removeEventListener("wheel", this.MouseWheelHandler, false);
      //get la div
      const target = document.getElementById('AudioVolumeBar');

      target.removeEventListener("mouseleave", this.StepVolumeExit);
    },
    MouseWheelHandler(e) {

      //get la div
      const target = document.getElementById('AudioVolumeBar');

      target.addEventListener("mouseleave", this.StepVolumeExit);

      //regarde si le signe de la valeur est positif ou négative (scrollup = +) | (scrolldown = -)
      if(Math.sign(e.wheelDelta) == 1 ) {
        this.Volume = this.Volume < 0.9 ? this.Volume + 0.1 : 1;
      }else if(Math.sign(e.wheelDelta) == -1 ) {
        this.Volume = this.Volume > 0.1 ? this.Volume - 0.1 : 0;
      }

      this.Track.volume = this.Volume;
    },
    AudioSource: function(fileName, extension) {
      const sourceName = fileName;
      const ext = extension;
      return require(`./assets/Audio/${sourceName}.${ext}`);
    },
    ImageUrl: function(imgName) {
      const fileName = imgName;
      return require(`./assets/img/${fileName}.jpg`);
    },
    randomIndex(max) {
      return Math.floor( Math.random() * max );
    }
  },
  computed: {
    ...mapGetters ([
      'GetAllSongs'
    ])
  },
  created() {
    this.Playlists = Playlists;
    this.Songs = this.GetAllSongs;

    this.Track.src = this.AudioSource(this.Songs[this.indexSong].srcName, this.Songs[this.indexSong].filetype);
    this.Track.volume = 1;
    this.Track.addEventListener("timeupdate", this.AudioUpdate);
  },
  mounted() {
    this.Track.onloadedmetadata = () => {
      this.AudioLenght = this.GetAudioLenght();
    };
  },
  beforeDestroy() {
    this.Track.removeEventListener("timeupdate", this.AudioUpdate);
  }
};
</script>

<style lang="scss">
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

.navigation .router-link-exact-active {
  background-color: #282828;
  color: white !important;
}

.green {
  color: #1db954 !important;
}

.Progress-bar {
  position: relative;
}

.wrapper-Progress-bar.active .Progress-bar {
  background-color: #1db954;
}

.wrapper-Progress-bar:hover .Progress-bar::after,.wrapper-Progress-bar.active .Progress-bar::after{
  transform-origin: right;
  position: absolute;
  content: "";
  border-radius: 50%;
  width: 0.8rem;
  height: 0.8rem;
  background-color: white;
  right: 0;
  top: 50%;
  transform: translateY(-50%) translateX(50%);
}

.ToggleAudio {
  &:active {
    scale: 0.95;
  }
}

.Loop.active, .Random.active {
  svg {
    color: #1db954 !important;
  }
}
</style>
