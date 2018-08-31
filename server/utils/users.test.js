const expect = require("expect");

const {Users} = require("./users.js");


describe("Users", () => {

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: "Pena",
      channel: "Kurvi"
    }, {
      id: 2,
      name: "Ritu",
      channel: "Kurvi"
    }, {
      id: 3,
      name: "Jore",
      channel: "Hakis"
    }];
  });

  it("should add a new user", () => {
    let users = new Users();
    let user = {
      id: 22,
      name: "Pena",
      channel: "Kurvi"
    };
    let result = users.addUser(user.id, user.name, user.channel);

    expect(users.users[0].id).toBe(user.id);
    expect(users.users[0].name).toBe(user.name);
    expect(users.users[0].channel).toBe(user.channel);
  });

  it("should remove a user with valid id", () => {
    let wantedId = 1;
    let user = users.removeUser(wantedId);

    expect(user.id).toBe(wantedId);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user with invalid id", () => {
    let wantedId = 323;
    let user = users.removeUser(wantedId);

    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it("should find a user with valid id", () => {
    let wantedId = 1;
    let wantedUser = users.getUser(wantedId);
    expect(wantedUser.id).toBe(wantedId);
  });

  it("should not find a user with invalid id", () => {
    let wantedUser = users.getUser(155);
    expect(wantedUser).toBe(undefined);
  });

  it("should return names for Kurvi", () => {
    let userList = users.getUserList("Kurvi");

    expect(userList[0]).toBe(users.users[0].name);
    expect(userList[1]).toBe(users.users[1].name);
  });

  it("should return names for Hakis", () => {
    let userList = users.getUserList("Hakis");

    expect(userList[0]).toBe(users.users[2].name);
  });

});
