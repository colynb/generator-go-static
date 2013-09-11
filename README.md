```                                             
                                GGGGGGGGGGGGG                                  
                             GGG::::::::::::G                                  
                           GG:::::::::::::::G                                  
                          G:::::GGGGGGGG::::G                                  
                         G:::::G       GGGGGG   ooooooooooo                    
                        G:::::G               oo:::::::::::oo                  
                        G:::::G              o:::::::::::::::o                 
                        G:::::G    GGGGGGGGGGo:::::ooooo:::::o --------------- 
                        G:::::G    G::::::::Go::::o     o::::o -:::::::::::::- 
                        G:::::G    GGGGG::::Go::::o     o::::o --------------- 
                        G:::::G        G::::Go::::o     o::::o                 
                         G:::::G       G::::Go::::o     o::::o                 
                          G:::::GGGGGGGG::::Go:::::ooooo:::::o                 
                           GG:::::::::::::::Go:::::::::::::::o                 
                             GGG::::::GGG:::G oo:::::::::::oo                  
                                GGGGGG   GGGG   ooooooooooo                    
   SSSSSSSSSSSSSSS      tttt                                    tttt            iiii                       !!! 
 SS:::::::::::::::S  ttt:::t                                 ttt:::t           i::::i                     !!:!!
S:::::SSSSSS::::::S  t:::::t                                 t:::::t            iiii                      !:::!
S:::::S     SSSSSSS  t:::::t                                 t:::::t                                      !:::!
S:::::S        ttttttt:::::ttttttt      aaaaaaaaaaaaa  ttttttt:::::ttttttt    iiiiiii     cccccccccccccccc!:::!
S:::::S        t:::::::::::::::::t      a::::::::::::a t:::::::::::::::::t    i:::::i   cc:::::::::::::::c!:::!
 S::::SSSS     t:::::::::::::::::t      aaaaaaaaa:::::at:::::::::::::::::t     i::::i  c:::::::::::::::::c!:::!
  SS::::::SSSSStttttt:::::::tttttt               a::::atttttt:::::::tttttt     i::::i c:::::::cccccc:::::c!:::!
    SSS::::::::SS    t:::::t              aaaaaaa:::::a      t:::::t           i::::i c::::::c     ccccccc!:::!
       SSSSSS::::S   t:::::t            aa::::::::::::a      t:::::t           i::::i c:::::c             !:::!
            S:::::S  t:::::t           a::::aaaa::::::a      t:::::t           i::::i c:::::c             !!:!!
            S:::::S  t:::::t    tttttta::::a    a:::::a      t:::::t    tttttt i::::i c::::::c     ccccccc !!! 
SSSSSSS     S:::::S  t::::::tttt:::::ta::::a    a:::::a      t::::::tttt:::::ti::::::ic:::::::cccccc:::::c     
S::::::SSSSSS:::::S  tt::::::::::::::ta:::::aaaa::::::a      tt::::::::::::::ti::::::i c:::::::::::::::::c !!! 
S:::::::::::::::SS     tt:::::::::::tt a::::::::::aa:::a       tt:::::::::::tti::::::i  cc:::::::::::::::c!!:!!
 SSSSSSSSSSSSSSS         ttttttttttt    aaaaaaaaaa  aaaa         ttttttttttt  iiiiiiii    cccccccccccccccc !!! 

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
