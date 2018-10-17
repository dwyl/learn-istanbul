<div align="center">

# Learn Istanbul
<br />

[![Build Status](https://img.shields.io/travis/dwyl/learn-istanbul/master.svg?style=flat-square)](https://travis-ci.org/dwyl/learn-istanbul)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/learn-istanbul/master.svg?style=flat-square)](http://codecov.io/github/dwyl/learn-istanbul?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/maintainability/dwyl/learn-istanbul.svg?style=flat-square)](https://codeclimate.com/github/dwyl/learn-istanbul)
[![devDependencies Status](https://david-dm.org/dwyl/learn-istanbul/dev-status.svg?style=flat-square)](https://david-dm.org/dwyl/learn-istanbul?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/learn-istanbul/issues)
[![HitCount](http://hits.dwyl.io/dwyl/learn-istanbul.svg)](http://hits.dwyl.io/dwyl/learn-istanbul)
<br />

Learn how to use Istanbul
to check/track Code Coverage in your JavaScript projects.
<br />

<img src="https://user-images.githubusercontent.com/194400/47108248-1adaf880-d243-11e8-9eeb-1f60a7a828db.jpg"
alt="Sign not in use!">

</div>


## Why?

Like the road sign that is "***Not In Use***" _most_ of the code
being written ***never*** gets ***executed***.

There are a *few* obvious issues with this:
1. if un-tested code remains in the codebase i
t can contain ***unknown behaviour*** e.g. ***bugs***.
2. untested features are more ***difficult to maintain***
without introducing ***breaking changes***.
3. un-tested code can ***clutter*** a project and accumulates [***technical debt***](https://en.wikipedia.org/wiki/Technical_debt) that ***wastes time***.

## What?

**Code coverage** tells you when code you have written is being executed
so you can decide if un-covered lines are [superfluous](https://www.google.com/search?q=superfluous)
(*and can be removed*) *or* require additional testing.

The rest of this page will focus on *practical* usage example, so
if you are completely new to Code Coverage we recommend you read the
wikipedia article: http://en.wikipedia.org/wiki/Code_coverage first.

*Istanbul* is a code coverage analysis script you run
when executing your unit tests:
https://github.com/gotwarlost/istanbul/
we like it because it's simple and prints out nice html reports (*see below*)



## How?

### Installation

We prefer to install istanbul as a "*devDependencies*" in each of our projects:

```sh
npm install istanbul --save-dev
```

to check if the installation worked, (*copy-paste and*)
run the following command in your terminal:

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
"coverage": "istanbul cover ./test.js"
```

into the scripts section of your `package.json`
and run the following command in your terminal:

```sh
npm run coverage
```

This will create a directory in your project called **coverage**
where you will find the generated coverage reports.
In our case:
learn-istanbul/**coverage/lcov-report**/learning-istanbul/**test1.js.html**
<br />

If you open the test1.js**.html** file in your web browser
you will see a *visual* coverage report:



![Basic coverage report](https://cloud.githubusercontent.com/assets/194400/14235269/27f13d9a-f9f1-11e5-9b43-5c8c659717e0.png)

Istanbul gives us four code coverage metrics:
* **Statements**: How many of the [statements](http://www.2ality.com/2012/09/expressions-vs-statements.html)
in you code are executed.
* **Branches**: Conditional statements create branches of code
which may not be executed (e.g. `if/else`).
This metric tells you how many of your branches have been executed.
* **Functions**: The proportion of the functions you have defined
which have been called.
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
	selfDestruct();
}
```
The **97% Coverage** is *not looking so hot anymore* ...

What if we add a Test that *follows* the branch containing the rogue code?
We reach our mythical 100% Coverage:

![learn-istanbul-mischief-100-percent](https://cloud.githubusercontent.com/assets/194400/14235536/2e274184-f9f9-11e5-8999-9dc92cbb3486.png)

And if we simply allow this code to be promoted without further checks,
the rogue code will be in production and soon forgotten.

![100 % Code Coverage includes Rogue Code](https://cloud.githubusercontent.com/assets/194400/14235588/c18e7ee6-f9fa-11e5-93c8-48ba6a25f2da.png)

The solution here is to *not* rely (*solely*)
on tools such as Istanbul to check code.
Its *essential* would advocate a separation
between the people writing the tests
and the developers who write the code.

And there is still *no substitute* for **Code Review**!


![87% Test Coverage](http://i.imgur.com/NTI4Pxw.png)

<br />

## Tracking Coverage as-a-Service

Knowing the coverage _locally_ is nice, but it's _way_ more useful to a team
to track coverage over time using an _independent_ service.
Thankfully, there are a few you can chose from:

+ ***Codecov***: https://codecov.io/#features
+ Coveralls: https://coveralls.io/features
+ Codeclimate: https://codeclimate.com/features
+ Codacy: https://codacy.com/product

We have used all the services and found that ***Codecov*** i
s the *clear winner* for 3 reasons:

1. *Easy* to integrate with existing Continuous Integration (CI) setup e.g. [Travis-CI](https://github.com/dwyl/learn-travis)
2. Great stats and visualisations
3. Pull request message informs if coverage has changed (*see below*)

### Setup

1. Sign-up to use Codecov (*Free*) using your GitHub account:
https://codecov.io/

2. Select the repository you want to track coverage for from your list.

3. Add a few lines to your CI configuration file e.g:

```yml
before_install:
  - pip install --user codecov
after_success:
  - codecov --file coverage/lcov.info --disable search
```
This installs the Codecov reporter tool on your CI and sends the `lcov.info` report
(_which gets generated by Istanbul_) to Codecov where it's kept safely.

> Real-world example in `.travis.yml` file: https://github.com/dwyl/hapi-auth-jwt2/blob/master/.travis.yml#L7-L10


Now when you create a pull request your CI will send a coverage report to Codecov
and Codecov will leave a *comment* on the PR:

![learn-istanbul-large-project-with-100-test-coverage](https://cloud.githubusercontent.com/assets/194400/17811233/964272d4-6619-11e6-8a42-32752453169b.png)

> Yes, it's "_possible_" to have a "[large](https://github.com/FAC-GM/app/pull/553)" project with 100% Test Coverage.
(ALL DWYL projects do!)

So you can see at a *glance* if new code is being added without corresponding tests ...

![learn-istanbul-codecov-lower](https://cloud.githubusercontent.com/assets/194400/17810879/96453d04-6617-11e6-8d3d-bfa3175d9973.png)

When the coverage is lower the Pull Request "fails":

![learn-istanbul-pr-fails-on-lower-coverage](https://cloud.githubusercontent.com/assets/194400/17811085/d0a93364-6618-11e6-9694-12a033f2be63.png)


> **Note**: if you want to *prevent* people (*your team*) from creating Pull Requests with
less than an agreed level of coverage (_e.g 100%!!_), add a [`coverage`](https://github.com/dwyl/hapi-auth-jwt2/blob/452368830d0d7971f93219245f6cad56f2ece9e6/package.json#L57) checking script and corresponding [`pre-commit hook`](https://github.com/dwyl/hapi-auth-jwt2/blob/452368830d0d7971f93219245f6cad56f2ece9e6/package.json#L64). More on pre-commit hooks: https://github.com/dwyl/learn-pre-commit


#### Add a "Badge" to your Readme (*Optional/Recommended*)

Click on the `Settings` tab for your chosen repo, click on `Badge` and click
`Copy` e.g:

![codecov-settings-badge](https://cloud.githubusercontent.com/assets/194400/17809827/122398f0-6611-11e6-8ac5-c2f828ec43c8.png)

Then paste the markdown into your Readme.

> More about badges: https://github.com/dwyl/repo-badges

### Further Reading:

+ JavaScript Code Coverage Dashboard with Codecov.io by @ariya
https://ariya.io/2015/08/javascript-code-coverage-dashboard-with-codecov-io


> **Note**: DWYL is not _financially_ affiliated with Codecov,
but we :heart: [@stevepeak](https://github.com/stevepeak) and the product he
has built. They are focussed on
[_doing one thing **really well**_](https://www.google.co.uk/search?q=do+one+thing+well&tbm=isch)
and have innovated a lot in code coverage tracking making developers lives *much* better.

### Background Reading

- Ariay's basic tutorial: http://ariya.ofilabs.com/2012/12/javascript-code-coverage-with-istanbul.html
- Jasmine Test Coverage: http://architects.dzone.com/articles/code-coverage-jasmine-tests

Istanbul (the JavaScript Code Coverage tool)
https://github.com/gotwarlost/istanbul
should not to be confused with [istanbul](https://wiki.gnome.org/Istanbul)
the desktop screen recorder, they are totally diferent animals!
Shame about the name collision... :-(
