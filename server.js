const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster){
  //Cause server.js to execute again but in child mode
  // cluster.fork() create a new instance of server in else block
  cluster.fork()
  cluster.fork()
 /* cluster.fork()
  cluster.fork()
  cluster.fork()*/
} else {
// I am chils .. and i am going to act as server
  const express = require('express');
  const app = express();

  function heavyTask(duration){
    const start = Date.now();
    while(Date.now() - start < duration){}

  }

  app.get('/', (req,res)=>{
    console.log("heavy starts");
    heavyTask(10000)
    console.log("heavy done")
    return res.send("Hi There")
  });
app.get('/fast', (req, res)=>{
  console.log('fast');
  return res.send("I am fast, beacuse i'm using node cluster." +
      "To test just open homepage it will take 10 sec to load due to heavy task assigned to it." +
      " Then instently load /fast. " +
      "this will load instantly because this page is loaded by by second instance of server, " +
      "while the first instance thread was blocked due to " +
      "heavyTask assined to home page which takes 10 sec to resolve. " +
      "And then it will be free to take another tasks.  ")
});

  app.listen(3000, ()=>{
    console.log("Listening on port 3000")
  })
}
