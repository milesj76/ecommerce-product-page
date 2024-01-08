<script setup lang="ts">
  import { ref } from 'vue';
  import { db } from '@/stores/db';
  import { useCartStore } from '@/stores/cart';

  import minus from '@/assets/img/icon-minus.svg'
  import plus from '@/assets/img/icon-plus.svg'
  import IconCart from './icons/IconCart.vue';

  const cart = useCartStore()
  const numOfItems = ref(0)

  const companyName = db.product.company
  const productName = db.product.name
  const productDescription = db.product.description

  const price = db.product.price
  const discount: number = db.product.discount
  const actualPrice: number = discount ? price * discount : price

  type itemChange = "add" | "sub"

  function selectNumOfItems(change: itemChange): void {
    if (change === "sub") {
      numOfItems.value > 0 ? numOfItems.value-- : null
    } else { numOfItems.value++ }
  }

  function addToCart() {
    if (numOfItems.value > 0) {
      cart.addToCart({
        name: productName,
        itemId: db.product.id,
        actualPrice,
        multiple: numOfItems.value})
    }
  }
</script>

<template>
  <section class="py-4 px-6 text-sg-black lg:max-w-md">
    <div class="space-y-2">
      <h2 class="text-sg-orange uppercase font-bold text-xs tracking-wider">{{ companyName }}</h2>
      <h1 class="lg:text-4xl lg:pb-4">{{ productName }}</h1>
      <p class="text-sg-darkGrayishBlue text-sm leading-6">{{ productDescription }}</p>
    </div>

    <!-- Price + Actions -->
    <div class="flex lg:flex-col justify-between items-center lg:items-start my-4">
      <div class="flex gap-4">
        <h1>${{ actualPrice.toPrecision(actualPrice.toString().length + 2) }}</h1>
        <h3 class="bg-sg-paleOrange text-sg-orange font-bold px-2 flex items-center justify-center rounded-sm">{{ discount * 100 }}%</h3>
      </div>
      <h3 class="font-bold text-sg-grayishBlue line-through">${{ price.toPrecision(actualPrice.toString().length + 2) }}</h3>
    </div>

    <div class="space-y-3 lg:space-y-0 lg-actions">
      <div class="flex items-center bg-sg-lightGrayishBlue rounded-md h-12 px-4">
        <button @click="selectNumOfItems('sub')" class="w-4 h-full">
          <img :src="minus" alt="Select less items">
        </button>
        <h1 class="text-base flex-1 text-center">{{ numOfItems }}</h1>
        <button @click="selectNumOfItems('add')" class="w-4 h-full">
          <img :src="plus" alt="Select additional items">
        </button>
      </div>
      <button @click="addToCart()" class="w-full bg-sg-orange font-bold text-sm text-sg-white rounded-md h-12 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-sg-paleOrange">
        <IconCart class="fill-sg-white scale-75" />
        Add to cart
      </button>
    </div>
  </section>
</template>

<style>
  h1 {
    @apply font-bold text-2xl text-sg-black;
  }

  .lg-actions {
    @apply lg:grid grid-cols-[1fr_2fr] gap-4;
  }
</style>