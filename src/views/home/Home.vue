<script setup lang="ts">
import { ref } from 'vue';
import book from '~/assets/img/book.svg'
import bookba from '~/assets/img/book_ba.svg'
import user from '~/assets/img/user.svg'
import userba from '~/assets/img/user_ba.svg'

const footerList = ref([
 {
  id: 1,
  icon: book,
  iconBa: bookba,
  to: '/book',
  isActive: true,
  title: '书架'
 },
 {
  id: 2,
  icon: user,
  iconBa: userba,
  to: '/user',
  isActive: false,
  title: '我的'
 }
])

const toBook = (id: number) => {
 footerList.value.forEach(item => {
  if (item.id === id) {
   item.isActive = true
  } else {
   item.isActive = false
  }
 })
}
</script>

<template>
 <div class="home">
  <div class="home-footer">
   <div class="home-footer-item" v-for="item in footerList" @click="toBook(item.id)">
    <img :src="item.isActive ? item.iconBa : item.icon" :key="item.id" :title="item.title" alt="">
   </div>
  </div>
 </div>
</template>

<style lang="less">
.home {
 height: 100%;
 width: 100%;
 display: flex;
 flex-direction: column;

 .home-footer {
  display: flex;
  flex-direction: row;
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 50px;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, .05);

  .home-footer-item {
   flex: 1;
   text-align: center;
   flex-direction: column;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: all .3s ease;
  }

 }
}
</style>
