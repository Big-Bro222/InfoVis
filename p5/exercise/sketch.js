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
  AccidentDatesNTimes=StringtoDateArray();
  
  var AccidentInfos=[];
  for(let i=0;i<=AccidentTypes.length-1;i++){
     var AccidentInfo= new Object();
     AccidentInfo.Type=AccidentTypes[i];
     AccidentInfo.Date=AccidentDates[i];
     AccidentInfo.Time=AccidentTimes[i];
     AccidentInfo.Reason=Reasons[i];
     AccidentInfos.push(AccidentInfo);
  }
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
    var d = new Date(AccidentDates[i]+" "+AccidentTimes[i]);
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
    this.InterruptionCountArr=[0,0,0,0,0,0,0,0,0,0];
    this.PertubationCountArr=[0,0,0,0,0,0,0,0,0,0];
    this.StaionChangeCountArr=[0,0,0,0,0,0,0,0,0,0];
    this.OtherCountArr=[0,0,0,0,0,0,0,0,0,0];
    
  }
  display(){
    //variable setup
    let originPointX=-this.gap+this.column*(this.width+this.gap);
    let originPointY=1600-this.row*(this.length+this.gap);

    //if(this.month==12){this.month=0;}
    
    //draw square background
    let c = color(255, 204, 0);

    fill(c); 
    strokeWeight(1);
    stroke(51);
    rect(originPointX,originPointY,this.width,this.length); 

    
    
    
    for(var i=0;i<AccidentTypes.length;i++){
      //console.log(AccidentTypes[i]);
      var DetectDecember=AccidentDatesNTimes[i].getMonth()==0&&this.month==12;
      if(AccidentTypes[i]=="interruption"){
        if((AccidentDatesNTimes[i].getMonth()==this.month||DetectDecember)&&AccidentDatesNTimes[i].getYear()+1900==this.year)
          {
            if(AccidentDatesNTimes[i].getHours()<7){
              this.InterruptionCountArr[0]++;
            }else if(7<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<9){
              this.InterruptionCountArr[1]++;
            }else if(9<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<11){
              this.InterruptionCountArr[2]++;
            }else if(11<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<13){
              this.InterruptionCountArr[3]++;
            }else if(13<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<15){
              this.InterruptionCountArr[4]++;
            }else if(15<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<17){
              this.InterruptionCountArr[5]++;
            }else if(17<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<19){
              this.InterruptionCountArr[6]++;
            }else if(19<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<21){
              this.InterruptionCountArr[7]++;
            }else if(21<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<23){
              this.InterruptionCountArr[8]++;
            }else if(23<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<24){
              this.InterruptionCountArr[9]++;
            }
          }
      }
      else if(AccidentTypes[i]=="perturbation"){
        if((AccidentDatesNTimes[i].getMonth()==this.month||DetectDecember)&&AccidentDatesNTimes[i].getYear()+1900==this.year)
          {
            if(AccidentDatesNTimes[i].getHours()<7){
              this.PertubationCountArr[0]++;
            }else if(7<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<9){
              this.PertubationCountArr[1]++;
            }else if(9<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<11){
              this.PertubationCountArr[2]++;
            }else if(11<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<13){
              this.PertubationCountArr[3]++;
            }else if(13<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<15){
              this.PertubationCountArr[4]++;
            }else if(15<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<17){
              this.PertubationCountArr[5]++;
            }else if(17<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<19){
              this.PertubationCountArr[6]++;
            }else if(19<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<21){
              this.PertubationCountArr[7]++;
            }else if(21<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<23){
              this.PertubationCountArr[8]++;
            }else if(23<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<24){
              this.PertubationCountArr[9]++;
            }
          }
      }
      else{
        if((AccidentDatesNTimes[i].getMonth()==this.month||DetectDecember)&&AccidentDatesNTimes[i].getYear()+1900==this.year)
        {
          if(AccidentDatesNTimes[i].getHours()<7){
            this.OtherCountArr[0]++;
          }else if(7<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<9){
            this.OtherCountArr[1]++;
          }else if(9<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<11){
            this.OtherCountArr[2]++;
          }else if(11<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<13){
            this.OtherCountArr[3]++;
          }else if(13<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<15){
            this.OtherCountArr[4]++;
          }else if(15<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<17){
            this.OtherCountArr[5]++;
          }else if(17<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<19){
            this.OtherCountArr[6]++;
          }else if(19<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<21){
            this.OtherCountArr[7]++;
          }else if(21<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<23){
            this.OtherCountArr[8]++;
          }else if(23<=AccidentDatesNTimes[i].getHours()&&AccidentDatesNTimes[i].getHours()<24){
            this.OtherCountArr[9]++;
          }
        }
      }
    }
    
    //draw circular chart
    let Multiply=7.5;
    for(var j=0;j<10;j++){
      fill(color(25,25,25));
      
      var radius=(this.PertubationCountArr[j]+this.InterruptionCountArr[j])*Multiply+10;
      arc(originPointX+this.width/2,originPointY+this.length/2,radius,radius,0+j*PI/5, PI/5+j*PI/5, PIE);
    }

    


    for(var j=0;j<10;j++){
      fill(color(nightingaleColor[j]));
      var radius=Multiply*(this.PertubationCountArr[j])+10;
      arc(originPointX+this.width/2,originPointY+this.length/2,radius,radius,0+j*PI/5, PI/5+j*PI/5, PIE);
    }

    fill(color(20,30,15));


    
    ellipse(originPointX+this.width/2, originPointY+this.length/2, 10, 10)

    
    

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








