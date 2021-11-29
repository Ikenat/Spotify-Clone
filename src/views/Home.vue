<template>
  <div class="px-8 h-auto">
    <h1 class="text-white text-4xl font-semibold mb-6">Bonjour</h1>
    <div class="flex gap-3 flex-wrap">
      <SmallCard 
        :Song="Song"
        v-for="(Song, index) in ListenRecently.slice(0, cardRange[StateScreenSize].smallCard)" 
        :key="index" 
        @click.native="PickASong(index)" 
        >
      </SmallCard>
    </div>
    <Titre title="Conçu pour julien"></Titre>
    <div class="flex flex-wrap justify-between" :class="cardRange[StateScreenSize].gap">
      <BigCard :Song="Song" v-for="(Song, index) in ListenRecently.slice(0, cardRange[StateScreenSize].BigCard)" :key="index"></BigCard>
    </div>
    <Titre title="Découvrir des nouveautés"></Titre>
    <div class="flex flex-wrap justify-between" :class="cardRange[StateScreenSize].gap">
      <BigCard :Song="Song" v-for="(Song, index) in ListenRecently.slice(0, cardRange[StateScreenSize].BigCard)" :key="index"></BigCard>
    </div>
    <Titre title="Animés!"></Titre>
    <div class="flex flex-wrap justify-between" :class="cardRange[StateScreenSize].gap">
      <BigCard :Song="Song" v-for="(Song, index) in ListenRecently.slice(0, cardRange[StateScreenSize].BigCard)" :key="index"></BigCard>
    </div>
  </div>
</template>

<script>
import Titre from '../components/Titre.vue'
import SmallCard from '../components/SmallCard.vue'
import BigCard from '../components/BigCard.vue'
import { mapGetters, mapActions } from 'vuex'

// @ is an alias to /src
export default {
  name: 'Home',
  props: {
    Songs: Array
  },
  components: {
    Titre,
    SmallCard,
    BigCard
  },
  computed: {
    ...mapGetters({
        StateScreenSize: 'ScreenSize',
        GetAllSongs: 'GetAllSongs'
    }),
    test: {
      get() {
        return this.StateScreenSize
      },
      set(NewSize) {
        return NewSize
      }
    }
  },
  methods: {
    ...mapActions({
      updateSize: 'updateScreenSize' // attacher this.updateSize
    }),
    ScreenSize() {
      var w = window.innerWidth;
      console.log(w)

      switch(true) {
        case (w >= 1600): 
          return this.updateSize("Desktop") ;
        case (w >= 1300) && (w < 1600) : 
          return this.updateSize("DesktopIntermediate") ;
        case (w >= 1050) && (w < 1300): 
          return this.updateSize("Tablet") ;
        case (w >= 900) && (w < 1050): 
          return this.updateSize("TabletPortrait") ;
        case (w >= 720) && (w < 900): 
          return this.updateSize("TabletSmall") ;
        default: 
          return this.updateSize("Mobile")
      }
    },
    PickASong(index) {
      console.log("je suis dans le composant : " + index);
      this.$emit("PickASong", index);
    }
  },
  created() {
    window.addEventListener("resize", this.ScreenSize);
    this.ListenRecently = this.GetAllSongs;
  },
  destroyed() {
    window.removeEventListener("resize", this.ScreenSize);
  },
  data() {
    return {
      cardRange: {
        Desktop: {
          smallCard: 8,
          BigCard: 7,
          gap: "gap-6"
        },
        DesktopIntermediate:{
          smallCard: 8,
          BigCard: 6,
          gap: "gap-3"
        },
        Tablet: {
          smallCard: 4,
          BigCard: 5,
          gap: "gap-3"
        },
        TabletPortrait: {
          smallCard: 4,
          BigCard: 3,
          gap: "gap-3"
        },
        TabletSmall: {
          smallCard: 4,
          BigCard: 2,
          gap: "gap-3"
        },
        Mobile: {
          smallCard: 4,
          BigCard: 2,
          gap: "gap-3"
        }
      },
      ListenRecently: []
    }
  },
}
</script>
