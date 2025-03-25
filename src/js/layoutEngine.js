// src/js/layoutEngine.js
import { LayoutCalculator } from './interfaces.js';

// 创建减字符号类
class JianziSymbol {
  constructor(char, type) {
    // 基础校验
    if (!char || !type) {
      throw new Error('必须提供char和type参数');
    }

    this.char = char;
    this.type = type;
    this.x = 0; // x偏移
    this.y = 0; // y偏移
    this.width = containerWidth; // svg高度
    this.height = containerHeight; // svg宽度
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
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
    };
  }
}

const containerWidth = 500;
const containerHeight = 500;

const LH_SIZE = 0.2; // 左手符号的大小，与容器大小的比例
const HF_SCALE = 0.75; // HF同时出现时，需要缩小的比例
const X_POSITION = 0.5; // 原来HF在容器内，X方向的距离，与容器宽度的比值
const Y_POSITION = 0.2; // 原来HF在容器内，Y方向的距离，与容器宽度的比值
const RH_SIZE = 0.6; // 右手符号的大小，与容器大小的比例

// 布局引擎的具体实现
export class MyLayoutCalculator extends LayoutCalculator {
  processInput(parsedInput) {
    console.debug('==>【解析后的输入】:', parsedInput);

  // **避免空输入报错**
  if (!parsedInput || parsedInput.length === 0) {
    console.warn("输入为空，跳过布局计算");
    return []; // 返回空布局
  }

    const symbolObjects = parsedInput.map(item => new JianziSymbol(item.char, item.type));
      console.debug('[创建的符号对象]:', symbolObjects);

    // 调用布局方法
    const layoutInfo = this.determineLayoutMode(symbolObjects);
      console.debug('[计算出的布局信息]:', layoutInfo);

    // 处理未参与布局的符号（设置默认布局）
    this.setDefaultLayout(symbolObjects, layoutInfo);
      console.debug('[默认布局信息]:', layoutInfo);

    return layoutInfo;
  }
  // 依据首字输入判断布局类型
  determineLayoutMode(symbols) {
    // 防御性检查
    if (!symbols || symbols.length === 0) {
      console.warn('空符号数组，使用默认基本布局');
      return this.basicLayout(symbols || []);
    }

    const firstSymbol = symbols[0]; 

    // 使用switch处理布局判断和选择
    switch (firstSymbol.type) {
      case 'LEFT_HAND_FINGER':
        return this.basicLayout(symbols);
      case 'COMPLEX_FINGER':
        return this.complexLayout(symbols);
      case 'MOVE_FINGER':
        return this.sideNoteLayout(symbols);
      default:
        console.warn(`减字谱语法错误: 首字类型不该是 ${firstSymbol.type}，使用默认基本布局`);
        return this.basicLayout(symbols);
    }
  }
  // 设置默认布局
  setDefaultLayout(symbols, layoutInfo) {
    symbols.forEach(symbol => {
      if (!layoutInfo.some(layout => layout.char === symbol.char)) {
        symbol.setLayout({ x: 0, y: 0, width: containerWidth, height: containerHeight });
        layoutInfo.push(symbol.getLayout());
      }
    });
  }
  // 基本式布局
  basicLayout(symbols) {
    console.debug('[布局开始] 接收符号:', symbols);

    const layoutInfo = [];

    // 左手指法布局
    const lefthandFinger = symbols.find(item => item.type === 'LEFT_HAND_FINGER');
    const huiNumber = symbols.find(item => item.type === 'HUI_NUMBER');
    const fenNumber = symbols.find(item => item.type === 'FEN_NUMBER');
    if (lefthandFinger && huiNumber) {
      layoutInfo.push(...this.lefthandFingerPhrase(lefthandFinger, huiNumber, fenNumber));
    }

    // 右手指法布局
    const righthandFinger = symbols.find(item => item.type === 'RIGHT_HAND_FINGER');
    const xianNumber = symbols.find(item => item.type === 'XIAN_NUMBER');
    if (righthandFinger && xianNumber) {
      layoutInfo.push(...this.righthandFingerPhrase(righthandFinger, xianNumber));
    }

    // 特殊字符布局
    const specialFinger = symbols.find(item => item.type === 'SPECIAL_FINGER');
    if (specialFinger) {
      layoutInfo.push(...this.specialFingerPhrase(specialFinger));
    }

    console.debug('[布局结束] 生成布局:', layoutInfo);
    return layoutInfo;
  }
  // 复合式布局
  complexLayout(symbols) {
    const layoutInfo = [];

    // 撮符号布局
    const cuoFinger = symbols.find(item => item.type === 'COMPLEX_FINGER');
    if (cuoFinger) {
      layoutInfo.push(...this.cuoPhrase(cuoFinger));
    }
  
    // 撮左手指法布局
    const cuoLeftFinger = symbols.find(item => item.type === 'LEFT_HAND_FINGER');
    const cuoLeftHuiNumber = symbols.find(item => item.type === 'HUI_NUMBER');
    const cuoLeftFenNumber = symbols.find(item => item.type === 'FEN_NUMBER');
    const cuoLeftXianNumber = symbols.find(item => item.type === 'XIAN_NUMBER');

    if (cuoLeftFinger && cuoLeftHuiNumber) {
      layoutInfo.push(...this.cuoLeftPhrase(
        cuoLeftFinger, 
        cuoLeftHuiNumber,
        cuoLeftFenNumber || null, // 允许可选参数
        cuoLeftXianNumber
      ));
    }
    
    // 撮右手指法布局
    const cuoRightFinger = symbols.find(item => item.type === 'LEFT_HAND_FINGER'); //只有散音符号，属于左手指法。
    const cuoRightXianNumber = symbols.find(item => item.type === 'XIAN_NUMBER');
    if (cuoRightFinger && cuoRightXianNumber) {
      layoutInfo.push(...this.cuoRightPhrase(
        cuoRightFinger, 
        cuoRightXianNumber
      ));
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
  
  // LEFT_HAND_FINGER 和 HUI_NUMBER 和 FEN_NUMBER 的组合布局
  lefthandFingerPhrase(lefthandFinger, huiNumber, fenNumber) {
    if (fenNumber) {
      lefthandFinger.setLayout({ x: 0, y: 0 });
      huiNumber.setLayout({
        x: X_POSITION * containerWidth * (1 - HF_SCALE),
        y: Y_POSITION * containerHeight * (1 - HF_SCALE) - containerHeight * LH_SIZE * HF_SCALE * 0.75,
        height: containerHeight * HF_SCALE,
        width: containerWidth * HF_SCALE,
      });
      fenNumber.setLayout({
        x: X_POSITION * containerWidth * (1 - HF_SCALE),
        y: Y_POSITION * containerHeight * (1 - HF_SCALE),
        height: containerHeight * HF_SCALE,
        width: containerWidth * HF_SCALE,
      });
    } else {
      lefthandFinger.setLayout({ x: 0, y: 0 });
      huiNumber.setLayout({ x: 0, y: 0 });
    }
    return [lefthandFinger, huiNumber, fenNumber].filter(Boolean);
  }
  // RIGHT_HAND_FINGER 和 XIAN_NUMBER 的组合布局
  righthandFingerPhrase(righthandFinger, xianNumber) {
    const yOffsetMap = {
      擘: 0.3,
      托: 0.15,
      抹: 0.4,
      挑: 0.15,
      勾: 0.25,
      剔: 0.35,
      打: 0.2,
      摘: 0.3,
    };
    righthandFinger.setLayout({ x: 0, y: 0 });
    xianNumber.setLayout({ x: 0, y: containerHeight * RH_SIZE * yOffsetMap[righthandFinger.char] });

    return [righthandFinger, xianNumber];
  }
  // SPECIAL_FINGER 的布局
  specialFingerPhrase(specialFinger) {
    specialFinger.setLayout({ x: 0, y: 0 });
    return [specialFinger];
  }

  // ==> 复合式布局的具体方法
  // 撮符号
  cuoPhrase(cuoFinger) {
    cuoFinger.setLayout({ x: 0, y: 0 });
    return [cuoFinger];
  }
  // 撮左边
  cuoLeftPhrase(cuoLeftFinger, cuoLeftHuiNumber, cuoLeftFenNumber, cuoLeftXianNumber) {
      // 防御性检查（保持原名）
    if (!cuoLeftFinger || !cuoLeftHuiNumber) {
      console.warn('cuoLeftPhrase: 缺少必要参数');
      return [];
    }

  const result = [];
    // 实现撮左边布局逻辑
      cuoLeftFinger.setLayout({ x: 0, y: 0, height:containerHeight, width: containerWidth });
      cuoLeftXianNumber.setLayout({ x: 0, y: 0, height:containerHeight, width: containerWidth});
      cuoLeftHuiNumber.setLayout({ x: 0, y: 0, height:containerHeight, width: containerWidth });

    return [cuoLeftFinger, cuoLeftHuiNumber, cuoLeftFenNumber, cuoLeftXianNumber].filter(Boolean);
  }
  // 撮右边
  cuoRightPhrase(cuoRightFinger, cuoRightXianNumber) {
    // 实现撮右边布局逻辑
    cuoRightFinger.setLayout({ x: 0, y: 0 });
    cuoRightXianNumber.setLayout({ x: 0, y: 0 });
    return [cuoRightFinger, cuoRightXianNumber];
  }


  // ==> 旁注式布局的具体方法
  sideNotePhrase(moveFinger, modifier) {
    // 实现旁注式布局逻辑
    return [moveFinger, modifier];
  }
}