# Harry Francis - CSE Skill Test

## Task

The task is to model a supermarket pricing calculator in software. This is inspired by PragDave’s Supermarket Kata.

You should write a program which works out how to price a shopping basket, allowing for different pricing structures including:

•     Three tins of beans for the price of two

•     Onions for 29p / kg

•     Two cans of coca-cola for £1

•     Any 3 ales from the set {…} for £6

Here’s an example of a receipt illustrating the type of output that should be possible (although your program doesn’t need to produce nicely formatted output like this):

The task is to model a supermarket pricing calculator in software. This is inspired by PragDave’s Supermarket Kata.

You should write a program which works out how to price a shopping basket, allowing for different pricing structures including:

•     Three tins of beans for the price of two

•     Onions for 29p / kg

•     Two cans of coca-cola for £1

•     Any 3 ales from the set {…} for £6

Here’s an example of a receipt illustrating the type of output that should be possible (although your program doesn’t need to produce nicely formatted output like this):

 

Beans

0.50

Beans

0.50

Beans

0.50

Coke

0.70

Coke

0.70

Oranges


0.200 kg @ £1.99/kg

0.40

Sub-total

3.30

Savings
 

Beans 3 for 2

-0.50

Coke 2 for £1

-0.40

Total savings

-0.90

Total to Pay

2.40

 

We’d like you to do your work under version control (preferably using git) and provide us with a copy of the repository when you have finished (by showing us a GitHub / similar repository, or sending us a zip of the repository if you prefer).

Your work does not need to account for user interface or IO; we are interested in how you represent a basket of things and a set of pricing rules, how you compute the correct price for the basket, and what you have done to assess the correctness of what you have made.

You should be designing with some thought to how the requirements might change and assessing the ways they are incomplete.

We would also like the repository to contain a README explaining what you have done, how to use your work, and any trade-offs, limitations or particularly excellent features of what you have made.

We would prefer if you use some of the technologies we are most familiar with, so ideally this would be written in one of Python, Clojure, Java or Javascript. We understand that we’re asking you to do work in your free time and that this might be hard to accommodate, so please do not feel you have to spend ages on it.

We’d like you to do your work under version control (preferably using git) and provide us with a copy of the repository when you have finished (by showing us a GitHub / similar repository, or sending us a zip of the repository if you prefer).

Your work does not need to account for user interface or IO; we are interested in how you represent a basket of things and a set of pricing rules, how you compute the correct price for the basket, and what you have done to assess the correctness of what you have made.

You should be designing with some thought to how the requirements might change and assessing the ways they are incomplete.

We would also like the repository to contain a README explaining what you have done, how to use your work, and any trade-offs, limitations or particularly excellent features of what you have made.

We would prefer if you use some of the technologies we are most familiar with, so ideally this would be written in one of Python, Clojure, Java or Javascript. We understand that we’re asking you to do work in your free time and that this might be hard to accommodate, so please do not feel you have to spend ages on it.

## First thoughts to approach

I will be using javascript, as this is the scripting language I am most comfortable using. I will be writing in modern syntax making use of ES6 function, as this is well supported now (gone are the days of supporting IE!).

I will need an input that will hold the items to be purchased, including the item name (or ID?), the quantity and weight (in KG).

- basket = [{id = number, quantity = number, weight = number}]

I will need a dataset containing each items id, title and base price (assuming price is per kg, if a weight is given)

- price_data = [{id = number, title = string, price = number}]

I will need a dataset of discounts that contains the title, trigger scenario, and the saving (although I'm skeptical I can format this all in the same way, so might instead just create a function at the end that manages the discount)

This data will be passed through a class that will build the receipt and apply the discounts.

I will create a very brief layout in html to display the receipt, using tailwind to throw some quick styles together.

## Usage

- Start watching for changes in tailwind
    - `npx tailwindcss -i ./public/input.css -o ./public/output.css --watch`

## 

- Uses JavaScripts 'customElements'
- Uses class objects