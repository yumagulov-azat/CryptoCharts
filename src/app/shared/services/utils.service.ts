import { Injectable } from '@angular/core';
import * as symbolFromCurrency from 'currency-symbol-map';

/**
 * Methods from cryptocompare CCC.utils
 */

@Injectable()
export class UtilsService {

  FIELDS = {
    'TYPE'            : 0x0       // hex for binary 0, it is a special case of fields that are always there
    , 'MARKET'          : 0x0       // hex for binary 0, it is a special case of fields that are always there
    , 'FROMSYMBOL'      : 0x0       // hex for binary 0, it is a special case of fields that are always there
    , 'TOSYMBOL'        : 0x0       // hex for binary 0, it is a special case of fields that are always there
    , 'FLAGS'           : 0x0       // hex for binary 0, it is a special case of fields that are always there
    , 'PRICE'           : 0x1       // hex for binary 1
    , 'BID'             : 0x2       // hex for binary 10
    , 'OFFER'           : 0x4       // hex for binary 100
    , 'LASTUPDATE'      : 0x8       // hex for binary 1000
    , 'AVG'             : 0x10      // hex for binary 10000
    , 'LASTVOLUME'      : 0x20      // hex for binary 100000
    , 'LASTVOLUMETO'    : 0x40      // hex for binary 1000000
    , 'LASTTRADEID'     : 0x80      // hex for binary 10000000
    , 'VOLUMEHOUR'      : 0x100     // hex for binary 100000000
    , 'VOLUMEHOURTO'    : 0x200     // hex for binary 1000000000
    , 'VOLUME24HOUR'    : 0x400     // hex for binary 10000000000
    , 'VOLUME24HOURTO'  : 0x800     // hex for binary 100000000000
    , 'OPENHOUR'        : 0x1000    // hex for binary 1000000000000
    , 'HIGHHOUR'        : 0x2000    // hex for binary 10000000000000
    , 'LOWHOUR'         : 0x4000    // hex for binary 100000000000000
    , 'OPEN24HOUR'      : 0x8000    // hex for binary 1000000000000000
    , 'HIGH24HOUR'      : 0x10000   // hex for binary 10000000000000000
    , 'LOW24HOUR'       : 0x20000   // hex for binary 100000000000000000
    , 'LASTMARKET'      : 0x40000   // hex for binary 1000000000000000000, this is a special case and will only appear on CCCAGG messages
  }

  constructor() { }

  getSymbolFromCurrency(currency: string): string {
    return symbolFromCurrency(currency);
  }

  unpack(value) {
    let valuesArray = value.split('~');
    let valuesArrayLenght = valuesArray.length;
    let mask = valuesArray[valuesArrayLenght - 1];
    let maskInt = parseInt(mask, 16);
    let unpackedCurrent = {};
    let currentField = 0;
    for (let property in this.FIELDS) {
      if (this.FIELDS[property] === 0) {
        unpackedCurrent[property] = valuesArray[currentField];
        currentField++;
      } else if (maskInt & this.FIELDS[property]) {
        //i know this is a hack, for cccagg, future code please don't hate me:(, i did this to avoid
        //subscribing to trades as well in order to show the last market
        if (property === 'LASTMARKET') {
          unpackedCurrent[property] = valuesArray[currentField];
        } else {
          unpackedCurrent[property] = parseFloat(valuesArray[currentField]);
        }
        currentField++;
      }
    }

    return unpackedCurrent;
  };

  convertPriceToDisplay(symbol, value, type: string = '', fullNumbers: boolean = false) {
    let prefix = '';
    let valueSign = 1;
    value = parseFloat(value);
    let valueAbs = Math.abs(value);
    let decimalsOnBigNumbers = 2;
    let decimalsOnNormalNumbers = 2;
    let decimalsOnSmallNumbers = 4;
    if (fullNumbers === true) {
      decimalsOnBigNumbers = 2;
      decimalsOnNormalNumbers = 0;
      decimalsOnSmallNumbers = 4;
    }
    if (symbol != '') {
      prefix = symbol;
    }
    if (value < 0) {
      valueSign = -1;
    }

    if (value == 0) {
      return prefix + '0';
    }

    if (value < 0.00001000 && value >= 0.00000100 && decimalsOnSmallNumbers > 3) {
      decimalsOnSmallNumbers = 3;
    }
    if (value < 0.00000100 && value >= 0.00000010 && decimalsOnSmallNumbers > 2) {
      decimalsOnSmallNumbers = 2;
    }
    if (value < 0.00000010 && value >= 0.00000001 && decimalsOnSmallNumbers > 1) {
      decimalsOnSmallNumbers = 1;
    }

    if (type == 'short') {
      if (valueAbs > 10000000000) {
        valueAbs = valueAbs / 1000000000;
        return prefix + this.filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' B';
      }
      if (valueAbs > 10000000) {
        valueAbs = valueAbs / 1000000;
        return prefix + this.filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' M';
      }
      if (valueAbs > 10000) {
        valueAbs = valueAbs / 1000;
        return prefix + this.filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' K';
      }
      if (valueAbs >= 1) {
        return prefix + this.filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers);
      }
      return prefix + (valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers);
    } else {
      if (valueAbs >= 1) {
        return prefix + this.filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers);
      }

      return prefix + this.noExponents((valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers));
    }
  };

  private noExponents(value) {
    let data = String(value).split(/[eE]/);
    if (data.length == 1) { return data[0]; }

    let  z = '', sign = value < 0 ? '-' : '',
         str = data[0].replace('.', ''),
         mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + '0.';
      while (mag++) { z += '0'; }
      return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) { z += '0'; }
    return str + z;
  };

  private filterNumberFunctionPolyfill(value, decimals) {
    let decimalsDenominator = Math.pow(10, decimals);
    let numberWithCorrectDecimals = Math.round(value * decimalsDenominator) / decimalsDenominator;
    let parts = numberWithCorrectDecimals.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };

}
