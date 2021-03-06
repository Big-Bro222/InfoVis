var w =2800;
var h= 4000;

function preload(){
  table=loadTable("rerb.csv","csv","header");
  table3D=loadTable("rerb 3D.csv","csv","header");
}
function setup() {
  c=createCanvas(w,h);
  c.mouseMoved(MouseOver);
  AccidentTypes= table.getColumn("AccidentType");
  AccidentDates=StringtoDateArray(table.getColumn("Date"));
  AccidentTimes=table.getColumn("Time");
  Reasons=table.getColumn("Reason");
  

  AccidentDates3D=StringtoDateArray(table3D.getColumn("Date"));
  AccidentTimes3D=table3D.getColumn("Time");
  Station1=table3D.getColumn("Station1");
  Station2=table3D.getColumn("Station2");
  console.log(Station1);

  //Station1,Station2


  AccidentInfos=[];
  for(let i=0;i<=AccidentTypes.length-1;i++){
     var AccidentInfo= new Object();
     AccidentInfo.Type=AccidentTypes[i];
     AccidentInfo.Date=AccidentDates[i];
     AccidentInfo.Time=AccidentTimes[i];
     if(AccidentDates[i].getDay()==0){
      AccidentInfo.DayofWeek=6;
     }else{
      AccidentInfo.DayofWeek=AccidentDates[i].getDay();
     }
     AccidentInfo.Reason=Reasons[i];
     AccidentInfos.push(AccidentInfo);
  }

  Text=new Text();
  Bars = new Array();
  for(let i=0;i<7;i++){
    Bars[i]=new Array(12);
    for (let j=0;j<12;j++){
      var PerturbationArray=[0,0,0,0,0,0,0];
      var InterruptionArray=[0,0,0,0,0,0,0];
      var OtherArray=[0,0,0,0,0,0,0];
      var AccidentTotalArray=[0,0,0,0,0,0,0];
      AccidentArray=[PerturbationArray,InterruptionArray,OtherArray,AccidentTotalArray];
      AccidentInfos.forEach(element => {
        var YearMonthMatch=element.Date.getFullYear()==i+2013&&(element.Date.getMonth()==j||element.Date.getMonth()+12==j);
        if(YearMonthMatch){
          AccidentTotalArray[element.DayofWeek-1]++;
          if(element.Type=='perturbation'){
            PerturbationArray[element.DayofWeek-1]++;
          }
          else if(element.Type=='interruption')
          {
            InterruptionArray[element.DayofWeek-1]++;
          }else{
            OtherArray[element.DayofWeek-1]++;
          }
        }
      });

      Bars[i][j]=new Bar(j,7-i,AccidentArray);
    }
  }
  PriviousBar=Bars[0][0];
  
  ReasonChart=new ReasonChart();
  ReasonChart.setup();
  var BtnState=true;
  PieBtn = createImg('Asset/OnBtn.png');
  PieBtn.position(1350, 3100);
  PieBtn.size(200,200);
  PieBtn.mousePressed(PieMousePressed);

  function PieMousePressed(){
    if(BtnState){
      PieBtn = createImg('Asset/OffBtn.png');
      PieBtn.position(1350, 3100);
      PieBtn.size(200,200);
      PieBtn.mousePressed(PieMousePressed);
    }else{
      PieBtn = createImg('Asset/OnBtn.png');
      PieBtn.position(1350, 3100);
      PieBtn.size(200,200);
      PieBtn.mousePressed(PieMousePressed);
    }
    BtnState=!BtnState;
    ReasonChart.ChangeState();
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
function MouseOver(){
  cor=[0,0];
  cor=CalculateCor(mouseX,mouseY);
  if(cor[0]!=-1&&cor[1]!=-1){
    if(PriviousBar!=Bars[6-cor[1],cor[0]]){
      PriviousBar.mouseOut();
    }

    Bars[6-cor[1]][cor[0]].mouseOver();
    PriviousBar=Bars[6-cor[1]][cor[0]];
  }

  ReasonChart.mouseOver();
  
}
function CalculateCor(x,y){
  var SquareSize=200;
  var gap=10;
  var padding=20;
  var X=195;
  var Y=1155;
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
  let backgroundColor = color(232,232,232);
  background(backgroundColor);
  
  noStroke();
    for (let j = 0; j < 7; j++) {
      textSize(32);
      text(2013+j, 100, 1050+j*210);
      }
    
    var Monthname=["Placeholder","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    for(let i=1;i<=12;i++){
      textSize(32);
      text(Monthname[i], 50+i*210, 900);
      }
  Barsss=[].concat.apply([],Bars);
  Barsss.forEach(element => {
    element.display();
  });
  
  ReasonChart.display();
  Text.display();

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
    this.AccidentTotalArray=AccidentArray[3];
    this.originPointX=200-this.gap+this.column*(this.size+this.gap);
    this.originPointY=2400-this.row*(this.size+this.gap);
    
  }
  display(){
    //draw square background
    var c = color(245, 245, 245);
    var DayofWeek=["M","Tu","W","Th","F","Sa","S"]
    fill(c); 
    strokeWeight(1);
    stroke(1);
    rect(this.originPointX,this.originPointY,this.size,this.size); 

    for(var i=0;i<DayofWeek.length;i++){
      fill(color("black"));
      textSize(10);
      textAlign(CENTER, CENTER);
      text(DayofWeek[i],this.originPointX + 25 * i + (this.size - 6 * 25) / 2,this.originPointY+this.size-10);
    }

    fill(color('white'));
    noStroke();  
    rect(this.originPointX+this.padding,this.originPointY+this.padding,this.size-2*this.padding,this.size-2*this.padding);
    

    this.DrawLineChart(this.originPointX, this.originPointY,this.AccidentTotalArray,[255,235,205]);
    strokeWeight(1);
    stroke(1);
    //this.DrawLineChart(this.originPointX, this.originPointY,this.PerturbationArray,[255,255,0]);
    //this.DrawLineChart(this.originPointX, this.originPointY,this.InterruptionArray,[255,0,0]);
    //this.DrawLineChart(this.originPointX, this.originPointY,this.OtherArray,[0,0,255]);
    
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
              var labelwidth=100;
              var labelheight=50;
              if(labeldown&&labelright){
                rect(mouseX,mouseY,labelwidth,labelheight);
                fill(color("black"));
                textSize(12);
                textAlign(LEFT, CENTER);
                text("AccidentNum: "+this.AccidentTotalArray[i],mouseX+10, mouseY+20);
                // text("Perturbation: "+this.PerturbationArray[i],mouseX+10, mouseY+10);
                // text("Interruption: "+this.InterruptionArray[i],mouseX+10, mouseY+20);
                // text("Other: "+this.OtherArray[i],mouseX+10, mouseY+30);
                // strokeWeight(5)
                // stroke(255,250,205);
                // point(mouseX+90,mouseY+10);
                // stroke(255,140,0);
                // point(mouseX+90,mouseY+20);
                // stroke(99,184,255);
                // point(mouseX+90,mouseY+30);
    
              }else if(!labeldown&&labelright){
                rect(mouseX,mouseY-labelheight,labelwidth,labelheight);
                fill(color("black"));
                textSize(12);
                textAlign(LEFT, CENTER);
                text("AccidentNum: "+this.AccidentTotalArray[i],mouseX+10, mouseY-30);
                // text("Perturbation: "+this.PerturbationArray[i],mouseX+10, mouseY-40);
                // text("Interruption: "+this.InterruptionArray[i],mouseX+10, mouseY-30);
                // text("Other: "+this.OtherArray[i],mouseX+10, mouseY-20);
                // strokeWeight(5)
                // stroke(255,250,205);
                // point(mouseX+90,mouseY-40);
                // stroke(255,140,0);
                // point(mouseX+90,mouseY-30);
                // stroke(99,184,255);
                // point(mouseX+90,mouseY-20);
    
    
              }else if(!labeldown&&!labelright){
                rect(mouseX-labelwidth,mouseY-labelheight,labelwidth,labelheight);
                fill(color("black"));
                textSize(12);
                textAlign(LEFT, CENTER);
                text("AccidentNum: "+this.InterruptionArray[i],mouseX-90, mouseY-30);
                // text("Perturbation: "+this.PerturbationArray[i],mouseX-90, mouseY-40);
                // text("Interruption: "+this.InterruptionArray[i],mouseX-90, mouseY-30);
                // text("Other: "+this.OtherArray[i],mouseX-90, mouseY-20);
                // strokeWeight(5)
                // stroke(255,250,205);
                // point(mouseX-10,mouseY-40);
                // stroke(255,140,0);
                // point(mouseX-10,mouseY-30);
                // stroke(99,184,255);
                // point(mouseX-10,mouseY-20);
    
    
              }else{
                rect(mouseX-labelwidth,mouseY,labelwidth,labelheight);
                fill(color("black"));
                textSize(12);
                textAlign(LEFT, CENTER);
                text("AccidentNum: "+this.InterruptionArray[i],mouseX-90, mouseY+20);
                // text("Perturbation: "+this.PerturbationArray[i],mouseX-90, mouseY+10);
                // text("Interruption: "+this.InterruptionArray[i],mouseX-90, mouseY+20);
                // text("Other: "+this.OtherArray[i],mouseX-90, mouseY+30);
                // strokeWeight(5)
                // stroke(255,250,205);
                // point(mouseX-10,mouseY+10);
                // stroke(255,140,0);
                // point(mouseX-10,mouseY+20);
                // stroke(99,184,255);
                // point(mouseX-10,mouseY+30);
    
    
              }
            }
            
          }
          

          
        
      
    
  }
  mouseOut(){
    this.display();
  }
  DrawLineChart(originPointX, originPointY,AccidentCountDayofWeek,color) {
    fill(color[0],color[1],color[2]);
    let multiply=8;
    strokeWeight(1);
    beginShape();
    for (let i = 0; i < AccidentCountDayofWeek.length; i++) {
      vertex(originPointX + 25 * i + (this.size - 6 * 25) / 2, originPointY + this.size - this.padding - AccidentCountDayofWeek[i] * multiply);
    }
    vertex(originPointX+this.size-this.padding,originPointY+this.size-this.padding);
    vertex(originPointX+this.padding,originPointY+this.size-this.padding);
    vertex(originPointX  + (this.size - 6 * 25) / 2, originPointY + this.size - this.padding - AccidentCountDayofWeek[0] * multiply);

    // 结束绘制图形
    endShape();

    // strokeWeight(9);
    // for (let i = 0; i < AccidentCountDayofWeek.length; i++) {
    //   point(originPointX + 25 * i + (this.size - 6 * 25) / 2, originPointY + this.size - this.padding - AccidentCountDayofWeek[i] * multiply);
    // }
  }
  }

class ReasonChart{
  constructor(){
    this.originPointX=200;
    this.originPointY=2700;
    this.width=1000;
    this.height=1000;
    this.padding=35;
    this.AccidentInfos=AccidentInfos;
    this.Reasonpops=[];
    this.PieChartState=true;
    this.UnknownReason=[0,0,0,0,0,0,0];
    this.ConstructionReason=[0,0,0,0,0,0,0];
    this.PassengerReason=[0,0,0,0,0,0,0];
    this.SecurityReason=[0,0,0,0,0,0,0];
    this.TechniqueReason=[0,0,0,0,0,0,0];
    this.SocialReason=[0,0,0,0,0,0,0];
    this.OpertationReason=[0,0,0,0,0,0,0];
    this.WeatherReason=[0,0,0,0,0,0,0];
    this.color= 
    [color(0,255,127),
      color(0,191,255),
      color(255,215,0),
      color(255,130,71),
      color(138,43,226),
      color(255,110,180),
      color(139,105,105),
      color(0,245,255)]
    this.ReasonName=[
      "Track construction",
      "Passenger reason",
      "Security reason",
      "Technique reason",
      "Social movement",
      "Operation problem",
      "Weather reason",
      "Unspecified reason"
    ]
    this.PieChart=new PieChart(this.color,this.ReasonName);

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
  ChangeState(){
    this.PieChartState=!this.PieChartState;
    console.log("Pie Pressed");
  }
  display(){
    this.DrawChart();




    for(var i=0;i<this.color.length;i++){
      textSize(20);
      textAlign(LEFT, BASELINE);
      textStyle(BOLD);
      noStroke();
      fill(this.color[i]);
      rect(this.originPointX+this.width+50,50+this.originPointY+30*i,20,20);
      fill(color("black"));
      noStroke();
      text(this.ReasonName[i], this.originPointX+this.width+100, this.originPointY+30*i+65);
    }

    textSize(35);
      textAlign(CENTER, BASELINE);
      fill(color("black"));
      noStroke();
      text("Incident reason over years", this.originPointX+this.width/2, this.originPointY+this.height+100);

    for(var i=0;i<8;i++){
      textSize(16);
      textAlign(CENTER, BASELINE);
      fill(color("black"));
      noStroke();
      if(i==7){
        textSize(20);
        text("Year", this.originPointX+this.padding+i*(this.width - 2 * this.padding) / 6-50, this.originPointY+this.height+30);
      }else{
        text(2013+i, this.originPointX+this.padding+i*(this.width - 2 * this.padding) / 6, this.originPointY+this.height+30);
      }
    }


    for(var i=0;i<7;i++){
      textSize(16);
      textAlign(CENTER, BASELINE);
      fill(color("black"));
      noStroke();

      if(i==6){
        textSize(20);
        text("Number of Accidents", this.originPointX-30, this.originPointY+this.height-i*200+150);
      }else{
        text(i*50, this.originPointX-30, this.originPointY+this.height-i*200);
      }
    }    
    
    //rect(this.originPointX+this.width+500,this.originPointY,800,800);
    textSize(30);
    textAlign(LEFT, CENTER);
    fill(color("black"));
    text(`     This visualization shows the number of RER B incidents by reason over the course of seven 
    years. Each line on the graph represents a different category of incident reason. The Y axis is the number of incidents, and the X axis is time in years. If you place your cursor in the visualization area, a pie chart appears which shows the breakdown of reasons by percentage of all the incidents for a given year.
    
    With our initial analysis, we can see that there are a few potential trends regarding incidents that are a result of passenger, security, and social movement reasons. Incidents due to passenger reasons have been generally increasing. Incidents due to security reasons were low, then saw a sharp spike in 2015, with a steady decrease for the few years after. As speculation, this could be a result of heightened security in France after the terrorist attacks that took place this year. 
    
    The purple line, representing incidents due to social movements, gives the impression of a cyclical nature. This could be an interesting observation about social movements in the industry. Although, the data for 2019 is incomplete (missing December), and would likely tell a different story if it included December considering the massive strike that ensued.
    
    `
    ,this.originPointX+this.width+500,this.originPointY-100,800,1050);
  }
  
  DrawChart() {
    fill(color('white'));
    noStroke();
    rect(this.originPointX, this.originPointY, this.width, this.height);
    this.DrawReanLine(this.ConstructionReason, color(0, 255, 127));
    this.DrawReanLine(this.PassengerReason, color(0, 191, 255));
    this.DrawReanLine(this.SecurityReason, color(255, 215, 0));
    this.DrawReanLine(this.TechniqueReason, color(255, 130, 71));
    this.DrawReanLine(this.SocialReason, color(138, 43, 226));
    this.DrawReanLine(this.OpertationReason, color(255, 110, 180));
    this.DrawReanLine(this.WeatherReason, color(139, 105, 105));
    this.DrawReanLine(this.UnknownReason, color(0, 245, 255));
  }

  mouseOver(){
    if(this.PieChartState){
      var mouseInReasonChart=mouseX>this.originPointX&&mouseX<this.originPointX+this.width&&mouseY>this.originPointY&&mouseY<this.originPointY+this.height;
      if(mouseInReasonChart){
        strokeWeight(1);
        this.DrawChart();
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
      }else{
        this.DrawChart();
      }
    }

  }

  DrawReanLine(ReasonArray,color) {
    stroke(color)
    strokeWeight(3);
    noFill();
    var multiply=4;
    beginShape();
    for (let i = 0; i < 7; i++) {
      vertex(this.originPointX + this.padding+i*(this.width - 2 * this.padding) / 6, this.originPointY +this.height-ReasonArray[i]*multiply);
    }
    endShape();

    strokeWeight(15);
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
  constructor(color,ReasonName){
    this.originPointX=0;
    this.originPointY=0;
    this.width=500;
    this.height=400;
    this.color=color;
    this.ReasonName=ReasonName;
    this.ReasonObjs=[];
  }
  display(a,b,PieValueArr){
    this.originPointX=a;
    this.originPointY=b;
    console.log(PieValueArr);
    var sum=0;
    PieValueArr.forEach(element=>{
      sum=element+sum;
    })
    this.ReasonObjs=[];

    for(let i=0;i<this.color.length;i++){
      var ReasonObj= new Object();
      ReasonObj.Name=this.ReasonName[i];
      ReasonObj.color=this.color[i];
      ReasonObj.Value=(PieValueArr[i]/sum*100).toFixed(2);
      this.ReasonObjs.push(ReasonObj);
     }
    
    this.ReasonObjs.sort(this.compare('Value'));
    
    console.log(this.ReasonObjs);
    stroke(color("black"));
    fill(color("white"));
    rect(this.originPointX,this.originPointY,this.width,this.height);

    for(var i=0;i<this.ReasonObjs.length;i++){
      textSize(16);
      textAlign(LEFT, BASELINE);
      fill(this.ReasonObjs[i].color);
      rect(this.originPointX+260,50+this.originPointY+30*(i+1),20,20);
      fill(color("black"));
      text(this.ReasonObjs[i].Name+" "+this.ReasonObjs[i].Value+"%", this.originPointX+300, 50+this.originPointY+45+i*30);
    }

    PieValueArr = PieValueArr.map(function(element) {
      return element /sum;
    });

    this.pieChart(200, PieValueArr);
  }
  compare(X){
    return function(a,b){
        var value1 = a[X];
        var value2 = b[X];
        return value2 - value1;
    }
  }

  pieChart(diameter, data) {
    let lastAngle = 0;
    for (let i = 0; i < data.length; i++) {
      // let gray = map(i, 0, data.length, 0, 255);
      fill(this.color[i]);
      if(data[i]==0){
        continue;
      }else{
        arc(
          this.originPointX+130,
          this.originPointY+200,
          diameter,
          diameter,
          lastAngle,
          lastAngle + data[i]*2*PI
        );
        lastAngle += data[i]*2*PI;
      }

    }
  }
}

class Text{
  constructor(){
    this.originPointX=200;
    this.originPointY=100;
    this.titleLength=1000;
    this.textBoxLength=2000;
  }

  display(){
    noStroke()
    fill(color(0,191,255));
    rect((w-this.titleLength)/2,this.originPointY,this.titleLength,100);
    fill(color("white"));
    textFont('Georgia');
    textSize(50);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("Infographic on RER B incidents",w/2,this.originPointY+50);

    textSize(20);
    textFont('Arial');
    textStyle(ITALIC);
    fill(color("black"));
    text("RER incidents 1",w/2,this.originPointY+150);

    fill(color("white"));
    rect((w-this.textBoxLength)/2,this.originPointY+200,this.textBoxLength,500);

    textSize(30);
    textAlign(LEFT, CENTER);
    textStyle(NORMAL);
    fill(color("black"));
    text(`This page presents an information visualization project based on RER B incident email notifications from 2013 to 2019, as part of the InfoVis class at Université Paris-Saclay. Use ctrl - (command - for macOS) to resize the window if needed.
    
    This visualization can be used to see trends in the number of RER incidents per day of the week, by month over the last 7 years. Each row represents a year, starting at 2013 from the top, and each column represents a month. Within each mini-visualization, the count of incidents per day of the week during that month is shown.

Looking at the visualization we can see a few interesting trends. The first apparent trend is that more incidents seem to occur during weekdays than on the weekends. Second, for the summer months there seems to be less incidents in July and August than in June, which could be a result of there being less people on the RER during the holidays. There also seems to be a spike in incidents during the second half of the week during August.

    `
    ,(w-this.textBoxLength)/2+20,this.originPointY+200,this.textBoxLength-40,400);


  }
}






