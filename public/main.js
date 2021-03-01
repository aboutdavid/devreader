window.trunicate = function(str, cutoff, replace) {
  if (!str || typeof str != "string") {
    return "";
  }
  if (str.length >= cutoff) {
    return (
      str
        .slice(0, cutoff)
        .replace(/\n/gm, " ")
        .replace(/  /gm, " ") + replace
    );
  } else {
    return str.replace(/\n/gm, " ").replace(/  /gm, " ");
  }
};
window.getBlog = function(i) {
  fetch("/posts")
    .then(response => response.json())
    .then(json => {
      var html = "";
      var blog = json.blogs[i];
      document.title = `${blog.title} - DevReader`;
      html += `<h1 class="content-title font-size-22">${window.escapeHTML(
        blog.title
      )}</h1><p>${window.escapeHTML(blog.description)}</p>`;
      var x = 0;
      while (x < blog.posts.length) {
        var post = blog.posts[x];
        html += `<div class="card">
  <h2 class="card-title">
   ${window.escapeHTML(post.title)}
  </h2>
  <p>
    ${window.striptags(window.trunicate(post.html, 500, "..."))}
  </p>
  <div class="text-right">
    <a href="javascript:getPost(${i},${x})" class="btn">Read more</a>
  </div>
</div><br>`;
        x++;
      }
      document.querySelector(".content-wrapper").innerHTML = html;
    });
};
window.getPost = function(i, x) {
  fetch("/posts")
    .then(response => response.json())
    .then(json => {
      var blog = json.blogs[i];
      var post = blog.posts[x];
      var html = `<h1 class="content-title font-size-22">${window.escapeHTML(
        post.title
      )}</h1><div>${post.html}</div>`;

      document.querySelector(".content-wrapper").innerHTML = html;
      document.querySelectorAll("pre code").forEach(block => {
        window.hljs.highlightBlock(block);
      });
      document.title = `${post.title} - DevReader`;
    });
};

function KeyPress(e) {
      var evtobj = window.event? event : e
      if (evtobj.keyCode == 70 && evtobj.shiftKey) {
        window.halfmoon.toggleSidebar()
      }
}

document.onkeydown = KeyPress;