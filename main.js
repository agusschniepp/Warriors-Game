//-------------------------variables global-----------------------------------------------------------

//----------------players lifes-------------------

let playerLifes = 3;
let pcLifes = 3;
//----------------game display & content-------------------
let warriorOption;
let buttonOption;
let warriorGame = [];
//----------------------player-------------------
let warrior1;
let warrior2;
let warrior3;
let warriorPlayer;
//---------------sounds-------------------
let warriorsSound;
let sword;
let bow;
let axe;
//-------------------------sound-----------------------------------------------------------
const audio = document.getElementsByTagName('audio');
const warriors = document.getElementById('button-select');
const reset = document.getElementById('button-reset');
//--------------------------------warrior selector--------------------------------------------
const warriorPlayerImage = document.getElementById('warrior-player');
const warriorPcImage = document.getElementById('warrior-pc');
//---------------------------------------start game---------------------------------------------
const attackSelect = document.getElementById('select-warrior-attacks');
//-------------------------------------------start selection-----------------------------------------
const fondo = document.getElementById('body');
const spanPlayerLifes = document.getElementById('lifes-player');
const spanPcLifes = document.getElementById('lifes-pc');
const selectWarrior = document.getElementById('select-warrior');
//-------------------------------------------message-------------------------------------------
const results = document.getElementById('message') 
//--------------------------------------------------------------------------------------
const showWarriors = document.getElementById('warrior-option');
//--------------------------------------------------------------------------------------
const showButtonWarriors = document.getElementById('button-warriors');
//--------------------------------------------------------------------------------------

class WarriorBattle{
    constructor(name,image,vidas,sound) {
        this.name = name;
        this.image = image;
        this.vidas = vidas;
        this.sound = sound;
        this.attacks = [];
    };
}; 

warrior1 = new WarriorBattle('warrior-1','img/warrior-1.png','3','sound-1');
warrior2 = new WarriorBattle('warrior-2','img/warrior-2.png','3','sound-2');
warrior3 = new WarriorBattle('warrior-3','img/warrior-3.png','3','sound-3');

warrior1.attacks.push(
    {name:'🗡️', id:'button-sword',},
    {name:'🏹', id:'button-bow',},
    {name:'🪓', id:'button-axe',},
);
warrior2.attacks.push(
    {name:'🗡️', id:'button-sword',},
    {name:'🏹', id:'button-bow',},
    {name:'🪓', id:'button-axe',},
);
warrior3.attacks.push(
    {name:'🗡️', id:'button-sword',},
    {name:'🏹', id:'button-bow',},
    {name:'🪓', id:'button-axe',},
);

warriorGame.push(warrior1,warrior2,warrior3)

//--------------------------------------------------------------------------------------
function startGame() {
    warriorGame.forEach((warrior) => {
        warriorOption = `
        <section class="warrior">
                    <input type="radio" id=${warrior.name} name="warriors">
                    <label id=${warrior.sound} for=${warrior.name}><img class="warrior-image" src=${warrior.image} alt=""></label>
                </section>
        `
        showWarriors.innerHTML += warriorOption;
        warrior1 = document.getElementById('warrior-1');
        warrior2 = document.getElementById('warrior-2');
        warrior3 = document.getElementById('warrior-3');
        
        }   
    );
    warriors.addEventListener('click',warriorSelector);
    sound();
};

function warriorSelector(){
    if (warrior1.checked || warrior2.checked || warrior3.checked){
        attackSelect.style.display = 'flex';
        fondo.className += '-battle';
        selectWarrior.style.display = 'none';
        if(warrior1.checked){
            warriorPlayerImage.src = warriorGame[warrior1.id.replace('warrior-','') - 1].image
            warriorPlayer = warrior1.id;
        }else if(warrior2.checked){
            warriorPlayerImage.src = warriorGame[warrior2.id.replace('warrior-','') - 1].image
            warriorPlayer = warrior2.id;
        }else if(warrior3.checked){
            warriorPlayerImage.src = warriorGame[warrior3.id.replace('warrior-','') - 1].image
            warriorPlayer = warrior3.id;
        };
        spanPlayerLifes.innerHTML = "❤️❤️❤️";

        playerAttackButtons(warriorPlayer)
        enemyWarriorSelector();

    }else {
        alert('Please select a warrior')
    };
    sound();
};


function playerAttackButtons(warriorPlayer){
    let attacks;
    for(let i = 0; i < warriorGame.length; i++) {
        if (warriorPlayer == warriorGame[i].name)
        attacks = warriorGame[i].attacks
    }   
    showButtonAttacks(attacks)
}

function showButtonAttacks (attacks) {
    attacks.forEach((button)=>{
        buttonOption = `
        <button id=${button.id}>${button.name}</button>
        `
        showButtonWarriors.innerHTML += buttonOption;
        sword = document.getElementById('button-sword');
        bow = document.getElementById('button-bow');
        axe = document.getElementById('button-axe');
        
    })
    sword.addEventListener('click',()=>{battle('🗡️')});
    bow.addEventListener('click',()=>{battle('🏹')});
    axe.addEventListener('click',()=>{battle('🪓')});
    disable(true);
    setTimeout(()=>{disable(false)},1500);
}


function enemyWarriorSelector() {
    let pc = aleatorio(0 , warriorGame.length - 1)
    warriorPcImage.src = warriorGame[pc].image
    spanPcLifes.innerHTML = "❤️❤️❤️";
}


function battle(attack) {

    selectWarrior.style.display = 'none';

    let playerAttack = attack;
    let enemyAttack = aleatorio(1,3);
    let res = '';

    switch(enemyAttack) {
        case 1:
            enemyAttack ='🗡️'; 
            break;
        case 2:
            enemyAttack ='🏹'; 
            break;
        case 3:
            enemyAttack ='🪓'; 
            break;
        };

    if(playerAttack == enemyAttack) {
        res = 'You tie'
        disable(true);
        setTimeout(()=>{disable(false)},1500);
    } else if (playerAttack == '🗡️' && enemyAttack == '🪓' || playerAttack == '🏹' && enemyAttack == '🗡️' || playerAttack == '🪓' && enemyAttack == '🏹' ) {
        pcLifes = pcLifes - 1;
        spanPcLifes.innerHTML =lifes(pcLifes);
        res = 'You win'
        disable(true);
        setTimeout(()=>{disable(false)},1500);
    } else {
        playerLifes = playerLifes - 1;
        spanPlayerLifes.innerHTML =lifes(playerLifes);
        res = 'You lose'
        disable(true);
        setTimeout(()=>{disable(false)},1500);
    };
    
    if (pcLifes == 0 || playerLifes == 0) {
        setTimeout(()=>{disable(true)},1500);
        reset.style.zIndex = '1';
        reset.style.opacity = '1';
        reset.disabled = false;
        reset.style.cursor = 'pointer';
        reset.addEventListener('click',()=>{location.reload();})
    };
    
    if (playerLifes === 0) {
        warriorPlayerImage.style.filter = 'brightness(20%)';
    } else if (pcLifes === 0) {
        warriorPcImage.style.filter = 'brightness(20%)';
    };

    message(playerAttack,enemyAttack,res);

};

function lifes(lifes){
    switch(lifes) {
        case 3: return "❤️❤️❤️"
        break;
        case 2: return "❤️❤️"
        break;
        case 1: return "❤️"
        break;
        case 0: return "☠️"
        break;
    };

};

function disable(result){
    sword.disabled = result;
    bow.disabled = result;
    axe.disabled = result;
};

function message(playerAttack,enemyAttack,res) {
    let message = document.createElement('p');
    message.innerHTML = `${playerAttack} ⚔️ ${enemyAttack} - ${res}`;
    results.replaceChildren(message);
};

function sound(){
    warriors.addEventListener('mouseenter',()=>{
        audio[1].play()
    });

    warriors.addEventListener('click',()=>{
        audio[1].play()
    });

    reset.addEventListener('mouseenter',()=>{
        audio[1].play()
    });

    warriorGame.forEach((warrior)=>{
        warriorsSound = document.getElementById(warrior.sound);
        warriorsSound.addEventListener('mouseenter',()=>{
            audio[1].play()
        });
    })
    if (warrior1.checked || warrior2.checked || warrior3.checked){
        warriorGame.forEach((warriorsAttacks)=>{
            attack = warriorsAttacks.attacks
            attack.forEach((attack)=>{
                warriorsSound = document.getElementById(attack.id);
                warriorsSound.addEventListener('mouseenter',()=>{
                    audio[1].play();
                });
                warriorsSound.addEventListener('click',()=>{
                    switch(attack.name){
                        case '🗡️': audio[4].play();
                        break;
                        case '🏹': audio[2].play();
                        break;
                        case '🪓': audio[3].play();
                        break;
                    };
                });
            });
        });
    };
};

function aleatorio(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

window.addEventListener('load',startGame);



