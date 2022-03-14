const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc) //扩展utc
// 创建方法 格式化 utc时间格式  导入dayjs库 扩展extend utc 使用dayjs.utc格式化传进来的utcString  utc格式
// 在global文件夹中的register-propertes中调用
export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}
