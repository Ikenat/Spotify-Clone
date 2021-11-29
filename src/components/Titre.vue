<template>
    <h2 class="cursor-pointer text-white text-3xl font-bold my-6 hover:underline"> {{ title }} </h2>
</template>

<script>

export default {
  name: 'Titre',
  props: {
      title: String
  }
}
</script>
