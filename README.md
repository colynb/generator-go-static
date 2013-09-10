# generator-go-static

(WORK IN PROGRESS)

A static site generator for [Yeoman](http://yeoman.io). 

## Getting Started

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

## Creating your first post

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

## The build step

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

## Contributing

I'm currently looking for contributors, so if you'd like to help out in any way.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
