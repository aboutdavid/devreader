const db = require("quick.db");
const blogs = require("./blogs.js");
const Parser = require("rss-parser");
const parser = new Parser();

if (db.has("blogs")) {
  db.delete("blogs");
}

async function addBlog(url) {
  var feed = await parser.parseURL(url).catch(e => {
    console.error("Something went wrong while fetching", blog, e);
  });
  var posts = [];
  var blogtitle = feed.title;
  var blogdesc = feed.description;
  var s = 0;
  while (s < feed.items.length) {
    var item = feed.items[s];
    var title = item.title || "(Untitled Post)";
    var content = item.content || "No Content.";
    var author = item.creator || blogtitle;
    var date = new Date(item.pubDate || new Date());
    posts.push({ title: title, author: author, html: content, date: date });
    s++;
  }
  var obj = {
    title: blogtitle || "(Untitled Feed)",
    description: blogdesc || "No description provided.",
    posts: posts
  };
  db.push("blogs", obj);
}
var i = 0;
while (i < blogs.length) {
  var blog = blogs[i];
  console.log(`Getting data from ${blog}...`);
  addBlog(blog).catch(e => {
    console.error("Something went wrong while fetching", blog, e);
  });
  i++;
}
