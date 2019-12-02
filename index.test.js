const calc = require("./index");

test("number", () => {
  expect(calc("3")).toBe(3);
  expect(calc("12")).toBe(12);
  expect(calc("9999")).toBe(9999);
});

test("plus", () => {
  expect(calc("1+2")).toBe(3);
  expect(calc("2+2 + 5")).toBe(9);
});

test("multiply", () => {
  expect(calc("1x2")).toBe(2);
  expect(calc("2x2 + 5")).toBe(9);
  expect(calc("1x2x3x4")).toBe(24);
  expect(calc("2+ 2 x 5")).toBe(12);
  expect(calc("1 + 2 x 3 + 4 x 5")).toBe(27);
});
