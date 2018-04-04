In this assignment, we would like to implement a client-side puzzle game using HTML tables and JavaScript.

##### DESCRIPTION:
This puzzle is made up of a n by m table containing numbers are given at the top (and left side) of the table to indicate the number of unbroken “marked” lines in each column (and row). The player’s job is to solve the puzzle by filling the cells of the table accordingly. The following is an example of a puzzle along with its solution.

Begin by creating a puzzle of your own (suggestion: start small, then work your way up). You may choose the size of the board and your solution; your puzzle doesn’t have to be as large as the one above. You will initialize the puzzle board when the webpage is first loaded. Users will then be able to click on each table cell to toggle it from “unmarked” to “marked” (and vice versa). When the user has marked each cell according to the solution, a “CONGRATULATIONS” alert should appear in the browser.

It is totally up to you how you would like to organize your code. But here are several requirements:
- The puzzle board must be represented using a <table> tag.
- There should be a button to reset the puzzle
- There should be a button to reveal the answer (to save me the time to solve it :P)
- The dimensions of the table must be at least 12 by 12.
- At least half of the rows and half of the columns must contain a break in lines (i.e. the numbers along the top and along the left side cannot all be single values :)
- You may not use frameworks such as jQuery or Bootstrap. If you are unsure if something is allowed, please ask either Bobby or one of the TAs.
