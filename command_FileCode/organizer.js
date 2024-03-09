let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");

let types =
{
    media:["mp4","mkv"],
    archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
    document:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odz','odf','txt','ps'],
    app:['exe','dmg','pkg',"deb"]
}

function organizeFun(dirPath)
{
    /* 
       Task steps to Complete 
       1. input -> direcotory path from user
       2. Create -> organizeFile -> direcotory
       3. identify categories of all files present in that input direcotory
       4. copy / cut files to that organized inside of any of category folder
     */

       // 1. input -> direcotory path from user
       let destpath;
       if(dirPath==undefined)
       {
          destpath = process.cwd();
          return;
       }
       else  // 2. Create -> organizeFile -> direcotory
       {
           let doesexist = fs.existsSync(dirPath);
           if(doesexist)
           {
                destpath = path.join(dirPath,"organizedfiles");
                if(fs.existsSync(destpath)==false)
                {
                    fs.mkdirSync(destpath);
                }
           }
           else
           {
                console.log("please input correct path");
                return;
           }
       }
       //3. identify categories of all files present in that input direcotory
       organizeHelper(dirPath,destpath)
}

function organizeHelper(src,dest)
{
    // 3. identify categories of all files present in that input direcotory
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for(let i=0;i<childNames.length;i++)
    {
        let childAddress = path.join(src,childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile
        
        if(isFile)
        {
            // console.log(childNames[i]);
            let FileCategory = getCategory(childNames[i]);
            console.log(childNames[i],"belong to ->",FileCategory);
            // 4. copy / cut files to that organized inside of any of category folder
            sendFiles(childAddress,dest,FileCategory);

            
        }
    }
}

function getCategory(name)
{
    let ext = path.extname(name);
    ext = ext.slice(1); // . remove karne ke liye
    
    for(let type in types)
    {
        let cTypeArray = types[type];
        for(let i=0;i<cTypeArray.length;i++)
        {
            if(ext==cTypeArray[i])
            {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcfilepathName,dest,FileCategory)
{
    let categoryPath = path.join(dest,FileCategory);
    if(fs.existsSync(categoryPath)==false)
    {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcfilepathName);
    let destFilePath = path.join(categoryPath,fileName);
    fs.copyFileSync(srcfilepathName,destFilePath); 
    fs.unlinkSync(srcfilepathName);  //this code of line will be delete that file which had copied
    console.log(fileName,"copied into", FileCategory);
}

module.exports={
    organizeFun:organizeFun
}
