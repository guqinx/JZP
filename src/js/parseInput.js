// src/js/parseInput.js
import { InputParser } from './interfaces.js';

/**
 * 输入解析器的具体实现
 */
export class MyInputParser extends InputParser {
  parse(input) {
    const LEFT_HAND_FINGER = /大指|食指|中指|名指|跪指|散/;
    const RIGHT_HAND_FINGER = /如一声|抹挑|勾剔|打摘|托擘|半轮|长琐|如一|滚拂|全扶|剌伏|打圆|搯起|抓起|带起|虚掩|推出|不动|擘|托|抹|挑|勾|剔|打|摘|历|蠲|轮|琐|伏|滚|拂|至|拨|剌|掩/;
    const HUI_NUMBER = /十一徽|十二徽|十三徽|一徽|二徽|三徽|四徽|五徽|六徽|七徽|八徽|九徽|十徽|徽外/;
    const FEN_NUMBER = /一分|二分|三分|四分|五分|六分|七分|八分|九分/;
    const XIAN_NUMBER = /一弦|二弦|三弦|四弦|五弦|六弦|七弦/;
    const MOVE_FINGER = /进复|退复|往来|上|下|进|退|复|撞|逗|唤|吟|猱/;
    const SPECIAL_FINGER = /注|绰/;
    const BOTH_FINGER = /掐撮三声|分开|同声|应合|放合/;
    const COMPLEX_FINGER = /掐撮|双弹|拨剌|齐撮|撮/;
    const MODIFIER = /引|淌|急|缓|紧|慢/;
    const MARKER = /从再作|从头再作|少息|大息|入拍|入慢|句号|再作|曲终|操终|泛起|泛止|间/;

    const regex = new RegExp(
      `${LEFT_HAND_FINGER.source}|${RIGHT_HAND_FINGER.source}|${HUI_NUMBER.source}|${FEN_NUMBER.source}|${XIAN_NUMBER.source}|${MOVE_FINGER.source}|${SPECIAL_FINGER.source}|${BOTH_FINGER.source}|${COMPLEX_FINGER.source}|${MODIFIER.source}|${MARKER.source}|[^\\s]`,
      'gu'
    );

    const matches = input.match(regex) || [];

    return matches.map(char => {
      return {
        char,
        type: LEFT_HAND_FINGER.test(char) ? 'LEFT_HAND_FINGER' :
              RIGHT_HAND_FINGER.test(char) ? 'RIGHT_HAND_FINGER' :
              HUI_NUMBER.test(char) ? 'HUI_NUMBER' :
              FEN_NUMBER.test(char) ? 'FEN_NUMBER' :
              XIAN_NUMBER.test(char) ? 'XIAN_NUMBER' :
              MOVE_FINGER.test(char) ? 'MOVE_FINGER' :
              SPECIAL_FINGER.test(char) ? 'SPECIAL_FINGER' :
              BOTH_FINGER.test(char) ? 'BOTH_FINGER' :
              COMPLEX_FINGER.test(char) ? 'COMPLEX_FINGER' :
              MODIFIER.test(char) ? 'MODIFIER' :
              MARKER.test(char) ? 'MARKER' :
              'UNKNOWN'
      };
    });
  }
}

// function parseInput(input) {
//   const LEFT_HAND_FINGER = /大指|食指|中指|名指|跪指|散/;
//   const RIGHT_HAND_FINGER = /如一声|抹挑|勾剔|打摘|托擘|半轮|长琐|如一|滚拂|全扶|剌伏|打圆|搯起|抓起|带起|虚掩|推出|不动|擘|托|抹|挑|勾|剔|打|摘|历|蠲|轮|琐|伏|滚|拂|至|拨|剌|掩/;
//   const HUI_NUMBER = /十一徽|十二徽|十三徽|一徽|二徽|三徽|四徽|五徽|六徽|七徽|八徽|九徽|十徽|徽外/;
//   const FEN_NUMBER = /一分|二分|三分|四分|五分|六分|七分|八分|九分/;
//   const XIAN_NUMBER = /一弦|二弦|三弦|四弦|五弦|六弦|七弦/;

//   const MOVE_FINGER = /进复|退复|往来|上|下|进|退|复|撞|逗|唤|吟|猱/;
//   const SPECIAL_FINGER = /注|绰/;
//   const BOTH_FINGER = /掐撮三声|分开|同声|应合|放合/;
//   const COMPLEX_FINGER = /掐撮|双弹|拨剌|齐撮|撮/;
//   const MODIFIER = /引|淌|急|缓|紧|慢/;
//   const MARKER = /从再作|从头再作|少息|大息|入拍|入慢|句号|再作|曲终|操终|泛起|泛止|间/;

//   // 匹配所有可能的字符
// const regex = new RegExp(
//   `${LEFT_HAND_FINGER.source}|${RIGHT_HAND_FINGER.source}|${HUI_NUMBER.source}|${FEN_NUMBER.source}|${XIAN_NUMBER.source}|${MOVE_FINGER.source}|${SPECIAL_FINGER.source}|${BOTH_FINGER.source}|${COMPLEX_FINGER.source}|${MODIFIER.source}|${MARKER.source}|[^\\s]`,
//   'gu'
// );

//   // 提取所有匹配的字符
//   const matches = input.match(regex) || [];

//   // 返回解析后的字符数组
//   const result = matches.map(char => {
//     return {
//       char,
//       type: LEFT_HAND_FINGER.test(char) ? 'LEFT_HAND_FINGER' :
//             RIGHT_HAND_FINGER.test(char) ? 'RIGHT_HAND_FINGER' :
//             HUI_NUMBER.test(char) ? 'HUI_NUMBER' :
//             FEN_NUMBER.test(char) ? 'FEN_NUMBER' :
//             XIAN_NUMBER.test(char) ? 'XIAN_NUMBER' :
//             MOVE_FINGER.test(char) ? 'MOVE_FINGER' :
//             SPECIAL_FINGER.test(char) ? 'SPECIAL_FINGER' :
//             BOTH_FINGER.test(char) ? 'BOTH_FINGER' :
//             COMPLEX_FINGER.test(char) ? 'COMPLEX_FINGER' :
//             MODIFIER.test(char) ? 'MODIFIER' :
//             MARKER.test(char) ? 'MARKER' :
//             'UNKNOWN'
//     };
//   });
//   return result;
// }

// export { parseInput };



// 输出已经测试，结果如下
// { char: '大', type: 'LEFT_HAND_FINGER' },
// { char: '五徽', type: 'HUI_NUMBER' },
// { char: '勾', type: 'RIGHT_HAND_FINGER' },
// { char: '挑', type: 'RIGHT_HAND_FINGER' },
// { char: '七弦', type: 'XIAN_NUMBER' }


