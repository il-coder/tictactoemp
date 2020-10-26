var play = 0,playerCount=1,userTime,oppTime,userTime2,oppTime2;
var socket,to1;

function online(){
    playerCount=0;
    document.getElementById('onGame').style.display='block'; 
    document.getElementById('mainMenu').style.display='none';
    document.getElementById('overlay').style.display="block";
    socket = new WebSocket('wss://connect.websocket.in/v3/12?apiKey=NxcDNyx8dSmaMAVSGc0jLCXSYXBEwxdmRBIdZUnuannYKQKhyXRIseij7wvO');

    socket.onopen = function(){
        play = 0;
        userTime = Date.now();
        playerCount=1;
        var msg={
            type:"conn",
            time: userTime,
            };
        socket.send(JSON.stringify(msg));
        console.log("Connected");
        to1 = setTimeout(()=>{
            console.log(playerCount);
            if(playerCount==1)
            {
                document.getElementById('overlay-text').innerHTML="Waiting for Opponent to join";   
            }
            else if(playerCount==2)
            {
                if(userTime < oppTime)
                {
                    document.getElementById('overlay').style.display="none";
                }
                else
                {
                    document.getElementById('overlay-text').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
            else
            {
                window.alert("Room is full");
                var msg={
                    type:"disconn",
                    };
                socket.send(JSON.stringify(msg));
                play = 0;
                socket.close();
            }
        },2500);
    }

    socket.onmessage = function(e){
        var msg = JSON.parse(e.data);
        if(msg.type=="move")
        {
            document.getElementById(msg.btn).innerHTML = "X";
            document.getElementById(msg.btn).disabled = true;    
            setTimeout(() => {
                document.getElementById('overlay').style.display="none";
                check_win();
            }, 100);
        }
        else if(msg.type=="forfeit")
        {
            gameOver("You Won!","Opponent forfeited the match. You did well.");
        }
        else if(msg.type=="playAgain")
        {
            oppTime2 = msg.time;
            play += 1;
            if(play==2)
            {
                play = 0;
                if(userTime2 < oppTime2)
                {
                    document.getElementById('overlay').style.display="none";
                }
                else
                {
                    document.getElementById('overlay-text').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
        }
        else if(msg.type=="quit")
        {
            playerCount -=1;
            play = 0;
            gameOver("You Won!","Opponent quit the match.");
        }
        else if(msg.type=="player")
        {
            // console.log("player reported");
            oppTime = msg.time;
            playerCount += 1;
        }
        else if(msg.type=="conn")
        {
            oppTime = msg.time;
            var msg={
                type:"player",
                time: userTime,
            };
            socket.send(JSON.stringify(msg));
            playerCount += 1;
            if(playerCount==2)
            {
                if(userTime < oppTime)
                {
                    document.getElementById('overlay').style.display="none";
                }
                else
                {
                    document.getElementById('overlay-text').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
        }
        else if(msg.type=="disconn")
        {
            playerCount -= 1;
            play = 0;
            if(playerCount<=1)
            {
                for(let i=1;i<=9;i++)
                {
                    var str = "btn_" + i; 
                    document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                    document.getElementById(str).disabled = false;
                }
                document.getElementById('overlay-text').innerHTML="Opponent disconnected. Waiting for Opponent to join";   
                document.getElementById('overlay').style.display="block";
            }
        }
    }
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
        document.getElementById('overlay-text').innerHTML="Waiting for Opponent move";
        document.getElementById('overlay').style.display="block";
        check_win();
    }, 100);
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
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn4==btn5 && btn5==btn6 && btn4!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 2nd row
    {
        if(btn4=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn7==btn8 && btn8==btn9 && btn7!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 3rd row
    {
        if(btn7=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn1==btn4 && btn1==btn7 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 1st column
    {
        if(btn1=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn2==btn5 && btn2==btn8 && btn2!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 2nd column
    {
        if(btn2=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn3==btn6 && btn3==btn9 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 3rd column
    {
        if(btn3=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn1==btn5 && btn1==btn9 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for primary diagonal
    {
        if(btn1=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn3==btn5 && btn3==btn7 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for secondary diagonal
    {
        if(btn3=="O")
        {
            gameOver("You Won!","You defeated the opponent.");
        }
        else
        {
            gameOver("You Lost!","Opponent defeated you.");
        }
        document.getElementById('overlay').style.display="none";
    }
    else if((btn1=="O" || btn1=="X") && (btn2=="O" || btn2=="X") && (btn3=="O" || btn3=="X") && (btn4=="O" || btn4=="X") && (btn5=="O" || btn5=="X") && (btn6=="O" || btn6=="X") && (btn7=="O" || btn7=="X") && (btn8=="O" || btn8=="X") && (btn9=="O" || btn9=="X"))
    {
        gameOver("Match Draw!","Opponent tried but you are too Good.");
        document.getElementById('overlay').style.display="none";
    }
}

function mainMenu()     //Function to go to main menu and quit the match
{
    var msg={
        type:"quit",
        };
    socket.send(JSON.stringify(msg));
    play = 0;
    document.getElementById('onGame').style.display='none'; 
    document.getElementById('mainMenu').style.display='block';
    socket.close();
}

function forfeit()      //Function to forfeit the match
{
    var msg={
        type:"forfeit",
        };
    socket.send(JSON.stringify(msg));
    play = 0;
    gameOver("You Lost!","You forfeited the match.");
}

function gameOver(title,msg)    //Function to display game over dialog box
{
    document.getElementById('overlay').style.display="none";
    $("#gameOver").modal();
    document.getElementById('overMsg').innerHTML = msg;
    document.getElementById('overTitle').innerHTML = title;
}

function playAgain()        //Function to implement play again functionality
{
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    userTime2 = Date.now();
    play += 1;
    var msg={
        type:"playAgain",
        time: userTime2,
    };
    socket.send(JSON.stringify(msg));
    if(play==2)
    {
        play = 0;
        if(userTime2 < oppTime2)
        {
            document.getElementById('overlay').style.display="none";
        }
        else
        {
            document.getElementById('overlay-text').innerHTML="Waiting for Opponent move";
            document.getElementById('overlay').style.display="block";
        }
    }
    else
    {
        document.getElementById('overlay-text').innerHTML="Waiting for Opponent to respond....";
        document.getElementById('overlay').style.display="block";
    }
}

window.onbeforeunload = function () {
    var msg={
        type:"disconn",
        };
    socket.send(JSON.stringify(msg));
    socket.close();
}