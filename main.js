/* Common variables */
var mode=0;
/* Online Variables */
var socket,to1,iv1,scnt=21,code,code_channel,play = 0,playerCount=1,userTime,oppTime,userTime2,oppTime2;
var log = document.getElementById('gameLogText');
/* offline variables */
var turn=1,cnt=1;
var st = document.getElementById('turn');
var localLog = document.getElementById('gameLogLocalText');

function local()    //function to implement local game
{
    mode = 2;
    localLog.innerHTML = "<p>Match Started</p>";
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i + '_local'; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    turn = 1;
    cnt = 1;
    st.innerHTML = "Player 1 turn";
    document.getElementById('joiner').style.display="none";
    document.getElementById('offGame').style.display='block'; 
    document.getElementById('mainMenu').style.display='none';
}

function check_win_local()
{
    var btn1 = document.getElementById('btn_1_local').innerHTML;
    var btn2 = document.getElementById('btn_2_local').innerHTML;
    var btn3 = document.getElementById('btn_3_local').innerHTML;
    var btn4 = document.getElementById('btn_4_local').innerHTML;
    var btn5 = document.getElementById('btn_5_local').innerHTML;
    var btn6 = document.getElementById('btn_6_local').innerHTML;
    var btn7 = document.getElementById('btn_7_local').innerHTML;
    var btn8 = document.getElementById('btn_8_local').innerHTML;
    var btn9 = document.getElementById('btn_9_local').innerHTML;
    var flag=0;
    if(btn1==btn2 && btn2==btn3 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;")    //check for 1st row
    {
        if(btn1=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn4==btn5 && btn5==btn6 && btn4!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 2nd row
    {
        if(btn4=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn7==btn8 && btn8==btn9 && btn7!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 3rd row
    {
        if(btn7=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn1==btn4 && btn1==btn7 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 1st column
    {
        if(btn1=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn2==btn5 && btn2==btn8 && btn2!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 2nd column
    {
        if(btn2=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn3==btn6 && btn3==btn9 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 3rd column
    {
        if(btn3=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn1==btn5 && btn1==btn9 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for primary diagonal
    {
        if(btn1=="O")
            flag=1;
        else
            flag=2;
    }
    else if(btn3==btn5 && btn3==btn7 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for secondary diagonal
    {
        if(btn3=="O")
            flag=1;       
        else
            flag=2;
    }
    else if((btn1=="O" || btn1=="X") && (btn2=="O" || btn2=="X") && (btn3=="O" || btn3=="X") && (btn4=="O" || btn4=="X") && (btn5=="O" || btn5=="X") && (btn6=="O" || btn6=="X") && (btn7=="O" || btn7=="X") && (btn8=="O" || btn8=="X") && (btn9=="O" || btn9=="X"))
    {
        gameOverLocal("Match Draw!","Both players played optimally.");
        localLog.innerHTML += "<p>Match Draw! Both players are at same level.</p>";
    }
    if(flag==1)
    {
        gameOverLocal("Player 1 Won!","Player 1 won the match defeating player 2.");
        localLog.innerHTML += "<p>Player 1 Won! Player 1 defeated the opponent.</p>";
    }
    else if(flag==2)
    {
        gameOverLocal("Player 2 Won!","Player 2 won the match defeating player 1.");
        localLog.innerHTML += "<p>Player 2 Won! Player 2 defeated the opponent.</p>";
    }
}

function play_move(id)
{
    document.getElementById(id).disabled = true;
    if(turn==1)
    {
        localLog.innerHTML += "<p>" + "Player 1 picked " + id.split("_")[1] + "</p>";
        document.getElementById(id).innerHTML = "O";
    }
    else
    {
        localLog.innerHTML += "<p>" + "Player 2 picked " + id.split("_")[1] + "</p>";
        document.getElementById(id).innerHTML = "X";
    }
    check_win_local();
    cnt += 1;
    turn = (turn % 2) + 1 ;
    if(turn==1)
        st.innerHTML = "Player 1 turn";
    else
        st.innerHTML = "Player 2 turn";
}

function playAgainLocal()
{
    localLog.innerHTML = "<p>Match Started</p>";
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i + '_local'; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    turn = 1;
    cnt = 1;
    st.innerHTML = "Player 1 turn";
}

function gameOverLocal(title,msg)
{
    $("#gameOverLocal").modal();
    document.getElementById('overMsgLocal').innerHTML = msg;
    document.getElementById('overTitleLocal').innerHTML = title;
}

function mainMenuLocal()
{
    localLog.innerHTML = "<p>Match Started</p>";
    document.getElementById('offGame').style.display='none'; 
    document.getElementById('mainMenu').style.display='block';
}

function online()   //function to implement online multiplayer
{
    if(!navigator.onLine)
    {
        showError("You are not connected to internet.");
        return;
    }
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    mode = 0;
    // to1 = setTimeout(()=>{
    //     document.getElementById('onGame').style.display='none'; 
    //     document.getElementById('mainMenu').style.display='block';
    //     document.getElementById('overlay').style.display="none";
    //     showError("Unable to connect. Please try again later.");
    //     return;
    // },10000);
    code = scnt;
    document.getElementById('joiner').style.display="none";
    document.getElementById('onGame').style.display='block'; 
    document.getElementById('mainMenu').style.display='none';
    document.getElementById('overlay').style.display="block";
    log.innerHTML = "<p>Match Started</p>";
    url = "wss://connect.websocket.in/v3/" + scnt +"?apiKey=NxcDNyx8dSmaMAVSGc0jLCXSYXBEwxdmRBIdZUnuannYKQKhyXRIseij7wvO";
    socket = new WebSocket(url);
    message();
    socket.onopen = function(){
        clearTimeout(to1);
        play = 0;
        userTime = Date.now();
        playerCount=1;
        var msg={
            type:"conn",
            time: userTime,
            id: code,
            };
        socket.send(JSON.stringify(msg));
        console.log("Connected to",scnt);
        iv1 = setInterval(()=>{
            console.log(playerCount);
            if(playerCount==1)
            {
                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
            }
            else if(playerCount==2)
            {
                document.getElementById('backbtn').style.display='none'; 
                clearInterval(iv1);
                if(userTime < oppTime)
                {
                    setTimeout(()=>{
                        document.getElementById('overlay').style.display="none";
                    },1500);
                }
                else
                {
                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
            else
            {
                clearInterval(iv1);
                scnt+=1;
                var msg={
                    type:"disconn",
                    id: code,
                    };
                socket.send(JSON.stringify(msg));
                play = 0;
                socket.close();
                if(scnt>40)
                {
                    document.getElementById('backbtn').style.display='block';
                    document.getElementById('onGame').style.display='none'; 
                    document.getElementById('mainMenu').style.display='block';
                    document.getElementById('overlay').style.display="none";
                    showError("Room is full");
                    return;
                }
                socket.onclose = ()=>{
                    online();
                };
            }
        },2500);
    }
}

function host()     //function to allow to generate code and connect using it
{
    if(!navigator.onLine)
    {
        showError("You are not connected to internet.");
        return;
    }
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    mode=1;
    code="";
    // to1 = setTimeout(()=>{
    //     document.getElementById('onGame').style.display='none'; 
    //     document.getElementById('mainMenu').style.display='block';
    //     document.getElementById('overlay').style.display="none";
    //     showError("Unable to connect. Please try again later.");
    //     return;
    // },10000);   
    code_channel = 50 + Math.floor(Math.random() * 41);
    var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    for(let ip = 1;ip<=3;ip++)
    {
        code += str[Math.floor(Math.random() * 62)];
    } 
    code += code_channel;
    for(let ip = 1;ip<=3;ip++)
    {
        code += str[Math.floor(Math.random() * 62)];
    }
    document.getElementById('joiner').style.display="block";
    document.getElementById('joiner').innerHTML= "Room code is : "+code;
    document.getElementById('onGame').style.display='block'; 
    document.getElementById('mainMenu').style.display='none';
    document.getElementById('overlay').style.display="block";
    log.innerHTML = "<p>Match Started</p>";
    url = "wss://connect.websocket.in/v3/" + code_channel +"?apiKey=NxcDNyx8dSmaMAVSGc0jLCXSYXBEwxdmRBIdZUnuannYKQKhyXRIseij7wvO";
    socket = new WebSocket(url);
    message();
    socket.onopen = function(){
        clearTimeout(to1);
        play = 0;
        userTime = Date.now();
        playerCount=1;
        var msg={
            type:"conn",
            time: userTime,
            id: code,
            };
        socket.send(JSON.stringify(msg));
        console.log("Connected to",code_channel," and ",code);
        iv1 = setInterval(()=>{
            console.log(playerCount);
            if(playerCount==1)
            {
                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
            }
            else if(playerCount==2)
            {
                document.getElementById('backbtn').style.display='none';
                clearInterval(iv1);
                if(userTime < oppTime)
                {
                    setTimeout(()=>{
                        document.getElementById('overlay').style.display="none";
                    },1500);
                }
                else
                {
                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
            else
            {
                clearInterval(iv1);
                var msg={
                    type:"disconn",
                    id: code,
                    };
                socket.send(JSON.stringify(msg));
                play = 0;
                socket.close();
                document.getElementById('onGame').style.display='none'; 
                document.getElementById('mainMenu').style.display='block';
                document.getElementById('overlay').style.display="none";
                showError("Room is full");
            }
        },2500);
    }
}

function join()     //function to implement join with others using code functionality
{
    if(!navigator.onLine)
    {
        showError("You are not connected to internet.");
        return;
    }
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    mode=1;
    // to1 = setTimeout(()=>{
    //     document.getElementById('onGame').style.display='none'; 
    //     document.getElementById('mainMenu').style.display='block';
    //     document.getElementById('overlay').style.display="none";
    //     showError("Unable to connect. Please try again later.");
    //     return;
    // },10000);
    code = document.getElementById('joinCode').value;
    document.getElementById('onGame').style.display='block'; 
    document.getElementById('mainMenu').style.display='none';
    document.getElementById('overlay').style.display="block";
    log.innerHTML = "<p>Match Started</p>";
    code_channel = parseInt(code[3]+code[4]);
    url = "wss://connect.websocket.in/v3/" + code_channel +"?apiKey=NxcDNyx8dSmaMAVSGc0jLCXSYXBEwxdmRBIdZUnuannYKQKhyXRIseij7wvO";
    socket = new WebSocket(url);
    message();
    socket.onopen = function(){
        clearTimeout(to1);
        play = 0;
        userTime = Date.now();
        playerCount=1;
        var msg={
            type:"conn",
            time: userTime,
            id: code,
            };
        socket.send(JSON.stringify(msg));
        console.log("Connected to",code_channel," and ",code);
        iv1 = setInterval(()=>{
            console.log(playerCount);
            if(playerCount==1)
            {
                var msg={
                    type:"disconn",
                    id: code,
                    };
                socket.send(JSON.stringify(msg));
                play = 0;
                socket.close();
                document.getElementById('onGame').style.display='none'; 
                document.getElementById('mainMenu').style.display='block';
                document.getElementById('overlay').style.display="none";
                showError("Invalid Join Code");
            }
            else if(playerCount==2)
            {
                document.getElementById('backbtn').style.display='none';
                clearInterval(iv1);
                document.getElementById('joiner').style.display="block";
                document.getElementById('joiner').innerHTML= "Room code is : "+code;
                if(userTime < oppTime)
                {
                    setTimeout(()=>{
                        document.getElementById('overlay').style.display="none";
                    },1500);
                }
                else
                {
                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
            else
            {
                clearInterval(iv1);
                var msg={
                    type:"disconn",
                    id: code,
                    };
                socket.send(JSON.stringify(msg));
                play = 0;
                socket.close();
                document.getElementById('onGame').style.display='none'; 
                document.getElementById('mainMenu').style.display='block';
                document.getElementById('overlay').style.display="none";
                showError("Room is full");
            }
        },2500);
    }
}

function message()  //function for performing tasks based on message received   
{
    socket.onmessage = function(e){
        var msg = JSON.parse(e.data);
        if(msg.id==code)
        {
            if(msg.type=="move")
            {
                document.getElementById(msg.btn).innerHTML = "X";
                document.getElementById(msg.btn).disabled = true;    
                setTimeout(() => {
                    document.getElementById('overlay').style.display="none";
                    check_win();
                }, 100);
                log.innerHTML += "<p>" + "Opponent picked " + msg.btn.split("_")[1] + "</p>";
            }
            else if(msg.type=="forfeit")
            {
                gameOver("You Won!","Opponent forfeited the match. You did well.");
                log.innerHTML += "<p>You Won! Opponent Forfeited.</p>";
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
                        document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                        document.getElementById('overlay').style.display="block";
                    }
                }
            }
            else if(msg.type=="quit")
            {
                playerCount -=1;
                play = 0;
                if(playerCount<=1)
                {
                    for(let i=1;i<=9;i++)
                    {
                        var str = "btn_" + i; 
                        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
                        document.getElementById(str).disabled = false;
                    }  
                    if(mode==1)
                    {
                        iv1 = setInterval(()=>{
                            console.log(playerCount);
                            if(playerCount==1)
                            {
                                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
                            }
                            else if(playerCount==2)
                            {
                                document.getElementById('backbtn').style.display='none';
                                clearInterval(iv1);
                                document.getElementById('joiner').style.display="block";
                                document.getElementById('joiner').innerHTML= "Room code is : "+code;
                                if(userTime < oppTime)
                                {
                                    setTimeout(()=>{
                                        document.getElementById('overlay').style.display="none";
                                    },1500);
                                }
                                else
                                {
                                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                                    document.getElementById('overlay').style.display="block";
                                }
                            }
                            else
                            {
                                clearInterval(iv1);
                                var msg={
                                    type:"disconn",
                                    id: code,
                                    };
                                socket.send(JSON.stringify(msg));
                                play = 0;
                                socket.close();
                                document.getElementById('onGame').style.display='none'; 
                                document.getElementById('mainMenu').style.display='block';
                                document.getElementById('overlay').style.display="none";
                                showError("Room is full");
                            }
                        },2500);            
                    }
                    else
                    {
                        iv1 = setInterval(()=>{
                            console.log(playerCount);
                            if(playerCount==1)
                            {
                                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
                            }
                            else if(playerCount==2)
                            {
                                document.getElementById('backbtn').style.display='none'; 
                                clearInterval(iv1);
                                if(userTime < oppTime)
                                {
                                    setTimeout(()=>{
                                        document.getElementById('overlay').style.display="none";
                                    },1500);
                                }
                                else
                                {
                                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                                    document.getElementById('overlay').style.display="block";
                                }
                            }
                            else
                            {
                                clearInterval(iv1);
                                scnt+=1;
                                var msg={
                                    type:"disconn",
                                    id: code,
                                    };
                                socket.send(JSON.stringify(msg));
                                play = 0;
                                socket.close();
                                if(scnt>40)
                                {
                                    document.getElementById('backbtn').style.display='block';
                                    document.getElementById('onGame').style.display='none'; 
                                    document.getElementById('mainMenu').style.display='block';
                                    document.getElementById('overlay').style.display="none";
                                    showError("Room is full");
                                    return;
                                }
                                socket.onclose = ()=>{
                                    online();
                                };
                            }
                        },2500);   
                    } 
                }
                if(msg.choice==1)
                {
                    gameOver("You Won!","Opponent quit the match.");
                    log.innerHTML += "<p>You Won! Opponent quits.</p>";
                }
                else
                {
                    document.getElementById('backbtn').style.display = 'block';
                    document.getElementById('overlay-msg').innerHTML="Opponent disconnected. Waiting for Opponent to join";   
                    document.getElementById('overlay').style.display="block";
                }
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
                    id: code,
                };
                socket.send(JSON.stringify(msg));
                playerCount += 1;
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
                    document.getElementById('backbtn').style.display = 'block';
                    document.getElementById('overlay-msg').innerHTML="Opponent disconnected. Waiting for Opponent to join";   
                    document.getElementById('overlay').style.display="block";
                    if(mode==1)
                    {
                        iv1 = setInterval(()=>{
                            console.log(playerCount);
                            if(playerCount==1)
                            {
                                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";
                            }
                            else if(playerCount==2)
                            {
                                document.getElementById('backbtn').style.display='none';
                                clearInterval(iv1);
                                document.getElementById('joiner').style.display="block";
                                document.getElementById('joiner').innerHTML= "Room code is : "+code;
                                if(userTime < oppTime)
                                {
                                    setTimeout(()=>{
                                        document.getElementById('overlay').style.display="none";
                                    },1500);
                                }
                                else
                                {
                                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                                    document.getElementById('overlay').style.display="block";
                                }
                            }
                            else
                            {
                                clearInterval(iv1);
                                var msg={
                                    type:"disconn",
                                    id: code,
                                    };
                                socket.send(JSON.stringify(msg));
                                play = 0;
                                socket.close();
                                document.getElementById('onGame').style.display='none'; 
                                document.getElementById('mainMenu').style.display='block';
                                document.getElementById('overlay').style.display="none";
                                showError("Room is full");
                            }
                        },2500);            
                    }
                    else
                    {
                        iv1 = setInterval(()=>{
                            console.log(playerCount);
                            if(playerCount==1)
                            {
                                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
                            }
                            else if(playerCount==2)
                            {
                                document.getElementById('backbtn').style.display='none'; 
                                clearInterval(iv1);
                                if(userTime < oppTime)
                                {
                                    setTimeout(()=>{
                                        document.getElementById('overlay').style.display="none";
                                    },1500);
                                }
                                else
                                {
                                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                                    document.getElementById('overlay').style.display="block";
                                }
                            }
                            else
                            {
                                clearInterval(iv1);
                                scnt+=1;
                                var msg={
                                    type:"disconn",
                                    id: code,
                                    };
                                socket.send(JSON.stringify(msg));
                                play = 0;
                                socket.close();
                                if(scnt>40)
                                {
                                    document.getElementById('backbtn').style.display='block';
                                    document.getElementById('onGame').style.display='none'; 
                                    document.getElementById('mainMenu').style.display='block';
                                    document.getElementById('overlay').style.display="none";
                                    showError("Room is full");
                                    return;
                                }
                                socket.onclose = ()=>{
                                    online();
                                };
                            }
                        },2500);   
                    }
                }
            }
        }
    }

    socket.onerror=()=>{
        var msg={
            type:"disconn",
            id: code,
            };
        socket.send(JSON.stringify(msg));
        socket.close();
        document.getElementById('onGame').style.display='none'; 
        document.getElementById('mainMenu').style.display='block';
        document.getElementById('overlay').style.display="none";
        showError("Network Error Occurred. Please check your connection and try again later.");
    }
}

function send_move(id) //function to send user move over socket 
{
    var msg={
        type:"move",
        btn:id,
        id: code,
        };
    socket.send(JSON.stringify(msg));
    // console.log("Sent move with",id);
    log.innerHTML += "<p>" + "You picked " + id.split("_")[1] + "</p>";
    setTimeout(() => {
        document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
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
    var flag=0;
    if(btn1==btn2 && btn2==btn3 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;")    //check for 1st row
    {
        if(btn1=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn4==btn5 && btn5==btn6 && btn4!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 2nd row
    {
        if(btn4=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn7==btn8 && btn8==btn9 && btn7!="&nbsp;&nbsp;&nbsp;&nbsp;")   //check for 3rd row
    {
        if(btn7=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn1==btn4 && btn1==btn7 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 1st column
    {
        if(btn1=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn2==btn5 && btn2==btn8 && btn2!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 2nd column
    {
        if(btn2=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn3==btn6 && btn3==btn9 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for 3rd column
    {
        if(btn3=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn1==btn5 && btn1==btn9 && btn1!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for primary diagonal
    {
        if(btn1=="O")
        {
            flag=1;
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if(btn3==btn5 && btn3==btn7 && btn3!="&nbsp;&nbsp;&nbsp;&nbsp;") //check for secondary diagonal
    {
        if(btn3=="O")
        {
            flag=1;       
        }
        else
        {
            flag=2;
        }
        document.getElementById('overlay').style.display="none";
    }
    else if((btn1=="O" || btn1=="X") && (btn2=="O" || btn2=="X") && (btn3=="O" || btn3=="X") && (btn4=="O" || btn4=="X") && (btn5=="O" || btn5=="X") && (btn6=="O" || btn6=="X") && (btn7=="O" || btn7=="X") && (btn8=="O" || btn8=="X") && (btn9=="O" || btn9=="X"))
    {
        gameOver("Match Draw!","Opponent tried but you are too Good.");
        log.innerHTML += "<p>Match Draw! Both players are at same level.</p>";
        document.getElementById('overlay').style.display="none";
    }
    if(flag==1)
    {
        gameOver("You Won!","You defeated the opponent.");
        log.innerHTML += "<p>You Won! You defeated the opponent.</p>";
    }
    else if(flag==2)
    {
        gameOver("You Lost!","Opponent defeated you.");
        log.innerHTML += "<p>You Lost! Opponent defeated you.</p>";
    }
}

function mainMenu(ch)     //Function to go to main menu and quit the match
{
    var msg={
        type:"quit",
        choice: ch,
        id: code,
        };
    socket.send(JSON.stringify(msg));
    socket.close();
    play = 0;
    document.getElementById('overlay-msg').innerHTML="Please wait.....Joining";
    document.getElementById('onGame').style.display='none'; 
    document.getElementById('backbtn').style.display='block'; 
    document.getElementById('mainMenu').style.display='block';
}

function forfeit()      //Function to forfeit the match
{
    var msg={
        type:"forfeit",
        id: code,
        };
    socket.send(JSON.stringify(msg));
    play = 0;
    gameOver("You Lost!","You forfeited the match.");
    log.innerHTML += "<p>You Lost! You forfeited the match.</p>";
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
    log.innerHTML = "<p>Match Started</p>";
    for(let i=1;i<=9;i++)
    {
        var str = "btn_" + i; 
        document.getElementById(str).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
        document.getElementById(str).disabled = false;
    }
    if(playerCount<=1)
    {
        document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
        document.getElementById('overlay').style.display="block";
        iv1 = setInterval(()=>{
            console.log(playerCount);
            if(playerCount==1)
            {
                document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to join";   
            }
            else if(playerCount==2)
            {
                document.getElementById('backbtn').style.display='none';
                clearInterval(iv1);
                if(userTime < oppTime)
                {
                    setTimeout(()=>{
                        document.getElementById('overlay').style.display="none";
                    },1500);
                }
                else
                {
                    document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
                    document.getElementById('overlay').style.display="block";
                }
            }
            else
            {
                clearInterval(iv1);
                scnt+=1;
                var msg={
                    type:"disconn",
                    id: code,
                    };
                socket.send(JSON.stringify(msg));
                play = 0;
                socket.close();
                if(scnt>40)
                {
                    document.getElementById('onGame').style.display='none'; 
                    document.getElementById('mainMenu').style.display='block';
                    document.getElementById('overlay').style.display="none";
                    showError("Room is full");
                    return;
                }
                socket.onclose = ()=>{
                    online();
                };
            }
        },2500);
        return;
    }
    userTime2 = Date.now();
    play += 1;
    var msg={
        type:"playAgain",
        time: userTime2,
        id: code,
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
            document.getElementById('overlay-msg').innerHTML="Waiting for Opponent move";
            document.getElementById('overlay').style.display="block";
        }
    }
    else
    {
        document.getElementById('overlay-msg').innerHTML="Waiting for Opponent to respond....";
        document.getElementById('overlay').style.display="block";
    }
}

function copyToClip()       //function to copy content to clipboard
{
    document.getElementById('copier').style.display = 'block';
    navigator.clipboard.writeText("I challenge you to beat me in TIC-TAC-TOE. Join using this code : "+code).then(function() {
        document.getElementById('copier-text').innerHTML = "Code copied to clipboard.";
    }, function() {
        document.getElementById('copier-text').innerHTML = "Can't copy code to clipboard.";
    });
    $('#copier').toast({delay: 2000});
    $('#copier').toast('show');
    setTimeout(()=>{
        document.getElementById('copier').style.display = 'none';
    },2000);
}

function showError(msg)
{
    document.getElementById('alert-msg').innerHTML = msg;
    $('#alert').toast({delay: 4000});
    $('#alert').toast('show');
}

window.onload = ()=>{
    setInterval(()=>{
        if(window.navigator.onLine)
        {
            document.getElementById('status').innerHTML = "Status : Connected";
        }
        else
        {
            document.getElementById('status').innerHTML = "Status : Disconnected";
        }
    },2000);
}

window.onbeforeunload = function () {
    var msg={
        type:"disconn",
        id: code,
        };
    socket.send(JSON.stringify(msg));
    socket.close();
}