/**
 * Coins list model
 */
export interface CoinsList {
  position: number;
  name: string;
  fullName: string;
  imageUrl: string;
  price: string;
  changePct24Hour: string;
  marketCap: string;
  history: Array<any>;
}
