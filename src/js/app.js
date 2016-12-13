var interface = {};
interface.iron         = document.querySelector('#info-iron');
interface.carbon       = document.querySelector('#info-carbon');
interface.silicon      = document.querySelector('#info-silicon');
interface.power        = document.querySelector('.power');
interface.click_number = document.querySelector('.click-number');

interface.autoclicker  = {};

interface.target = {};
interface.target.iron     = document.querySelector('#target-iron');
interface.target.iron_pos = interface.target.iron.getBoundingClientRect();
interface.target.carbon   = document.querySelector('#target-carbon');
interface.target.carbon_pos = interface.target.carbon.getBoundingClientRect();
interface.target.silicon  = document.querySelector('#target-silicon');
interface.target.silicon_pos = interface.target.silicon.getBoundingClientRect();

var time = 0;

var ressources            = {};

ressources.power          =  {};
ressources.power.value    = 0;
ressources.power.valuemax = 10;

ressources.ore            = {};
ressources.ore.iron       = 0;
ressources.ore.carbon     = 0;
ressources.ore.silicon    = 0;


var auto_clicker         = {};
auto_clicker.power       = {};
auto_clicker.power.increment_value       = 2;

auto_clicker.ore                         = {};
auto_clicker.ore.iron                    = {};
auto_clicker.ore.iron.increment_time     = 10;
auto_clicker.ore.iron.increment_value    = 1;

auto_clicker.ore.carbon                  = {}; 
auto_clicker.ore.carbon.increment_time   = 10;
auto_clicker.ore.carbon.increment_value  = 1;

auto_clicker.ore.silicon                 = {};
auto_clicker.ore.silicon.increment_time  = 10;
auto_clicker.ore.silicon.increment_value = 1;

var clicker = {};
clicker.click_number = 0;
clicker.click_increment_value = 1;
clicker.next_level = 50;
clicker.spaceisdown = false;


var shop   = {};
shop.items = [];

shop.items[0] = {}; 

shop.items[0].name     = 'generateur'; 
shop.items[0].maxlevel = 1; 
shop.items[0].price    = [50,50,50];
shop.items[0].level    = 0;

function buy(i){
  if( shop.items[i].level < shop.items[i].maxlevel && shop.items[i].price[0] < ressources.ore.iron && shop.items[i].price[1] < ressources.ore.carbon && shop.items[i].price[2] < ressources.ore.silicon){

    shop.items[i].price[0] *= 2;
    shop.items[i].price[1] *= 2;
    shop.items[i].price[2] *= 2;

    shop.items[i].level++;
  }
}


function resize(){
  interface.target.iron_pos = interface.target.iron.getBoundingClientRect();
  interface.target.carbon_pos = interface.target.carbon.getBoundingClientRect();
  interface.target.silicon_pos = interface.target.silicon.getBoundingClientRect();
}

window.addEventListener('resize',function(){
  resize();
})

function click(e){
  clicker.click_number++;
  if(clicker.click_number >= clicker.next_level){
    clicker.click_increment_value ++;
    clicker.next_level *= 2;
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

window.addEventListener('keydown',function(e){
  if(e.keyCode == 32 && !clicker.spaceisdown){
    click();
    update_interface();
    clicker.spaceisdown = true;
  }
});

window.addEventListener('keyup',function(e){
  if(e.keyCode == 32){
    clicker.spaceisdown = false;
  }
});

window.addEventListener('click',function(e){
  click(e);
});


function update_interface(){
  interface.iron.innerHTML         = ressources.ore.iron;
  interface.carbon.innerHTML       = ressources.ore.carbon;
  interface.silicon.innerHTML      = ressources.ore.silicon;
  //interface.power.innerHTML        = ressources.power.value;
  //interface.click_number.innerHTML = clicker.click_number;
}


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
}


setInterval(function(){
  time ++;
  //autoclickers();
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


var txtParticles = {};
txtParticles.items = [];
txtParticles.settings = {};
txtParticles.settings.index = 0;
txtParticles.settings.state = false;

function txtParticleAdd(type){
  var index = txtParticles.settings.index;
  txtParticles.items[index] = {};
  if(type == 'iron'){
    txtParticles.items[index].x = interface.target.iron_pos.left-20;
    txtParticles.items[index].y = interface.target.iron_pos.top + interface.target.iron_pos.height/2;
  }
  else if(type == 'carbon'){
    txtParticles.items[index].x = interface.target.carbon_pos.left-20;
    txtParticles.items[index].y = interface.target.carbon_pos.top + interface.target.carbon_pos.height/2;
  }
  else if(type == 'silicon'){
    txtParticles.items[index].x = interface.target.silicon_pos.left-20;
    txtParticles.items[index].y = interface.target.silicon_pos.top + interface.target.silicon_pos.height/2;
  }
  //console.log(window.innerHeight)

  txtParticles.items[index].vx = -1;
  txtParticles.items[index].vy = -1;

  console.log(txtParticles.items[index].y);

  txtParticles.items[index].opacity = 1;
  txtParticles.settings.index++;
  
}

function txtParticleUpdate(){
  for(var i = 0; i < txtParticles.items.length; i++){
    txtParticles.items[i].x += txtParticles.items[i].vx;
    txtParticles.items[i].y += txtParticles.items[i].vy;

    txtParticles.items[i].vx *= 0.9;
    txtParticles.items[i].vy *= 1.1;

    txtParticles.items[i].opacity -= 0.03;

    if(txtParticles.items[i].opacity < 0){
      txtParticles.items.splice(i,1);
      txtParticles.settings.index--;
    }
    else{
      txtParticlesDraw(i)
    }
  }
}

function txtParticlesDraw(i){
  var txt = document.createElement('p');
  txt.style.transform = 'translate('+ txtParticles.items[i].x+'px,'+ txtParticles.items[i].y+'px)';
  txt.style.width ='10px';
  txt.style.height ='0';
  txt.style.opacity =  txtParticles.items[i].opacity;
  txt.innerHTML = "+" + clicker.click_increment_value;
  document.querySelector('.particles-container .indication').appendChild(txt);
}



function render(){
  document.querySelector('.particles-container .ressources').innerHTML = "";
  document.querySelector('.particles-container .indication').innerHTML = "";
  updateParticles();
  txtParticleUpdate();
  window.requestAnimationFrame(render);
}

render();