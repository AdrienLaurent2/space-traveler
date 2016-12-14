var interface = {};
interface.iron         = document.querySelector('#info-iron');
interface.carbon       = document.querySelector('#info-carbon');
interface.silicon      = document.querySelector('#info-silicon');
interface.power_fill   = document.querySelector('.energy--bar--fill');
interface.click_number = document.querySelector('.click-number');

interface.autoclicker  = {};

interface.target = {};
interface.target.iron     = document.querySelector('#target-iron');
interface.target.iron_pos = interface.target.iron.getBoundingClientRect();
interface.target.carbon   = document.querySelector('#target-carbon');
interface.target.carbon_pos = interface.target.carbon.getBoundingClientRect();
interface.target.silicon  = document.querySelector('#target-silicon');
interface.target.silicon_pos = interface.target.silicon.getBoundingClientRect();

interface.shop = {};
interface.shop.container = document.querySelector('.menu');
interface.shop.items     = document.querySelectorAll('.menu--item');

interface.popup = document.querySelector('.popup--item');

var time = 0;

var ressources            = {};

ressources.power          =  {};
ressources.power.value    = 0;
ressources.power.valuemax = 10;
ressources.power.ratio    = 0;

ressources.ore            = {};
ressources.ore.iron       = 0;
ressources.ore.carbon     = 0;
ressources.ore.silicon    = 0;


var auto_clicker         = {};
auto_clicker.power       = {};
auto_clicker.power.increment_value       = 0;
auto_clicker.power.increment_time        = 10;

auto_clicker.ore                         = {};
auto_clicker.ore.iron                    = {};
auto_clicker.ore.iron.increment_time     = 10;
auto_clicker.ore.iron.increment_value    = 0;

auto_clicker.ore.carbon                  = {};
auto_clicker.ore.carbon.increment_time   = 10;
auto_clicker.ore.carbon.increment_value  = 0;

auto_clicker.ore.silicon                 = {};
auto_clicker.ore.silicon.increment_time  = 10;
auto_clicker.ore.silicon.increment_value = 0;

var clicker = {};
clicker.click_number = 0;
clicker.click_increment_value = 1;
clicker.next_level = 5;
clicker.isOverShop  = false;

interface.shop.container.addEventListener('mouseenter',function(){
  clicker.isOverShop  = true;
});

interface.shop.container.addEventListener('mouseleave',function(){
  clicker.isOverShop  = false;
});

function resize(){
  interface.target.iron_pos = interface.target.iron.getBoundingClientRect();
  interface.target.carbon_pos = interface.target.carbon.getBoundingClientRect();
  interface.target.silicon_pos = interface.target.silicon.getBoundingClientRect();
}

window.addEventListener('resize',function(){
  resize();
})


function click(e){
  if(!clicker.isOverShop){
    clicker.click_number++;
    if(clicker.click_number >= clicker.next_level){
      clicker.click_increment_value ++;
      clicker.next_level *= 2;
      addIndicParticle(e);
    }

    var random = Math.random();

    if(random <= 0.33){
      var type = 'iron';
    }
    else if(random > 0.33 && random <= 0.66){
      var type = 'carbon';
    }
    else if(random > 0.66){
      var type = 'silicon';
    }

    addparticles(e,type);
  }
}


window.addEventListener('click',function(e){
  click(e);
});


function autoclickers(){
  if(time%auto_clicker.ore.iron.increment_time == 0){
    ressources.ore.iron += auto_clicker.ore.iron.increment_value;
    update_interface();
  }
  if(time%auto_clicker.ore.carbon.increment_time == 0){
    ressources.ore.carbon += auto_clicker.ore.carbon.increment_value;
    update_interface();
  }
  if(time%auto_clicker.ore.silicon.increment_time == 0){
    ressources.ore.silicon += auto_clicker.ore.silicon.increment_value;
    update_interface();
  }
  if(time%auto_clicker.power.increment_time == 0){
    ressources.power += auto_clicker.power.increment_value;
    updatePowerfill();
  }
}


setInterval(function(){
  time ++;
  autoclickers();
},1000)



var click_particles = {};
click_particles.items = [];
click_particles.settings = {};
click_particles.settings.index = 0;
click_particles.settings.state = false;

function addparticles(e,type){
  var index = click_particles.settings.index;
  click_particles.items[index] = {};
  click_particles.items[index].x = e.pageX-15;
  click_particles.items[index].y = e.pageY-15;
  click_particles.items[index].type = type;

  if(type == 'iron'){
    click_particles.items[index].vx = ((interface.target.iron_pos.left+interface.target.iron_pos.width/4)-click_particles.items[index].x)/80;
    click_particles.items[index].vy = ((interface.target.iron_pos.top+interface.target.iron_pos.height/4+130) -click_particles.items[index].y)/80;
  }
  else if(type == 'carbon'){
    click_particles.items[index].vx = ((interface.target.carbon_pos.left+interface.target.carbon_pos.width/4)-click_particles.items[index].x)/80;
    click_particles.items[index].vy = ((interface.target.carbon_pos.top+interface.target.carbon_pos.height/4+130) -click_particles.items[index].y)/80;
  }
  else if(type == 'silicon'){
    click_particles.items[index].vx = ((interface.target.silicon_pos.left+interface.target.silicon_pos.width/4)-click_particles.items[index].x)/80;
    click_particles.items[index].vy = ((interface.target.silicon_pos.top+interface.target.silicon_pos.height/4+130) -click_particles.items[index].y)/80;
  }

  click_particles.items[index].gy = 15;

  click_particles.settings.index++;

  updateParticles();
}

function updateParticles(){
  for(var i = 0; i < click_particles.items.length; i++){
    click_particles.items[i].x += click_particles.items[i].vx;
    click_particles.items[i].y += click_particles.items[i].vy-click_particles.items[i].gy;
    click_particles.items[i].vx *= 1.02;
    click_particles.items[i].vy *= 1.02;

    click_particles.items[i].gy -= 1;
    if(click_particles.items[i].gy < 0){
      click_particles.items[i].gy = 0;
    }

    click_particles.items[i].gx -= 1;
    if(click_particles.items[i].gx < 0){
      click_particles.items[i].gx = 0;
    }

    if(click_particles.items[i].type == 'iron' && (click_particles.items[i].x > interface.target.iron_pos.left && click_particles.items[i].x < interface.target.iron_pos.left + interface.target.iron_pos.width && click_particles.items[i].y > interface.target.iron_pos.top && click_particles.items[i].y < interface.target.iron_pos.top + interface.target.iron_pos.height)){
      txtParticleAdd(click_particles.items[i].type);
      click_particles.items.splice(i,1);
      click_particles.settings.index--;
      ressources.ore.iron += clicker.click_increment_value;
      update_interface();
    }
    else if(click_particles.items[i].type == 'carbon' && (click_particles.items[i].x > interface.target.carbon_pos.left && click_particles.items[i].x < interface.target.carbon_pos.left + interface.target.carbon_pos.width && click_particles.items[i].y > interface.target.carbon_pos.top && click_particles.items[i].y < interface.target.carbon_pos.top + interface.target.carbon_pos.height)){
      txtParticleAdd(click_particles.items[i].type);
      click_particles.items.splice(i,1);
      click_particles.settings.index--;
      ressources.ore.carbon += clicker.click_increment_value;
      update_interface();
    }

    else if(click_particles.items[i].type == 'silicon' && (click_particles.items[i].x > interface.target.silicon_pos.left && click_particles.items[i].x < interface.target.silicon_pos.left + interface.target.silicon_pos.width && click_particles.items[i].y > interface.target.silicon_pos.top && click_particles.items[i].y < interface.target.silicon_pos.top + interface.target.silicon_pos.height)){
      txtParticleAdd(click_particles.items[i].type);
      click_particles.items.splice(i,1);
      click_particles.settings.index--;
      ressources.ore.silicon += clicker.click_increment_value;
      update_interface();
    }
    else{
      drawParticles(i);
    }
  }
}


function drawParticles(i){
  var img = document.createElement('img');
  img.style.height = "30px";
  img.style.width = "30px";
  img.style.position = "absolute";
  img.style.transform  = 'translate('+ click_particles.items[i].x +'px, '+ click_particles.items[i].y +'px)';
  img.src = "assets/img/ore-"+ click_particles.items[i].type +".svg";
  document.querySelector('.particles-container .ressources').appendChild(img);
}


var txt_particles = {};
txt_particles.items = [];
txt_particles.settings = {};
txt_particles.settings.index = 0;
txt_particles.settings.state = false;

function txtParticleAdd(type){
  var index = txt_particles.settings.index;
  txt_particles.items[index] = {};
  if(type == 'iron'){
    txt_particles.items[index].x = interface.target.iron_pos.left-20;
    txt_particles.items[index].y = interface.target.iron_pos.top + interface.target.iron_pos.height/2;
  }
  else if(type == 'carbon'){
    txt_particles.items[index].x = interface.target.carbon_pos.left-20;
    txt_particles.items[index].y = interface.target.carbon_pos.top + interface.target.carbon_pos.height/2;
  }
  else if(type == 'silicon'){
    txt_particles.items[index].x = interface.target.silicon_pos.left-20;
    txt_particles.items[index].y = interface.target.silicon_pos.top + interface.target.silicon_pos.height/2;
  }

  txt_particles.items[index].vx = -1;
  txt_particles.items[index].vy = -1;


  txt_particles.items[index].opacity = 1;
  txt_particles.settings.index++;

}

function txtParticleUpdate(){
  for(var i = 0; i < txt_particles.items.length; i++){
    txt_particles.items[i].x       += txt_particles.items[i].vx;
    txt_particles.items[i].y       += txt_particles.items[i].vy;
    txt_particles.items[i].vx      *= 0.9;
    txt_particles.items[i].vy      *= 1.1;
    txt_particles.items[i].opacity -= 0.03;
    if(txt_particles.items[i].opacity < 0){
      txt_particles.items.splice(i,1);
      txt_particles.settings.index--;
    }
    else{
      txtParticlesDraw(i)
    }
  }
}

function txtParticlesDraw(i){
  var txt = document.createElement('p');
  txt.style.transform = 'translate('+ txt_particles.items[i].x+'px,'+ txt_particles.items[i].y+'px)';
  txt.style.width     ='10px';
  txt.style.height    ='0';
  txt.style.opacity   =  txt_particles.items[i].opacity;
  txt.innerHTML       = "+" + clicker.click_increment_value;
  document.querySelector('.particles-container .indication').appendChild(txt);
}

var indic_particles            = {};
indic_particles.items          = [];
indic_particles.settings       = {};
indic_particles.settings.index = 0;

function addIndicParticle(e){
  var index = indic_particles.settings.index;
  indic_particles.items[index]         = {};
  indic_particles.items[index].x       = e.pageX;
  indic_particles.items[index].y       = e.pageY;
  indic_particles.items[index].vy      = -4;
  indic_particles.items[index].opacity = 1;

  indic_particles.settings.index++;
}

function indicParticleUpdate(){
  for(var i = 0; i < indic_particles.items.length; i++){
    indic_particles.items[i].y       += indic_particles.items[i].vy;
    indic_particles.items[i].opacity -= 0.02;
    if(indic_particles.items[i].opacity < 0){
      indic_particles.items.splice(i,1);
      indic_particles.settings--;
    }
    else{
      indicDraw(i);
    }
  }
}

function indicDraw(i){
  var indic = document.createElement('p');
  indic.style.transform = 'translate('+ indic_particles.items[i].x+'px,'+ indic_particles.items[i].y+'px)';

  indic.style.opacity   =  indic_particles.items[i].opacity;
  indic.innerHTML       = "x" + clicker.click_increment_value;
  document.querySelector('.particles-container .multiplier').appendChild(indic);
}

function render(){
  document.querySelector('.particles-container .ressources').innerHTML = "";
  document.querySelector('.particles-container .indication').innerHTML = "";
  document.querySelector('.particles-container .multiplier').innerHTML = "";
  updateParticles();
  txtParticleUpdate();
  indicParticleUpdate();
  window.requestAnimationFrame(render);
}

render();



/* SHOP */

var shop   = {};
shop.items = [];

shop.items[0] = {};
shop.items[0].price    = [50,50,50];
shop.items[0].level    = 1;

shop.items[1] = {};
shop.items[1].price    = [50,50,50];
shop.items[1].level    = 1;

shop.items[2] = {};
shop.items[2].price    = [50,50,50];
shop.items[2].level    = 1;

shop.items[3] = {};
shop.items[3].price    = [50,50,50];
shop.items[3].level    = 1;

shop.items[4] = {};
shop.items[4].price    = [50,50,50];
shop.items[4].level    = 1;

shop.items[5] = {};
shop.items[5].price    = [50,50,50];
shop.items[5].level    = 1;

shop.items[6] = {};
shop.items[6].price    = [50,50,50];
shop.items[6].level    = 1;

for(var i = 0; i < interface.shop.items.length; i++){
  interface.shop.items[i].addEventListener('click',function(e){
    e.preventDefault();
    var item = this.dataset.item;
    buy(item);
  });
}

function buy(i){
  if(shop.items[i].price[0] < ressources.ore.iron && shop.items[i].price[1] < ressources.ore.carbon && shop.items[i].price[2] < ressources.ore.silicon){

    ressources.ore.iron    -= shop.items[i].price[0];
    ressources.ore.carbon  -= shop.items[i].price[1];
    ressources.ore.silicon -= shop.items[i].price[2];

    shop.items[i].price[0] *= 2;
    shop.items[i].price[1] *= 2;
    shop.items[i].price[2] *= 2;

    shop.items[i].level++;

    update_shop();
    update_interface();

  }
}


function update_interface(){
  interface.iron.innerHTML         = ressources.ore.iron;
  interface.carbon.innerHTML       = ressources.ore.carbon;
  interface.silicon.innerHTML      = ressources.ore.silicon;
}


function update_shop(start,end){
  for(var i = 0; i < interface.shop.items.length; i++){
    var res = {}
    res.iron    = interface.shop.items[i].querySelector('.menu--item--resources--fer--price');
    res.silicon = interface.shop.items[i].querySelector('.menu--item--resources--silicium--price');
    res.carbon  = interface.shop.items[i].querySelector('.menu--item--resources--carbon--price');
    res.level   = interface.shop.items[i].querySelector('.menu--item--title--lvl');

    res.iron.innerHTML    = shop.items[i].price[0];
    res.silicon.innerHTML = shop.items[i].price[1];
    res.carbon.innerHTML  = shop.items[i].price[2];
    res.level.innerHTML   ='lv.'+ shop.items[i].level;

  }
}

update_shop();
update_interface();


/* POPUP BOUTIQUE */
var popup_content = ['Permet de recharger les réserves d’énergie du vaisseau','Accroie la vitesse du vaisseau','Accroie considérablement la vitesse du vaisseau','Accroie la capacité de stockage d’énergie du vaiseau','Diminue la consomation de carburant du vaisseau','Recharge les accumulateur du vaisseau durant le vol','Permet de recupérer des ressources durant le vol'];

for(var i = 0; i < interface.shop.items.length; i++){
  interface.shop.items[i].addEventListener('mouseenter',function(e){
    interface.popup.style.display = 'block';
    interface.popup.style.transform = 'translateY('+(e.pageY-30)+'px)';
    var item = this.dataset.item;
    interface.popup.innerHTML = popup_content[item];
  });
  interface.shop.items[i].addEventListener('mousemove',function(e){
    interface.popup.style.transform = 'translateY('+(e.pageY-30)+'px)';
  });
  interface.shop.items[i].addEventListener('mouseleave',function(e){
    interface.popup.style.display = 'none';
  });

}


/* POWER */
function updatePowerfill(){
  var ratio = ressources.power.valuemax / ressources.power.value;
  console.log(ratio);
}
/*
var  prix__crystal1 = shop.items[0].price[0];
var  prix__crystal2 = shop.items[0].price[1];
var  prix__crystal3 = shop.items[0].price[2];

var newprice = Math.round((prix__crystal1 / (auto_clicker.ore.iron.increment_value/auto_clicker.ore.iron.increment_time)) + (prix__crystal1/( 'capacité de minage de la perceuse de crystal 1' / 'capacité de minage de la perceuse de crystal 1'+'augmentation de capacité de minage')));
shop.items[0].price[0] = newprice;

auto_clicker.ore.iron.increment_time     = 10;
auto_clicker.ore.iron.increment_value    = 0;


newprice = Math.pow(price,1.15);
*/

/* ANIMATION */
var animation = {};
animation.stars = document.querySelector('.stars');
animation.sky = document.querySelector('.sky');
animation.rocket = document.querySelector('.rocket');
animation.rocket_flame = document.querySelector('.rocket--flame');
animation.mountain = document.querySelector('.mountain');
animation.menu = document.querySelector('.menu');

document.addEventListener('keydown', function(e){
  if(e.keycode = 32){
    animation.stars.classList.add('stars--anim');
    animation.sky.classList.add('sky--anim');
    animation.rocket.classList.add('rocket--anim');
    animation.mountain.classList.add('mountain--anim');
    animation.menu.classList.add('menu--anim');
    setTimeout(function(){
      animation.rocket_flame.classList.add('rocket--flame--anim');
    },1000)
  }
})
