const expect = require("expect");

const {isRealString} = require("./validation.js");

describe("isRealString", () => {

  it("should reject non-string values", () => {
    let data = 5243;
    expect(isRealString(data)).toBe(false);
  });

  it("should reject strings with only spaces", () => {
    let data = "     ";
    expect(isRealString(data)).toBe(false);
  });

  it("should allow string with non-space characters", () => {
    let data = "  hello there";
    expect(isRealString(data)).toBe(true);
  });

});
