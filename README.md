# web-01
Web programming project: migration of an old MEM-Ory project to new technologies

TP QUESTIONS:

1. The package-lock.json file freezes the versions of the project's dependencies, ensuring that the project is reliable and reproducible across its various installations, and that all those working on it have the same versions, thus avoiding conflicts.

2. By convention, all NPM dependencies use a 3-digit format for version numbers.we call it  semantic versioning

3. What is a devDependency exactly? What are the differences with a
dependency?
devDependencies are not installed when the project is imported as a package into another project (with npm install "$package"), whereas normal dependencies are. 

4. What is a closure/iife ? What was it used for ? What replaced it?
IIFE (Immediately Invoked Function Expression) is a JavaScript model in which a function is defined and immediately executed. It is used to create private variables and encapsulate code. With ES6, it has been replaced by a more structured way of managing scope and dependencies, notably with named imports.

5. What is the difference between import * from './utils' and import { parseUrl } from './utils'? What can be the consequences of using one instead of the other?
Using * imports all functions, which are exported, present in the utils file, whereas { parseUrl } imports only the parseUrl function. Using * can lead to errors or confusion if two methods have the same name.

6. Can you think of at least 2 things that are possible with Java classes, but cannot be done with ES6 classes? 
In ES6, there are no overloading and interface

7. What are the differences between var and let;
var is used to define a variable on the global scope or function scope where it has been defined. let is defined in module scope or block scope. It is preferable to use let, since var 's operation causes pollution of the global scope.


8. What is the .bind(this) stuff? What happens if you delete it? Is it needed when using an arrow function ? why ?
he .bind(this) allows you to bind a context to a function, where the context in this case is this. If you delete .bind(this), the function's context will be the one used to call the function. The arrow function automatically captures the this context, which is the context where it was declared. The .bind(this) is therefore not useful.

9. What does the @ symbol mean in @babel/***?
The @ symbol is used to indicate a package namespace in the npm package.

10. The advantages of Promises are: simpler asynchronous management, improved code readability, better error handling (.catch()), ability to chain methods in succession

11. What version of ECMAScript async / await was released in ?
Les fonctionnalités async/await ont été ajoutées dans la version d'ECMAScript 2017, ES8.

12. Component-oriented programming for the web is considered more
maintainable. Why?
Object-oriented programming for the web is considered easier to maintain, as it allows modularization, encapsulation and code reuse, for greater ease of debugging, testing and updating.

13. What is Functional programming?
Functional programming is a programming paradigm based on the use of functions to write programs. functions can be passed as arguments to other functions, returned by other functions, and stored in variables.

14. Explain what the map() function does ?
map() method creates a new array with the results of calling a provided function on every element in this array.

15. Explain what the filter() function does ?
The filter() method is a method that provides a cleaner syntax to filter through an array. It returns new elements in a new array without altering the original array.

16. Explain what the reduce() function does ?
The reduce() function applies a given function with an accumulator to a collection of elements, in order to reduce the collection to a single element, and returns it.

17. What is the difference between .then() and async/await when
handling asynchronous functions?
".then()" is like a set of tasks to be done one after the other, you can chain together several then() and it doesn't block the code, whereas "async/await" is more like pausing and resuming when something is ready, simulating synchronous behavior. Await alone blocks code execution.

18. What does the _ prefix mean on a sass file?
the _ prefix in a sass file indicates that the file is partial, and should be imported into another sass file rather than compiled on its own.
