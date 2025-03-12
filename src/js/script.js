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


// // src/js/script.js
// import charMap from './charMap.js';
// import { MyInputParser } from './parseInput.js'; // 导入输入解析器实现类
// import { MyLayoutcalcultor } from './layoutEngine.js'; // 导入布局引擎实现类

// const textInput = document.getElementById('text-input');
// const svgContainer = document.getElementById('svg-container');

// // 创建输入解析器和布局引擎实例
// const inputParser = new MyInputParser();
// const LayoutCalculator = new MyLayoutcalcultor();

// textInput.addEventListener('input', function(event) {
//   const inputText = event.target.value;
//   svgContainer.innerHTML = ''; // 清空容器

//   // 使用输入解析器解析输入
//   const parsedInput = inputParser.parse(inputText);

//   // 使用布局引擎处理解析后的输入
//   const layoutInfo = LayoutCalculator.processInput(parsedInput);

//   // 加载 SVG
//   layoutInfo.forEach(({ char, scale, translateX, translateY }, index) => {
//     const key = char; // 使用字符作为键
//     if (charMap[key]) {
//       fetch(charMap[key].svgFile)
//         .then(response => response.text())
//         .then(data => {
//           const svgWrapper = document.createElement('div');
//           svgWrapper.innerHTML = data;
//           const svgElement = svgWrapper.querySelector('svg');

//           // 应用布局信息
//           svgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
//           svgElement.style.transformOrigin = '0 0'; // 设置缩放原点

//           svgContainer.appendChild(svgElement); // 追加 SVG 到容器
//         })
//         .catch(error => {
//           console.error('加载SVG文件失败:', error);
//         });
//     }
//   });
// });
