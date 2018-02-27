function Simon() {
	this.sequence = [floor(random(4.9))];
	this.oldMillis = millis();
	this.pressing = false;
	this.timer = 500;
	this.counter = 0;
	this.playerTurn = false;
	this.pause = true;
	
	this.update = function() {
		if (!this.playerTurn)
		{
			if (this.pause) {
				if((millis() - this.oldMillis) > 1000) {
					this.pause = false;
				}
			} else if ((millis() - this.oldMillis) > this.timer) {
				this.press(this.counter);
				if (this.counter >= this.sequence.length) {
					this.counter = 0;
					this.playerTurn = true;
				}
				this.oldMillis = millis();
			}
		}
	}
	
	this.press = function() {
		if (!this.pressing) {
			buttons[this.sequence[this.counter]].butActivate();
			this.pressing = true;
		} else {
			buttons[this.sequence[this.counter]].butDeactivate();
			this.counter++;
			this.pressing = false;
		}
	}
	
	this.sequenceAdd = function() {
		this.sequence.push(floor(random(4.9)));
	}
}