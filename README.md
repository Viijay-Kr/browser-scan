## Can I use CSS

### Problem Statement

Modern browsers comes with the good support of modern CSS3 properties and we as front end developers tend to use them naively. However application these targets variety of users across demographics and devices . These group of users uses legacy to modern browsers where some of the features will tend to break the user experience

### Solution

Checking every CSS property we right is pretty painful and time consuming process. ‘Can I use' database helps developers to check their code against compatibility. Even more smarter solutions/tools does this automatically. This is where 'doiuse’ shines well. This tool lints your css code for browser support against can I use database.

### Project Description

Do I use is a great start , but its like any other command line tool. This project will use the tool in an application which could take a browser(predefined) as input ,scans the scss/css modules in the project and builds a output

#### Input

A simple select field that takes a browser as input

#### API

A rest api that takes the input , scans the project and spits the output as json

#### Output

The output from the api shall be represented in the tabular format with the following attributes

- Browser Version
- Vulnerable Properties
- Path to the file
