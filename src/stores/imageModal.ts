import { defineStore } from "pinia";

export const useImageModal = defineStore('imageModal',{
  state: () => ({ selection: 0, showModal: false }),
  actions: {
    select(select: number) {
      this.selection = select
    },
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    previous() {
      if (this.selection !== 0) this.selection -= 1
    },
    next() {
      this.selection += 1
    },
  }
})