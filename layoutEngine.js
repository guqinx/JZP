class Kage {
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