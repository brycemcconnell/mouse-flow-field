const canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext("2d");
document.getElementById("wrapper").appendChild(canvas);

const GRID_GAP = 40;
const LINE_LENGTH_MOD = 20;
const columns = Math.floor(canvas.width/GRID_GAP);
const rows = Math.floor(canvas.height/GRID_GAP);
let grid = [];

class Vector2 {
	constructor(x, y) {
		// this.i = x;
		// this.j = y;
		this.x = x * GRID_GAP + GRID_GAP/2;
		this.y = y * GRID_GAP + GRID_GAP/2;
		this.x2 = this.x + 1;
		this.y2 = this.y + 1;
	}

	draw() {
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x2, this.y2);
		ctx.stroke();
	}

	updateVector(x, y) {
		let dist = Math.hypot(this.x - x, this.y - y)/ LINE_LENGTH_MOD;
		let angle = Math.atan2(y - this.y, x - this.x);
		this.x2 = this.x + (dist * Math.cos(angle));
		this.y2 = this.y + (dist * Math.sin(angle));
	}
}

for (var i = 0; i < columns; i++) {
	grid[i] = new Array();
	for (var j = 0; j < rows; j++) {
		grid[i][j] = new Vector2(i, j);
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].draw();
		}
	}
	requestAnimationFrame(animate);
}
animate();

window.addEventListener("mousemove", (e) => {
	for (var i = 0; i < columns; i++) {
		for (var j = 0; j < rows; j++) {
			grid[i][j].updateVector(e.clientX, e.clientY);
		}
	}
});