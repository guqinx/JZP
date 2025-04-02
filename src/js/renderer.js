import { Renderer } from './interfaces.js';

/**
 * SVG 渲染器的具体实现
 */
export class SvgRenderer extends Renderer {
  /**
   * 渲染 SVG 元素
   * @param {Array<{
   *   char: string,
   *   x: number,
   *   y: number,
   *   height: number,
   *   width: number,
   *   svgFile: string
   * }>} layoutInfo - 布局信息
   * @param {HTMLElement} container - SVG 容器
   */
  render(layoutInfo, container) {
    console.debug('开始渲染SVG元素:', layoutInfo);
    
    // 验证输入
    if (!layoutInfo || !Array.isArray(layoutInfo)) {
      console.error('无效的布局信息:', layoutInfo);
      return;
    }

    // 确保容器是 SVG 元素
    if (!(container instanceof SVGElement)) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      svg.setAttribute("viewBox", "0 0 500 500");
      
      if (container instanceof HTMLElement) {
        container.innerHTML = '';
        container.appendChild(svg);
        container = svg;
      } else {
        console.error('无效的容器元素:', container);
        return;
      }
    }

    // 清空容器
    container.innerHTML = '';

    // 创建 SVG 命名空间
    const SVG_NS = "http://www.w3.org/2000/svg";

    // 渲染每个符号
    layoutInfo.forEach((item, index) => {
      const { char, x, y, height, width, svgFile } = item;
      
      try {
        if (!svgFile) {
          console.warn(`符号 ${char} 没有对应的 SVG 文件路径`);
          return;
        }

        // 创建 image 元素
        const image = document.createElementNS(SVG_NS, "image");

        // 设置属性
        image.setAttribute("href", svgFile);
        image.setAttribute("x", x);
        image.setAttribute("y", y);
        image.setAttribute("width", width);
        image.setAttribute("height", height);
        
        // 设置数据属性用于调试
        image.setAttribute("data-char", char);
        image.setAttribute("data-index", index);

        // 添加错误处理
        image.onerror = () => {
          console.error(`加载 SVG 文件失败: ${svgFile}`);
        };

        // 添加到容器
        container.appendChild(image);
        
        console.debug(`渲染符号 [${char}]:`, {
          svgFile,
          position: `(${x}, ${y})`,
          size: `${width}×${height}`
        });

      } catch (error) {
        console.error(`渲染符号 [${char}] 时发生错误:`, error);
      }
    });

    console.debug('SVG渲染完成');
  }
}

// // src/js/renderer.js
// import { Renderer } from './interfaces.js';
// import charMap from './charMap.js';

// /**
//  * SVG 渲染器的具体实现
//  */
// export class SvgRenderer extends Renderer {
//   /**
//    * 渲染 SVG 元素
//    * @param {Array<{char: string, x: number, y: number, height: number, width: number}>} layoutInfo - 布局信息
//    * @param {HTMLElement} container - SVG 容器
//    */
//   render(layoutInfo, container) {
//     container.innerHTML = ''; // 清空容器

//     layoutInfo.forEach(({ char, x, y, height, width }) => {
//       const key = char; // 使用字符作为键
//       if (charMap[key]) {
//           // 创建 <image> 元素
//           const image = document.createElementNS("http://www.w3.org/2000/svg", "image");

//           // 设置 <image> 的属性
//           image.setAttribute("href", charMap[key].svgFile); // 使用 charMap 中的 SVG 文件路径
//           image.setAttribute("x", x);
//           image.setAttribute("y", y);
//           image.setAttribute("width", width);
//           image.setAttribute("height", height);
  
//           // 将 <image> 添加到容器中
//           container.appendChild(image);
//         } else {
//           console.warn(`未找到 ${char} 对应的 SVG 文件路径`);
//       }
//     });
//   }
// }