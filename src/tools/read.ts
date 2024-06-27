import { ref, watch } from "vue";
import { config, initConfig } from "./config";
import { Book } from ".";
import localforage from 'localforage'

initConfig();

interface readBook {
 title: string;
 md5: string;
 chapterIndex: number;
 page: number;
 pages: string[][];
}

const readBook = ref<readBook>({
 title: "",
 md5: "",
 chapterIndex: 0,
 page: 1,
 pages: []
})

const row = ref(0)
const col = ref(0)

const setChapter = async (chapterIndex: number) => {
 readBook.value.chapterIndex = chapterIndex
}

const setPage = async (page: number) => {
 readBook.value.page = page
}

const initBook = async (book: Book, widch: number, height: number) => {
 readBook.value.md5 = book.md5
 readBook.value = JSON.parse(await localforage.getItem('readBook' + readBook.value.md5) as string)
 readBook.value.title = book.title
 row.value = Math.floor((widch / config.value.fontSize))
 col.value = Math.floor((height / (config.value.fontSize + config.value.lineHeight)))
 book.chapters.forEach(async (chapter) => {
  const pages = [chapter.chapter]
  const lines = chapter.content.split("\n").filter(it => it.trim())
  const rows = []
  for (let i = 0; i < lines.length; i++) {
   let line = lines[i]
   for (let j = 0; j < row.value; j++) {
    if (line.length > j * row.value) {
     rows.push(line.substring(j * row.value, (j + 1) * row.value) + "\n")
    } else {
     rows.push(line.substring(j * row.value))
    }
   }
  }
  const rowss = rows.filter(it => it.trim())
  for (let i = 0; i < rowss.length; i += col.value) {
   pages.push(rowss.slice(i, i + col.value).join(""))
  }
  readBook.value.pages.push(pages as string[])
 })
}

watch(readBook, () => {
 if (readBook.value?.md5) {
  localforage.setItem('readBook' + readBook.value.md5, JSON.stringify(readBook.value))
 }
}, { immediate: true })

export {
 readBook,
 initBook,
 setChapter,
 setPage
}
