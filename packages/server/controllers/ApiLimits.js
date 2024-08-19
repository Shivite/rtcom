const redisClient = require("../redis");

module.exports.limitApiRequest = (seconds, limit) => {
  return async (req, res, next) => {
    const ip = req.connection.remoteAddress.slice(0, 4);
    const [response] = await redisClient
      .multi()
      .incr(ip)
      .expire(ip, seconds)
      .exec();

    if (response[1] > limit) {
      res.json({ loggedIn: false, status: "maximum requires contineously" });
    } else next();
  };
};
