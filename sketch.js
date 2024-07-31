
let racket1Width = 10;
let racket1Height = 80;
let racket1X = 20;
let racket1Y;

// Variáveis para a raquete do jogador 2 (oponente)
let racket2Width = 10;
let racket2Height = 80;
let racket2X;
let racket2Y;

// Variáveis para a bola
let ballSize = 20;
let ballX;
let ballY;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Variável para controlar a pontuação
let player1Score = 0;
let player2Score = 0;

function setup() {
  createCanvas(800, 400);
  racket1Y = height / 2 - racket1Height / 2;
  racket2X = width - 20 - racket2Width;
  racket2Y = height / 2 - racket2Height / 2;
  resetBall();
}

function draw() {
  background(0);

  // Desenhar raquetes
  fill(255); // Cor branca
  rect(racket1X, racket1Y, racket1Width, racket1Height); // Raquete do jogador 1
  rect(racket2X, racket2Y, racket2Width, racket2Height); // Raquete do jogador 2 (oponente)

  // Desenhar bola
  fill(255); // Cor branca
  ellipse(ballX, ballY, ballSize);

  // Movimentar raquete do jogador 1 com teclado
  if (keyIsDown(87) && racket1Y > 0) { // Tecla 'W' (cima)
    racket1Y -= 10;
  }
  if (keyIsDown(83) && racket1Y + racket1Height < height) { // Tecla 'S' (baixo)
    racket1Y += 10;
  }

  // Movimentar raquete do jogador 2 (oponente) com teclado
  if (keyIsDown(UP_ARROW) && racket2Y > 0) { // Seta para cima
    racket2Y -= 10;
  }
  if (keyIsDown(DOWN_ARROW) && racket2Y + racket2Height < height) { // Seta para baixo
    racket2Y += 10;
  }

  // Movimentar bola
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Verificar colisão da bola com as paredes superior e inferior
  if (ballY - ballSize / 2 < 0 || ballY + ballSize / 2 > height) {
    ballSpeedY *= -1;
  }

  // Verificar colisão da bola com as raquetes
  if (ballX - ballSize / 2 < racket1X + racket1Width &&
      ballY > racket1Y &&
      ballY < racket1Y + racket1Height) {
    ballSpeedX *= -1;
  }

  if (ballX + ballSize / 2 > racket2X &&
      ballY > racket2Y &&
      ballY < racket2Y + racket2Height) {
    ballSpeedX *= -1;
  }

  // Verificar se a bola passou pela raquete do jogador 1 (ponto para o jogador 2)
  if (ballX - ballSize / 2 < 0) {
    player2Score++;
    resetBall();
  }

  // Verificar se a bola passou pela raquete do jogador 2 (ponto para o jogador 1)
  if (ballX + ballSize / 2 > width) {
    player1Score++;
    resetBall();
  }

  // Exibir pontuação na tela
  textAlign(CENTER);
  textSize(32);
  fill(255);
  text(player1Score, width / 4, 50);
  text(player2Score, 3 * width / 4, 50);
}

// Função para reiniciar a posição da bola
function resetBall() {
  ballX = width / 2;
  ballY = height / 2;
  // Reiniciar direção da bola
  if (random(1) > 0.5) {
    ballSpeedX = 5;
  } else {
    ballSpeedX = -5;
  }
  ballSpeedY = random(-5, 5);
}