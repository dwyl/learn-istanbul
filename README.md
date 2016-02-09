learn-istanbul
=================

![87% Test Coverage](http://i.imgur.com/NTI4Pxw.png)

Learn how to use the Istanbul JavaScript Code Coverage Tool

- - -

![Sign Not In Use](http://i1.mirror.co.uk/incoming/article1433397.ece/ALTERNATES/s2197/The%20world's%20most%20stupid%20signs-1433397 "Sign not in use!")

Like the road sign that is "***Not In Use***" much of the code
that is written ***never*** gets ***executed***.

**Code coverage** tells you when something you have written is
[superfluous](https://www.google.com/search?q=superfluous)
so you can either write a test to see if its still useful
or remove the unnecessary bloat in your codebase.

If you are completely new to Code Coverage there is a great wikipedia article:
http://en.wikipedia.org/wiki/Code_coverage

- - -


I've heard a lot about Istanbul
https://github.com/gotwarlost/istanbul
but not yet made time to try it;
that changes today. (*And so can you*! ;-)


#### Installation

##### Global

If you do not already have istanbul installed on your system,

```sh
npm install istanbul
```

to check if the installation worked, run the following command:

```sh
istanbul help
```

if you get a *error* when trying to run the **-bash: istanbul: command not found**
you may need to install instanbul *globally*:

```sh
sudo npm install istanbul -g
```

##### Local

If you want to install istanbul in a directory, cd into that directory and run the command

```sh
npm install istanbul --save-dev
```

to check if the installation worked, run the command

```sh
./node_modules/.bin/istanbul help
```

to make this easier you can edit the package.json and insert

#### Simple Example

For our first example create a file called **test.js**

```sh
vi test.js
```

with the following code:

```javascript
x = 42;
if(false)
     x =-1;
```

Now run the istanbul command to generate a coverage report:

If you have globally installed istanbul run

```sh
istanbul cover test.js
```

If you have istanbul installed locally run

```sh
node ./node_modules/.bin/istanbul cover test.js
```

Alternatively you can insert the line

```json
"coverage": "node ./node_modules/.bin/istanbul cover test.js"
```

into your package.json and run

```sh
npm run coverage
```

This will create a directory called **coverage** where you will find
the generated coverage reports.
In my case:
learning-istanbul/**coverage/lcov-report**/learning-istanbul/**test1.js.html**
If you open the test1.js**.html** file in your browser
you will see a *visual* coverage report:

![Basic coverage report](https://raw.github.com/nelsonic/learning-istanbul/master/screenshots/test1.js-coverage-highlighted.png)

Istanbul gives us four code coverage metrics:
* **Statements**: How many of the [statements](http://www.2ality.com/2012/09/expressions-vs-statements.html) in you code are executed.
* **Branches**: Conditional statements create branches of code which may not be executed (e.g. `if/else`). This metric tells you how many of your branches have been executed.
* **Functions**: The proportion of the functions you have defined which have been called.
* **Lines**: The proportion of lines of code which have been executed.

Two things to note in the example above:

- we only get 66.67% coverage because the
only 2/3 of the code is being run
- the 3rd line never gets executed because
`false` is *always* **false**!

This may be a *trivial* example but it shows
exactly where the useless code is.

What is wrong with this picture? :

![97 % Code Coverage](https://raw.github.com/nelsonic/learning-istanbul/master/screenshots/97-percent-code-coverage.png)

I know *plenty* of developers/organisations that can
only *dream* about getting 97% code coverage!
and yet when we inspect the *detail*, there's
something **Big** slipping through the net!

![97 % Code Coverage](https://raw.github.com/nelsonic/learning-istanbul/master/screenshots/97-percent-hides-malicious-code.png)

We have **100%** *functional* code coverage, but only 75% "**Branch**" Coverage.
This means one or more *conditional execution* branches is not being executed.

Most of the time it will be something innocuous but what if a disgruntled
person slipped in something like:

```javascript
if(employee.status == 'terminated' && employee.left - today() > 90) {
	selfDestuct();
}
```
The **97% Coverage** is *not looking so hot anymore* ...

What if we add a Test that *follows* the branch containing the rogue code?
We reach our mythical 100% Coverage:

![100 % Code Coverage](https://raw.github.com/nelsonic/learning-istanbul/master/screenshots/100-percent-coverage-masks-rogue-code.png)

And if we simply allow this code to be promoted without further checks,
the rogue code will be in production and soon forgotten.

![100 % Code Coverage includes Rogue Code](https://raw.github.com/nelsonic/learning-istanbul/master/screenshots/100-percent-coverage-but-still-has-rogue-code.png)

The solution here is to not rely (*solely*) on tools such as Istanbul to check code.
I would advocate a separation between the people writing the tests and the developers
who write the code.

And there is still *no substitute* for **Code Review**!



### Notes

- Ariay's basic tutorial: http://ariya.ofilabs.com/2012/12/javascript-code-coverage-with-istanbul.html
- Jasmine Test Coverage: http://architects.dzone.com/articles/code-coverage-jasmine-tests

Istanbul (the JavaScript Code Coverage tool)
https://github.com/gotwarlost/istanbul
should not to be confused with [istanbul](https://wiki.gnome.org/Istanbul)
the desktop screen recorder, they are totally diferent animals!
Shame about the name collision... :-(
