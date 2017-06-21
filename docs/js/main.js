"use strict";
var Breakfast = (function () {
    function Breakfast() {
        var _this = this;
        this.counter = 0;
        this.bar = document.getElementsByTagName("bar")[0];
        this.button = document.getElementsByTagName("foodbutton")[0];
        this.button.style.cursor = "auto";
        this.callback = function (e) { return _this.onClick(e); };
    }
    Breakfast.prototype.update = function () {
        this.counter = Math.min(1, this.counter + 0.003);
        this.bar.style.width = (143 * this.counter) + "px";
        if (this.counter >= 1) {
            this.button.classList.add("blinking");
            this.button.addEventListener("click", this.callback);
            this.button.style.cursor = "pointer";
        }
    };
    Breakfast.prototype.onClick = function (e) {
        console.log("Ontbijtjes uitdelen!");
        this.counter = 0;
        this.button.removeEventListener("click", this.callback);
        this.button.classList.remove("blinking");
        this.button.style.cursor = "auto";
    };
    return Breakfast;
}());
var Card = (function () {
    function Card(x) {
        this.div = document.createElement("card");
        document.body.appendChild(this.div);
        this.div.style.left = x + "px";
    }
    return Card;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.breakfast = new Breakfast();
        this.gandalf1 = new Gandalf();
        this.gandalf2 = new Gandalf();
        this.ork1 = new Ork();
        this.ork2 = new Ork();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.breakfast.update();
        this.gandalf1.update();
        this.gandalf2.update();
        this.ork1.update();
        this.ork2.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
var Gandalf = (function () {
    function Gandalf() {
        var _this = this;
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.facing = 1;
        this.x = 0;
        this.y = 0;
        this.width = 67;
        this.height = 119;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight - 110);
        this.speedmultiplier = Math.random() + 1;
        this.tag = "gandalf";
        this.div = document.createElement(this.tag);
        document.body.appendChild(this.div);
        this.div.style.backgroundImage = "url(images/" + this.tag + "_hungry.png)";
        this.callback = function (e) { return _this.onClick(e); };
        var action = "sleeping";
        switch (action) {
            case "hungry":
                this.div.style.backgroundImage = "url(images/" + this.tag + "_hungry.png)";
                this.div.style.cursor = "auto";
                this.setTarget();
                break;
            case "leaving":
                this.div.style.backgroundImage = "url(images/" + this.tag + "_leaving.png)";
                this.div.style.cursor = "auto";
                this.xTarget = Math.random() * window.innerWidth;
                this.yTarget = window.innerHeight + 300;
                this.speedmultiplier += 1;
                break;
            case "sleeping":
                this.div.style.backgroundImage = "url(images/" + this.tag + "_sleep.png)";
                this.div.style.cursor = "pointer";
                this.div.addEventListener("click", this.callback);
                break;
        }
    }
    Gandalf.prototype.update = function () {
        var action = "sleeping";
        switch (action) {
            case "hungry":
                this.hungry();
                break;
            case "leaving":
                this.leaving();
                break;
            case "sleeping":
                this.sleeping();
                break;
        }
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.facing + ",1)";
    };
    Gandalf.prototype.onClick = function (e) {
        console.log("je klikt op gandalf. de listener wordt nu verwijderd.");
        this.div.style.cursor = "auto";
        this.div.removeEventListener("click", this.callback);
    };
    Gandalf.prototype.hungry = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        var xdistance = this.xTarget - this.x;
        var ydistance = this.yTarget - this.y;
        if (xdistance < 4 && ydistance < 4)
            this.setTarget();
        this.setSpeed(xdistance, ydistance);
    };
    Gandalf.prototype.leaving = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        var xdistance = this.xTarget - this.x;
        var ydistance = this.yTarget - this.y;
        if (xdistance < 4 && ydistance < 4) {
            console.log("het karakter is uit beeld");
        }
        this.setSpeed(xdistance, ydistance);
    };
    Gandalf.prototype.sleeping = function () {
    };
    Gandalf.prototype.setTarget = function () {
        this.xTarget = Math.random() * (window.innerWidth - 80);
        this.yTarget = Math.random() * (window.innerHeight - 120);
    };
    Gandalf.prototype.setSpeed = function (xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;
        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    };
    return Gandalf;
}());
window.addEventListener("load", function () {
    new Game();
});
var Ork = (function () {
    function Ork() {
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.facing = 1;
        this.x = 0;
        this.y = 0;
        this.tag = "ork";
        this.width = 67;
        this.height = 119;
        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight - 110);
        this.speedmultiplier = Math.random() + 1;
        this.div = document.createElement(this.tag);
        document.body.appendChild(this.div);
        this.div.style.backgroundImage = "url(images/" + this.tag + "_hungry.png)";
        this.div.style.cursor = "auto";
        this.setTarget();
    }
    Ork.prototype.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        var xdistance = this.xTarget - this.x;
        var ydistance = this.yTarget - this.y;
        if (xdistance < 4 && ydistance < 4)
            this.setTarget();
        this.setSpeed(xdistance, ydistance);
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.facing + ",1)";
    };
    Ork.prototype.setTarget = function () {
        this.xTarget = Math.random() * (window.innerWidth - 80);
        this.yTarget = Math.random() * (window.innerHeight - 120);
    };
    Ork.prototype.setSpeed = function (xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist / distance;
        this.yspeed = ydist / distance;
        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    };
    return Ork;
}());
//# sourceMappingURL=main.js.map