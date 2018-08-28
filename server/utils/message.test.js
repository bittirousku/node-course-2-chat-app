const expect = require("expect");

const {generateMessage, generateLocationMessage} = require("./message.js");


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


describe("generateLocationMessage", () => {

  it("should generate correct location object", () => {
    let from = "Admin";
    let lat = 60;
    let lon = 25;
    let msg = generateLocationMessage(from, lat, lon);

    expect(msg.from).toBe(from);
    expect(msg.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);
    expect(typeof msg.createdAt).toBe("number");
  });
});
