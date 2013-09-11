```
   ______              _____  __          __   _        __
  / ____/____         / ___/ / /_ ____ _ / /_ (_)_____ / /
 / / __ / __ \ ______ \__ \ / __// __ `// __// // ___// / 
/ /_/ // /_/ //_____/___/ // /_ / /_/ // /_ / // /__ /_/  
\____/ \____/       /____/ \__/ \__,_/ \__//_/ \___/(_) 
```

Go-Static! is a static site generator that employs the tools developers already know and love. [Yeoman](http://yeoman.io) to scaffold out your project and [Grunt](http://gruntjs.com/) to generate the output.

### Getting Started

Go Static! depends on Yeoman, so make sure you have it installed:

```
$ npm install -g yo
```

Once you have Yeoman installed, you can install Go-Static! with NPM:

```
$ npm install -g generator-go-static
```

With Go-Static! installed, you can now initialize your working directory:

```
$ mkdir my-blog && cd $_
$ yo go-static
```

### Creating your first post

If everything intialized correctly, you can now use Go-Static! to create your posts for you.

```
$ yo go-static:post
```

You will be presented with some questions regarding the post, such as title, snippet, tags, etc. If everything went ok,
it will generate a report of exactly what was generated for you.

You don't have to write just posts, you can craete pages also:

```
$ yo go-static:page
```

### The build step

Once your pages and posts are created, it's time to generate the output and serve it up.

```
$ grunt server
```

Running the <code>server</code> Grunt task will <code>build</code> and <code>watch</code> your code for changes.
If you prefer to just run the build step, just run:

```
$ grunt build
```

That's it!

### Contributing

Go-Static! has just been born and still needs work to be awesome. If you'd like to help make it awesome, let me know!

### License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
