export interface CoinsList {
  position: number,
  name: string,
  fullName: string
}

export interface CoinsListFullData {
  position: number,
  name: string,
  fullName: string,
  imageUrl: string,
  price: string,
  changePct24Hour: string,
  marketCap: string,
  weekHistory: Array<any>
}
