fetch("/posts")
  .then(response => response.json())
  .then(json => {
    var html = "";
    var blogs = json.blogs;
    var i = 0;
    while (i < blogs.length) {
      var blog = blogs[i];
      html += `<a href="javascript:getBlog(${i})" class="sidebar-link">${window.escapeHTML(blog.title)}</a>`;
      i++;
    }
    document.querySelector(".blog-list").innerHTML = html;
  });
