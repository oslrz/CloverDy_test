const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();


app.use(cors())
const jsonParser = express.json();

app.get('/', (req, res) => {
  let file = JSON.parse(fs.readFileSync('data.json'))
  res.send(file)
});

app.post('/createList',jsonParser,(req,res)=>{
  const title = req.body.list_name
  const code = req.body.code
  let file = JSON.parse(fs.readFileSync('data.json'));
  file.data[file.data.length] = {name:title,id:code}
  fs.writeFileSync('data.json',JSON.stringify(file))
  res.send('ok')
})

app.post('/addToList',jsonParser,(req,res)=>{
  const title = req.body.list_name;
  const text = req.body.text;
  const code = req.body.code;
  const date = req.body.date;
  console.log('title',title);
  console.log('text',text);
  let file = JSON.parse(fs.readFileSync('data.json'));
  for(let i = 0; i < file.data.length ; i++){
    console.log(file[i])
    if(file.data[i].name === title){
      if(file.data[i].items === undefined){
        let item = []
        item.push({text:text,id:code,date:date})
        file.data[i].items = item;
      }else{
        file.data[i].items.push({text:text,id:code,date:date})
      }
    }
  }
  fs.writeFileSync('data.json',JSON.stringify(file))
  res.send('ok')
})

app.post('/delFromList',jsonParser,(req,res)=>{
  const id = req.body.code;
  const post_id = req.body.post_id;
  let file = JSON.parse(fs.readFileSync('data.json'));
  let new_items =[];
  for(let i = 0; i < file.data.length ; i++){
    if(file.data[i].id === post_id){
      let items = file.data[i].items;
      console.log(items)
      for(let j = 0;j<items.length;j++){
        if(items[j].id !== id){
          new_items.push(items[j])
        }
      }
      console.log(new_items)
      file.data[i].items = new_items;
    }
  }
  fs.writeFileSync('data.json',JSON.stringify(file))
  res.send('ok')
})

app.post('/delList',jsonParser,(req,res)=>{
  const list_id = req.body.code;
  let file = JSON.parse(fs.readFileSync('data.json'));
  let new_file = []
  for(let i = 0; i < file.data.length ; i++){
    if(file.data[i].id !== list_id){
      new_file.push(file.data[i])
    }
  }
  file.data = new_file;
  fs.writeFileSync('data.json',JSON.stringify(file))
  res.send('ok')
})

app.post('/moveItem',jsonParser,(req,res)=>{
  const tableId = req.body.table;
  const elemId = req.body.elem;
  let item ='';
  let new_item = []
  console.log('tableId',tableId);
  console.log('elemId',elemId);
  let file = JSON.parse(fs.readFileSync('data.json'));
  for(let i = 0;i<file.data.length;i++){
    let items = file.data[i].items;
    for(let j = 0;j<items.length;j++){
      //console.log('id '+elemId,items[j].id)
      if(items[j].id === parseInt(elemId)){
        item = items[j];
      }else{
        new_item.push(items[j])
      }
    }
    file.data[i].items = new_item;
    new_item = []
  }
  for(let i = 0;i<file.data.length;i++){
    console.log(file.data[i].id)
    if(file.data[i].id === parseInt(tableId)){
      file.data[i].items.push(item)
    }
  }
  fs.writeFileSync('data.json',JSON.stringify(file))
  res.send('ok')
  // console.log('item',item)
})

 
app.listen(9000, () =>
  console.log('Example app listening on port 9000!'),
);