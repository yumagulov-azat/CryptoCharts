/**
 * Coins list model
 */
export interface CoinsList {
  position: number;
  name: string;
  fullName: string;
  imageUrl: string;
  price: number;
  changePct24Hour: number;
  marketCap: number;
  history: Array<any>;
  historyChange: number;
  conversionSymbol: string;
  toSymbolDisplay: string;
  favorite: boolean;
}
