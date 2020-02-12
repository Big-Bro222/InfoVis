var w =3000;
var h= 3000;

function preload(){
  table=loadTable("RER-Boo.csv","csv","header");
}
function setup() {
  c=createCanvas(w,h);
  
  AccidentTypes= table.getColumn("AccidentType");
  AccidentDates=StringtoDateArray(table.getColumn("Date"));
  AccidentTimes=table.getColumn("Time");
  Reasons=table.getColumn("Reason");
  
  
  AccidentInfos=[];
  for(let i=0;i<=AccidentTypes.length-1;i++){
     var AccidentInfo= new Object();
     AccidentInfo.Type=AccidentTypes[i];
     AccidentInfo.Date=AccidentDates[i];
     AccidentInfo.Time=AccidentTimes[i];
     AccidentInfo.DayofWeek=AccidentDates[i].getDay();
     AccidentInfo.Reason=Reasons[i];
     AccidentInfos.push(AccidentInfo);
  }
  //console.log(AccidentInfos);
  nightingaleColor = new Array("#FF5733","#58FF33","#FFCE33","#33FFE9","#3383FF","#8033FF","#F300FF","#FF001F","#5D9536","#363D95");
  //InfoChart=new InfoChart();
  Bars = new Array()
  for(let i=1;i<=12;i++){
    for (let j = 0; j < 6; j++) {
      Bars.push(new Bar(i,j));
    }
  }
}
//convert time+date into Date type
function StringtoDateArray(Acc){
  let timeArray=new Array();
  for(var i=0;i<Acc.length;i++){
    var d = new Date(Acc[i]);
    timeArray.push(d);
  }
  return timeArray; 
}

function mousePressed(){
  Bars.forEach(element => {
    element.click();
  });
}
function draw() {
  //TODO del;
  noLoop();
  let backgroundColor = color('magenta');
  background(backgroundColor);
  
    for (let j = 0; j < 6; j++) {
      textSize(32);
      text(2018-j, 100, 650+j*210);
      }
    for(let i=1;i<=12;i++){
      textSize(32);
      text(i, 90+i*210, 1850);
      }
  
  Bars.forEach(element => {
    element.display();
  });
  //InfoChart.display();
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
    this.PerturbationArray=[0,0,0,0,0,0,0];
    this.InterruptionArray=[0,0,0,0,0,0,0];
    this.OtherArray=[0,0,0,0,0,0,0];
    this.Line=new Line();
    this.originPointX=-this.gap+this.column*(this.width+this.gap);
    this.originPointY=1600-this.row*(this.length+this.gap);
  }
  display(){

    AccidentInfos.forEach(element => {
      var YearMonthMatch=element.Date.getFullYear()==this.year&&(element.Date.getMonth()==this.month||element.Date.getMonth()+12==this.month);
      if(YearMonthMatch){
        if(element.Type=='perturbation'){
          this.PerturbationArray[element.DayofWeek]++;
        }
        else if(element.Type=='interruption')
        {
          this.InterruptionArray[element.DayofWeek]++;
        }else{
          this.OtherArray[element.DayofWeek]++;
        }
      }
    });
    
    console.log(this.OtherArray);

    
    //draw square background
    let c = color(255, 204, 0);

    fill(c); 
    strokeWeight(1);
    stroke(51);
    rect(this.originPointX,this.originPointY,this.width,this.length); 
    fill(color('white'));
    rect(this.originPointX+this.padding,this.originPointY+this.padding,this.width-2*this.padding,this.length-2*this.padding);
    this.DrawLineChart(this.originPointX, this.originPointY,this.PerturbationArray,[255,255,0]);
    this.DrawLineChart(this.originPointX, this.originPointY,this.InterruptionArray,[255,0,0]);
    this.DrawLineChart(this.originPointX, this.originPointY,this.OtherArray,[0,0,255]);
    //draw circular chart

  }
  click(){
    console.log(mouseX,mouseY);
    var XinRange=mouseX>this.originPointX&&mouseX<this.originPointX+this.width;
    var YinRange=mouseY>this.originPointY&&mouseY<this.originPointY+this.length;
    if(XinRange&&YinRange){
      console.log(this.year+" and "+this.month);
      this.Line.display(mouseX,mouseY);
    }
  }
  DrawLineChart(originPointX, originPointY,AccidentCountDayofWeek,color) {
    fill(color[0],color[1],color[2],63);
    let multiply=12;
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < AccidentCountDayofWeek.length; i++) {
      vertex(originPointX + 25 * i + (this.width - 6 * 25) / 2, originPointY + this.width - this.padding - AccidentCountDayofWeek[i] * multiply);
    }
    vertex(originPointX+this.width-this.padding,originPointY+this.length-this.padding);
    vertex(originPointX+this.padding,originPointY+this.length-this.padding);
    // 结束绘制图形
    endShape();

    strokeWeight(9);
    for (let i = 0; i < AccidentCountDayofWeek.length; i++) {
      point(originPointX + 25 * i + (this.width - 6 * 25) / 2, originPointY + this.width - this.padding - AccidentCountDayofWeek[i] * multiply);
    }
  }
  }


class Line{
  constructor(){

  }
  display(x,y){
    console.log(x+" "+y);
    rect(x,y,20,20);
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








