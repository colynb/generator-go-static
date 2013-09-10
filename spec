yo go-static
(initialization: package, gruntjs)
yo go-static:post "New Post"
(creates source/posts/new-post.md)
yo go-static:page "New Page"
(creates source/pages/new-page.md)

grunt build
(scans documents and builds models)
(renders out documents to output folder)
(uses livereload to create localhost)
