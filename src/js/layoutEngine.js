//layoutEngine.js
import { parseInput } from './parseInput.js';


class jzSymbol {     // 减字符号
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


// HUI_FINGER 和 HUI_NUMBER 的组合布局
function huiFingerPhrase(huiFinger, huiNumber) {
  huiFinger.setLayout({ scale: 0.5, translateX: 0, translateY: 0 });
  huiNumber.setLayout({ scale: 1, translateX: 0, translateY: 0 });
  return [huiFinger, huiNumber];
}

// XIAN_FINGER 和 XIAN_NUMBER 的组合布局
function xianFingerPhrase(xianFinger, xianNumber) {
  xianFinger.setLayout({ scale: 1, translateX: 0, translateY: 0 });
  xianNumber.setLayout({ scale: 0.8, translateX: 30, translateY: -10 });
  return [xianFinger, xianNumber];
}

// SPECIAL_FINGER 的布局
function specialFingerPhrase(specialFinger) {
  specialFinger.setLayout({ scale: 1.2, translateX: -10, translateY: 5 });
  return [specialFinger];
}

function processInput(input) {
  const parsedInput = parseInput(input); // 使用 parseInput 函数解析输入
  const symbolObjects = parsedInput.map(item => new jzSymbol(item.char, item.type));

// function processInput(parseInput) {
//   const symbolObjects = parseInput.map(item => new jzSymbol(item.char, item.type));

  // 分类处理
  const huiFinger = symbolObjects.find(item => item.type === "HUI_FINGER");
  const huiNumber = symbolObjects.find(item => item.type === "HUI_NUMBER");
  const xianFinger = symbolObjects.find(item => item.type === "XIAN_FINGER");
  const xianNumber = symbolObjects.find(item => item.type === "XIAN_NUMBER");
  const specialFinger = symbolObjects.find(item => item.type === "SPECIAL_FINGER");

  // 计算布局
  const huiLayout = huiFinger && huiNumber ? huiFingerPhrase(huiFinger, huiNumber) : [];
  const xianLayout = xianFinger && xianNumber ? xianFingerPhrase(xianFinger, xianNumber) : [];
  const specialLayout = specialFinger ? specialFingerPhrase(specialFinger) : [];

  // 合并所有布局
  const result = [...huiLayout, ...xianLayout, ...specialLayout].map(item => item.getLayout());
  return result;
}


// 测试代码
const input = [
  { char: "大", type: "HUI_FINGER" },
  { char: "七徽", type: "HUI_NUMBER" },
  { char: "六分", type: "FEN_NUMBER" },
  { char: "注", type: "SPECIAL_FINGER" },
  { char: "勾", type: "XIAN_FINGER" },
  { char: "一弦", type: "XIAN_NUMBER" },
];

const result = processInput(input);
console.log(result);
