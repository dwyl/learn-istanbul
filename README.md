learning-istanbul
=================

Test files used while learning the Istanbul Code Coverage tool

- - -

![Sign Not In Use](http://i1.mirror.co.uk/incoming/article1433397.ece/ALTERNATES/s2197/The%20world's%20most%20stupid%20signs-1433397 "Sign not in use!")

Like the road sign that is "*Not In Use*" much of the code 
that is written never gets executed. 

Code coverage tells you when something you have written is 
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

If you do not already have istanbul installed on your system,

```terminal
npm install istanbul
```

to check if the installation worked, run the following command:

```terminal
istanbul help
```

if you get a *error* when trying to run the **-bash: istanbul: command not found**
you may need to install instanbul *globally*:

```terminal
sudo npm install istanbul -g
```

#### Simple Example

For our first example create a file called **test.js**

```terminal
vi test.js
```

with the following code:

```javascript
x = 42;
if(false)
     x =-1;
```

Now run the istanbul command to generate a coverage report:

```terminal
istanbul cover test.js
```

This will create a directory called **coverage** where you will find 
the generated coverage reports.
In my case: 
learning-istanbul/**coverage/lcov-report**/learning-istanbul/**test1.js.html**
If you open the test1.js**.html** file in your browser 
you will see a *visual* coverage report:

![Basic coverage report](https://raw.github.com/nelsonic/learning-istanbul/master/screenshots/test1.js-coverage-highlighted.png)

Two things to note here:

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

We have 100% functional coverage, but only 75% "**Branch**" Coverage 
(so one or more *conditional execution* branches is not being executed)



### Notes
	
- Ariay's basic tutorial: http://ariya.ofilabs.com/2012/12/javascript-code-coverage-with-istanbul.html

Istanbul (the JavaScript Code Coverage tool) 
https://github.com/gotwarlost/istanbul 
should not to be confused with [istanbul](https://wiki.gnome.org/Istanbul) 
the desktop screen recorder, they are totally diferent animals! 
Shame about the name collision... :-(