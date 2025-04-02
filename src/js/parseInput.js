import { InputParser } from './interfaces.js';


// Layout types
export const LayoutType = {
  BASIC: 'BASIC_LAYOUT',
  COMPLEX: 'COMPLEX_LAYOUT',
  COMPLEX_SUB_1: 'COMPLEX_SUB_1',
  COMPLEX_SUB_2: 'COMPLEX_SUB_2',
  SIDE_NOTE: 'SIDE_NOTE_LAYOUT',
  STANDALONE: 'STANDALONE_LAYOUT'
};
// Character types
export const CharType = {
  HUI_FINGER: 'HUI_FINGER',
  HUI_NUMBER: 'HUI_NUMBER',
  FEN_NUMBER: 'FEN_NUMBER',
  XIAN_FINGER: 'XIAN_FINGER',
  XIAN_NUMBER: 'XIAN_NUMBER',
  COMPLEX_FINGER: 'COMPLEX_FINGER',
  SPECIAL_FINGER: 'SPECIAL_FINGER',
  MODIFIER: 'MODIFIER',
  MARK: 'MARK',
  MOVEMENT: 'MOVEMENT'
};

// Parser states
const ParserState = {
  INITIAL: 'INITIAL',
  LEXING: 'LEXING',
  PARSING: 'PARSING',
  PARSING_HUI_PHRASE: 'PARSING_HUI_PHRASE',
  PARSING_SIMPLE: 'PARSING_SIMPLE',
  PARSING_COMPLEX: 'PARSING_COMPLEX',
  PARSING_SIDE_NOTE: 'PARSING_SIDE_NOTE',
  ERROR: 'ERROR'
};

// Node types
const NodeType = {
  SIMPLE: '简单式',
  HUI_PHRASE: '徽位指法短语',
  XIAN_PHRASE: '弦序指法短语',
  COMPLEX: '复合式',
  COMPLEX_FINGER: '复式指法',
  SUB_COMPLEX_1: '复子式_1',
  SUB_COMPLEX_2: '复子式_2',
  SIDE_NOTE: '旁注式',
  MARK: '独体式'
};

export class MyInputParser extends InputParser {
  constructor() {
    super();
    this.state = ParserState.INITIAL;
    this.debug = false;
  }

  /**
   * @override
   * Parse input string and return layout-ready information
   * @param {string} input - Input string
   * @returns {Array<{LayoutType: string, char: string, type: string}>} - Layout info
   */
  parse(input) {
    try {
      // First get AST
      const ast = this._parseToAST(input);
      
      // Then transform AST to layout info
      return this._transformToLayout(ast);
    } catch (error) {
      console.error('Parse error:', error.message);
      return [];
    }
  }

  _parseToAST(input) {
    this._transition(ParserState.LEXING);
    const lexer = new Lexer(input);
    const tokens = lexer.tokenize();
    
    this._transition(ParserState.PARSING);
    const parser = new HybridParser(tokens, this.debug);
    const ast = parser.parse();
    
    this._validateAST(ast);
    return ast;
  }

  _transformToLayout(ast) {
    switch (ast.type) {
      case '简单式':
        return this._transformBasicLayout(ast);
      case '复合式':
        return this._transformComplexLayout(ast);
      case '旁注式':
        return this._transformSideNoteLayout(ast);
      case '独体式':
        return this._transformStandaloneLayout(ast);
      default:
        throw new Error(`Unknown layout type: ${ast.type}`);
    }
  }

  _transformBasicLayout(node) {
    const layoutInfo = [];
    
    const huiPhrase = node.children.find(child => child.type === '徽位指法短语');
    if (huiPhrase) {
      const huiFinger = huiPhrase.children.find(c => c.type === 'HUI_FINGER');
      const huiNumber = huiPhrase.children.find(c => c.type === 'HUI_NUMBER');
      const fenNumber = huiPhrase.children.find(c => c.type === 'FEN_NUMBER');

      if (huiFinger) {
        layoutInfo.push({
          LayoutType: LayoutType.BASIC,
          char: huiFinger.value,
          type: CharType.HUI_FINGER
        });
      }

      if (huiNumber) {
        layoutInfo.push({
          LayoutType: LayoutType.BASIC,
          char: huiNumber.value,
          type: CharType.HUI_NUMBER
        });
      }

      if (fenNumber) {
        layoutInfo.push({
          LayoutType: LayoutType.BASIC,
          char: fenNumber.value,
          type: CharType.FEN_NUMBER
        });
      }
    }

    const xianPhrase = node.children.find(child => child.type === '弦序指法短语');
    if (xianPhrase) {
      const xianFinger = xianPhrase.children.find(c => c.type === 'XIAN_FINGER');
      const xianNumber = xianPhrase.children.find(c => c.type === 'XIAN_NUMBER');

      if (xianFinger) {
        layoutInfo.push({
          LayoutType: LayoutType.BASIC,
          char: xianFinger.value,
          type: CharType.XIAN_FINGER
        });
      }

      if (xianNumber) {
        layoutInfo.push({
          LayoutType: LayoutType.BASIC,
          char: xianNumber.value,
          type: CharType.XIAN_NUMBER
        });
      }
    }

    return layoutInfo;
  }

  _transformComplexLayout(node) {
    const layoutInfo = [];
    
    // Process complex finger
    const complexFinger = node.children.find(child => child.type === '复式指法');
    if (complexFinger && complexFinger.children[0]) {
      layoutInfo.push({
        LayoutType: LayoutType.COMPLEX,
        char: complexFinger.children[0].value,
        type: CharType.COMPLEX_FINGER
      });
    }

    // Process first sub-phrase
    const subPhrase1 = node.children.find(child => child.type === '复子式_1');
    if (subPhrase1) {
      subPhrase1.children.forEach(token => {
        layoutInfo.push({
          LayoutType: LayoutType.COMPLEX_SUB_1,
          char: token.value,
          type: token.type
        });
      });
    }

    // Process second sub-phrase
    const subPhrase2 = node.children.find(child => child.type === '复子式_2');
    if (subPhrase2) {
      subPhrase2.children.forEach(token => {
        layoutInfo.push({
          LayoutType: LayoutType.COMPLEX_SUB_2,
          char: token.value,
          type: token.type
        });
      });
    }

    return layoutInfo;
  }

  _transformSideNoteLayout(node) {
    const layoutInfo = [];

    // Process modifier
    const modifier = node.children.find(child => child.type === '修饰词');
    if (modifier && modifier.children[0]) {
      layoutInfo.push({
        LayoutType: LayoutType.SIDE_NOTE,
        char: modifier.children[0].value,
        type: CharType.MODIFIER
      });
    }

    // Process movement phrase
    const movement = node.children.find(child => child.type === '走位指法短语');
    if (movement) {
      movement.children.forEach(token => {
        layoutInfo.push({
          LayoutType: LayoutType.SIDE_NOTE,
          char: token.value,
          type: token.type
        });
      });
    }

    return layoutInfo;
  }

  _transformStandaloneLayout(node) {
    const mark = node.children.find(child => child.type === '记号');
    if (mark && mark.children[0]) {
      return [{
        LayoutType: LayoutType.STANDALONE,
        char: mark.children[0].value,
        type: CharType.MARK
      }];
    }
    return [];
  }

  _transition(newState) {
    if (this.debug) {
      console.log(`State transition: ${this.state} -> ${newState}`);
    }
    this.state = newState;
  }

  _validateAST(ast) {
    if (!ast || !ast.type) {
      throw new Error('Invalid AST structure');
    }
  }
}

// 词法分析器（保持不变）
class Lexer {
  constructor(input) {
    this.input = input || '';
    this.position = 0;
    this.tokenPatterns = [
      // 徽位相关
      { type: CharType.HUI_FINGER, regex: /^(散音|大指|食指|中指|名指|跪指)/ },
      { type: CharType.HUI_NUMBER, regex: /^(十三徽|十二徽|十一徽|十徽|九徽|八徽|七徽|六徽|五徽|四徽|三徽|二徽|一徽|徽外)/ },
      { type: CharType.FEN_NUMBER, regex: /^(半|九分|八分|七分|六分|五分|四分|三分|二分|一分)/ },
      
      // 特殊指法
      { type: CharType.SPECIAL_FINGER, regex: /^(注|绰)/ },
      
      // 弦序相关
      { type: CharType.XIAN_FINGER, regex: /^(如一声|抹挑|勾剔|打摘|托擘|半轮|长琐|如一|滚拂|全扶|剌伏|打圆|搯起|抓起|带起|虚掩|推出|不动|擘|托|抹|挑|勾|剔|打|摘|历|蠲|轮|琐|伏|滚|拂|至|拨|剌|掩)/ },
      { type: CharType.XIAN_NUMBER, regex: /^(七弦|六弦|五弦|四弦|三弦|二弦|一弦)/ },
      
      // 复合式
      { type: CharType.COMPLEX_FINGER, regex: /^(掐撮|双弹|拨剌|齐撮|撮)/ },
      
      // 旁注式
      { type: CharType.MODIFIER, regex: /^(引|淌|急|缓|紧|慢)/ },
      { type: CharType.MOVEMENT, regex: /^(进复|退复|往来|上|下|进|退|复|撞|逗|唤|吟|猱)/ },
      
      // 独体式
      { type: CharType.MARK, regex: /^(从再作|从头再作|少息|大息|入拍|入慢|句号|再作|曲终|操终|泛起|泛止|间)/ }
    ];
  }

  tokenize() {
    const tokens = [];
    let token;
    while ((token = this._nextToken()) !== null) {
      tokens.push(token);
    }
    return tokens;
  }

  _nextToken() {
    if (this.position >= this.input.length) return null;
    
    // 跳过空白字符
    while (/\s/.test(this.input[this.position])) {
      this.position++;
    }

    for (const { type, regex } of this.tokenPatterns) {
      const match = this.input.slice(this.position).match(regex);
      if (match) {
        const value = match[0];
        this.position += value.length;
        return { type, value };
      }
    }

    if (this.position < this.input.length) {
      throw new Error(`无法识别的字符: ${this.input[this.position]}`);
    }

    return null;
  }
}

// 混合解析器（递归下降+状态机）
class HybridParser {
  constructor(tokens, debug = false) {
    this.tokens = tokens;
    this.position = 0;
    this.debug = debug;
    this.state = ParserState.INITIAL;
  }

  parse() {
    this._transition(ParserState.PARSING);
    const ast = this._parse谱字();
    this._validateFinalState();
    return ast;
  }

  // ===== 核心解析方法 =====
  _parse谱字() {
    if (!this._hasMoreTokens()) {
      throw new Error('输入为空');
    }

    const token = this._peekToken();
    switch (token.type) {
      case 'COMPLEX_FINGER':
        return this._parse复合式();
      case 'MODIFIER':
      case 'MOVEMENT':
        return this._parse旁注式();
      case 'MARK':
        return this._parse独体式();
      default:
        return this._parse简单式();
    }
  }

  _parse简单式() {
    this._transition(ParserState.PARSING_SIMPLE);
    const node = this._createNode('简单式');
    
    // 1. 解析徽位指法短语
    node.children.push(this._parse徽位指法短语());
    
    // 2. 可选特殊指法
    if (this._matchToken('SPECIAL_FINGER')) {
      node.children.push(this._createNode('特殊指法', [this._consumeToken()]));
    }
    
    // 3. 解析弦序指法短语
    node.children.push(this._parse弦序指法短语());
    
    return node;
  }

  _parse徽位指法短语() {
    const node = this._createNode('徽位指法短语');
    const token = this._peekToken();
    
    if (token.type === 'HUI_FINGER' && token.value === '散音') {
      node.children.push(this._consumeToken());
      return node;
    }
    
    // 非散音情况
    node.children.push(this._consumeToken('HUI_FINGER'));
    
    // 解析徽分位置
    const positionToken = this._consumeToken('HUI_NUMBER');
    node.children.push(positionToken);
    
    if (this._matchToken('FEN_NUMBER')) {
      node.children.push(this._consumeToken());
    }
    
    return node;
  }

  _parse弦序指法短语() {
    const node = this._createNode('弦序指法短语');
    node.children.push(this._consumeToken('XIAN_FINGER'));
    node.children.push(this._consumeToken('XIAN_NUMBER'));
    return node;
  }

  _parse复合式() {
    this._transition(ParserState.PARSING_COMPLEX);
    const node = this._createNode('复合式');
    
    // 1. 复式指法
    node.children.push(
      this._createNode('复式指法', [this._consumeToken('COMPLEX_FINGER')])
    );
    
    // 2. 两个复子式
    // 2. 两个复子式，动态添加标识
    node.children.push(this._parse复子式('_1'));
    node.children.push(this._parse复子式('_2'));
    
    return node;
  }

  _parse复子式(suffix = '') {
    const node = this._createNode(`复子式${suffix}`);
    
    // 1. 徽位指法短语
    node.children.push(...this._parse徽位指法短语().children);
    
    // 2. 可选特殊指法
    if (this._matchToken('SPECIAL_FINGER')) {
      node.children.push(this._consumeToken());
    }
    
    // 3. 可选弦序指法
    if (this._matchToken('XIAN_FINGER')) {
      node.children.push(this._consumeToken());
    }
    
    // 4. 必选弦序
    node.children.push(this._consumeToken('XIAN_NUMBER'));
    
    return node;
  }

  _parse旁注式() {
    this._transition(ParserState.PARSING_SIDE_NOTE);
    const node = this._createNode('旁注式');
    
    // 情况1: 只有修饰词
    if (this._matchToken('MODIFIER')) {
      node.children.push(
        this._createNode('修饰词', [this._consumeToken()])
      );
      
      // 尝试解析走位指法短语
      if (this._matchToken('MOVEMENT')) {
        node.children.push(this._parse走位指法短语());
      }
    } 
    // 情况2: 只有走位指法短语
    else if (this._matchToken('MOVEMENT')) {
      node.children.push(this._parse走位指法短语());
    } else {
      throw new Error('无效的旁注式');
    }
    
    return node;
  }

  _parse走位指法短语() {
    const node = this._createNode('走位指法短语');
    node.children.push(this._consumeToken('MOVEMENT'));
    
    // 可选徽分位置
    if (this._matchToken('HUI_NUMBER')) {
      const positionToken = this._consumeToken();
      node.children.push(positionToken);
      
      if (this._matchToken('FEN_NUMBER')) {
        node.children.push(this._consumeToken());
      }
    }
    
    return node;
  }

  _parse独体式() {
    return this._createNode('独体式', [
      this._createNode('记号', [this._consumeToken('MARK')])
    ]);
  }

  // ===== 工具方法 =====
  _createNode(type, children = []) {
    if (!Object.values(NodeType).includes(type)) {
      throw new Error(`无效的节点类型: ${type}`);
    }
    return { type, children };
  }

  _transition(newState) {
    if (this.debug) {
      console.log(`Parser状态: ${this.state} -> ${newState}`);
    }
    this.state = newState;
  }

  _hasMoreTokens() {
    return this.position < this.tokens.length;
  }

  _peekToken() {
    if (!this._hasMoreTokens()) {
      throw new Error('意外的输入结束');
    }
    return this.tokens[this.position];
  }

  _matchToken(expectedType, expectedValue) {
    if (!this._hasMoreTokens()) return false;
    const token = this.tokens[this.position];
    return token.type === expectedType && 
      (!expectedValue || token.value === expectedValue);
  }

  _consumeToken(expectedType, expectedValue) {
    if (!this._hasMoreTokens()) {
      throw new Error(`期望 ${expectedType} 但输入已结束`);
    }
    
    const token = this.tokens[this.position++];
    if (expectedType && token.type !== expectedType) {
      throw new Error(`期望 ${expectedType} 但找到 ${token.type}`);
    }
    
    if (expectedValue && token.value !== expectedValue) {
      throw new Error(`期望 ${expectedType}:${expectedValue} 但找到 ${token.value}`);
    }
    
    return token;
  }

  _validateFinalState() {
    if (this.state === ParserState.PARSING_COMPLEX && 
        this._hasMoreTokens()) {
      throw new Error('不完整的复合式');
    }
  }
}
