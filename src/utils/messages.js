const generateMessage = (username, txt) => {
  return {
    username,
    txt,
    createdAt: new Date().getTime()
  };
};
const generateLocation = (username, coords) => {
  return {
    username,
    url: `https://google.com/maps?q=${coords.lat},${coords.long}`,
    createdAt: new Date().getTime()
  };
};
module.exports = {
  generateMessage,
  generateLocation
};
