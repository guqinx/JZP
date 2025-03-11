import { parseInput } from './path/to/your/module';

describe('parseInput', () => {
  it('should correctly parse input string and return the expected types', () => {
    const input = "大 如一声 十一徽 一分 一弦 进复 注 掐撮三声 掐撮 引 从再作";
    const expectedOutput = [
      { char: '大', type: 'HUI_FINGER' },
      { char: '如一声', type: 'XIAN_FINGER' },
      { char: '十一徽', type: 'HUI_NUMBER' },
      { char: '一分', type: 'FEN_NUMBER' },
      { char: '一弦', type: 'XIAN_NUMBER' },
      { char: '进复', type: 'MOVE_FINGER' },
      { char: '注', type: 'SPECIAL_FINGER' },
      { char: '掐撮三声', type: 'BOTH_FINGER' },
      { char: '掐撮', type: 'COMPLEX_FINGER' },
      { char: '引', type: 'MODIFIER' },
      { char: '从再作', type: 'MARKER' }
    ];

    const result = parseInput(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should return an empty array for an empty input', () => {
    const input = "";
    const expectedOutput = [];

    const result = parseInput(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle unknown characters', () => {
    const input = "未知字符";
    const expectedOutput = [
      { char: '未', type: 'UNKNOWN' },
      { char: '知', type: 'UNKNOWN' },
      { char: '字', type: 'UNKNOWN' },
      { char: '符', type: 'UNKNOWN' }
    ];

    const result = parseInput(input);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle mixed known and unknown characters', () => {
    const input = "大 未知字符 如一声";
    const expectedOutput = [
      { char: '大', type: 'HUI_FINGER' },
      { char: '未', type: 'UNKNOWN' },
      { char: '知', type: 'UNKNOWN' },
      { char: '字', type: 'UNKNOWN' },
      { char: '符', type: 'UNKNOWN' },
      { char: '如一声', type: 'XIAN_FINGER' }
    ];

    const result = parseInput(input);
    expect(result).toEqual(expectedOutput);
  });
});