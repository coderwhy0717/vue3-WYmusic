import { coordinateData } from './coordinate-data'

export const convertData = function (data: any) {
  for (const k in coordinateData) {
    if (coordinateData[k] == data) {
      console.log(k)

      return k
    }
  }
}
