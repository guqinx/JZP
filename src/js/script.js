// script.js
import charMap from './charMap.js';
import { parseInput } from './parseInput.js'; // 导入parseInput 函数

const textInput = document.getElementById('text-input');
const svgContainer = document.getElementById('svg-container');

textInput.addEventListener('input', function(event) {
  const inputText = event.target.value;
  svgContainer.innerHTML = ''; // 清空容器

  // 解析输入文本                                 
  const parsedChars = parseInput(inputText)
                                                                
  // 加载 SVG
  parsedChars.forEach(({ char, type }, index) => {
    const key = char; // 使用字符作为键
    if (charMap[key]) {
      fetch(charMap[key].svgFile)
        .then(response => response.text())
        .then(data => {
          const svgWrapper = document.createElement('div');
          svgWrapper.innerHTML = data;
          const svgElement = svgWrapper.querySelector('svg');

          // 应用布局信息
          const { scale = 1, translateX = 0, translateY = 0 } = charMap[key];
          svgElement.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
          svgElement.style.transformOrigin = '0 0'; // 设置缩放原点

          svgContainer.appendChild(svgElement); // 追加 SVG 到容器
        })

        .catch(error => {
          console.error('加载SVG文件失败:', error);
        });
    }
  });
});
