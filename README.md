<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/js-logo.png?raw=true" width="150px" align="right" />

# Handle money with JS
Differentes ways of how to handle money values using JS, some recommended libraries and a custom implementation

I makes this project because I consider that it is necessary to demonstrate how JS 
can be a **technology reliable to use in systems that handle money**.JS is not known to have the best reputation
in what is the handling of numbers, this in part is due to certain inaccuracies in operations
floating point.

**Origin**: surely everyone saw this example: 0.1 + 0.2 = 0.30000000000000004, wow it is something very rare and one would say
WTF? But why is this happening? This is due to the **IEEE 754 standard**, which proposes the use of point numbers
floating binary. I am not going to explain here about this standard, there are hundreds of links that have already
done I leave some.

- http://steve.hollasch.net/cgindex/coding/ieeefloat.html
- https://en.wikipedia.org/wiki/IEEE_754

## Does this happen only in JS? 
NOT! It happens exactly in python and JAVA:

**Python code:**
<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/python.png?raw=true" width="900px"/>

**Java code:**
<img src="https://github.com/damiancipolat/handle_money_in_js/blob/master/doc/java.png?raw=true" width="900px"/>

These two languages ​​are reliable to work with numbers, surely yes! so jS too. They all use the ieee 754 standard.

## How to handle money?
Use decimals and floating point is the best way? I think it is the **most natural** way when we think about it, but
not necessarily the best, due to the imprecision and rounding of this standard. Here you can read a little about
this https://husobee.github.io/money/float/2016/09/23/never-use-floats-for-currency.html.

**Example:**
I sell 165 apples at $1.40 per apple. My accounting software uses floating point numbers for the calculation.

```sh
>>> 165 * 1.40
230.99999999999997
```

As you can see in this example, you would need to perform rounding yourself to get the correct number. Here is another common example, you are changing the the price of bananas from $1.01 to $0.99 and need to calculate the lost revenue.

```sh
>>> 1.01 - 0.99
0.020000000000000018
```

## Then what do I do?
Well there is a pattern created by Martin fowler https://martinfowler.com/eaaCatalog/money.html, in which
Money is considered as a type of data and not just a simple number.

There is a technique to solve these problems and it is simple, maybe not the best, but it is simple to develop.
and effective. We can transform a decimal value into its representation in cents. In this way we avoid
floating point details.

### Problems with this?
- We do extra operations.
- JS does not offer an infinite range of integers Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.

### How to do this?
We have to add two values ​​0.2 and 0.1, if we do it directly with JS we already know that there will be problems.

1) Multiply each value by 100: (0.2 * 100 + 0.1 * 100) = 30 cents.
2) Recover the value to money: (0.2 * 100 + 0.1 * 100) / 100 = 0.3.

#### Code:
There are several ways we can use libraries like:
- Dinero.js
- Financial.js
- Money.js
- https://github.com/ericelliott/moneysafe

Or perform a custom implementation ourselves, if we do we will have to worry about giving support
to these operations. For the moment, we are going to avoid making conversions to other types of currency.

- Sum
- Subtraction
- Division
- Multiplication
- Same
- Minor / Less equal
- Greater / Greater equal.

In this link you can see an implementation made by me in vanilla JS of this..
.
.
.
.
. 
ejemplos
.
.

Basically magic consists of 4 functions:
1
2
3
4

There is no need for major operations to work with money in a simple system.


## Strings and money.
In several countries the representation of money is not standard and differs from how it is in the USA, so how is it handled?

It is very common to have a field in our frontend to deposit money. For example in Argentina, money is represented:
$ 100,000.85 the "." Is used as a thousands separator and the "," to separate decimals.

It is very convenient in this case, to take the money to the same way that is how JS uses it.
$ 100,000.85 -> 100000.85 with two decimal digits, with this we can save it to our BD or use it
for calculations. I call this normalization and it is important that you keep that in mind.

Now having said that we should use the monetary value as its representation in cents,
We can also choose to save it in this same form in a bd or to do operations.

## Round out:
Use two numbers, three numbers? the reality that that depends on the system we are using,
in general it is usually rounded up and with two numbers. Math.floor (). The advantage of using pennies is that it gives us a
greater degree of certainty than if we used decimals.

EYE! In JS the integers are not infinite, numerical representations can be made between these two values.

Number.MIN_SAFE_INTEGER = -9007199254740991
Number.MAX_SAFE_INTEGER = 9007199254740991

Outside this range, accurate results cannot be assured.

## FINTECH:
What happens in fintech industries that use JS and manage money,
well they know about these limitations of JS and they opt for similar strategies, although I have seen
In several cases, which is a subject that is not given great importance, companies
They are willing to lose pennies because of rounding.

In practice, it works with decimals of many digits and is rounded without any criteria, or is usually used
String methods to comment with numbers what I consider a serious practice, STRINGS and Numbers should not be mixed
and then do a casting. I have worked on several projects and this path has led me to a successful conclusion.
