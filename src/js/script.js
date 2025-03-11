// script.js
import charMap from './charMap.js';
import { parseInput } from './parseInput.js'; // 导入parseInput 函数
import { processInput } from './layoutEngine.js'; //导入processInput函数

const textInput = document.getElementById('text-input');
const svgContainer = document.getElementById('svg-container');

textInput.addEventListener('input', function(event) {
  const inputText = event.target.value;
  svgContainer.innerHTML = ''; // 清空容器

  // 解析输入文本                                 
  const parsedChars = parseInput(inputText)

  // 计算布局信息                                 
  const layoutInfo = processInput(inputText);
                                                                
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
          const layout = layoutInfo[index];
          svgElement.style.transform = `translate(${layout.translateX}px, ${layout.translateY}px) scale(${layout.scale})`;
          svgElement.style.transformOrigin = '0 0'; // 设置缩放原点


          svgContainer.appendChild(svgElement); // 追加 SVG 到容器
        })

        .catch(error => {
          console.error('加载SVG文件失败:', error);
        });
    }
  });
});
