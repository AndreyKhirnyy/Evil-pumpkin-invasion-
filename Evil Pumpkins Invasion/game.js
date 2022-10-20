var canvas = document.getElementById( 'game' );
var context = canvas.getContext( '2d' );

var pumpkin=[];
var candy={x: 0,y: 300,width: 90,height: 90,dx: 10,dy: 10};
var timer=0;
var marshmallow={x: 500,y: 500,width: 90,height: 120};

var fonimg = new Image();
fonimg.src = 'fon.png';

canvas.addEventListener('mousemove', function(event) {
marshmallow.x=event.offsetX-25;
marshmallow.y=event.offsetY-13;
})

var pumpkinimg = new Image();
pumpkinimg.src = 'pumpkin.png';

var candyimg = new Image();
candyimg.src = 'candy.png';

var marshmallowimg = new Image();
marshmallowimg.src = 'marshmallow.png'

fonimg.onload = function () {
    game();
}

function game(){
    update();
    render();
    requestAnimationFrame(game);
}

function update () {
    candy.x += candy.dx;
    candy.y += candy.dy;

    if (candy.x>=930 || candy.x<0) candy.dx=-candy.dx;
    if (candy.y>=630 || candy.y<0) candy.dy=-candy.dy;

var marshmallowTopLineCollision = candy.y + candy.height > marshmallow.y;
var marshmallowLeftLineCollision = candy.x + candy.width > marshmallow.x;
var marshmallowRightLineCollision = candy.x - candy.width < marshmallow.x + marshmallow.width;
var marshmallowBottomLineCollision = candy.y - candy.height < marshmallow.y + marshmallow.height;

if (marshmallowTopLineCollision && marshmallowLeftLineCollision && marshmallowRightLineCollision && marshmallowBottomLineCollision) {
    candy.dy = -candy.dy;
    candy.dx = -candy.dx;
}

timer++;
if (timer%40==0) {
    pumpkin.push({x:Math.random()*1000,y:-100,dx:Math.random()*1-1,dy:Math.random()*2+2});
    del:0;

}
//физика
for(i in pumpkin) {
pumpkin[i].x=pumpkin[i].x+pumpkin[i].dx;
pumpkin[i].y=pumpkin[i].y+pumpkin[i].dy;

//границы
if (pumpkin[i].x>=580 || pumpkin[i].x<0) pumpkin[i].dx=-pumpkin[i].dx;
if (pumpkin[i].y>=700) pumpkin.splice(i,1);

}
} 
function render(){
    context.drawImage(fonimg, 0, 0, 1000, 700);
    context.drawImage(marshmallowimg, marshmallow.x, marshmallow.y, marshmallow.width, marshmallow.height);
    
    for(j in candy)
    context.drawImage(candyimg, candy.x, candy.y, candy.width, candy.height);

    for(i in pumpkin)
    context.drawImage(pumpkinimg, pumpkin[i].x, pumpkin[i].y, 90, 120);
}

var requestAnimationFrame = (function(){
return window.requestAnimationFrame     ||
window.webkitRequestAnimationFrame  ||
window.mozRequestAnimationFrame     ||
window.oRequestAnimationFrame       ||
window.msRequestAnimationFrame      ||
function(callback){
    window.setTimeout(callback, 1000 / 20);
}
})();

