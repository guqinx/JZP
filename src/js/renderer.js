// src/js/renderer.js
import { Renderer } from './interfaces.js';
import charMap from './charMap.js';

/**
 * SVG 渲染器的具体实现
 */
export class SvgRenderer extends Renderer {
  /**
   * 渲染 SVG 元素
   * @param {Array<{char: string, x: number, y: number, height: number, width: number}>} layoutInfo - 布局信息
   * @param {HTMLElement} container - SVG 容器
   */
  render(layoutInfo, container) {
    container.innerHTML = ''; // 清空容器

    layoutInfo.forEach(({ char, x, y, height, width }) => {
      const key = char; // 使用字符作为键
      if (charMap[key]) {
          // 创建 <image> 元素
          const image = document.createElementNS("http://www.w3.org/2000/svg", "image");

          // 设置 <image> 的属性
          image.setAttribute("href", charMap[key].svgFile); // 使用 charMap 中的 SVG 文件路径
          image.setAttribute("x", x);
          image.setAttribute("y", y);
          image.setAttribute("width", width);
          image.setAttribute("height", height);
  
          // 将 <image> 添加到容器中
          container.appendChild(image);
        } else {
          console.warn(`未找到 ${char} 对应的 SVG 文件路径`);
      }
    });
  }
}