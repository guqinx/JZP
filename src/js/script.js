// src/js/script.js
import { MyInputParser } from './parseInput.js'; // 导入输入解析器实现类
import { MyLayoutCalculator } from './layoutEngine.js'; // 导入布局引擎实现类
import { SvgRenderer } from './renderer.js'; // 导入渲染器实现类

const textInput = document.getElementById('text-input');
const svgContainer = document.getElementById('svg-container');

// 创建输入解析器、布局引擎和渲染器实例
const inputParser = new MyInputParser();
const layoutCalculator = new MyLayoutCalculator();
const svgRenderer = new SvgRenderer();

textInput.addEventListener('input', function(event) {
  const inputText = event.target.value;

  // 使用输入解析器解析输入
  const parsedInput = inputParser.parse(inputText);

  // 使用布局引擎处理解析后的输入
  const layoutInfo = layoutCalculator.processInput(parsedInput);

  // 使用渲染器渲染 SVG
  svgRenderer.render(layoutInfo, svgContainer);
});



  // **清空 svgContainer，确保无输入时不渲染**
  // if (!inputText) {
  //   svgContainer.innerHTML = ''; 
  //   return;
  // }