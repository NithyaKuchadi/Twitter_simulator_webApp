module.exports = {
  tweetDB:
    "mongodb://user1:user1password@ec2-52-53-158-214.us-west-1.compute.amazonaws.com:27017/mydb",

  // "mongodb://127.0.0.1:27017",
  topics:
    process.env.topics || "twitter-analytics-topic,twitter-analytics-topic-time"
};
