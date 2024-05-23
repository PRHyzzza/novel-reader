<script setup lang="ts">
import useBook from '../../../hook/useBook';

const addBook = (e: Event) => {
    const file = (e.target as HTMLInputElement).files![0]
    const title = file.name.replace(/\.[^.]+$/, '')
    const reader = new FileReader()
    reader.onload = (e) => {
        const data = e.target!.result?.toString()
        const book = useBook(data!, title)
        console.log(book.value);

    }
    reader.readAsText(file)
}
</script>

<template>
    <input type="file" @change="addBook" />
</template>