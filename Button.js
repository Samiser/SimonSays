function Button(x, y, r, colour, tone) {
	this.x = x;
	this.y = y;
	this.radius = r;
	this.pressed = false;
	this.black = color(0);
	this.activeColour = colour;
	
	this.show = true;
	
	this.osc = new p5.Oscillator();
	this.osc.setType('sine');
	this.osc.freq(tone);
	this.osc.amp(0);
	this.osc.start();

	this.update = function() {
		this.display();
		if (this.pressed) {
			this.activeColour = colour;
		} else {
			this.activeColour = lerpColor(this.black, colour, 0.6);
		}
	}
	
	this.display = function() {
		if(this.show) {
			fill(this.activeColour);
			ellipseMode(CENTER);
			ellipse(this.x, this.y, this.radius, this.radius);
		}
	}
	
	this.butActivate = function() {
		this.pressed = true;
		this.osc.amp(0.5, 0.1);
	}
	
	this.butDeactivate = function() {
		this.pressed = false;
		this.osc.amp(0, 0.2);
	}
	
	this.butPressed = function() {
		if (dist(this.x, this.y, mouseX, mouseY) < this.radius/2) {
			this.butActivate();
		}
	}
	
	this.butReleased = function() {
		if (dist(this.x, this.y, mouseX, mouseY) < this.radius/2) {
			if (this.pressed) {
				this.butDeactivate();
			}
		}
	}
}