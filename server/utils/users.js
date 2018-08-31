
class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, channel) {
    let user = {id, name, channel};
    this.users.push(user);

    return user;
  }

  removeUser(id) {
    let user = this.getUser(id);
    this.users = this.users.filter((user) => {
      return user.id !== id;
    });

    return user;
  }

  getUser(id) {
    let theChosenOne = this.users.find((user) => {
      return user.id === id;
    });
    return theChosenOne;
  }

  getUserList(channel) {
    let users = this.users.filter((user) => {
      return user.channel === channel;
    });
    let namesArray = users.map((user) => {
      return user.name;
    });

    return namesArray;  // return only user names
  }

}

module.exports = {Users};
