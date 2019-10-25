function solve(day){
    let daysAll={
        monday:1,tuesday:2,wednesday:3,thursday:4,friday:5,saturday:6,sunday:7
    };
   let dayLC=day.toLowerCase();
  let result=daysAll[dayLC];
  if (result===undefined){
    console.log("error");
  }
  else{
      console.log(daysAll[dayLC]);
  }
}

solve("Tuesday");