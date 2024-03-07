let inputArr = process.argv.slice(2);
console.log(inputArr);

// node main.js tree "directoryPath"
//node main.js organizer "directoryPath"
//node main.js help

let command = inputArr[0];  //
let dirpath = inputArr[1];

switch(command)
{
    case "tree":
        treeFun(dirpath);
        break;
    case "organize":
        organizeFun(dirpath);
        break;
    case "help":
        helperFun();
        break;
    default:
        console.log(`
        List of All Commands
          node main.js tree "directoryPath
          node main.js organizer "directoryPath
          node main.js help
        `);
}

function treeFun(dirPath)
{

}

function organizeFun(dirPath)
{

}

function helperFun()
{

}
