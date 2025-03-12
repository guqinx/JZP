// src/js/layoutEngine.js
import { LayoutCalculator } from './interfaces.js';

// 创建减字符号类
class jianziSymbol {
  constructor(char, type) {
    this.char = char;
    this.type = type;
    this.scale = 1; // 默认缩放比例
    this.translateX = 0; // 默认 X 轴偏移
    this.translateY = 0; // 默认 Y 轴偏移
  }

  // 根据类型设置布局信息
  setLayout(layout) {
    this.scale = layout.scale || this.scale;
    this.translateX = layout.translateX || this.translateX;
    this.translateY = layout.translateY || this.translateY;
  }

  // 获取布局信息
  getLayout() {
    return {
      char: this.char,
      scale: this.scale,
      translateX: this.translateX,
      translateY: this.translateY,
    };
  }
}

// 布局引擎的具体实现
export class MyLayoutCalculator extends LayoutCalculator {
  // LEFT_HAND_FINGER 和 HUI_NUMBER 和 FEN_NUMBER 的组合布局
  lefthandFingerPhrase(lefthandFinger, huiNumber, fenNumber) {
    lefthandFinger.setLayout({ scale: 1, translateX: 0, translateY: 0 });
    if (fenNumber) {
      huiNumber.setLayout({ scale: 1, translateX: 0, translateY: -30 });
      fenNumber.setLayout({ scale: 1, translateX: 0, translateY: 30 });
    } else {
      huiNumber.setLayout({ scale: 1, translateX: 0, translateY: 0 });
    }
    return [lefthandFinger, huiNumber, fenNumber].filter(Boolean);
  }

  // RIGHT_HAND_FINGER 和 XIAN_NUMBER 的组合布局
  righthandFingerPhrase(righthandFinger, xianNumber) {
    righthandFinger.setLayout({ scale: 1, translateX: 0, translateY: 0 });
    xianNumber.setLayout({ scale: 1, translateX: 0, translateY: 0 });
    return [righthandFinger, xianNumber];
  }

  // SPECIAL_FINGER 的布局
  specialFingerPhrase(specialFinger) {
    specialFinger.setLayout({ scale: 1.2, translateX: -10, translateY: 5 });
    return [specialFinger];
  }

  // 实现接口方法
  processInput(parsedInput) {
    const symbolObjects = parsedInput.map(item => new jianziSymbol(item.char, item.type));

    // 分类处理
    const lefthandFinger = symbolObjects.find(item => item.type === "LEFT_HAND_FINGER");
    const huiNumber = symbolObjects.find(item => item.type === "HUI_NUMBER");
    const fenNumber = symbolObjects.find(item => item.type === "FEN_NUMBER");
    const righthandFinger = symbolObjects.find(item => item.type === "RIGHT_HAND_FINGER");
    const xianNumber = symbolObjects.find(item => item.type === "XIAN_NUMBER");
    const specialFinger = symbolObjects.find(item => item.type === "SPECIAL_FINGER");

    // 计算布局
    let layoutInfo = [];

    // 左手指法语句 处理 LEFT_HAND_FINGER + HUI_NUMBER + FEN_NUMBER 组合
    if (lefthandFinger && huiNumber) {
      layoutInfo = layoutInfo.concat(this.lefthandFingerPhrase(lefthandFinger, huiNumber, fenNumber));
    }

    // 右手指法语句 处理 RIGHT_HAND_FINGER + XIAN_NUMBER 组合
    if (righthandFinger && xianNumber) {
      layoutInfo = layoutInfo.concat(this.righthandFingerPhrase(righthandFinger, xianNumber));
    }

    // 特殊字符 处理 SPECIAL FINGER
    if (specialFinger) {
      layoutInfo = layoutInfo.concat(this.specialFingerPhrase(specialFinger));
    }

    // 处理单独字符（未参与组合的字符）
    const remainingSymbols = symbolObjects.filter(item => 
      !layoutInfo.some(layout => layout.char === item.char)
    );

    // 为单独字符设置默认布局
    remainingSymbols.forEach(symbol => {
      symbol.setLayout({ scale: 1, translateX: 0, translateY: 0 }); // 默认布局
      layoutInfo.push(symbol.getLayout());
    });

    return layoutInfo;
  }
}