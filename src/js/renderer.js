// src/js/renderer.js
import { Renderer } from './interfaces.js';
import charMap from './charMap.js';

/**
 * SVG 渲染器的具体实现
 */
export class SvgRenderer extends Renderer {
  /**
   * 渲染 SVG 元素
   * @param {Array<{char: string, scale: number, translateX: number, translateY: number}>} layoutInfo - 布局信息
   * @param {HTMLElement} container - SVG 容器
   */
  render(layoutInfo, container) {
    container.innerHTML = ''; // 清空容器

    layoutInfo.forEach(({ char, scale, translateX, translateY }) => {
      const key = char; // 使用字符作为键
      if (charMap[key]) {
        fetch(charMap[key].svgFile)
          .then(response => response.text())
          .then(data => {
            const svgWrapper = document.createElement('div');
            svgWrapper.innerHTML = data;
            const svgElement = svgWrapper.querySelector('svg');

            // 应用布局信息
            svgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
            svgElement.style.transformOrigin = '0 0'; // 设置缩放原点

            container.appendChild(svgElement); // 追加 SVG 到容器
          })
          .catch(error => {
            console.error('加载SVG文件失败:', error);
          });
      }
    });
  }
}