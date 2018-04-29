// Models
import { CoinsList } from './models/coins-list.model';
import { CoinSnapshot } from './models/coin-snapshot.model';

export class CoinsServiceHelpers {

  constructor(
    private utils,
    private favoritesService
  ) {}

  /**
   * Convert data from server to CoinsList[]
   */
  convertDataToCoinsList(data: Array<any>, page: number, limit: number, toSymbol: string): CoinsList[] {
    const coinsList: CoinsList[] = [];

    data.forEach((item, index) => {
      const coinInfo: any = item.CoinInfo,
            conversionInfo: any = item.ConversionInfo || { Supply: 0, RAW: ['']};

      let priceInfo: any;

      if (conversionInfo.RAW.length > 1) {
        priceInfo = this.utils.cccUnpackMulti(conversionInfo.RAW);
      } else {
        priceInfo = this.utils.cccUnpack(conversionInfo.RAW[0]);
      }

      coinsList.push({
        position: page * limit + (index + 1),
        symbol: coinInfo.Name,
        name: coinInfo.FullName,
        imageUrl: coinInfo.ImageUrl,
        price: priceInfo.PRICE || 0,
        changePct24Hour: priceInfo.PRICE && priceInfo.OPEN24HOUR ? Math.round(((priceInfo.PRICE - priceInfo.OPEN24HOUR) / priceInfo.OPEN24HOUR * 100) * 100) / 100 : 0,
        marketCap: priceInfo.PRICE * conversionInfo.Supply || 0,
        history: null,
        historyChange: 0,
        conversionSymbol: toSymbol,
        favorite: this.favoritesService.checkFavorite(coinInfo.Name),
        toSymbolDisplay: this.utils.getSymbolFromCurrency(toSymbol),
      });
    });

    return coinsList;
  }

  /**
   * Convert data from server to coinSnapshot
   */
  convertDataToCoinShanpshot(data: Array<any>, pairs: any, toSymbol: string): CoinSnapshot {
    const finance = data[0].Data.AggregatedData;

    const coinSnapshot: CoinSnapshot = {
      info: data[0].Data.CoinInfo,
      finance: {
        toSymbol: toSymbol,
        toSymbolDisplay: this.utils.getSymbolFromCurrency(toSymbol),
        price: finance.PRICE,
        change24Hour: finance.CHANGE24HOUR,
        changeDay: finance.CHANGEDAY,
        changePct24Hour: finance.CHANGEPCT24HOUR.toFixed(2),
        changePctDay: finance.CHANGEPCTDAY.toFixed(2),
        high24Hour: finance.HIGH24HOUR,
        highDay: finance.HIGHDAY,
        low24Hour: finance.LOW24HOUR,
        lowDay: finance.LOWDAY,
        open24Hour: finance.OPEN24HOUR,
        openDay: finance.OPENDAY,
        marketCap: finance.MKTCAP,
        volume24Hour: finance.VOLUME24HOUR,
      },
      history: data[1],
      exchanges: data[0].Data.Exchanges,
      pairs: pairs.Data,
      toSymbols: pairs.Data.map((item: any) => item.toSymbol),
      volumeByCurrency: pairs.Data
    };

    return coinSnapshot;
  }
}
