// 小说章节正则
export const chapterPattern = /(?:正文 )?(第)([―－\-─—壹贰叁肆伍陆柒捌玖一二两三四五六七八九十○〇零百千O0-9０-９]{1,12})(章|部|卷)(.*)/g

// 小说分割标记
export const chapterSplitTag = `小说分割标记-${new Date().getTime()}` 
