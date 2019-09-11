let calculator = { 
  add: (a, b) => a + b 
};

describe('Calculator', () => {  
  it('should add two numbers', () => {
    expect(calculator.add(1,1)).toBe(2);
  })
})