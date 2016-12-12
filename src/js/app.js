var test_interface = {};
test_interface.iron         = document.querySelector('.iron');
test_interface.carbon       = document.querySelector('.carbon');
test_interface.silicon      = document.querySelector('.silicon');
test_interface.power        = document.querySelector('.power');
test_interface.click_number = document.querySelector('.click-number');

test_interface.info = {};
test_interface.info.iron    = document.querySelector('.info-iron');
test_interface.info.carbon  = document.querySelector('.info-carbon');
test_interface.info.silicon = document.querySelector('.info-silicon');
test_interface.info.power   = document.querySelector('.info-power');

test_interface.cursor       = document.querySelector('.cursor');

test_interface.autoclicker  = {};

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


function click(){
  clicker.click_number   += 1;
  if(clicker.click_number >= clicker.next_level){
    clicker.click_increment_value ++;
    clicker.next_level *= 2;
  }

  var random = Math.random();

  if(random <= 0.33){
    ressources.ore.iron += clicker.click_increment_value;
  }
  if(random > 0.33 && random <= 0.66){
    ressources.ore.carbon += clicker.click_increment_value;
  }
  if(random > 0.66){
    ressources.ore.silicon += clicker.click_increment_value;
  }
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
  click();
  update_interface();
  addParticules(e);
});


function update_interface(){
  test_interface.iron.innerHTML         = ressources.ore.iron;
  test_interface.carbon.innerHTML       = ressources.ore.carbon;
  test_interface.silicon.innerHTML      = ressources.ore.silicon;
  test_interface.power.innerHTML        = ressources.power.value;
  test_interface.click_number.innerHTML = clicker.click_number;
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
  autoclickers();
},1000)

var click_particules = {};
click_particules.items = [];
click_particules.settings = {};
click_particules.settings.index = 0;

function addParticules(e){
  var index = click_particules.settings.index;
  click_particules.items[index] = {};
  click_particules.items[index].x = e.pageX-15;
  click_particules.items[index].y = e.pageY-15;
  click_particules.items[index].vx = (Math.round(Math.random()) * 2 - 1)*(Math.random() + 1.5);
  click_particules.items[index].vy = (Math.round(Math.random()) * 2 - 1)*(Math.random() + 1.5);
  click_particules.items[index].opacity = 1;
  click_particules.settings.index++;
  updateParticles();
}

function updateParticles(){
  for(var i = 0; i < click_particules.items.length; i++){
    click_particules.items[i].x += click_particules.items[i].vx;
    click_particules.items[i].y += click_particules.items[i].vy;
    click_particules.items[i].opacity -= 0.03;
    if(click_particules.items[i].opacity < -0.1){
      click_particules.items.splice(i,1)
      click_particules.settings.index--;
    }
    else{
      drawParticles(i)
    }
  }
}

function drawParticles(i){
  var div = document.createElement('div');
  div.className        = "cursor";
  div.style.transform  = 'translate('+ click_particules.items[i].x +'px, '+ click_particules.items[i].y +'px)';
  div.style.opacity    = click_particules.items[i].opacity;
  div.style.background = '#000000';
  div.style.position   = 'absolute';
  document.querySelector('.cursors').appendChild(div);
}



function render(){
  document.querySelector('.cursors').innerHTML = "";
  updateParticles();
  window.requestAnimationFrame(render);
}



render()