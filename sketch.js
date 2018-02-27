function setup() {
	createCanvas(windowWidth, windowHeight);
	
	stage = 0;
	score = 0;
	
	revealedButtons = [];
	userSequence = [];
	butCount = 5;
	buttons = []
	
	if (width < height) {
		rad = width/4;
	} else {
		rad = height/4;
	}
	
	buttons[0] = new Button(width/2 - rad, height/2 - rad*0.7, rad, color(255, 0, 0), 523);
	buttons[1] = new Button(width/2 + rad, height/2 - rad*0.7, rad, color(0, 255, 0), 392);
	buttons[2] = new Button(width/2, height/2, rad, color(255, 155, 0), 330);
	buttons[3] = new Button(width/2 - rad, height/2 + rad*0.7, rad, color(0, 0, 255), 261);
	buttons[4] = new Button(width/2 + rad, height/2 + rad*0.7, rad, color(255, 255, 0), 196);
	
	let activeButton = -1;
	simon = new Simon();
}

function draw() {
	background(0);
	if (stage == 0) {
		fill(255);
		textSize(width/10);
		textAlign(CENTER);
		text('Simon Says', width/2, height/2);
		textSize(width/40);
		text('Tap to begin', width/2, height/2 + height/10);
	} else if (stage == 1) {
		for (let i = 0; i < butCount; i++) {
			buttons[i].update();
		}
		simon.update();
		sequenceCheck();
	} else if (stage == 2) {
		fill(255);
		textSize(width/10);
		text("Game Over", width/2, height/2);
		textSize(width/40);
		text('Score: ' + score, width/2, height/2 + height/10);
		text('Tap to try again', width/2, height/2 + height/5);
	}
}

function mousePressed() {
	if (stage == 0) {
		stage++;
		simon.oldMillis = millis();
	} else if (stage == 1) {
		for (let i = 0; i < butCount; i++) {
			buttons[i].butPressed();
			if (simon.playerTurn && buttons[i].pressed) {
				userSequence.push(i);
			}
		}
		for (let i = 0; i < userSequence.length; i++) {
			print(userSequence[i]);
		}
	} else if (stage == 2) {
		stage = 0;
		score = 0;
	}
}

function mouseReleased() {
	for (let i = 0; i < butCount; i++) {
		buttons[i].butReleased();
	}
}

function sequenceCheck() {
	print(userSequence.length);
	print(simon.sequence.length);
	if (userSequence.length == simon.sequence.length) {
		for (let i = 0; i < userSequence.length; i++) {
			if (userSequence[i] != simon.sequence[i]) {
				stage = 2;
				userSequence = [];
				simon.sequence = [floor(random(4.9))];
			}
		}
		print("Win!");
		userSequence = [];
		score++;
		simon.sequenceAdd();
		simon.oldMillis = millis();
		simon.pause = true;
		simon.playerTurn = false;
	}
}