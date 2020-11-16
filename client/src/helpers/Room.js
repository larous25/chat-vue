function Room () {
  this.name = ''
  this.messages = []
}

Room.prototype.setName = function (name) {
  this.name = name
}

Room.prototype.getName = function (name) {
  return this.name
}

Room.prototype.addMessage = function (message) {
  this.messages.push(message)
}

export default Room
