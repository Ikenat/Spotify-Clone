<template>
  <div class="BigCard cursor-pointer rounded gap-3 p-3 bg-light transition-all duration-100 ease-out hover:bg-lighthover ">
    <div class="img-wrapper relative w-full h-0">
        <img class="object-cover rounded absolute top-0 left-0 h-full w-full " :src="ImageUrl(Song.img)" alt="test">
    </div>
    <p class="truncate w-full font-bold my-1"> {{ Song.name }}</p>
    <p v-if="Song.desc !== undefined" class="truncate w-full text-lightest text-sm"> {{Song.desc}} </p>
    <div v-else>
        <router-view to="/">  </router-view>
        <p> {{ Song.author[0] }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmallCard',
  props: {
    Song: Object
  },
  methods: {
    ImageUrl: function(imgName) {
      const fileName = imgName;
      return require(`../assets/img/${fileName}.jpg`);
    }
  },
}
</script>


<style lang="scss">

.BigCard {
  width: 100%;
  .img-wrapper {
      padding-bottom: 100%;
  }
}

/*  Desktop  */
@media screen and (min-width:1300px) and (max-width: 1600px) {
  .BigCard {
    width: calc((100%/6) - theme('gap.3'));
  }
}

/*  Desktop  */
@media screen and (min-width:1600px) {
  .BigCard {
    width: calc((100%/7) - theme('gap.6'));
  }
}

/*  Tablette paysage  */
@media screen and  (min-width:1050px) and (max-width: 1300px) {
  .BigCard {
    width: calc((100%/5) - theme('gap.3'));
  }
}

/* Tablette portrait */
@media screen and (min-width:900px) and (max-width: 1050px) {
  .BigCard {
    width: calc((100%/3) - theme('gap.3'));
  }
}

/* Tablette portrait small */
@media screen and (min-width:768px) and (max-width: 900px) {
  .BigCard {
    width: calc((100%/2) - theme('gap.3'));
  }
}

</style>
