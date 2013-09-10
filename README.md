# generator-go-static

(WORK IN PROGRESS)

A static site generator for [Yeoman](http://yeoman.io). 

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-go-static from npm, run:

```
$ npm install -g generator-go-static
```

Now, initiate the generator:

```
$ yo go-static
```

Next, add a page or post:

```
$ yo go-static:post "New Blog Post"
$ yo go-static:page "About"
```

Finally, build and serve it with Grunt!

```
$ grunt server
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
