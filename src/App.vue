<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
  import ProductImages from './components/ProductImages.vue';
  import ProductDetails from './components/ProductDetails.vue';
  import ImageModal from './components/ImageModal.vue';

  import { db } from './stores/db';
  import { useImageModal } from './stores/imageModal';

  const loadedProduct = db.product
  const modal = useImageModal()
</script>

<template>
  <!-- Image Modal (>=lg viewport only) -->
  <ImageModal
    :product="loadedProduct"
    :initial-selection="modal.selection"
    :class="{ 'hidden': !modal.showModal }"
    />
  <div class="lg:px-28 min-h-screen lg:flex lg:flex-col max-w-screen-2xl m-auto">
    <div class="relative">
      <Navbar />

    </div>
    <div class="w-full body-container md-body-container lg-body-container">
      <ProductImages />
      <ProductDetails />
    </div>
  </div>
</template>

<style scoped>
  .body-container {
    @apply sm:max-w-md sm:m-auto;
  }

  .md-body-container {
    @apply md:max-w-xl md:min-h-full;
  }

  .lg-body-container {
    @apply lg:flex lg:h-full lg:max-w-none justify-center items-center lg:gap-8 desk:gap-16;
  }
</style>
