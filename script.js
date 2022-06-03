const start_minutes = 3;
let time = start_minutes*60;
let minutes;
let seconds;

const countdown = document.getElementById("timer")

let handle = setInterval(updateTimer,1000)
function updateTimer(){
     minutes = Math.floor(time/60);
     seconds = time %60;
    if(seconds===0 && minutes===0){
        clearInterval(handle)
        checkans(false)
    }
    seconds=seconds<10 ?'0'+seconds :seconds;

    countdown.innerHTML = `${minutes}:${seconds}`;

    time--;
}
let ran_arr = [];
let buttonPressed = [];
let selectedButton
let score = 0;
const audio = new Audio();
const audio1 = new Audio();
audio.src = "audio.wav"
audio1.src="gameover.mp3"
for (let i = 0; i < 16; i++) {
    selectedButton = document.querySelectorAll(".btn")[i];
    selectedButton.addEventListener('click', fun)
}

function fun(evt) {

    let chosenButton = evt.target.getAttribute("id");
    buttonPressed.push(chosenButton);
    console.log("clicked")
    console.log(buttonPressed);
    let ans = equalArray(ran_arr,buttonPressed)
    if(ran_arr.length===buttonPressed.length){
        checkans(ans)
    }


}

function random() {
    let ran = Math.floor(Math.random() * (16));
    return ran;
}


function tilegen() {
    let ran = random()
    let i=0;
    if (!ran_arr.includes(ran)) {
        ran_arr.push(ran)
        console.log(ran_arr)
        myLoop(ran_arr,i)
    } else {
        tilegen()
    }
}

function myLoop(ran_arr,i){
    console.log("i=",i)
        setTimeout( ()=>{
            let myId = document.getElementById(ran_arr[i]);
            myId.classList.remove('new');
            let elem = myId;
            setTimeout(()=>{elem.classList.add('new');},500)

            i++;
            if(i<ran_arr.length){
                myLoop(ran_arr,i);
            }
        },1000)
    }


function equalArray(ran_arr,buttonPressed){
    let count = 0;

    for (let i = 0; i < ran_arr.length; i++) {
        console.log("ran=",ran_arr,"button=",buttonPressed)

        if(ran_arr[i] === parseInt(buttonPressed[i])){
                count++;
        }
    }
    // console.log("count=",count,"buttonpressedlength",buttonPressed.length)
    if(buttonPressed.length>count){
        checkans(false)
    }
    if(count===ran_arr.length){

            return true;

    }
}

function checkans(result) {


    if(!result){

        audio1.play()
        alert("GAME OVER \nYOUR SCORE = " + score)
    }
    else{
        if(ran_arr.length === buttonPressed.length){
            score++;
            if(score>36){
                clearInterval(handle);
                score = score+minutes*60+seconds;
                alert("GAME OVER \nYOUR SCORE = " + score)


            }
            while(buttonPressed.length){
                buttonPressed.pop()
            }

            tilegen();
        }
    }

}

tilegen()


