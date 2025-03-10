// script.js
import charMap from './charMap.js';
import { parseInput } from './parseInput.js'; // 导入parseInput 函数

const textInput = document.getElementById('text-input');
const svgContainer = document.getElementById('svg-container');

textInput.addEventListener('input', function(event) {
  const inputText = event.target.value;
  svgContainer.innerHTML = ''; // 清空容器

  // 解析输入文本
  const parsedChars = parseInput(inputText);
 
  if (Array.isArray(parsedChars)) {
    parsedChars.forEach(({ char, type }, index) => {
      // 你的代码
      

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

          svgContainer.appendChild(svgElement); // 追加SVG到容器
        })
        .catch(error => {
          console.error('加载SVG文件失败:', error);
        });
    }
  });

  
    });
  } else {
    console.error('parsedChars 不是一个数组:', parsedChars);
  }
 
});
