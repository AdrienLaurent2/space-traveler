var interface = {};

interface.opening = document.querySelector('.opening');
interface.title   = document.querySelector('.distance--title--value');

setTimeout(function(){
  interface.opening.style.display = 'none';
},30)

interface.iron         = document.querySelector('#info-iron');
interface.carbon       = document.querySelector('#info-carbon');
interface.silicon      = document.querySelector('#info-silicon');

interface.power_full       = document.querySelector('.energy--bar--full');
interface.power_indic      = document.querySelector('.energy--value');
interface.power_container  = document.querySelector('.energy--bar');

interface.target = {};
interface.target.iron     = document.querySelector('#target-iron');
interface.target.iron_pos = interface.target.iron.getBoundingClientRect();
interface.target.carbon   = document.querySelector('#target-carbon');
interface.target.carbon_pos = interface.target.carbon.getBoundingClientRect();
interface.target.silicon  = document.querySelector('#target-silicon');
interface.target.silicon_pos = interface.target.silicon.getBoundingClientRect();

interface.distance = document.querySelector('.distance--title--value');

interface.shop = {};
interface.shop.container = document.querySelector('.menu');
interface.shop.items     = document.querySelectorAll('.menu--item');

interface.menu    = document.querySelectorAll('.menu--select--item');
interface.onglets = document.querySelectorAll('.menu--onglet');

interface.popup        = document.querySelector('.popup--item');
interface.popup_energy = document.querySelector('.popup--energy--item');

/* DISPLAY UPDGRADE AND AUTOCLICKERS */
interface.spaceship = {};
interface.spaceship.aero = document.querySelector('.rocket--aero');
interface.spaceship.post = document.querySelector('.rocket--post');
interface.spaceship.anti = document.querySelector('.rocket--anti');
interface.spaceship.wing = document.querySelector('.rocket--wing');
interface.spaceship.batt = document.querySelector('.rocket--batt');
interface.spaceship.sola = document.querySelector('.rocket--sola');
interface.spaceship.arms = document.querySelector('.rocket--arms');
interface.autoclicker = {};
interface.autoclicker.generator     = document.querySelector('.mountain--generator');
interface.autoclicker.generator_pos = interface.autoclicker.generator.getBoundingClientRect();
interface.autoclicker.silicon       = document.querySelector('.mountain--robotR');
interface.autoclicker.silicon_pos   = interface.autoclicker.silicon.getBoundingClientRect();
interface.autoclicker.iron          = document.querySelector('.mountain--robotV');
interface.autoclicker.iron_pos      = interface.autoclicker.iron.getBoundingClientRect();
interface.autoclicker.carbon        = document.querySelector('.mountain--robotB');
interface.autoclicker.carbon_pos    = interface.autoclicker.carbon.getBoundingClientRect();


var ressources            = {};
ressources.power          =  {};
ressources.power.value    = 0;
ressources.power.valuemax = 1000;
ressources.power.ratio    = 0;
ressources.ore            = {};
ressources.ore.iron       = 0;
ressources.ore.carbon     = 0;
ressources.ore.silicon    = 0;


var auto_clicker         = {};
auto_clicker.power       = {};
auto_clicker.power.increment_value       = 0;
auto_clicker.power.increment_time        = 1;
auto_clicker.ore                         = {};
auto_clicker.ore.iron                    = {};
auto_clicker.ore.iron.increment_time     = 1;
auto_clicker.ore.iron.increment_value    = 0;
auto_clicker.ore.carbon                  = {};
auto_clicker.ore.carbon.increment_time   = 1;
auto_clicker.ore.carbon.increment_value  = 0;
auto_clicker.ore.silicon                 = {};
auto_clicker.ore.silicon.increment_time  = 1;
auto_clicker.ore.silicon.increment_value = 0;

var clicker = {};
clicker.click_number = 0;
clicker.click_increment_value = 1;
clicker.next_level = 20;
clicker.isOverShop  = false;
clicker.isInSpace   = false;
clicker.time        = 0;

var shop   = {};
shop.items = [];
shop.items[0]          = {};
shop.items[0].price    = [990,990,990];
shop.items[0].level    = 1;
shop.items[1]          = {};
shop.items[1].price    = [4000,5000,1000];
shop.items[1].level    = 1;
shop.items[2]          = {};
shop.items[2].price    = [2500,1500,2500];
shop.items[2].level    = 1;
shop.items[3]          = {};
shop.items[3].price    = [5000,5000,5000];
shop.items[3].level    = 1;
shop.items[4]           = {};
shop.items[4].price    = [400,250,100];
shop.items[4].level    = 1;
shop.items[5]          = {};
shop.items[5].price    = [2000,5000,3500];
shop.items[5].level    = 1;
shop.items[6]          = {};
shop.items[6].price    = [2000,2000,2000];
shop.items[6].level    = 1;
shop.items[7]          = {};
shop.items[7].price    = [10,10,8];
shop.items[7].level    = 1;
shop.items[8]          = {};
shop.items[8].price    = [10,8,10];
shop.items[8].level    = 1;
shop.items[9]          = {};
shop.items[9].price    = [8,10,10];
shop.items[9].level    = 1;

var distance = 0;

/* SAVE - LOCALSTORAGE */
function save(){
  localStorage.setItem('isStore', JSON.stringify('timo'));
  localStorage.setItem('ressources', JSON.stringify(ressources));
  localStorage.setItem('autoclickers', JSON.stringify(auto_clicker));
  localStorage.setItem('clicker', JSON.stringify(clicker));
  localStorage.setItem('shop', JSON.stringify(shop));
  localStorage.setItem('distance', distance);
  var time = new Date().getTime() / 1000;
  localStorage.setItem('time', time);
}


function load(){
  ressources   = JSON.parse(localStorage.getItem('ressources'));
  auto_clicker = JSON.parse(localStorage.getItem('autoclickers'));
  clicker      = JSON.parse(localStorage.getItem('clicker'));
  shop         = JSON.parse(localStorage.getItem('shop'));
  distance     = Math.round(localStorage.getItem('distance'));
  var time = localStorage.getItem('time');
  var current = new Date().getTime() / 1000;
  var between = Math.floor(current-time);
  console.log(between);
  for(var i = 0; i < between; i++){
    ressources.ore.iron    += auto_clicker.ore.iron.increment_value;
    ressources.ore.carbon  += auto_clicker.ore.carbon.increment_value;
    ressources.ore.silicon += auto_clicker.ore.silicon.increment_value;
    if(ressources.power.value + auto_clicker.power.increment_value < ressources.power.valuemax){
      ressources.power.value += auto_clicker.power.increment_value;
    }
  }

  update_interface();
  update_shop();
  update_screen();
}
var isStore = JSON.parse(localStorage.getItem('isStore'));
if(isStore == 'timo'){
  load();
}

interface.shop.container.addEventListener('mouseenter',function(){
  clicker.isOverShop  = true;
});

interface.shop.container.addEventListener('mouseleave',function(){
  clicker.isOverShop  = false;
});

/* RESIZE */
function resize(){
  interface.target.iron_pos           = interface.target.iron.getBoundingClientRect();
  interface.target.carbon_pos         = interface.target.carbon.getBoundingClientRect();
  interface.target.silicon_pos        = interface.target.silicon.getBoundingClientRect();
  interface.autoclicker.generator_pos = interface.autoclicker.generator.getBoundingClientRect();
  interface.autoclicker.silicon_pos   = interface.autoclicker.silicon.getBoundingClientRect();
  interface.autoclicker.iron_pos      = interface.autoclicker.iron.getBoundingClientRect();
  interface.autoclicker.carbon_pos    = interface.autoclicker.carbon.getBoundingClientRect();
}
resize();
resize();
window.addEventListener('resize',function(){
  resize();
})


/* ON CLICK EVENT */
function click(e){
  if(!clicker.isOverShop){
    clicker.click_number++;
    sound('../assets/sounds/drill.mp3');
    if(clicker.click_number >= clicker.next_level){
      clicker.click_increment_value ++;
      clicker.next_level *= 3;
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

function sound(src){
  var sound = new Audio(src);
  sound.autoplay = true;
}

window.addEventListener('click',function(e){
  click(e);
});


function autoclickers(){
  if(clicker.time%auto_clicker.ore.iron.increment_time == 0){
    if(clicker.isInSpace){
      ressources.ore.iron += (auto_clicker.ore.iron.increment_value*(shop.items[6].level));
      if(shop.items[9].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.ore.iron.increment_value*shop.items[6].level);
        addAutoclickerParticle('iron', increment);
      }
    }
    else{
      ressources.ore.iron += auto_clicker.ore.iron.increment_value;
      if(shop.items[9].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.ore.iron.increment_value);
        addAutoclickerParticle('iron', increment);
      }
    }
    update_interface();
  }
  if(clicker.time%auto_clicker.ore.carbon.increment_time == 0){
    if(clicker.isInSpace){
      ressources.ore.carbon += (auto_clicker.ore.carbon.increment_value*(shop.items[6].level));
      if(shop.items[7].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.ore.carbon.increment_value*shop.items[6].level);
        addAutoclickerParticle('carbon', increment);
      }
    }
    else{
      ressources.ore.carbon += auto_clicker.ore.carbon.increment_value;
      if(shop.items[7].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.ore.carbon.increment_value);
        addAutoclickerParticle('carbon', increment);
      }
    }
    update_interface();
  }
  if(clicker.time%auto_clicker.ore.silicon.increment_time == 0){
    if(clicker.isInSpace){
      ressources.ore.silicon += (auto_clicker.ore.silicon.increment_value*(shop.items[6].level));
      if(shop.items[8].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.ore.silicon.increment_value*shop.items[6].level);
        addAutoclickerParticle('silicon', increment);
      }
    }
    else{
      ressources.ore.silicon += auto_clicker.ore.silicon.increment_value;
      if(shop.items[8].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.ore.silicon.increment_value);
        addAutoclickerParticle('silicon', increment);
      }
    }
    update_interface();
  }
  if(clicker.time%auto_clicker.power.increment_time == 0 && ressources.power.value+auto_clicker.power.increment_value <= ressources.power.valuemax){
    if(!clicker.isInSpace){
      ressources.power.value += auto_clicker.power.increment_value;
      if(shop.items[0].level >= 2 && !clicker.isInSpace){
        var increment = Math.round(auto_clicker.power.increment_value)
        addAutoclickerParticle('power', increment);
      }
    }
    updatePowerfill();
  }
  else if(ressources.power.value+auto_clicker.power.increment_value >= ressources.power.valuemax){
    ressources.power.value = ressources.power.valuemax;
    updatePowerfill();
  }
}


setInterval(function(){
  clicker.time ++;
  autoclickers();
  save();
},1000);



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
      if(clicker.isInSpace){
        ressources.ore.iron += (clicker.click_increment_value*(shop.items[6].level));
      }
      else{
        ressources.ore.iron += clicker.click_increment_value;
      }
      update_interface();
    }
    else if(click_particles.items[i].type == 'carbon' && (click_particles.items[i].x > interface.target.carbon_pos.left && click_particles.items[i].x < interface.target.carbon_pos.left + interface.target.carbon_pos.width && click_particles.items[i].y > interface.target.carbon_pos.top && click_particles.items[i].y < interface.target.carbon_pos.top + interface.target.carbon_pos.height)){
      txtParticleAdd(click_particles.items[i].type);
      click_particles.items.splice(i,1);
      click_particles.settings.index--;
      if(clicker.isInSpace){
        ressources.ore.carbon += (clicker.click_increment_value*(shop.items[6].level));
      }
      else{
        ressources.ore.carbon += clicker.click_increment_value;
      }
      update_interface();
    }

    else if(click_particles.items[i].type == 'silicon' && (click_particles.items[i].x > interface.target.silicon_pos.left && click_particles.items[i].x < interface.target.silicon_pos.left + interface.target.silicon_pos.width && click_particles.items[i].y > interface.target.silicon_pos.top && click_particles.items[i].y < interface.target.silicon_pos.top + interface.target.silicon_pos.height)){
      txtParticleAdd(click_particles.items[i].type);
      click_particles.items.splice(i,1);
      click_particles.settings.index--;
      if(clicker.isInSpace){
        ressources.ore.silicon += (clicker.click_increment_value*(shop.items[6].level));
      }
      else{
        ressources.ore.silicon += clicker.click_increment_value;
      }
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
  if(clicker.isInSpace){
    txt.innerHTML     = "+" + (clicker.click_increment_value*(shop.items[6].level+1));
  }
  else{
    txt.innerHTML       = "+" + clicker.click_increment_value;
  }
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
  indic_particles.items[index].y       = e.pageY-70;
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
      indic_particles.settings.index--;
    }
    else{
      indicDraw(i);
    }
  }
}

function indicDraw(i){
  var indic = document.createElement('p');
  indic.style.transform = 'translate('+ (indic_particles.items[i].x-30 )+'px,'+ indic_particles.items[i].y+'px)';

  indic.style.opacity   =  indic_particles.items[i].opacity;
  indic.innerHTML       = "x" + clicker.click_increment_value;
  document.querySelector('.particles-container .multiplier').appendChild(indic);
}


var autoclicker_particles = {};
autoclicker_particles.items = [];
autoclicker_particles.settings = {};
autoclicker_particles.settings.index = 0;

function addAutoclickerParticle(type, increment){
  var index = autoclicker_particles.settings.index;
  autoclicker_particles.items[index]         = {};
  autoclicker_particles.items[index].vy      = 0.9;
  autoclicker_particles.items[index].opacity = 1;
  autoclicker_particles.items[index].value   = increment;
  if(type == 'iron'){
    autoclicker_particles.items[index].x = interface.autoclicker.iron_pos.left;
    autoclicker_particles.items[index].y = interface.autoclicker.iron_pos.top-30;
  }
  if(type == 'carbon'){
    autoclicker_particles.items[index].x = interface.autoclicker.carbon_pos.left;
    autoclicker_particles.items[index].y = interface.autoclicker.carbon_pos.top-30;
  }
  if(type == 'silicon'){
    autoclicker_particles.items[index].x = interface.autoclicker.silicon_pos.left;
    autoclicker_particles.items[index].y = interface.autoclicker.silicon_pos.top-30;
  }
  if(type == 'power'){
    autoclicker_particles.items[index].x     = interface.autoclicker.generator_pos.left+100;
    autoclicker_particles.items[index].y     = interface.autoclicker.generator_pos.top+90;
  }
  autoclicker_particles.items[index].type = type;
  autoclicker_particles.settings.index++;
}

function updateAutoclickerParticle(){
  for(var i = 0; i < autoclicker_particles.items.length; i++){
    autoclicker_particles.items[i].y -=   autoclicker_particles.items[i].vy;
    autoclicker_particles.items[i].vy *= 1.05;
    autoclicker_particles.items[i].opacity -= 0.025;
    if(autoclicker_particles.items[i].opacity < 0){
      autoclicker_particles.items.splice(i,1);
      autoclicker_particles.settings.index--;
    }
    else{
      drawAutoclickerParticle(i);
    }
  }
}

function drawAutoclickerParticle(i){
  var add = document.createElement('p');
  add.style.transform = 'translate('+ (autoclicker_particles.items[i].x+20) +'px, '+ autoclicker_particles.items[i].y  +'px)';
  add.innerHTML = "+" + autoclicker_particles.items[i].value;
  add.style.opacity = autoclicker_particles.items[i].opacity;
  add.style.position = 'absolute';

  var svg = document.createElement('img');
  svg.src ='assets/img/ore-'+ autoclicker_particles.items[i].type +'.svg';

  if(autoclicker_particles.items[i].type == 'power'){
    svg.src ='assets/img/energy_logo.svg';
  }
  svg.style.transform = 'translate('+ autoclicker_particles.items[i].x +'px, '+ autoclicker_particles.items[i].y  +'px)';
  svg.style.width = '20px';
  svg.style.height = '20px';
  svg.style.position = 'absolute';
  svg.style.opacity = autoclicker_particles.items[i].opacity;
  document.querySelector('.particles-container .autoclicker').appendChild(svg);
  document.querySelector('.particles-container .autoclicker').appendChild(add);

}

function render(){
  document.querySelector('.particles-container .ressources' ).innerHTML = "";
  document.querySelector('.particles-container .indication' ).innerHTML = "";
  document.querySelector('.particles-container .multiplier' ).innerHTML = "";
  document.querySelector('.particles-container .autoclicker').innerHTML = "";
  updateParticles();
  txtParticleUpdate();
  indicParticleUpdate();
  updateAutoclickerParticle();
  window.requestAnimationFrame(render);
}

render();



/* SHOP */

for(var i = 0; i < interface.shop.items.length; i++){
  interface.shop.items[i].addEventListener('click',function(e){
    e.preventDefault();
    var item = this.dataset.item;
    buy(item);
  });
}

function buy(i){
  if(shop.items[i].price[0] < ressources.ore.iron && shop.items[i].price[2] < ressources.ore.carbon && shop.items[i].price[1] < ressources.ore.silicon){

    sound('../assets/sounds/cling.mp3');

    ressources.ore.iron    -= shop.items[i].price[0];
    ressources.ore.silicon  -= shop.items[i].price[1];
    ressources.ore.carbon -= shop.items[i].price[2];

    if(i != 0){
      shop.items[i].price[0] = Math.floor(Math.pow(shop.items[i].price[0],1.15));
      shop.items[i].price[1] = Math.floor(Math.pow(shop.items[i].price[1],1.15));
      shop.items[i].price[2] = Math.floor(Math.pow(shop.items[i].price[2],1.15));
    }
    else{
      shop.items[i].price[0] = Math.floor(Math.pow(shop.items[i].price[0],1.25));
      shop.items[i].price[1] = Math.floor(Math.pow(shop.items[i].price[1],1.25));
      shop.items[i].price[2] = Math.floor(Math.pow(shop.items[i].price[2],1.25));
    }
    shop.items[i].level++;
    if(i == 0){
      auto_clicker.power.increment_value = shop.items[0].level;
    }
    else if( i == 9){
      auto_clicker.ore.iron.increment_value    += (shop.items[i].level-1);
      auto_clicker.ore.iron.increment_value    *= 1.1;
    }
    else if(i == 8){
      auto_clicker.ore.silicon.increment_value += (shop.items[i].level-1);
      auto_clicker.ore.silicon.increment_value *= 1.1;
    }
    else if(i == 7){
      auto_clicker.ore.carbon.increment_value  += (shop.items[i].level-1);
      auto_clicker.ore.carbon.increment_value  *= 1.1;
    }
    else if(i == 3){
      ressources.power.valuemax += 100*shop.items[i].level;
    }

    update_screen();
    update_shop();
    update_interface();

  }
}

function update_screen(){
  for(var i = 0; i < interface.shop.items.length; i++){
    if(shop.items[i].level >= 2){
      if(i == 0){
        interface.autoclicker.generator.classList.add('active');
        interface.autoclicker.generator_pos = interface.autoclicker.generator.getBoundingClientRect();
      }
      if(i == 1){
        interface.spaceship.post.classList.add('active')
      }
      if(i == 2){
        interface.spaceship.anti.classList.add('active');
      }
      if(i == 3){
        interface.spaceship.batt.classList.add('active');
      }
      if(i == 4){
        interface.spaceship.aero.classList.add('active');
        interface.spaceship.wing.classList.remove('active');
      }
      if(i == 5){
        interface.spaceship.sola.classList.add('active');
      }
      if(i == 6){
        interface.spaceship.arms.classList.add('active');
      }
      if(i == 8){
        interface.autoclicker.silicon.classList.add('active');
        interface.autoclicker.silicon_pos = interface.autoclicker.silicon.getBoundingClientRect();
      }
      if(i == 7){
        interface.autoclicker.carbon.classList.add('active');
        interface.autoclicker.carbon_pos = interface.autoclicker.carbon.getBoundingClientRect();
      }
      if(i == 9){
        interface.autoclicker.iron.classList.add('active');
        interface.autoclicker.iron_pos = interface.autoclicker.iron.getBoundingClientRect();
      }
    }
  }
}

function update_interface(){
  interface.iron.innerHTML         = Math.round(ressources.ore.iron);
  interface.carbon.innerHTML       = Math.round(ressources.ore.carbon);
  interface.silicon.innerHTML      = Math.round(ressources.ore.silicon);
  interface.title.innerHTML        = distance;
}


function update_shop(){
  for(var i = 0; i < interface.shop.items.length; i++){
    var res = {}
    res.iron    = interface.shop.items[i].querySelector('.menu--item--resources--fer--price');
    res.silicon = interface.shop.items[i].querySelector('.menu--item--resources--silicium--price');
    res.carbon  = interface.shop.items[i].querySelector('.menu--item--resources--carbon--price');
    res.level   = interface.shop.items[i].querySelector('.menu--item--title--lvl');

    res.iron.innerHTML    = arrondit(shop.items[i].price[0]);
    res.silicon.innerHTML = arrondit(shop.items[i].price[1]);
    res.carbon.innerHTML  = arrondit(shop.items[i].price[2]);
    res.level.innerHTML   ='lv.'+ shop.items[i].level;
  }
}

update_shop();
update_interface();


/* POPUP BOUTIQUE */
var popup_content = ['Permet de recharger les réserves d’énergie du vaisseau','Accroie la vitesse du vaisseau','Accroie considérablement la vitesse du vaisseau','Accroie la capacité de stockage d’énergie du vaiseau','Diminue la consomation de carburant du vaissseau','Recharge les accumulateur du vaisseau durant le vol','Permet de recupérer des ressources durant le vol','Permet de récupérer des mineraux de silicium','Permet de récupérer des mineraux de carbon','Permet de récupérer des mineraux de fer'];

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

/* POPUP ENERGY */
interface.power_container.addEventListener('mouseenter',function(e){
  interface.popup_energy.style.display = 'block';
  interface.popup_energy.style.transform = 'translateY('+(e.pageY-190)+'px)';
});
interface.power_container.addEventListener('mousemove',function(e){
  interface.popup_energy.style.transform = 'translateY('+(e.pageY-190)+'px)';
});
interface.power_container.addEventListener('mouseleave',function(e){
  interface.popup_energy.style.display = 'none';
});



var noNotif = true;
/* POWER */
function updatePowerfill(){
  var ratio = ressources.power.value / ressources.power.valuemax;
  interface.power_full.style.transform = 'scaleY('+ratio+')';
  interface.power_indic.innerHTML = ressources.power.value + '/' + ressources.power.valuemax;
  if(ressources.power.value == ressources.power.valuemax && noNotif){
    energyNotification();
    noNotif = false;
  }
}
updatePowerfill();


/* ANIMATION */
var animation = {};
animation.stars = document.querySelector('.stars');
animation.sky = document.querySelector('.sky');
animation.rocket = document.querySelector('.rocket');
animation.rocket_flame = document.querySelector('.rocket--flame');
animation.mountain = document.querySelector('.mountain');
animation.menu = document.querySelector('.menu');




/* LAUNCH IN SPACE */
document.addEventListener('keydown', function(e){
  if(e.keyCode == 32 && !clicker.isInSpace && ressources.power.value >= ressources.power.valuemax ){
    e.preventDefault;
    clicker.isInSpace = true;
    noNotif = true;
    launchRocket(calcTimeDistance());
  }
})

function calcTimeDistance(){
  var time_travel = ressources.power.valuemax;
  if(shop.items[1].level > 1){
    time_travel *= ((shop.items[1].level-1)*1.1);
  }
  if(shop.items[2].level > 1){
    time_travel *= ((shop.items[2].level-1)*1.25);
  }
  if(shop.items[4].level > 1){
    time_travel *= ((shop.items[4].level-1)*1.1);
  }
  if(shop.items[5].level > 1){
    time_travel *= ((shop.items[5].level-1)*1.1);
  }
  return time_travel;
}

function launchRocket(){
  animation.stars.classList.add('stars--anim');
  animation.sky.classList.add('sky--anim');
  animation.rocket.classList.add('rocket--anim');
  animation.mountain.classList.add('mountain--anim');
  animation.menu.classList.add('menu--anim');
  setTimeout(function(){
    animation.rocket_flame.classList.add('rocket--flame--anim');
    sound('../assets/sounds/launch.mp3');
  },1000);


  var dist = calcTimeDistance();
  var fuel = ressources.power.valuemax;
  var ratio = 1/(fuel/dist);

  var title = distance;

  var int;
  int = setInterval(function(){
    ressources.power.value -= 1;
    title += (1*ratio);
    interface.title.innerHTML = Math.round(title);
    updatePowerfill();
    if(ressources.power.value <= 0){
      clearInterval(int);
      endLaunch();
      distance += Math.round(title); 
    }
  },20);
}

function endLaunch(){
  animation.stars.classList.add('stars--anim--end');
  animation.sky.classList.add('sky--anim--end');
  animation.rocket.classList.add('rocket--anim--end');
  animation.mountain.classList.add('mountain--anim--end');
  animation.menu.classList.add('menu--anim--end');
  animation.rocket_flame.classList.add('rocket--flame--anim--end');

  setTimeout(function(){
    animation.stars.classList.remove('stars--anim');
    animation.sky.classList.remove('sky--anim');
    animation.rocket.classList.remove('rocket--anim');
    animation.mountain.classList.remove('mountain--anim');
    animation.menu.classList.remove('menu--anim');
    animation.rocket_flame.classList.remove('rocket--flame--anim');

    animation.stars.classList.remove('stars--anim--end');
    animation.sky.classList.remove('sky--anim--end');
    animation.rocket.classList.remove('rocket--anim--end');
    animation.mountain.classList.remove('mountain--anim--end');
    animation.menu.classList.remove('menu--anim--end');
    animation.rocket_flame.classList.remove('rocket--flame--anim--end');
  },2000);

  clicker.isInSpace = false;
}

/* K, M & B */
function arrondit(n){
  if(n > 1000 && n < 1000000){
    var k = Math.round(n/1000)+'K';
  }
  else if(n > 1000000 && n < 1000000000){
    var k = Math.round(n/1000000)+'M';
  }
  else if(n > 1000000000){
    var k = Math.round(n/1000000000)+'B';
  }
  else{
    var k = n;
  }
  return k;
}

/* ONGLETS */
var last_item = 0;
for(var i = 0; i < interface.menu.length; i++){
  interface.menu[i].addEventListener('click',function(){
    var last_selected = interface.menu[last_item];
    last_selected.classList.remove('menu--select--item--current');

    var last_onglet_selected = interface.onglets[last_item];
    last_onglet_selected.style.display = 'none';

    var item = this.dataset.select;

    var selected = interface.menu[item];
    selected.classList.add('menu--select--item--current');

    var onglet_selected = interface.onglets[item];
    onglet_selected.style.display = 'block';

    last_item = item;
  });
}


/* NOTIFICATION */
document.addEventListener('DOMContentLoaded', function () {
  if (Notification.permission !== "granted")
    Notification.requestPermission();
});
function energyNotification(){
  if (!Notification ) {
    alert('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }
  if ( Notification.permission !== "granted" )
    Notification.requestPermission();
  else {
    var notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! Your energy bar is full, you are ready to fly",
    });
    notification.onclick = function () {
      window.open("http://baptistevillain.fr/project/clicker");
    };
  }
}