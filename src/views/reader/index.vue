<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue';
import { Book, getBook } from '../../tools';
import { initBook, readBook, setPage } from '../../tools/read';

const book = ref<Book>(JSON.parse((await getBook("caf05b904a8103fafce8c509f26e8617")) as string))
const reader = ref<HTMLElement>()
const readerHeight = ref(0)
const readerWidth = ref(0)
const show = ref(false)

onMounted(() => {
 readerHeight.value = reader.value?.offsetHeight as number
 readerWidth.value = reader.value?.offsetWidth as number
 nextTick(async () => {
  await initBook(book.value, readerWidth.value, readerHeight.value)
  show.value = true
  // setTimeout(() => {
  //  setPage(readBook.value.page! + 1)
  // }, 5000)
 })
 console.log(readBook.value);
})

</script>

<template>
 <div class="reader-container">
  <div ref="reader" class="reader-content" :class="readBook.page === 1 ? 'flex-center' : ''">
   <div class="reader-text" :class="readBook.page === 1 ? 'reader-title' : ''" v-if="show">
    {{ readBook.pages![readBook.chapterIndex!][readBook.page! - 1] }}
   </div>
  </div>
 </div>
</template>

<style lang="less" scoped>
.reader-container {
 height: 100%;
 overflow: hidden;
 margin: 0 16px;
}

.reader-content {
 columns: calc(100% - 32px) 1;
 column-gap: 16px;
 height: 100%;
 transition: all 0.3s ease-in-out;
 word-break: break-word;
}

.reader-title {
 font-size: 24px;
 margin: 0;
 padding: 0;
 margin-top: 16px;
 font-weight: bold;
}

.reader-text {
 white-space: pre-wrap;
 margin: 0;
 line-height: 1.5;
}
</style>
