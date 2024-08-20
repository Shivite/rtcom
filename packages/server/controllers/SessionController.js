const { parse } = require("dotenv");
const redisClient = require("../redis");
const parseFriendList = async (friendList) => {
  console.log("here---")
  const newFriendList = [];
  for (let friend of friendList) {
    const parsedFriend = friend.split(".");
    const friendConnected = await redisClient.hget(
      `userid:${parsedFriend[0]}`,
      "connected"
    );
    newFriendList.push({
      username: parsedFriend[0], 
      userid: parsedFriend[1],
      connected: friendConnected,
    });
  }
  return newFriendList;
};
module.exports.AutorizeUser = (socket, next) => {
  if (!socket.request.session || !socket.request.session.user) {
    console.log("Bad Request!");
    next(new Error("Not authorized!"));
  } else {
    next();
  }
};
module.exports.InitializeUser = async (socket) => {
  socket.user = { ...socket.request.session.user };
  redisClient.hset(
    `userid:${socket.user.username}`,
    "userid",
    socket.user.userid,
    "connected",
    true
  );

  const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  const parsedFriendList = await parseFriendList(friendList);
  console.log(parsedFriendList)
  const friendRoom = parsedFriendList.length > 0 && parseFriendList.map(friend => friend.userid);

  if(friendRoom.length > 0 )
    socket.to(friendRoom).emit("connected", true, socket.user.username)
  console.log("here---", `${socket.user.username} friends:`, parsedFriendList)
  socket.emit("get_friends", friendList);
}; 

module.exports.DisconnectUser = async (socket) => {
  const disconnectUser = await redisClient.hset(
    `userid:${socket.user.username}`,
    "connected",
    false
  );
  const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);
  const friendRoom = await parseFriendList(friendList).then(friends => friends.map(friend => friend.userid)) 
  console.log("friendlist---", `${socket.user.username} friends:`, friendList)

  socket.to(friendRoom).emit("connected", false, socket.user.username)
  socket.emit("friends", parseFriendList);
  //get friends
  //emit to all friends with status offline
};

module.exports.AddFriend = async (socket, friendname, cb) => {
  if (friendname) {
    // if (socket.user.userid === friendUserId) {
    //   cb({ done: false, errorMsg: "Can not add self as a friend!" });
    //   return;
    // }
    if (friendname === socket.user.username) {
      cb({ done: false, errorMsg: "Can not add self as a friend!" });
      return;
    } 
    let friend = await redisClient.hgetall(`userid:${friendname}`);
    if (!friend) {
      cb({ done: false, errorMsg: "User does not exist!" });
      return;
    }

    const currentFriendList = await redisClient.lrange(
      `friends:${socket.user.username}`, 0, -1);
    console.log("test-", socket.user.username);

    if (currentFriendList && currentFriendList.indexOf(friendname) !== -1) {
      cb({ done: false, errorMsg: "Friend already exist!" });
      return;
    }

    await redisClient.lpush(
      `friend:${socket.user.username}`,
      [friendname, friend.userid].join(".")
    );
    cb({ done: true });
  }
};


