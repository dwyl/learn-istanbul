Learn Istanbul

[![Build Status](https://travis-ci.org/dwyl/learn-istanbul.svg?branch=master)](https://travis-ci.org/dwyl/learn-istanbul)
[![codecov.io](https://codecov.io/github/dwyl/learn-istanbul/coverage.svg?branch=master)](https://codecov.io/github/dwyl/learn-istanbul?branch=master)


Learn how to use Istanbul to check/track Code Coverage in your JavaScript projects.

- - -

![Sign Not In Use](https://cloud.githubusercontent.com/assets/194400/14234939/5e182636-f9e7-11e5-9fa3-7509389416be.jpeg "Sign not in use!")

## Why?

Like the road sign that is "***Not In Use***" too much code
being written ***never*** gets ***executed***.

There are a *few* obvious issues with this:
1. if un-tested code remains in the codebase it can contain ***unknown behaviour*** e.g. ***bugs***.
2. untested features are more ***difficult to maintain*** without introducing ***breaking changes***.
3. un-tested code can ***clutter*** a project and accumulates [***technical debt***](https://en.wikipedia.org/wiki/Technical_debt) that ***wastes time***.

## What?

**Code coverage** tells you when code you have written is being executed
so you can decide if un-covered lines are [superfluous](https://www.google.com/search?q=superfluous)
(*and can be removed*) *or* require additional testing.

The rest of this page will focus on *practical* usage example, so
if you are completely new to Code Coverage we recommend you read the
wikipedia article: http://en.wikipedia.org/wiki/Code_coverage first.

- - -

## How?

### Installation

We prefer to install istanbul as a "*devDependencies*" in each of our projects:

```sh
npm install istanbul --save-dev
```

to check if the installation worked, (*copy-paste and*) run the following command
in your terminal:

```sh
node_modules/.bin/istanbul help
```


### Simple Example

For our first example create a file called `test.js`.

```sh
vi test.js
```

type (*or copy-paste*) the following code in the `test.js` file:

```javascript
x = 42;
if(false)
     x =-1;
```

Now run the istanbul command to generate a coverage report:

```sh
node ./node_modules/.bin/istanbul cover test.js
```

Alternatively you can insert the line

```json
"coverage": "node ./node_modules/.bin/istanbul cover test.js"
```

into the scripts section of your `package.json` and run

```sh
npm run coverage
```

This will create a directory in your project called **coverage**
where you will find the generated coverage reports.
In our case:
[learn-istanbul/**coverage/lcov-report**/learning-istanbul/**test1.js.html**]()
If you open the test1.js**.html** file in your browser
you will see a *visual* coverage report:



![Basic coverage report](https://cloud.githubusercontent.com/assets/194400/14235269/27f13d9a-f9f1-11e5-9b43-5c8c659717e0.png)

Istanbul gives us four code coverage metrics:
* **Statements**: How many of the [statements](http://www.2ality.com/2012/09/expressions-vs-statements.html) in you code are executed.
* **Branches**: Conditional statements create branches of code which may not be executed (e.g. `if/else`). This metric tells you how many of your branches have been executed.
* **Functions**: The proportion of the functions you have defined which have been called.
* **Lines**: The proportion of lines of code which have been executed.

when you click `test.js` to view the coverage for the file you see:

![learn-istanbul-test js_html](https://cloud.githubusercontent.com/assets/194400/14235369/2e87e3cc-f9f4-11e5-8701-09a5c538f98e.png)

Two things to note in the example above:

- we only get 66.67% coverage because the
only 2/3 of the code is being run
- the 3rd line never gets executed because
`false` is *always* **false**!

This may be a *trivial* example but it shows
exactly where the useless code is.

#### A more "Real World" Example

Try executing the `mischief.js` file by running `npm test`:

![learn-istanbul-terminal-run](https://cloud.githubusercontent.com/assets/194400/14235496/d5ae4f4e-f9f7-11e5-9388-c50dcca10cbf.png)


What is wrong with the following picture?

![96 % Code Coverage](https://cloud.githubusercontent.com/assets/194400/14235348/7d80c1de-f9f3-11e5-88bd-de9e4d792c3b.png)

There are *plenty* of developers/organisations that can
only *dream* about getting 96% code coverage!
and yet when we inspect the *detail*, there's
something ***big*** slipping through the net!

![learn-istanbul-mischief-on-line-34](https://cloud.githubusercontent.com/assets/194400/14235401/3d8c14fa-f9f5-11e5-946a-d57484b46ce7.png)

We have **100%** *functional* code coverage, but only 50% "**Branch**" Coverage.
This means one or more *conditional execution* branches is not being executed.

Most of the time it will be something innocuous but what if a disgruntled
person slipped in something like:

```javascript
if(employee.status === 'terminated' && employee.left - today() > 90) {
	selfDestuct();
}
```
The **97% Coverage** is *not looking so hot anymore* ...

What if we add a Test that *follows* the branch containing the rogue code?
We reach our mythical 100% Coverage:

![learn-istanbul-mischief-100-percent](https://cloud.githubusercontent.com/assets/194400/14235536/2e274184-f9f9-11e5-8999-9dc92cbb3486.png)

And if we simply allow this code to be promoted without further checks,
the rogue code will be in production and soon forgotten.

![100 % Code Coverage includes Rogue Code](https://cloud.githubusercontent.com/assets/194400/14235588/c18e7ee6-f9fa-11e5-93c8-48ba6a25f2da.png)

The solution here is to *not* rely (*solely*) on tools such as Istanbul to check code.
Its *essential* would advocate a separation between the people writing the tests and the developers
who write the code.

And there is still *no substitute* for **Code Review**!


![87% Test Coverage](http://i.imgur.com/NTI4Pxw.png)

### Notes

- Ariay's basic tutorial: http://ariya.ofilabs.com/2012/12/javascript-code-coverage-with-istanbul.html
- Jasmine Test Coverage: http://architects.dzone.com/articles/code-coverage-jasmine-tests

Istanbul (the JavaScript Code Coverage tool)
https://github.com/gotwarlost/istanbul
should not to be confused with [istanbul](https://wiki.gnome.org/Istanbul)
the desktop screen recorder, they are totally diferent animals!
Shame about the name collision... :-(
