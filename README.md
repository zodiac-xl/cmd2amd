## cmd2amd ![NPM version](https://img.shields.io/npm/v/cmd2amd.svg?style=flat)


* transform cmd to amd
* support watch
* support custom webpack by options.needPackRegExp


### Installation
```bash
$ npm install cmd2amd
```


### Example

check test file  and task b in gulpfile.babel 

	//config
	import cmd2amd                      from 'cmd2amd'

	let test = path.join(__dirname, './test');
	let distPath = test + '/dist';
	let sourcePath = test + '/source';
	let rootPath = path.join(test, '../');
	let externals = {};
	let needPackRegExp = [
	    'node_module'
	];
	let modulePrefix = '/dist/';
	let needWatch = true;
	cmd2amd(options);

source:

a.js

	import b form './b';
	import c form 'c';
	export default {b:b,c:c};

b.js

	export default {b:"cc"};

dist:

a.js equal

	define([modulePrefix+'b.js', modulePrefix+rootPath+'node_module/c/index.js'],function(b,c){
		return {b:b,c:c}
	})
	
b.js equal	

	define([],function(){
		return {b:"cc"};
	})	

c equal  webpack with config.output.libraryTarget = 'amd'



### API
check this file: `index.js`


### options

* sourcePath (type:String)

	entry dir
	
* distPath (type:String)  
	
	dist dir
	
* rootPath (type:String)
	
	root equal path.dirname(package.json)
	
* externals (type:Object)
	
	equal webpack externals
	
* needPackRegExp (type:Array)
	
	test true will use webpack to pack instead transform file by file 
	
* modulePrefix (type:String)
	
	define depends prefix 
	
* needWatch (type:Boolean)

	equal webpack watch
	

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT license
Copyright (c) 2016 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
![docor]()
built upon love by [docor](git+https://github.com/turingou/docor.git) v0.3.0
