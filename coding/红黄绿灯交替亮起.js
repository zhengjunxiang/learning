function red() {
    console.log('red');
  }
  
  function green() {
    console.log('green');
  }
  
  function yellow() {
    console.log('yellow');
  }
  
  
  let myLight = (timer, cb) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        cb();
        resolve();
      }, timer);
    });
  };


  let myStep = () => {
    Promise.resolve().then(() => {
      return myLight(3000, red);
    }).then(() => {
      return myLight(2000, green);
    }).then(()=>{
      myLight(1000, yellow);
    }).then(()=>{
      return myStep();
    })
  };
  myStep();
  // output:
  // => red
  // => green
  // => yellow
  // => red
  // => green
  // => yellow
  // => red
  