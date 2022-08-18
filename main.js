const fs = require('fs/promises');
var da = [new Set(),new Set(),new Set()]
var exc=[]
var page = ['page1.txt','page2.txt','page3.txt','exclude-words.txt']
var i=0
var index={}


async function example() {
  try {
    
        var data = await fs.readFile(page[i], { encoding: 'utf8' });
        data.split(/[\s,\n\d+\t\:'-/"”“.()]+/).forEach(f=>{
            if(page[i]=='exclude-words.txt'){
                exc.push(f)
            }
            else{
                da[i].add(f)
            }
        })
        if(i<page.length-1){
            i=i+1
            await example()
        }

    
  } catch (err) {
    console.log(err);
  }
}

(async () => {
    await example()
   
   da.forEach(e=>{
    e.forEach(f=>{
        if(exc.indexOf(f)==-1){
            
            if(index[f]){
                var v = da.indexOf(e)+1
                index[f]=(index[f]+','+v).match(/\d+/g).map(Number)
            }
            else{
                index[f]=[da.indexOf(e)+1]
            }
        }
    })
   })
   var ordered=[]
   Object.keys(index).sort().reduce(
    (obj, key) => { 
      obj = key+':'+index[key]
      
      ordered.push(obj)
    }, 
    {}
  );
  fs.appendFile('mynewfile1.txt', "Word : Page Numbers"+"\n"+"-------------------"+"\n")
  ordered.forEach(e=>{
    fs.appendFile('mynewfile1.txt', e+"\n")
  })
  Object.keys(ordered).forEach(e=>{
    
    
  })
  
})();



