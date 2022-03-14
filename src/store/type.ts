import { searchType } from './search/type'
import { MusicType } from './pageMusic/type'
import { LoginType } from './login/type'
import { complexDataType } from './complexData/type'
import { searchdetailtype } from './searchdetail/search-type'
export interface IDtype {
  songnumber: number
}

export interface TRootModule {
  login: LoginType
  search: searchType
  pageMusic: MusicType
  complexData: complexDataType
  searchdetail: searchdetailtype
}

export type IStoreType = IDtype & TRootModule
