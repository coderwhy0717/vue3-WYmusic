export function dataLyric(lyric: any) {
  if (lyric && !lyric.lyric) {
    return []
  }
  lyric = lyric.lyric
  const newLyric = lyric
    .replace(/\[.*?\]/g, '')
    .trim()
    .split('\n')
  let lyricDuration = lyric
    .replace(/[\u4e00-\u9fa5 | a-z|A-Z |\[|\]|:|,|(,|)|/]/g, '')
    .trim()
    .split('\n') // this.lyricDuration = res.lrc.lyric.replace(/[\u4e00-\u9fa5 | a-z|A-Z |\[|\]|:|,]/g, ',')
  //把时间转换为秒
  lyricDuration = lyricDuration.map((item: any) => {
    return item.slice(0, 2) * 60 + Number(item.slice(2, 6))
  })
  const lyricArr: any[] = []
  newLyric.forEach((item: any, index: number) => {
    lyricArr.push({
      lyricStr: item,
      duration: lyricDuration[index]
    })
  })
  return lyricArr
}
