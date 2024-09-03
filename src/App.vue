<template>
  <div id="app">
    <h1>Cafés e Doces</h1>
    <div class="image-gallery">
      <img src="@/assets/images/veil_sample_frame-1920x1080.png" alt="nebulosa" />
      <img src="@/assets/images/m101-hst-4145x3240.png" alt="galaxia" />
      <img src="@/assets/images/veil_sample_frame-1920x1080.png" alt="galaxiaespiral" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  text-align: center;
}

.image-gallery {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.image-gallery img {
  max-width: 100%;
  height: auto;
  margin: 10px;
}
</style>
