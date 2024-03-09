#!/usr/bin/env nodejs
let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

// My build Modules
let helper = require("./command_FileCode/help");
let tree = require("./command_FileCode/tree");
let organize = require('./command_FileCode/organizer');
// const { types } = require("util");
console.log(inputArr);


// node main.js tree "directoryPath"
//node main.js organizer "directoryPath"
//node main.js help

let command = inputArr[0];

switch(command)
{
    case "tree":
        tree.treeFun(inputArr[1]);
        break;
    case "organize":
        organize.organizeFun(inputArr[1]);
        break;
    case "help":
        helper.helperFun;
        break;
    default:
        console.log(`
        List of All Commands
          node main.js tree "directoryPath
          node main.js organizer "directoryPath
          node main.js help
        `);
 }

