import { ref, watch } from "vue";
import { config, initConfig } from "./config";
import { Book } from ".";
import localforage from 'localforage'

initConfig();

interface readBook {
 title?: string;
 md5?: string;
 chapterIndex?: number;
 page?: number;
 pages?: string[][];
}

const readBook = ref<readBook>({
 chapterIndex: 0,
 page: 1,
 pages: []
})
/**
 * 行
 */
const row = ref(0)
/**
 * 列
 */
const col = ref(0)

/**
 * 设置章节
 * @param chapterIndex
 */
const setChapter = async (chapterIndex: number) => {
 if (chapterIndex > readBook.value.pages!.length) {
  readBook.value.chapterIndex = readBook.value.pages!.length - 1
  return
 }
 readBook.value.chapterIndex = chapterIndex
}

/**
 * 设置页码
 * @param page
 */
const setPage = async (page: number) => {
 readBook.value.page = page
 if (page > readBook.value.pages![readBook.value.chapterIndex!].length) {
  readBook.value.page = 1
  await setChapter(readBook.value.chapterIndex! + 1)
 }
}

/**
 * 初始化书籍
 * @param book
 * @param widch
 * @param height
 */
const initBook = async (book: Book, widch: number, height: number) => {
 readBook.value.md5 = book.md5
 const read = JSON.parse(await localforage.getItem('readBook' + readBook.value.md5) as string)
 if (read) {
  readBook.value.chapterIndex = read.chapterIndex
  readBook.value.page = read.page
  readBook.value.pages = read.pages
 }
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
  readBook.value.pages!.push(pages as string[])
 })
}

/**
 * 监听书籍
 */
watch(readBook, () => {
 if (readBook.value?.md5) {
  localforage.setItem('readBook' + readBook.value.md5, JSON.stringify(readBook.value))
 }
}, { deep: true })

export {
 readBook,
 initBook,
 setChapter,
 setPage
}
