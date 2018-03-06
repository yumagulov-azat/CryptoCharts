import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../../shared/services/utils.service';

/**
 * Return utils.convertPriceToDisplay result
 */

@Pipe({
  name: 'cryptoCurrency'
})
export class CryptoCurrencyPipe implements PipeTransform {

  constructor(private utils: UtilsService) {

  }

  transform(value: any, symbol: any = '$', short: string): any {
    return this.utils.convertPriceToDisplay(symbol + ' ', value, short);
  }

}
