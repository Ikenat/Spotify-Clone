<template>
  <div class="SmallCard cursor-pointer flex-grow flex items-center rounded gap-3 bg-light transition-all duration-100 ease-out hover:bg-lighthover ">
    <img class="object-cover h-20 w-20 rounded-l" :src="ImageUrl(Song.img)" alt="test">
    <p class="truncate font-bold"> {{ Song.name }}</p>
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


<style>

.SmallCard {
  width: 100%;
}

/*  Desktop  */
@media screen and (min-width:1300px) {
  .SmallCard {
    width: calc(25% - theme('gap.3'));
  }
}

/*  Tablette paysage  */
@media screen and  (min-width:1050px) and (max-width: 1300px) {
  .SmallCard {
    width: calc(50% - theme('gap.3'));
  }
}

/* Tablette portrait */
@media screen and (min-width:768px) and (max-width: 1050px) {
  .SmallCard {
    width: calc(50% - theme('gap.3'));
  }
}

</style>
