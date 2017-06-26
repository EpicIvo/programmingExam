var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Breakfast = (function () {
    function Breakfast() {
        var _this = this;
        this.counter = 0;
        this.bar = document.getElementsByTagName("bar")[0];
        this.button = document.getElementsByTagName("foodbutton")[0];
        this.button.style.cursor = "auto";
        this.callback = function (e) { return _this.onClick(e); };
        this.observerCollection = new Array();
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
        this.notifyObservers();
        this.counter = 0;
        this.button.removeEventListener("click", this.callback);
        this.button.classList.remove("blinking");
        this.button.style.cursor = "auto";
    };
    Breakfast.prototype.subscribe = function (o) {
        this.observerCollection.push(o);
    };
    ;
    Breakfast.prototype.unSubscribe = function (o) {
        for (var i = 0; i < this.observerCollection.length; i++) {
            if (this.observerCollection[i] == o) {
                this.observerCollection.splice(i, 1);
            }
        }
    };
    ;
    Breakfast.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observerCollection; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify();
        }
    };
    ;
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
        this.addMoarr = function () {
            var randomGandalfNumber = Math.random() * 4;
            for (var i = 0; i < randomGandalfNumber; i++) {
                var gandalf = void 0;
                gandalf = new Gandalf();
                _this.breakfast.subscribe(gandalf);
                _this.gameobjects.push(gandalf);
            }
        };
        this.breakfast = new Breakfast();
        this.gameobjects = new Array();
        this.cards = new Array();
        var randomGandalfNumber = Math.random() * 10;
        for (var i = 0; i < randomGandalfNumber; i++) {
            var gandalf = void 0;
            gandalf = new Gandalf();
            this.breakfast.subscribe(gandalf);
            this.gameobjects.push(gandalf);
        }
        var randomOrkNumber = Math.random() * 10;
        for (var i = 0; i < randomOrkNumber; i++) {
            var ork = void 0;
            ork = new Ork();
            this.gameobjects.push(ork);
        }
        setInterval(this.addMoarr, 2000);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.breakfast.update();
        for (var _i = 0, _a = this.gameobjects; _i < _a.length; _i++) {
            var gameobject = _a[_i];
            gameobject.update();
            if (gameobject.inMordor) {
                this.removeFromArray(gameobject);
                this.cards.push(new Card(100));
            }
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.removeFromArray = function (g) {
        var i = this.gameobjects.indexOf(g);
        if (i != -1) {
            this.gameobjects.splice(i, 1);
        }
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
var Gameobject = (function () {
    function Gameobject() {
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.facing = 1;
        this.x = 0;
        this.y = 0;
        this.inMordor = false;
    }
    Gameobject.prototype.update = function () {
    };
    return Gameobject;
}());
window.addEventListener("load", function () {
    var game = Game.getInstance();
});
var Ork = (function (_super) {
    __extends(Ork, _super);
    function Ork() {
        _super.call(this);
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
}(Gameobject));
var Hungry = (function () {
    function Hungry(g) {
        var _this = this;
        this.action = function () {
            _this.gandalf.x += _this.gandalf.xspeed;
            _this.gandalf.y += _this.gandalf.yspeed;
            var xdistance = _this.gandalf.xTarget - _this.gandalf.x;
            var ydistance = _this.gandalf.yTarget - _this.gandalf.y;
            if (xdistance < 4 && ydistance < 4)
                _this.gandalf.setTarget();
            _this.gandalf.setSpeed(xdistance, ydistance);
        };
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/" + this.gandalf.tag + "_hungry.png)";
        this.gandalf.div.style.cursor = "auto";
        this.gandalf.setTarget();
        setTimeout(this.gandalf.goBackToSleep, 5000);
    }
    return Hungry;
}());
var Leaving = (function () {
    function Leaving(g) {
        var _this = this;
        this.action = function () {
            _this.gandalf.x += _this.gandalf.xspeed;
            _this.gandalf.y += _this.gandalf.yspeed;
            var xdistance = _this.gandalf.xTarget - _this.gandalf.x;
            var ydistance = _this.gandalf.yTarget - _this.gandalf.y;
            if (xdistance < 4 && ydistance < 4) {
                _this.gandalf.inMordor = true;
                console.log("het karakter is uit beeld");
            }
            _this.gandalf.setSpeed(xdistance, ydistance);
        };
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/" + this.gandalf.tag + "_leaving.png)";
        this.gandalf.div.style.cursor = "auto";
        this.gandalf.xTarget = Math.random() * window.innerWidth;
        this.gandalf.yTarget = window.innerHeight + 300;
        this.gandalf.speedmultiplier += 1;
    }
    return Leaving;
}());
var Sleeping = (function () {
    function Sleeping(g) {
        this.action = function () {
        };
        this.gandalf = g;
        this.gandalf.div.style.backgroundImage = "url(images/" + this.gandalf.tag + "_sleep.png)";
        this.gandalf.div.style.cursor = "pointer";
        this.gandalf.div.addEventListener("click", this.gandalf.callback);
    }
    return Sleeping;
}());
var Gandalf = (function (_super) {
    __extends(Gandalf, _super);
    function Gandalf() {
        var _this = this;
        _super.call(this);
        this.setAction = function () {
            if (Math.random() < 0.5) {
                _this.action = "sleeping";
            }
            else {
                _this.action = "hungry";
            }
        };
        this.notify = function () {
            if (_this.action === "hungry") {
                _this.behaviour = new Leaving(_this);
                _this.action = "leaving";
            }
        };
        this.goBackToSleep = function () {
            if (_this.action === "hungry") {
                _this.behaviour = new Sleeping(_this);
                _this.action = "sleeping";
            }
        };
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
        this.setAction();
        switch (this.action) {
            case "hungry":
                this.behaviour = new Hungry(this);
                break;
            case "leaving":
                this.behaviour = new Leaving(this);
                break;
            case "sleeping":
                this.behaviour = new Sleeping(this);
                break;
        }
    }
    Gandalf.prototype.update = function () {
        switch (this.action) {
            case "hungry":
                this.behaviour.action();
                break;
            case "leaving":
                this.behaviour.action();
                break;
            case "sleeping":
                this.behaviour.action();
                break;
        }
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scale(" + this.facing + ",1)";
    };
    Gandalf.prototype.onClick = function (e) {
        console.log("je klikt op gandalf. de listener wordt nu verwijderd.");
        this.div.style.cursor = "auto";
        this.div.removeEventListener("click", this.callback);
        this.action = "hungry";
        this.behaviour = new Hungry(this);
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
}(Gameobject));
//# sourceMappingURL=main.js.map