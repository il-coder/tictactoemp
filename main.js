socket = new WebSocket('wss://connect.websocket.in/v3/12?apiKey=NxcDNyx8dSmaMAVSGc0jLCXSYXBEwxdmRBIdZUnuannYKQKhyXRIseij7wvO');
window.onload = function(){
    document.getElementById('overlay').style.display="block";
};

socket.onopen = function(){
    console.log("Connected");
    document.getElementById('overlay-text').innerHTML="Waiting for Opponent move";
    document.getElementById('overlay').style.display="none";
}

function send_move(id) //function to send user move over socket 
{
    var msg={
        type:"move",
        btn:id
        };
    socket.send(JSON.stringify(msg));
    // console.log("Sent move with",id);
    setTimeout(() => {
        document.getElementById('overlay').style.display="block";
        check_win();
    }, 500);
}

socket.onmessage = function(e){
    var msg = JSON.parse(e.data);
    if(msg.type=="move")
    {
        document.getElementById(msg.btn).innerHTML = "X";
        document.getElementById(msg.btn).disabled = true;
    }
    setTimeout(() => {
        document.getElementById('overlay').style.display="none";
        check_win();
    }, 500);
}

function check_win()    //function to check if any one player wins or not after this move
{
    var btn1 = document.getElementById('btn_1').innerHTML;
    var btn2 = document.getElementById('btn_2').innerHTML;
    var btn3 = document.getElementById('btn_3').innerHTML;
    var btn4 = document.getElementById('btn_4').innerHTML;
    var btn5 = document.getElementById('btn_5').innerHTML;
    var btn6 = document.getElementById('btn_6').innerHTML;
    var btn7 = document.getElementById('btn_7').innerHTML;
    var btn8 = document.getElementById('btn_8').innerHTML;
    var btn9 = document.getElementById('btn_9').innerHTML;
    
    if(btn1==btn2 && btn2==btn3 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;")    //check for 1st row
    {
        if(btn1=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn4==btn5 && btn5==btn6 && btn4!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 2nd row
    {
        if(btn4=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn7==btn8 && btn8==btn9 && btn7!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 3rd row
    {
        if(btn7=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn1==btn4 && btn1==btn7 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 1st column
    {
        if(btn1=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn2==btn5 && btn2==btn8 && btn2!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 2nd column
    {
        if(btn2=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn3==btn6 && btn3==btn9 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 3rd column
    {
        if(btn3=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn1==btn5 && btn1==btn9 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for primary diagonal
    {
        if(btn1=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn3==btn5 && btn3==btn7 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for secondary diagonal
    {
        if(btn3=="O")
        {
            window.alert("You win");
        }
        else
        {
            window.alert("You loose");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if((btn1=="O" || btn1=="X") && (btn2=="O" || btn2=="X") && (btn3=="O" || btn3=="X") && (btn4=="O" || btn4=="X") && (btn5=="O" || btn5=="X") && (btn6=="O" || btn6=="X") && (btn7=="O" || btn7=="X") && (btn8=="O" || btn8=="X") && (btn9=="O" || btn9=="X"))
    {
        window.alert("Draw");
        document.getElementById('overlay').style.display="none";
    }
}