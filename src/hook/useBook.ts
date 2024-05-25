import { MD5 } from 'crypto-js'
import { chapterPattern, chapterSplitTag } from '../tools'
import { Ref, ref, toRef } from 'vue'
import localforage from 'localforage'

//ts声明类型
interface Book {
    title: string
    md5: string
    chapters: {
        chapter?: string
        content: string
    }[]
}

/**
 * @description: 获取书籍信息
 * @param {string} text
 * @param {string} title
 * @return {Ref<Book>} book
 */
export default (text: string, title: string): Ref<Book> => {
    //md5
    const md5 = MD5(text).toString()
    localforage.getItem(md5).then((value) => {
        if (value) return toRef(value) as Ref<Book>
    })
    //根据正则获取章节名称
    const chapters = text.match(chapterPattern)
    //根据正则获取章节内容
    const contents = text.replace(chapterPattern, chapterSplitTag).split(chapterSplitTag).slice(1)
    // 变成一个对象{chapter:xxx,content:'xxx'}
    const result = chapters?.map((item, index) => {
        return {
            chapter: item,
            content: contents[index].replace(chapterSplitTag, ''),
        }
    })
    const book = ref<Book>({
        title,
        md5,
        chapters: result ? result : [{ content: text }]
    })
    localforage.setItem(md5, JSON.stringify(book.value))
    return book
}
