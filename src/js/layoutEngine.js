// src/js/layoutEngine.js
import { LayoutCalculator } from './interfaces.js';
import { charMap } from './charMap.js';
import { LayoutType } from './parseInput.js';  // Add this import
import { CharType } from './parseInput.js';  // Add this import

// 创建减字符号类
class JianziSymbol {
  constructor(char, type, layoutType = LayoutType.BASIC) {
    if (!char || !type || !layoutType) {
      throw new Error('必须提供char和type参数和layoutType参数');
    }

    this.char = char;
    this.type = type;
    this.layoutType = layoutType;
    this.x = 0;
    this.y = 0;
    this.width = CW;
    this.height = CH;
    this.svgFile = charMap[char]?.svgFile || null;
  }

  // 新增方法：设置 SVG 文件
  setSvgFile(filename) {
    this.svgFile = filename;
  }

  // 根据类型设置布局信息
  setLayout(layout) {
    this.x = layout.x || this.x;
    this.y = layout.y || this.y;
    this.height = layout.height || this.height;
    this.width = layout.width || this.width;
  }

  // 获取布局信息
  getLayout() {
    return {
      char: this.char,
      type: this.type,
      layoutType: this.layoutType,
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
      svgFile: this.svgFile
    };
  }
}

const CW = 500;   // container的宽度
const CH = 500;  // container的高度


// 布局引擎的具体实现
export class MyLayoutCalculator extends LayoutCalculator {
  processInput(parsedInput) {
    console.debug('==>【解析后的输入】:', parsedInput);

    if (!parsedInput || parsedInput.length === 0) {
      console.warn("输入为空，跳过布局计算");
      return [];
    }

    const symbolObjects = parsedInput.map(item => 
      new JianziSymbol(item.char, item.type, item.LayoutType)
    );

    const layoutInfo = this.determineLayoutMode(symbolObjects);
    this.setDefaultLayout(symbolObjects, layoutInfo);
    return layoutInfo;
  }

  determineLayoutMode(symbols) {
    if (!symbols || symbols.length === 0) {
      return this.basicLayout(symbols || []);
    }

    const firstSymbol = symbols[0];
    
    // Use layoutType instead of type for layout determination
    switch (firstSymbol.layoutType) {
      case LayoutType.BASIC:
        return this.basicLayout(symbols);
      case LayoutType.COMPLEX:
      case LayoutType.COMPLEX_SUB_1:
      case LayoutType.COMPLEX_SUB_2:
        return this.complexLayout(symbols);
      case LayoutType.SIDE_NOTE:
        return this.sideNoteLayout(symbols);
      case LayoutType.STANDALONE:
        return this.specialFingerPhrase(symbols[0]);
      default:
        console.warn(`未知的布局类型: ${firstSymbol.layoutType}，使用默认基本布局`);
        return this.basicLayout(symbols);
    }
  }
  // 设置默认布局
  setDefaultLayout(symbols, layoutInfo) {
    symbols.forEach(symbol => {
      if (!layoutInfo.some(layout => layout.char === symbol.char)) {
        symbol.setLayout({ x: 0, y: 0, width: CW, height: CH });
        layoutInfo.push(symbol.getLayout());
      }
    });
  }


  // 基本式布局
  basicLayout(symbols) {
    // console.debug('[布局开始] 接收符号:', symbols);

    const layoutInfo = [];

    // 左手指法布局
    const huiFinger = symbols.find(item => item.type === CharType.HUI_FINGER);
    const huiNumber = symbols.find(item => item.type === CharType.HUI_NUMBER);
    const fenNumber = symbols.find(item => item.type === CharType.FEN_NUMBER);
    if (huiFinger && huiNumber) {
      layoutInfo.push(...this.huiFingerPhrase(huiFinger, huiNumber, fenNumber));
    }

    // 右手指法布局
    const xianFinger = symbols.find(item => item.type === CharType.XIAN_FINGER);
    const xianNumber = symbols.find(item => item.type === CharType.XIAN_NUMBER);
    if (xianFinger && xianNumber) {
      layoutInfo.push(...this.xianFingerPhrase(xianFinger, xianNumber));
    }

    // 特殊字符布局
    const specialFinger = symbols.find(item => item.type === CharType.SPECIAL_FINGER);
    if (specialFinger) {
      layoutInfo.push(...this.specialFingerPhrase(specialFinger));
    }

    console.debug('[布局结束] 生成布局:', layoutInfo);
    return layoutInfo;
  }
  // 复合式布局
  complexLayout(symbols) {
    const layoutInfo = [];
  
    // 撮符号布局 - 使用 layoutType 和 type 双重确认
    const cuoFinger = symbols.find(item => 
      item.layoutType === LayoutType.COMPLEX && 
      item.type === 'COMPLEX_FINGER'
    );
    if (cuoFinger) {
      layoutInfo.push(...this.cuoPhrase(cuoFinger));
    }
  
    // 撮左手指法布局 - 通过 layoutType 区分左右手
    const cuoLeftSymbols = symbols.filter(item => item.layoutType === LayoutType.COMPLEX_SUB_1);
    if (cuoLeftSymbols.length > 0) {
      const cuoLeftFinger = cuoLeftSymbols.find(item => item.type === CharType.HUI_FINGER);
      const cuoLeftHuiNumber = cuoLeftSymbols.find(item => item.type === CharType.HUI_NUMBER);
      const cuoLeftFenNumber = cuoLeftSymbols.find(item => item.type === CharType.FEN_NUMBER);
      const cuoLeftXianNumber = cuoLeftSymbols.find(item => item.type === CharType.XIAN_NUMBER);
  
      if (cuoLeftFinger && cuoLeftHuiNumber) {
        layoutInfo.push(...this.cuoLeftPhrase(
          cuoLeftFinger,
          cuoLeftHuiNumber,
          cuoLeftFenNumber || null,
          cuoLeftXianNumber
        ));
      }
    }
  
    // 撮右手指法布局 - 通过 layoutType 区分左右手
    const cuoRightSymbols = symbols.filter(item => item.layoutType === LayoutType.COMPLEX_SUB_2);
    if (cuoRightSymbols.length > 0) {
      const cuoRightFinger = cuoRightSymbols.find(item => item.type === CharType.HUI_FINGER);
      const cuoRightHuiNumber = cuoRightSymbols.find(item => item.type === CharType.HUI_NUMBER);
      const cuoRightFenNumber = cuoRightSymbols.find(item => item.type === CharType.FEN_NUMBER);
      const cuoRightXianNumber = cuoRightSymbols.find(item => item.type === CharType.XIAN_NUMBER);
  
      if (cuoRightFinger && cuoRightXianNumber) {
        layoutInfo.push(...this.cuoRightPhrase(
          cuoRightFinger,
          cuoRightHuiNumber,
          cuoRightFenNumber || null,
          cuoRightXianNumber
        ));
      }
    }
  
    return layoutInfo;
  }
  // 旁注式布局
  sideNoteLayout(symbols) {
    const layoutInfo = [];

    // 旁注式布局由多个部分组成
    const moveFinger = symbols.find(item => item.type === 'MOVE_FINGER');
    const modifier = symbols.find(item => item.type === 'MODIFIER');
    if (moveFinger && modifier) {
      layoutInfo.push(...this.sideNotePhrase(moveFinger, modifier));
    }

    return layoutInfo;
  }

  // ==> 基本式布局的具体方法
  
  // HUI_FINGER 和 HUI_NUMBER 和 FEN_NUMBER 的组合布局
  huiFingerPhrase(huiFinger, huiNumber, fenNumber) {

    // 根据是否有分数选择适当的徽位符号
    if (fenNumber) {
      // 使用带分的徽位符号
      const huiWithFenChar = `${huiNumber.char}带分`;
      huiNumber.svgFile = charMap[huiWithFenChar]?.svgFile || huiNumber.svgFile;
      huiFinger.setLayout({ x: 0, y: 0,  width: CW, height: CH });
      huiNumber.setLayout({ x: 0, y: 0, width: CW, height: CH });
      fenNumber.setLayout({ x: 0, y: 0, width: CW, height: CH  });
    } else {
      huiFinger.setLayout({ x: 0, y: 0, width: CW, height: CH });
      huiNumber.setLayout({ x: 0, y: 0, width: CW, height: CH  });
    }
    return [huiFinger, huiNumber, fenNumber].filter(Boolean);
  }
  // XIAN_FINGER 和 XIAN_NUMBER 的组合布局
  xianFingerPhrase(xianFinger, xianNumber) {
    const offsetMap = {
      擘: { x: 0, y: 0.18 },
      托: { x: 0, y: 0.09 },
      抹: { x: 0, y: 0.25 },
      挑: { x: 0, y: 0.09 },
      勾: { x: 0, y: 0.15 },
      剔: { x: 0, y: 0.21 },
      打: { x: 0, y: 0.12 },
      摘: { x: 0, y: 0.18 }
    };
    const offset = offsetMap[xianFinger.char] || { x: 0, y: 0 };
    xianFinger.setLayout({ x: 0, y: 0, width: CW, height: CH });
    xianNumber.setLayout({ x: CH * offset.x, y: CH * offset.y, width: CW, height: CH });

    return [xianFinger, xianNumber];
  }
  // SPECIAL_FINGER 的布局
  specialFingerPhrase(specialFinger) {
    specialFinger.setLayout({ x: 0, y: 0, width: CW, height: CH });
    return [specialFinger];
  }

  // ==> 复合式布局的具体方法
  // 撮符号
  cuoPhrase(cuoFinger) {
    cuoFinger.setLayout({ x: 0, y: 0, width: CW, height: CH });
    return [cuoFinger];
  }
  // 撮左边
  cuoLeftPhrase(cuoLeftFinger, cuoLeftHuiNumber, cuoLeftFenNumber, cuoLeftXianNumber) {
    if (cuoLeftFenNumber) {
      cuoLeftFinger.setLayout({ x: -0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoLeftXianNumber.setLayout({ x: -0.048 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoLeftHuiNumber.setLayout({ x: 0, y: 0, width: CW, height: CH });
      cuoLeftFenNumber.setLayout({x: 0, y: 0, width: CW, height: CH });
    } else {
      cuoLeftFinger.setLayout({ x: -0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoLeftXianNumber.setLayout({ x: -0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoLeftHuiNumber.setLayout({ x: -0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
    }
    return [cuoLeftFinger, cuoLeftHuiNumber, cuoLeftFenNumber, cuoLeftXianNumber].filter(Boolean);
  }
  // 撮右边
  cuoRightPhrase(cuoRightFinger, cuoRightHuiNumber, cuoRightFenNumber, cuoRightXianNumber) {
    if (cuoRightFenNumber) {
      cuoRightFinger.setLayout({ x: -0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoRightXianNumber.setLayout({ x: -0.048 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoRightHuiNumber.setLayout({ x: 0, y: 0, width: CW, height: CH });
      cuoRightFenNumber.setLayout({x: 0, y: 0, width: CW, height: CH });
    } else {
      cuoRightFinger.setLayout({ x: 0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoRightXianNumber.setLayout({ x: 0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
      cuoRightHuiNumber.setLayout({ x: 0.24 * CW, y: 0.26 * CW, width: CW, height: CH });
    }
    return [cuoRightFinger, cuoRightHuiNumber, cuoRightFenNumber, cuoRightXianNumber].filter(Boolean);  }

  // ==> 旁注式布局的具体方法
  sideNotePhrase(moveFinger, modifier) {
    // 实现旁注式布局逻辑
    return [moveFinger, modifier];
  }
}