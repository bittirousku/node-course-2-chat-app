const expect = require("expect");

const {generateMessage} = require("./message.js");


describe("generateMessage", () => {

  it("should generate correct message object", () => {
    let from = "robocop";
    let text = "stay out of trouble";
    let msg = generateMessage(from, text);

    expect(msg.from).toBe(from);
    expect(msg.text).toBe(text);
    expect(typeof msg.createdAt).toBe("number");
  });

});
