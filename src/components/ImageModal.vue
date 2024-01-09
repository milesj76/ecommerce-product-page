<script setup lang="ts">
  import { useImageModal } from '@/stores/imageModal';

  import IconX from './icons/IconX.vue';
  import next from '@/assets/img/icon-next.svg'
  import previous from '@/assets/img/icon-previous.svg'

  const props = defineProps(['product'])
  const modal = useImageModal()

  function closeModal() {
    // alert(window.innerWidth)
    modal.hide()
  }

  type direction = "left" | "right"
  const nextSelection = (direction: direction) => {
    if (direction === "left") {
      modal.previous()
    }

    if (direction === "right") {
      if (modal.selection < (props.product.image.length - 1)) modal.next()
    }
  }

  const directSelection = (i: number) => {
    modal.select(i)
  }
</script>

<template>
  <section class="z-50 fixed w-screen h-screen text-white select-none">

    <!-- BG Overlay -->
    <div class="fixed w-full h-full bg-sg-black opacity-75" />

    <div class="relative w-full h-full flex justify-center items-center">
      <div class="max-w-lg">

        <div class="w-full flex justify-end mb-4">
          <IconX 
            @click="closeModal()"
            class="fill-sg-white hover:fill-sg-orange cursor-pointer scale-125" />
        </div>

        <!-- Selected Image -->
        <div class="w-full relative">
          <div class="relative inline-block">
            <template v-for="(image, i) in props.product.image">
              <img v-show="modal.selection === i" v-bind:src="image" class="h-full sm:rounded-lg" alt="Product Image">
            </template>
          </div>

          <!-- Prev/Next Image Overlay -->
          <div class="absolute z-60 top-[50%] -left-[3%] -right-[3%] transform translate-y-[-50%] flex justify-between">
            <button class="btn-img-selector" @click="nextSelection('left')">
              <img :src="previous" class="h-3 w-3 translate-x-[-10%]" alt="Previous image" >
            </button>
            <button class="btn-img-selector" @click="nextSelection('right')">
              <img :src="next" class="h-3 w-3 translate-x-[10%]" alt="Next image" >
            </button>
          </div>
        </div>

        <!-- Image Choices (Only shown on large viewport) -->
        <div class="hidden lg:flex mt-8 justify-between gap-8 px-6">
          <template v-for="(thumb, i) in props.product.thumb">
            <div class="rounded-lg border-2 hover:border-gray-500" :class="[i === modal.selection ? 'border-sg-orange' : 'border-transparent']">
              <img
              :src="thumb"
              alt="Thumbnail"
              @click="directSelection(i)"
              class="rounded-md cursor-pointer hover:brightness-125 hover:contrast-75"
              :class="{ 'brightness-110 contrast-50': i === modal.selection }"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>