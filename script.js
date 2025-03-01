"use strict";

window.onload = function() {
    var rodOne = document.getElementById("rod-one");
    var rodTwo = document.getElementById("rod-two");
    var ball = document.getElementById("ball");

    var rodSpeed = 20;
    var ballSpeedX = 4;
    var ballSpeedY = 4;
    var ballDirectionX = 1;
    var ballDirectionY = 1;

    function moveRod(event) {
        let leftPos = parseInt(rodOne.style.left) || (window.innerWidth / 2 - rodOne.offsetWidth / 2);

        if (event.key === "d" || event.key === "D") {
            leftPos += rodSpeed;
            if (leftPos + rodOne.offsetWidth > window.innerWidth) leftPos = window.innerWidth - rodOne.offsetWidth;
        } else if (event.key === "a" || event.key === "A") {
            leftPos -= rodSpeed;
            if (leftPos < 0) leftPos = 0;
        }

        rodOne.style.left = leftPos + "px";
        rodTwo.style.left = leftPos + "px";
    }

    function moveBall() {
        let ballX = ball.offsetLeft + ballSpeedX * ballDirectionX;
        let ballY = ball.offsetTop + ballSpeedY * ballDirectionY;

        if (ballX <= 0 || ballX + ball.offsetWidth >= window.innerWidth) {
            ballDirectionX *= -1;
        }

        if (ballY <= rodOne.offsetTop + rodOne.offsetHeight && ballX >= rodOne.offsetLeft && ballX <= rodOne.offsetLeft + rodOne.offsetWidth) {
            ballDirectionY *= -1;
        }

        if (ballY + ball.offsetHeight >= rodTwo.offsetTop && ballX >= rodTwo.offsetLeft && ballX <= rodTwo.offsetLeft + rodTwo.offsetWidth) {
            ballDirectionY *= -1;
        }

        if (ballY <= 0 || ballY + ball.offsetHeight >= window.innerHeight) {
            ballDirectionY *= -1;
        }

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        requestAnimationFrame(moveBall);
    }

    document.addEventListener("keydown", moveRod);
    moveBall();
};
