/**
 * Coin overview model for coin page
 */
export interface CoinSnapshot {
  finance: any;
  info: any;
  history: Array<any>;
  exchanges: Array<any>;
  pairs: Array<any>;
  toSymbols: Array<any>;
  volumeByCurrency: Array<any>
}
