let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");


function treeFun(dirPath)
{
    
    if(dirPath==undefined)
    {
       treeFun(process.cwd());
       return;
    }
    else  // 2. Create -> organizeFile -> direcotory
    {
        let doesexist = fs.existsSync(dirPath);
        if(doesexist)
        {
             treeFunHelper(dirPath);
        }
        else
        {
             console.log("please input correct path");
             return;
        }
    }
}
function treeFunHelper(dirPath,indent)
{
    //check is file or folder
    let isFile = fs.lstatSync(dirPath).isFile();

    if(isFile==true)
    {
      let fileName = path.basename(dirPath);
      console.log(indent+"├──"+fileName);
    }
    else  // print the folder and call recursive for otehr file
    {
        let dirName = path.basename(dirPath);
        console.log(indent+ "└──"+dirName);
        let children = fs.readdirSync(dirPath);
        for(let i=0;i<children.length;i++)
        {
            let childpath = path.join(dirPath,children[i]);
            treeFunHelper(childpath,indent+"\t");
        }
    }
}

module.exports={
    treeFun:treeFun
}