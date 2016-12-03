module.exports = () => {
  if (process.env.CLIENT_ID && process.env.CLIENT_SECRET
      && process.env.TOKEN_HOST && process.env.REDIRECT_URI) {
    return true;
  }
  return false;
};
