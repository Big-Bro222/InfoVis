var w =3000;
var h= 3000;

function preload(){
  table=loadTable("RER-Boo.csv","csv","header");
}
function setup() {
  c=createCanvas(w,h);
  
  AccidentTypes= table.getColumn("AccidentType");
  AccidentDates=table.getColumn("Date");
  AccidentTimes=table.getColumn("Time");
  Reasons=table.getColumn("Reason");
  AccidentDaysofWeek=StringtoDateArray();
  
  
  var AccidentInfos=[];
  for(let i=0;i<=AccidentTypes.length-1;i++){
     var AccidentInfo= new Object();
     AccidentInfo.Type=AccidentTypes[i];
     AccidentInfo.Date=AccidentDates[i];
     AccidentInfo.Time=AccidentTimes[i];
     AccidentInfo.DayofWeek=AccidentDaysofWeek[i];
     AccidentInfo.Reason=Reasons[i];
     AccidentInfos.push(AccidentInfo);
  }
  console.log(AccidentInfos);
  nightingaleColor = new Array("#FF5733","#58FF33","#FFCE33","#33FFE9","#3383FF","#8033FF","#F300FF","#FF001F","#5D9536","#363D95");
  InfoChart=new InfoChart();
  Bars = new Array()
  for(let i=1;i<=12;i++){
    for (let j = 0; j < 6; j++) {
      Bars.push(new Bar(i,j));
    }
  }
}
//convert time+date into Date type
function StringtoDateArray(){
  let timeArray=new Array();
  for(var i=0;i<AccidentDates.length;i++){
    var d = new Date(AccidentDates[i]).getDay();
    timeArray.push(d);
  }
  return timeArray; 
}


function draw() {
  //TODO del;
  noLoop();
  let backgroundColor = color('magenta');
  background(backgroundColor);
  
    for (let j = 0; j < 6; j++) {
      textSize(32);
      text(j+2013, 100, 650+j*210);
      }
    for(let i=1;i<=12;i++){
      textSize(32);
      text(i, 90+i*210, 1850);
      }
  
  Bars.forEach(element => {
    element.display();
  });
  InfoChart.display();
  //rect(200,1850,15,15);
}



class Bar{
  constructor(a,b){
    this.column=a;
    this.row=b;
    this.width=200;
    this.length=200;
    this.gap=10;
    this.padding=20;
    this.month=a;
    this.year=b+2013;
  }
  display(){
    //variable setup
    let originPointX=-this.gap+this.column*(this.width+this.gap);
    let originPointY=1600-this.row*(this.length+this.gap);

    
    //draw square background
    let c = color(255, 204, 0);

    fill(c); 
    strokeWeight(1);
    stroke(51);
    rect(originPointX,originPointY,this.width,this.length); 

    
    //draw circular chart

  }
  }



class InfoChart{
  constructor(){
     this.X=100;
     this.Y=100;
  }
  display(){
    for(var i=0;i<nightingaleColor.length;i++){
      fill(color(nightingaleColor[i]));
      rect(this.X,this.Y+i*40,20,20);
      fill(color("black"));
      textSize(12);
      textAlign(LEFT, CENTER);
      if(i==0){
        text("Before 7 ", this.X+40, this.Y+10+i*40);
      }else if(i==9){
        text("After 23 ",this.X+40, this.Y+10+i*40)
      }else{
        text((2*i+5)+" to " +(2*i+7), this.X+40, this.Y+10+i*40);
      }

    }
     
  }
}








