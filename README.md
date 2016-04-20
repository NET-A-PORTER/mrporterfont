[Mr Porter Font](http://net-a-porter.github.io/mrporterfont/) [![Circle CI](https://circleci.com/gh/NET-A-PORTER/mrporterfont/tree/master.svg?style=svg&circle-token=589efad1982e43519f45218cca4d871bb03e2977)](https://circleci.com/gh/NET-A-PORTER/mrporterfont/tree/master)
===

#Demo

[Demo page](http://net-a-porter.github.io/mrporterfont/)

#Usages

bower:

```
  bower install mrporterfont --save-dev
```

npm:

```
  npm install @mrporter/mrporterfont --save-dev
```

html:

``` html
          <i class="mrpfont--minus"></i>
```

## Requirements to start contributing

- Mac
- [Sketch 3](http://bohemiancoding.com/sketch) and [Sketch Tools](http://bohemiancoding.com/sketch/tool/)
- [Node.js](http://nodejs.org/)
- [gulp.js](http://gulpjs.com/)


## Contributing

- Update the sketch file with you latest icon
- Increment the package.json version number
- Run `npm start` (will generate the new font
- git add --all
- git commit -m 'adding an example icon'
- git push

Circle-ci will take care of publishing both the npm module and the github pages. 
