var w =2800;
var h= 3500;

function preload(){
  table=loadTable("rerb.csv","csv","header");
}
function setup() {
  c=createCanvas(w,h);
  c.mouseMoved(MouseOver);
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

  nightingaleColor = new Array("#FF5733","#58FF33","#FFCE33","#33FFE9","#3383FF","#8033FF","#F300FF","#FF001F","#5D9536","#363D95");
  //InfoChart=new InfoChart();
  
  Bars = new Array();
  for(let i=0;i<7;i++){
    Bars[i]=new Array(12);
    for (let j=0;j<12;j++){
      var PerturbationArray=[0,0,0,0,0,0,0];
      var InterruptionArray=[0,0,0,0,0,0,0];
      var OtherArray=[0,0,0,0,0,0,0];
      AccidentArray=[PerturbationArray,InterruptionArray,OtherArray]
      AccidentInfos.forEach(element => {
        var YearMonthMatch=element.Date.getFullYear()==i+2013&&(element.Date.getMonth()==j||element.Date.getMonth()+12==j);
        if(YearMonthMatch){
          if(element.Type=='perturbation'){
            PerturbationArray[element.DayofWeek]++;
          }
          else if(element.Type=='interruption')
          {
            InterruptionArray[element.DayofWeek]++;
          }else{
            OtherArray[element.DayofWeek]++;
          }
        }
      });

      Bars[i][j]=new Bar(j,i,AccidentArray);
    }
  }
  PriviousBar=Bars[0][0];
  
  ReasonChart=new ReasonChart();
  ReasonChart.setup();
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
function MouseOver(){
  cor=[0,0];
  cor=CalculateCor(mouseX,mouseY);
  if(cor[0]!=-1&&cor[1]!=-1){
    if(PriviousBar!=Bars[cor[1],cor[0]]){
      PriviousBar.mouseOut();
    }

    Bars[cor[1]][cor[0]].mouseOver();
    PriviousBar=Bars[cor[1]][cor[0]];
  }

  ReasonChart.mouseOver();
  
}
function CalculateCor(x,y){
  var SquareSize=200;
  var gap=10;
  var padding=20;
  var X=195;
  var Y=555;
  var cor=[0,0];
  if(x>X+padding&&x<X+SquareSize-padding){
     cor[0]=0;
  }else if(x>X+SquareSize+gap+padding&&x<X+2*SquareSize-padding+gap){
     cor[0]=1;
  }else if(x>X+2*SquareSize+2*gap+padding&&x<X+3*SquareSize+2*gap-padding){
     cor[0]=2;
  }else if(x>X+3*SquareSize+3*gap+padding&&x<X+4*SquareSize+3*gap-padding){
     cor[0]=3;
  }else if(x>X+4*SquareSize+4*gap+padding&&x<X+5*SquareSize+4*gap-padding){
     cor[0]=4;
  }else if(x>X+5*SquareSize+5*gap+padding&&x<X+6*SquareSize+5*gap-padding){
     cor[0]=5;
  }else if(x>X+6*SquareSize+6*gap+padding&&x<X+7*SquareSize+6*gap-padding){
     cor[0]=6;
  }else if(x>X+7*SquareSize+7*gap+padding&&x<X+8*SquareSize+7*gap-padding){
     cor[0]=7;
  }else if(x>X+8*SquareSize+8*gap+padding&&x<X+9*SquareSize+8*gap-padding){
    cor[0]=8;
  }else if(x>X+9*SquareSize+9*gap+padding&&x<X+10*SquareSize+9*gap-padding){
    cor[0]=9;
  }else if(x>X+10*SquareSize+10*gap+padding&&x<X+11*SquareSize+10*gap-padding){
    cor[0]=10;
  }else if(x>X+11*SquareSize+11*gap+padding&&x<X+12*SquareSize+11*gap-padding){
    cor[0]=11;
  }else {
    // console.log("hover on gap x");
    cor[0]=-1;
  } 

  
  if(y>Y+padding-SquareSize-gap&&y<Y+SquareSize-padding-SquareSize-gap){
      cor[1]=6;
  }else if(y>Y+padding&&y<Y+SquareSize-padding){
      cor[1]=5;
  }else if(y>Y+SquareSize+gap+padding&&y<Y+2*SquareSize-padding+gap){
      cor[1]=4;
  }else if(y>Y+2*SquareSize+2*gap+padding&&y<Y+3*SquareSize+2*gap-padding){
      cor[1]=3;
  }else if(y>Y+3*SquareSize+3*gap+padding&&y<Y+4*SquareSize+3*gap-padding){
      cor[1]=2;
  }else if(y>Y+4*SquareSize+4*gap+padding&&y<Y+5*SquareSize+4*gap-padding){
      cor[1]=1;
  }else if(y>Y+5*SquareSize+5*gap+padding&&y<Y+6*SquareSize+5*gap-padding){
      cor[1]=0;
  }else{
    // console.log("hover on gap y");
    cor[1]=-1;
  }


  return cor;
}

function draw() {
  //TODO del;
  noLoop();
  let backgroundColor = color('magenta');
  background(backgroundColor);
  
    for (let j = 0; j < 7; j++) {
      textSize(32);
      text(2019-j, 100, 450+j*210);
      }
    for(let i=1;i<=12;i++){
      textSize(32);
      text(i, 90+i*210, 1850);
      }
  Barsss=[].concat.apply([],Bars);
  Barsss.forEach(element => {
    element.display();
  });
  
  ReasonChart.display();
  //InfoChart.display();
}



class Bar{
  constructor(a,b,AccidentArray){
    this.column=a;
    this.row=b;
    this.size=200;
    // this.width=200;
    // this.length=200;
    this.gap=10;
    this.padding=20;
    this.month=a+1;
    this.year=b+2013;
    this.PerturbationArray=AccidentArray[0];
    this.InterruptionArray=AccidentArray[1];
    this.OtherArray=AccidentArray[2];
    this.originPointX=200-this.gap+this.column*(this.size+this.gap);
    this.originPointY=1600-this.row*(this.size+this.gap);
  }
  display(){
    //draw square background
    let c = color(255, 204, 0);

    fill(c); 
    strokeWeight(1);
    stroke(51);
    rect(this.originPointX,this.originPointY,this.size,this.size); 
    fill(color('white'));
    rect(this.originPointX+this.padding,this.originPointY+this.padding,this.size-2*this.padding,this.size-2*this.padding);
    this.DrawLineChart(this.originPointX, this.originPointY,this.PerturbationArray,[255,255,0]);
    this.DrawLineChart(this.originPointX, this.originPointY,this.InterruptionArray,[255,0,0]);
    this.DrawLineChart(this.originPointX, this.originPointY,this.OtherArray,[0,0,255]);
    
    //draw circular chart

  }
  mouseOver(){
      // console.log(this.year+" and "+this.month);
          this.display();
          strokeWeight(1);
          for(let i=0;i<7;i++){
            if(mouseX>this.originPointX + 25 * i + (this.size - 6 * 25) / 2-12.5&&mouseX<this.originPointX + 25 * i + (this.size - 6 * 25) / 2+12.5){
              line(this.originPointX + 25 * i + (this.size - 6 * 25) / 2,this.originPointY+this.padding,this.originPointX + 25 * i + (this.size - 6 * 25) / 2,this.originPointY+this.size-this.padding);
              var labeldown=mouseY>this.originPointY+this.padding&&mouseY<this.originPointY+this.size/2;
              var labelright=mouseX>this.originPointX+this.padding&&mouseX<this.originPointX+this.size/2;
              if(labeldown&&labelright){
                rect(mouseX,mouseY,90,50);
                fill(color("black"));
                textSize(10);
                textAlign(LEFT, CENTER);
                text("Perturbation: "+this.PerturbationArray[i],mouseX+10, mouseY+10);
                text("Interruption: "+this.InterruptionArray[i],mouseX+10, mouseY+20);
                text("Other: "+this.OtherArray[i],mouseX+10, mouseY+30);
    
              }else if(!labeldown&&labelright){
                rect(mouseX,mouseY-50,90,50);
                fill(color("black"));
                textSize(10);
                textAlign(LEFT, CENTER);
                text("Perturbation: "+this.PerturbationArray[i],mouseX+10, mouseY-40);
                text("Interruption: "+this.InterruptionArray[i],mouseX+10, mouseY-30);
                text("Other: "+this.OtherArray[i],mouseX+10, mouseY-20);
    
              }else if(!labeldown&&!labelright){
                rect(mouseX-90,mouseY-50,90,50);
                fill(color("black"));
                textSize(10);
                textAlign(LEFT, CENTER);
                text("Perturbation: "+this.PerturbationArray[i],mouseX-80, mouseY-40);
                text("Interruption: "+this.InterruptionArray[i],mouseX-80, mouseY-30);
                text("Other: "+this.OtherArray[i],mouseX-80, mouseY-20);
    
              }else{
                rect(mouseX-90,mouseY,90,50);
                fill(color("black"));
                textSize(10);
                textAlign(LEFT, CENTER);
                text("Perturbation: "+this.PerturbationArray[i],mouseX-80, mouseY+10);
                text("Interruption: "+this.InterruptionArray[i],mouseX-80, mouseY+20);
                text("Other: "+this.OtherArray[i],mouseX-80, mouseY+30);
    
              }
            }
            
          }
          

          
        
      
    
  }
  mouseOut(){
    this.display();
  }
  DrawLineChart(originPointX, originPointY,AccidentCountDayofWeek,color) {
    fill(color[0],color[1],color[2],63);
    let multiply=12;
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < AccidentCountDayofWeek.length; i++) {
      vertex(originPointX + 25 * i + (this.size - 6 * 25) / 2, originPointY + this.size - this.padding - AccidentCountDayofWeek[i] * multiply);
    }
    vertex(originPointX+this.size-this.padding,originPointY+this.size-this.padding);
    vertex(originPointX+this.padding,originPointY+this.size-this.padding);
    // 结束绘制图形
    endShape();

    strokeWeight(9);
    for (let i = 0; i < AccidentCountDayofWeek.length; i++) {
      point(originPointX + 25 * i + (this.size - 6 * 25) / 2, originPointY + this.size - this.padding - AccidentCountDayofWeek[i] * multiply);
    }
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
        text("After 23 ",this.X+40, this.Y+10+i*40);
      }else{
        text((2*i+5)+" to " +(2*i+7), this.X+40, this.Y+10+i*40);
      }

    }
     
  }
}

class ReasonChart{
  constructor(){
    this.originPointX=200;
    this.originPointY=2100;
    this.width=1000;
    this.height=1000;
    this.padding=35;
    this.AccidentInfos=AccidentInfos;
    this.UnknownReason=[0,0,0,0,0,0,0];
    this.ConstructionReason=[0,0,0,0,0,0,0];
    this.PassengerReason=[0,0,0,0,0,0,0];
    this.SecurityReason=[0,0,0,0,0,0,0];
    this.TechniqueReason=[0,0,0,0,0,0,0];
    this.SocialReason=[0,0,0,0,0,0,0];
    this.OpertationReason=[0,0,0,0,0,0,0];
    this.WeatherReason=[0,0,0,0,0,0,0];
    this.PieChart=new PieChart();
  }
  setup(){
    this.UnknownReason=this.ReasonToYear(this.UnknownReason,"there is no reason");
    this.ConstructionReason=this.ReasonToYear(this.ConstructionReason,"Track construction");
    this.PassengerReason=this.ReasonToYear(this.PassengerReason,"Passenger reason");
    this.SecurityReason=this.ReasonToYear(this.SecurityReason,"Security reason");
    this.TechniqueReason=this.ReasonToYear(this.TechniqueReason,"Technique reason");
    this.SocialReason=this.ReasonToYear(this.SocialReason,"Social movement");
    this.OpertationReason=this.ReasonToYear(this.OpertationReason,"Operation problem");
    this.WeatherReason=this.ReasonToYear(this.WeatherReason,"Weather reason");

  }
  display(){
    fill(color('white'));
    rect(this.originPointX,this.originPointY,this.width,this.height);
    
    
    this.DrawReanLine(this.UnknownReason,[0,245,255]);
    this.DrawReanLine(this.ConstructionReason,[0,255,127]);
    this.DrawReanLine(this.PassengerReason,[0,191,255]);
    this.DrawReanLine(this.SecurityReason,[255,215,0]);
    this.DrawReanLine(this.TechniqueReason,[255,130,71]);
    this.DrawReanLine(this.SocialReason,[138,43,226]);
    this.DrawReanLine(this.OpertationReason,[255,110,180]);
    this.DrawReanLine(this.WeatherReason,[139,105,105]);

  }
  
  mouseOver(){
    var mouseInReasonChart=mouseX>this.originPointX&&mouseX<this.originPointX+this.width&&mouseY>this.originPointY&&mouseY<this.originPointY+this.height;
    if(mouseInReasonChart){
      this.display();
      strokeWeight(2);
      var i=Math.floor((mouseX-this.originPointX)/(this.width/7));
      line(this.originPointX + this.padding+i*(this.width - 2 * this.padding) / 6,this.originPointY,this.originPointX + this.padding+i*(this.width - 2 * this.padding) / 6,this.originPointY+this.height);

      var PieValueArr=[this.ConstructionReason[i],
                   this.PassengerReason[i],
                   this.SecurityReason[i],
                   this.TechniqueReason[i],
                   this.SocialReason[i],
                   this.OpertationReason[i],
                   this.WeatherReason[i],
                   this.UnknownReason[i]]
      var Paneldown=mouseY<this.originPointY+this.height/2;
      var Panelright=mouseX<this.originPointX+this.width/2;
      if(Paneldown&&Panelright){
        this.PieChart.display(mouseX,mouseY,PieValueArr);
      }else if(Paneldown&&!Panelright){
        this.PieChart.display(mouseX-this.PieChart.width,mouseY,PieValueArr);
      }else if(!Paneldown&&Panelright){
        this.PieChart.display(mouseX,mouseY-this.PieChart.height,PieValueArr);
      }else{
        this.PieChart.display(mouseX-this.PieChart.width,mouseY-this.PieChart.height,PieValueArr);
      }
    }
  }

  DrawReanLine(ReasonArray,color) {

    
    stroke(color[0],color[1],color[2])
    strokeWeight(3);
    noFill();
    var multiply=4;
    beginShape();
    for (let i = 0; i < 7; i++) {
      vertex(this.originPointX + this.padding+i*(this.width - 2 * this.padding) / 6, this.originPointY +this.height-ReasonArray[i]*multiply);
    }
    endShape();

    strokeWeight(10);
    for (let i = 0; i < 7; i++) {
      point(this.originPointX + this.padding+i*(this.width - 2 * this.padding) / 6, this.originPointY +this.height-ReasonArray[i]*multiply);
    }
  }

  ReasonToYear(ReasonArray,ReasonName){
    this.AccidentInfos.forEach(element => {   
      if(element.Reason==ReasonName){
        var arraynum=element.Date.getFullYear()-2013;
        ReasonArray[arraynum]++;
      }
    })
    
    return ReasonArray;
  } 

}

class PieChart{
  constructor(){
    this.originPointX=0;
    this.originPointY=0;
    this.width=500;
    this.height=400;
  }
  display(a,b,PieValueArr){
    this.originPointX=a;
    this.originPointY=b;
    console.log(PieValueArr);
    fill(color("white"));
    rect(this.originPointX,this.originPointY,this.width,this.height);

    var sum=0;
    PieValueArr.forEach(element=>{
      sum=element+sum;
    })
    for(var i=0;i<PieValueArr.length;i++){
      PieValueArr[i]=PieValueArr[i]/sum*360;
    }
    this.pieChart(300, PieValueArr);

  }
  pieChart(diameter, data) {
    let lastAngle = 0;
    for (let i = 0; i < data.length; i++) {
      let gray = map(i, 0, data.length, 0, 255);
      fill(gray);
      arc(
        this.originPointX+this.width/2,
        this.originPointY+this.height/2,
        diameter,
        diameter,
        lastAngle,
        lastAngle + radians(data[i])
      );
      lastAngle += radians(data[i]);
    }
  }
}






