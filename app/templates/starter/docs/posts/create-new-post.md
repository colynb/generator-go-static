---
layout: post
title: How To Create a New Post
snippet: Go-Static! makes it really simple to create new posts. 
author: { name: Colyn Brown, email: colyn.brown@gmail.com }
path: /posts/create-new-post.html
type: post
tags: ['blog', 'post', 'create', 'go-static']
created: '2013-09-20T19:28:35-07:00'
---

### Create a New Post

Creating posts is really simple using Go-Static! There are a couple ways to do it: either let the built in Yeoman generator scaffold out a new post for you, or you can just create a new file yourself in your favorite editor.

#### The Yeoman generator way

If you're using Go-Static! for the first time, this is a good way to go. Just run the generator for creating posts and follow the prompts.

```
$ yo go-static:post
```

The generator creates a new file (currently the default uses Markdown).

The file will contain "front matter" section at the top. This is a way to store all the meta details about the page. You can read more about Go-Static! front matter in the documentation.

For instance, the front matter for the post you're now reading is:

```
layout: post
title: How To Create a New Post
snippet: Go-Static! makes it really simple to create new posts. 
author: { name: Colyn Brown, email: colyn.brown@gmail.com }
path: /posts/create-new-post.html
type: post
isPinned: true
tags: ['blog', 'post', 'create', 'go-static']
created: '2013-09-20T19:28:35-07:00'
```

The generator creates this for you. Add your content below that section.

#### Manually creating a post

As you can see, Go-Static isn't magic. It simply uses Yeoman to automate the creation of posts, a step that can easily be done manually by you. Just create a new file with some meta details about the post, then run your build.