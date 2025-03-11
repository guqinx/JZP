//layoutEngine.js
import { parseInput } from './parseInput.js';

// 创建减字符号类
class jianziSymbol {
  constructor(char , type) {
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
  huiFinger.setLayout({ scale: 1, translateX: 0, translateY: 0 });
  huiNumber.setLayout({ scale: 1, translateX: 0, translateY: 0 });
  return [huiFinger, huiNumber];
}



function processInput(input) {
  const parsedInput = parseInput(input); // 使用 parseInput 函数解析输入
  const symbolObjects = parsedInput.map(item => new jianziSymbol(item.char, item.type));

  // 分类处理
  const huiFinger = symbolObjects.find(item => item.type === "HUI_FINGER");
  const huiNumber = symbolObjects.find(item => item.type === "HUI_NUMBER");

 

  // 计算布局
  const huiLayout = huiFinger && huiNumber ? huiFingerPhrase(huiFinger, huiNumber) : [];


   // 处理其他字符类型
   const otherSymbols = symbolObjects.filter(item => 
    item.type !== "HUI_FINGER" && 
    item.type !== "HUI_NUMBER" && 
    item.type !== "XIAN_FINGER" && 
    item.type !== "XIAN_NUMBER" && 
    item.type !== "SPECIAL_FINGER"
  );

  // 为其他字符设置默认布局
  const otherLayout = otherSymbols.map(item => {
    item.setLayout({ scale: 1, translateX: 0, translateY: 0 }); // 默认布局
    return item.getLayout();
  });


  // 合并所有布局
  // const result = [...huiLayout, ...xianLayout, ...specialLayout].map(item => item.getLayout());
  // return result;

  const result = [...huiLayout, ...otherLayout, ].map(item => item.getLayout());
  return result;


}
export { processInput };

