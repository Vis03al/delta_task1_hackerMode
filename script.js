function start() {
    let n= window.prompt("Enter n for nxn:")
    // let n=4;
    let child;
    let maindiv = document.createElement('div');
    maindiv.classList.add('container');
    //repeat(n,100px)
    maindiv.style.gridTemplateColumns=`repeat(${n},100px)`;

    document.body.appendChild(maindiv)
    for (let i = 0; i < (n*n); i++) {
        child = document.createElement("button")
        child.classList.add('btn');
        child.id=i;
        // child.innerHTML;
        maindiv.appendChild(child)
    }







    const start_minutes = 3;

    let time = start_minutes * 60;
    let minutes;
    let seconds;

    const countdown = document.getElementById("timer")

    let handle = setInterval(updateTimer, 1000)

    function updateTimer() {
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        if (seconds === 0 && minutes === 0) {
            clearInterval(handle)
            checkans(false)
        }
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdown.innerHTML = `${minutes}:${seconds}`;

        time--;
    }

    let ran_arr = [];
    let buttonPressed = [];
    let score = 0;
    const audio = new Audio();
    child.addEventListener('click', audio.play)
    let selectedButton;
    for (let i = 0; i < n*n; i++) {
        selectedButton = document.querySelectorAll(".btn")[i];
        selectedButton.addEventListener('click', fun)
    }
    // child.addEventListener('click',audio.play())


    const audio1 = new Audio();

    audio.src = "audio.wav"
    audio1.src = "gameover.mp3"
    // for (let i = 0; i < 16; i++) {
    //     selectedButton = document.querySelectorAll(".btn")[i];
    //     selectedButton.addEventListener('click', fun)
    // }

    function fun(evt) {

        let chosenButton = evt.target.getAttribute("id");
        buttonPressed.push(chosenButton);
        console.log("clicked")
        console.log(buttonPressed);
        let ans = equalArray(ran_arr, buttonPressed)
        if (ran_arr.length === buttonPressed.length) {
            checkans(ans)
        }


    }

    function random() {
        let ran = Math.floor(Math.random() * (16));
        return ran;
    }


    function tilegen() {
        let ran = random()
        let i = 0;
        if (!ran_arr.includes(ran)) {
            ran_arr.push(ran)
            console.log(ran_arr)
            myLoop(ran_arr, i)
        } else {
            tilegen()
        }
    }

    function myLoop(ran_arr, i) {
        console.log("i=", i)
        setTimeout(() => {
            let myId = document.getElementById(ran_arr[i]);
            // console.log(myId)
            myId.classList.remove('new');
            let elem = myId;
            setTimeout(() => {
                elem.classList.add('new');
            }, 500)

            i++;
            if (i < ran_arr.length) {
                myLoop(ran_arr, i);
            }
        }, 1000)
    }


    function equalArray(ran_arr, buttonPressed) {
        let count = 0;

        for (let i = 0; i < ran_arr.length; i++) {
            console.log("ran=", ran_arr, "button=", buttonPressed)

            if (ran_arr[i] === parseInt(buttonPressed[i])) {
                count++;
            }
        }
        // console.log("count=",count,"buttonpressedlength",buttonPressed.length)
        if (buttonPressed.length > count) {
            checkans(false)
        }
        if (count === ran_arr.length) {

            return true;

        }
    }

    function checkans(result) {


        if (!result) {

            audio1.play()
            // const score = localStorage.getItem("score")
            LocalStorage(score)

            alert("GAME OVER \nYOUR SCORE = " + score)
        } else {
            if (ran_arr.length === buttonPressed.length) {
                score++;
                if (score > 36) {
                    clearInterval(handle);
                    score = score + minutes * 60 + seconds;
                    alert("GAME OVER \nYOUR SCORE = " + score)


                }
                while (buttonPressed.length) {
                    buttonPressed.pop()
                }

                tilegen();
            }
        }

    }

    tilegen()

    function LocalStorage() {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        const Score = {
            Score: score
        };
        highScores.push(Score);
        console.log("pushed")
        highScores.sort((a, b) => b.Score - a.Score)
        highScores.splice(5)
        console.log(highScores)
        localStorage.setItem("highScores", JSON.stringify(highScores));
        const highScoresList = document.getElementById('highScoresList');
        // const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
        document.getElementById("finalScore").innerHTML = "TOP 5 SCORES:"
        highScoresList.innerHTML = highScores.map(
            score => {
                return `<li class="high-score">1)${score.Score}</li>`;
            }).join("");
    }
}
start()
