import { AMMStateResponse, OrderBooksV3Response } from '../src/backend/secrettune/BorosBackendSDK';
import { combineMarketOrderBookAndAMM } from '../src/entities/amm/amm';

describe('combineMarketOrderBookAndAmm', () => {
  it('should combine correctly when AMMImpliedRate is between best bid and best ask rate', () => {
    const tickSize = 0.001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [95, 90, 85, 80, 75, 70, 65, 60, 55, 50],
        sz: [
          '76200000000000000000',
          '20000000000000000',
          '2000000000000000000',
          '10000000000000000',
          '3205182798196236520',
          '10000000000000000',
          '100000000000000000',
          '100000000000000000',
          '100000000000000000',
          '100000000000000000',
        ],
      },
      short: {
        ia: [105, 110, 115, 120, 125, 130, 135, 140, 145, 150],
        sz: [
          '99790000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
        ],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '2490787079878783975900',
      normFixedAmount: '249078707987878397590',
      totalLp: '787656033893671113961',
      latestFTime: '1743811200',
      maturity: '1747872000',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1747872000',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '1000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [98, 97, 96, 95, 94, 93, 92, 91, 90, 89],
        sz: [
          '13610271445662834034',
          '13823956795392007353',
          '14043229375344512552',
          '90468294856529239993',
          '14499368720230901400',
          '14736676835031245605',
          '14980456074323246577',
          '15230954977629720703',
          '15508434459348057372',
          '15753168568885510655',
        ],
      },
      short: {
        ia: [102, 103, 104, 105, 106, 107, 108, 109, 110, 111],
        sz: [
          '13401976925864881432',
          '13198885601549638906',
          '13000818131378430078',
          '112597603024194533774',
          '12619076223751988326',
          '12435080719130635879',
          '12255466179024632144',
          '12080088608230235523',
          '11929810024795855525',
          '11741498156413929530',
        ],
      },
    });
  });

  it('should combine correctly when AMMImpliedRate is bigger than best ask rate', () => {
    const tickSize = 0.001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [45, 43, 37, 32, 10, 9, 0],
        sz: [
          '7620000000000000000',
          '20000000000000000',
          '2000000000000000000',
          '10000000000000000',
          '3205182798196236520',
          '10000000000000000',
          '100000000000000000',
        ],
      },
      short: {
        ia: [71, 121],
        sz: ['99790000000000000000', '21000000000000000'],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '2490787079878783975900',
      normFixedAmount: '249078707987878397590',
      totalLp: '787656033893671113961',
      latestFTime: '1743811200',
      maturity: '1747872000',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1747872000',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '10000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [70, 69, 68, 67, 66, 65, 64, 63, 62, 61],
        sz: [
          '320349642740790560386',
          '19238365652846684714',
          '19617637565532873189',
          '20009394565475872104',
          '20414216827186775720',
          '20832719556513339923',
          '21265555606325220196',
          '21713418325894397422',
          '22177044668374752770',
          '22657218583711935088',
        ],
      },
      short: {
        ia: [71, 111, 112, 113, 114, 115, 116, 117, 118, 119],
        sz: [
          '99790000000000000000',
          '13401976925864881432',
          '13198885601549638906',
          '13000818131378430078',
          '12807603024194660579',
          '12619076223751987652',
          '12435080719130632814',
          '12255466179024631541',
          '12080088608230232505',
          '11908810024795854921',
        ],
      },
    });
  });

  it('should combine correctly when AMMImpliedRate is smaller than best bid rate', () => {
    const tickSize = 0.001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [120, 115, 110, 105, 100, 95, 90, 85, 80, 75],
        sz: [
          '7620000000000000000',
          '20000000000000000',
          '2000000000000000000',
          '10000000000000000',
          '3205182798196236520',
          '10000000000000000',
          '100000000000000000',
          '100000000000000000',
          '100000000000000000',
          '100000000000000000',
        ],
      },
      short: {
        ia: [125, 130, 135, 140, 145, 150, 155, 160, 165, 170],
        sz: [
          '99790000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
          '21000000000000000',
        ],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '2490787079878783975900',
      normFixedAmount: '249078707987878397590',
      totalLp: '787656033893671113961',
      latestFTime: '1743811200',
      maturity: '1747872000',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1747872000',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '10000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [120, 115, 110, 105, 100, 95, 90, 89, 88, 87],
        sz: [
          '7620000000000000000',
          '20000000000000000',
          '2000000000000000000',
          '10000000000000000',
          '3205182798196236520',
          '10000000000000000',
          '100000000000134489',
          '13610271445662837284',
          '13823956795392010650',
          '14043229375344371516',
        ],
      },
      short: {
        ia: [121, 122, 123, 124, 125, 126, 127, 128, 129, 130],
        sz: [
          '137027329749079256753',
          '11418272326460391675',
          '11262119879895805454',
          '11109456686263628184',
          '110750175054484262881',
          '10814171518739164309',
          '10671346637927055053',
          '10531604806260792862',
          '10394854074296614034',
          '10282005979740957369',
        ],
      },
    });
  });

  it('should combine correctly when there is no long order book', () => {
    const tickSize = 0.0001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [378, 120, 109],
        sz: ['1640000000000000000', '2000000000000000000', '3000000000000000000'],
      },
      short: {
        ia: [],
        sz: [],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '2174227079878783975899',
      normFixedAmount: '274847956387325199884',
      totalLp: '787656033893671113961',
      latestFTime: '1744358400',
      maturity: '1747872000',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1747872000',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '10000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [1164, 1163, 1162, 1161, 1160, 1159, 1158, 1157, 1156, 1155],
        sz: [
          '117276086588422569',
          '994651736318755365',
          '995895122636397853',
          '997141050375768105',
          '998389526753001425',
          '999640559008461068',
          '1000894154410851532',
          '1002150320254347700',
          '1003409063859710089',
          '1004670392575387017',
        ],
      },
      short: {
        ia: [1365, 1366, 1367, 1368, 1369, 1370, 1371, 1372, 1373, 1374],
        sz: [
          '876134797645411483',
          '992172559218410015',
          '990936754135165724',
          '989703461872536446',
          '988472675344531690',
          '987244387491192248',
          '986018591277009254',
          '984795279692785072',
          '983574445754036324',
          '982356082501380378',
        ],
      },
    });
  });

  it('should combine correctly when there is no short order book', () => {
    const tickSize = 0.0001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [],
        sz: [],
      },
      short: {
        ia: [1268, 1270, 1272],
        sz: ['1640000000000000000', '2000000000000000000', '3000000000000000000'],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '2174227079878783975899',
      normFixedAmount: '274847956387325199884',
      totalLp: '787656033893671113961',
      latestFTime: '1744358400',
      maturity: '1747872000',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1747872000',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '10000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [1164, 1163, 1162, 1161, 1160, 1159, 1158, 1157, 1156, 1155],
        sz: [
          '117276086588422569',
          '994651736318755365',
          '995895122636397853',
          '997141050375768105',
          '998389526753001425',
          '999640559008461068',
          '1000894154410851532',
          '1002150320254347700',
          '1003409063859710089',
          '1004670392575387017',
        ],
      },
      short: {
        ia: [1268, 1270, 1272, 1365, 1366, 1367, 1368, 1369, 1370, 1371],
        sz: [
          '1640000000000000000',
          '2000000000000000000',
          '3000000000000000000',
          '876134797645411483',
          '992172559218410015',
          '990936754135165724',
          '989703461872536446',
          '988472675344531690',
          '987244387491192248',
          '986018591277009254',
        ],
      },
    });
  });

  it('should combine correctly when there is no short order book bigger than implied rate', () => {
    const tickSize = 0.00001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [5992, 4990, 2993, 1511, 1207],
        sz: [
          '12000000000000000000',
          '3890000000000000000',
          '10000000000000000000',
          '98000000000000000000',
          '2000000000000000000',
        ],
      },
      short: {
        ia: [7005],
        sz: ['50310000000000000000'],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '1659216901752019617400',
      normFixedAmount: '165564091360090085983',
      totalLp: '524057998646386757088',
      latestFTime: '1744588800',
      maturity: '1750291200',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1750291200',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '10000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [7004, 7003, 7002, 7001, 7000, 6999, 6998, 6997, 6996, 6995],
        sz: [
          '217646364479327750578',
          '131097748580450411',
          '131123289493549048',
          '131148838575364618',
          '131174395829534849',
          '131199961259687377',
          '131225534869468051',
          '131251116662512804',
          '131276706642470053',
          '131302304812841302',
        ],
      },
      short: {
        ia: [7005, 10979, 10980, 10981, 10982, 10983, 10984, 10985, 10986, 10987],
        sz: [
          '50310000000000000000',
          '51332916451844402',
          '92938607490932569',
          '92924090273008656',
          '92909576776849087',
          '92895067000947785',
          '92880560944155944',
          '92866058605337820',
          '92851559982983806',
          '92837065075489723',
        ],
      },
    });
  });

  it('should combine correctly when there is no long order book smaller than implied rate', () => {
    const tickSize = 0.00001;
    const marketOrderBook: OrderBooksV3Response = {
      long: {
        ia: [11000, 10900, 10800, 10700, 10600],
        sz: [
          '12000000000000000000',
          '3890000000000000000',
          '10000000000000000000',
          '98000000000000000000',
          '2000000000000000000',
        ],
      },
      short: {
        ia: [12000],
        sz: ['50310000000000000000'],
      },
    };

    const ammStateResponse: AMMStateResponse = {
      totalFloatAmount: '1659216901752019617400',
      normFixedAmount: '165564091360090085983',
      totalLp: '524057998646386757088',
      latestFTime: '1744588800',
      maturity: '1750291200',
      seedTime: '1743062400',
      minAbsRate: '10000000000000000',
      maxAbsRate: '300000000000000000',
      cutOffTimestamp: '1750291200',
    };

    const isPositiveAMM = true;
    const ammFeeRate = '10000000000000000';
    const result = combineMarketOrderBookAndAMM(tickSize, marketOrderBook, ammStateResponse, isPositiveAMM, ammFeeRate);

    expect(result).toEqual({
      long: {
        ia: [11000, 10900, 10800, 10700, 10600, 8978, 8977, 8976, 8975, 8974],
        sz: [
          '12000000000000000000',
          '3890000000000000000',
          '10000000000000000000',
          '98000000000000000000',
          '2000000000000000000',
          '41620211980384147',
          '92967653097761504',
          '92982181488953809',
          '92996713607316625',
          '93011249453996134',
        ],
      },
      short: {
        ia: [11001, 11002, 11003, 11004, 11005, 11006, 11007, 11008, 11009, 11010],
        sz: [
          '2092634525722650857',
          '92620086383647960',
          '92605650739010522',
          '92591218787086202',
          '92576790526284667',
          '92562365955849432',
          '92547945074190982',
          '92533527879809562',
          '92519114371582021',
          '92504704548380500',
        ],
      },
    });
  });
});
