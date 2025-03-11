
// 测试函数
function testProcessInput() {
    // 测试用例 1: HUI_FINGER 和 HUI_NUMBER 的组合
    const input1 = [
      { char: '大', type: 'HUI_FINGER' },
      { char: '十一徽', type: 'HUI_NUMBER' }
    ];
    const expected1 = [
      { char: '大', scale: 2, translateX: 0, translateY: 0 },
      { char: '十一徽', scale: 1, translateX: 0, translateY: 0 }
    ];
    const result1 = processInput(input1);
    console.log('Test case 1:', JSON.stringify(result1) === JSON.stringify(expected1) ? 'PASS' : 'FAIL');
  
    // 测试用例 2: XIAN_FINGER 和 XIAN_NUMBER 的组合
    const input2 = [
      { char: '如一声', type: 'XIAN_FINGER' },
      { char: '一弦', type: 'XIAN_NUMBER' }
    ];
    const expected2 = [
      { char: '如一声', scale: 1, translateX: 0, translateY: 0 },
      { char: '一弦', scale: 0.8, translateX: 30, translateY: -10 }
    ];
    const result2 = processInput(input2);
    console.log('Test case 2:', JSON.stringify(result2) === JSON.stringify(expected2) ? 'PASS' : 'FAIL');
  
    // 测试用例 3: SPECIAL_FINGER 的布局
    const input3 = [
      { char: '注', type: 'SPECIAL_FINGER' }
    ];
    const expected3 = [
      { char: '注', scale: 1.2, translateX: -10, translateY: 5 }
    ];
    const result3 = processInput(input3);
    console.log('Test case 3:', JSON.stringify(result3) === JSON.stringify(expected3) ? 'PASS' : 'FAIL');
  
    // 测试用例 4: 混合输入
    const input4 = [
      { char: '大', type: 'HUI_FINGER' },
      { char: '十一徽', type: 'HUI_NUMBER' },
      { char: '如一声', type: 'XIAN_FINGER' },
      { char: '一弦', type: 'XIAN_NUMBER' },
      { char: '注', type: 'SPECIAL_FINGER' }
    ];
    const expected4 = [
      { char: '大', scale: 2, translateX: 0, translateY: 0 },
      { char: '十一徽', scale: 1, translateX: 0, translateY: 0 },
      { char: '如一声', scale: 1, translateX: 0, translateY: 0 },
      { char: '一弦', scale: 0.8, translateX: 30, translateY: -10 },
      { char: '注', scale: 1.2, translateX: -10, translateY: 5 }
    ];
    const result4 = processInput(input4);
    console.log('Test case 4:', JSON.stringify(result4) === JSON.stringify(expected4) ? 'PASS' : 'FAIL');
  
    // 测试用例 5: 空输入
    const input5 = [];
    const expected5 = [];
    const result5 = processInput(input5);
    console.log('Test case 5:', JSON.stringify(result5) === JSON.stringify(expected5) ? 'PASS' : 'FAIL');
  }
  
  // 运行测试
  testProcessInput();