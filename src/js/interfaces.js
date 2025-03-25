// src/js/interfaces.js

/**
 * 输入解析器接口
 */
export class InputParser {
    /**
     * 解析输入字符串
     * @param {string} input - 输入的字符串
     * @returns {Array<{char: string, type: string}>} - 解析后的结果
     */
    parse(input) {
      throw new Error("parse 方法必须被实现");
    }
  }
/**
 * 布局引擎接口
 */
export class LayoutCalculator {
  /**
   * 处理解析后的输入并返回布局信息
   * @param {Array<{char: string, type: string}>} parsedInput - 解析后的输入
   * @returns {Array<{char: string, x: number, y: number, height: number, width: number}>} - 布局信息
   */
  processInput(parsedInput) {
    throw new Error("processInput 方法必须被实现");
  }
}
  /**
 * 渲染器接口
 */
export class Renderer {
    /**
     * 渲染 SVG 元素
     * @param {Array<{char: string, x: number, y: number, height: number, width: number}>} layoutInfo - 布局信息
     * @param {HTMLElement} container - SVG 容器
     */
    render(layoutInfo, container) {
      throw new Error("render 方法必须被实现");
    }
  }

