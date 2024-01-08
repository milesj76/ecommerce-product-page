<script setup lang="ts">
  import { db } from '@/stores/db';
  import { useImageModal } from '@/stores/imageModal';
  import { ref } from 'vue';

  import next from '@/assets/img/icon-next.svg'
  import previous from '@/assets/img/icon-previous.svg'

  // List -> Image
  // takes List of images, returns selected image, default first image

  const selection = ref(0)
  const modal = useImageModal()

  type direction = "left" | "right"
  const nextSelection = (direction: direction) => {
    if (direction === "left") {
      if (selection.value !== 0) selection.value -= 1
    }

    if (direction === "right") {
      if (selection.value < (db.product.image.length - 1)) selection.value += 1
    }
  }

  const directSelection = (i: number) => {
    selection.value = i
  }
  
  const openModal = (i: number) => {
    if (window.innerWidth < 1024) return
    modal.select(i)
    modal.show()
  }

</script>

<template>

  <section class="w-full lg:max-w-md">

    <!-- Selected Image -->
    <div class="w-full relative">
      <div class="relative inline-block">
        <template v-for="(image, i) in db.product.image">
          <img
            v-show="selection === i"
            v-bind:src="image"
            @click="openModal(i)"
            class="h-full sm:rounded-lg lg:cursor-zoom-in"
            alt="Product Image">
        </template>
      </div>

      <!-- Prev/Next Image Overlay -->
      <div class="absolute z-20 top-[50%] left-0 right-0 transform translate-y-[-50%] flex justify-between px-4 lg:hidden">
        <button class="btn-img-selector" @click="nextSelection('left')">
          <img :src="previous" class="h-3 w-3 translate-x-[-10%]" alt="Previous image">
        </button>
        <button class="btn-img-selector" @click="nextSelection('right')">
          <img :src="next" class="h-3 w-3 translate-x-[10%]" alt="Next image">
        </button>
      </div>
    </div>

    <!-- Image Choices (Only shown on large viewport) -->
    <div class="hidden lg:flex mt-8 justify-between gap-8">
      <template v-for="(thumb, i) in db.product.thumb">
        <div class="rounded-lg border-2" :class="[i === selection ? 'border-sg-orange' : 'border-transparent']">
          <img
          :src="thumb"
          alt="Thumbnail"
          @click="directSelection(i)"
          class="rounded-md cursor-pointer hover:opacity-75"
          :class="{ 'opacity-50': i === selection }"
          />          
        </div>
      </template>
    </div>
  </section>
</template>

<style>
  .btn-img-selector {
    @apply rounded-full bg-white p-3;
  }
</style>