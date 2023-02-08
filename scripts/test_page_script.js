import { Clamp, petTypeEnum } from "./app.js";

let myPet = null;

const godzilla_pic=document.getElementById("godzilla");
const kong_pic=document.getElementById("kong");
const sheep_pic=document.getElementById("sheep");
const rip_pic=document.getElementById("rip");

const godzilla_button=document.getElementById("godzilla_button");
const kong_button=document.getElementById("kong_button");
const sheep_button=document.getElementById("sheep_button");

const healthBar = document.getElementById("status-bar-health");
const hungerBar = document.getElementById("status-bar-hunger");
const thirstBar = document.getElementById("status-bar-thirst");
const happinessBar = document.getElementById("status-bar-happiness");

godzilla_pic.style.display = "none";
kong_pic.style.display = "none";
sheep_pic.style.display = "none";
rip_pic.style.display = "none";
// sets pictures to hidden as default


// add event listener for window load 
// will create the pet on the page
window.addEventListener("load", (event) => {
   
    // console.log("test");

    
    // create out pet based on userSettings info

    //const specificPetBar = document.createElement();

    const petType = localStorage.getItem("userSettingsPetType");
    if(petType == petTypeEnum.electricSheep)
    {
        // create a sheep
        myPet = new ElectricSheep(localStorage.getItem("userSettingsPetName"),999,999,999,999,999)
        
    }else if(petType == petTypeEnum.kingKong)
    {
        // create a kingkong
        myPet = new KingKong(localStorage.getItem("userSettingsPetName"),999,999,999,999,999)
        
    } else if(petType == petTypeEnum.godzilla)
    {
        // create a godzilla
        myPet = new Godzilla(localStorage.getItem("userSettingsPetName"),999,999,999,999,999)
        
    }
    else{
        //option for loading the game page without creating a pet first?
        myPet = new Godzilla(localStorage.getItem("userSettingsPetName"),999,999,999,999,999)
    }


    timingFunction();
})


godzilla_button.addEventListener("click", ()=> {
    if (godzilla_pic.style.display == "none") {
        godzilla_pic.style.display = "block";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";
        godzilla_button.style.display = "none";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    } else {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    }
})

kong_button.addEventListener("click", ()=> {
    if (kong_pic.style.display == "none") {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "block";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "none";
        sheep_button.style.display = "block";
    } else {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    }
})

sheep_button.addEventListener("click", ()=> {
    if (sheep_pic.style.display == "none") {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "block";
        rip_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "none";
    } else {
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.style.display = "none";
        godzilla_button.style.display = "block";
        kong_button.style.display = "block";
        sheep_button.style.display = "block";
    }
})



// each button shows its own pic and hides itself, shows other buttons

class BasePet {
    currentHealth = 999;
    currentHunger = 999;
    currentHappiness = 999;

    // Setting up the main values of the pet
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness) {
        this.name = name;

        // sets up the health
        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;

        // sets up the hunger
        this.maxHunger = maxHunger;
        this.currentHunger = maxHunger;

        // sets up the thirst
        this.maxThirst = maxThirst;
        this.currentThirst = maxThirst;

        // sets up the happiness
        this.maxHappiness = maxHappiness;
        this.currentHappiness = maxHappiness;
        this.isDead = false;
    }

    feed() {
        // do something when fed
    }

    clean() {
        // do something when cleaned
    }

    play() {
        // do something when played with
    }

    // modifies health by value given
    modifyHealthByValue(value) {
        // Adds to the health and makes sures its never above the max health
        this.currentHealth = Clamp(this.currentHealth + value, 0, this.maxHealth);
    }

    // modifies thirst by value given
    modifyThirstByValue(value) {
        // Adds to the hunger and makes sure its never above max hunger
        this.currentThirst = Clamp(this.currentThirst + value, 0, this.maxThirst);
    }

    // modifies hunger by value given
    modifyHungerByValue(value) {
        // Adds to the hunger and makes sure its never above max hunger
        this.currentHunger = Clamp(this.currentHunger + value, 0, this.maxHunger);
    }

    // modifies happiness by value given
    modifyHappinessByValue(value) {
        // Adds to the happiness and makes sure its never above max happiness
        this.currentHappiness = Clamp(this.currentHappiness + value, 0, this.maxHappiness)
    }

    // removes health from the pet
    takeDamage(value) {
        this.modifyHealthByValue(-value)
        
        // if the health is lower than 0 after we removed the health, then die
        if(this.currentHealth <= 0) {
            this.#die();
        }
    }

    // private method
    // called when the pet dies
    #die() {
        this.isDead = true;
        console.log("RIP PET IS DEAD");
        rip_pic.style.display = "block";
        godzilla_pic.style.display = "none";
        kong_pic.style.display = "none";
        sheep_pic.style.display = "none";
        rip_pic.requestFullscreen;
        document.getElementById("reaperAudio").play();
        document.exitFullscreen;
    }
}

// sheep class
class ElectricSheep extends BasePet {
    // tring to be consistent with naming conventions from earlier on 
    // and comment :)

    currentCharge = 999;

    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness, maxCharge) {
        super(name, maxHealth, maxHunger, maxThirst, maxHappiness)

        this.maxCharge = maxCharge;
        this.currentCharge = maxCharge;
    }

    charge(){
        
        // do something when charged
        
    }

    // function for sheep only to add charge 
    addToCharge(value){
        this.currentCharge = Clamp(this.currentCharge + value, 0, this.maxCharge)
    }
}


class KingKong extends BasePet {

    currentPowerness = 999;
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness, maxPowerness) {
        super(name, maxHealth, maxHunger, maxThirst, maxHappiness);

        this.maxPowerness = maxPowerness;
        this.currentPowerness = maxPowerness;
    }

    poweredUp() {
        // do something when powered up
    }

    // Adds to the power and makes sure it never goes below 0 or above the max powerness
    addToPower(value) {
        this.currentPowerness = Clamp(this.currentPowerness + value, 0, this.maxPowerness);
    }
}

class Godzilla extends BasePet {

    currentRadiation = 999;
    constructor(name, maxHealth, maxHunger, maxThirst, maxHappiness, maxRadiation) {
        super(name, maxHealth, maxHunger, maxThirst, maxHappiness);

        this.maxRadiation = maxRadiation;
        this.currentRadiation = maxRadiation
    }

    nuclearBeam(){
        // fire nuclear beam when max radiation
    }

    addToRadiation(value) {
        this.currentRadiation = Clamp(this.currentRadiation + value, 0, this.maxRadiation);
    }
}

// call the function to update the html/styles

//
const timingFunction = () => {
    window.setInterval(() => {
        myPet.takeDamage(50);
        myPet.modifyHungerByValue(-20);
        myPet.modifyThirstByValue(-10);
        myPet.modifyHappinessByValue(-40);
        console.log(myPet)
       

        updateStatusBars();
    },1000); // every 1 second
}

const updateStatusBars = () => {
    healthBar.style.width=`${(myPet.currentHealth / myPet.maxHealth) * 100}%`;
    hungerBar.style.width=`${(myPet.currentHunger / myPet.maxHunger) * 100}%`;
    thirstBar.style.width=`${(myPet.currentThirst / myPet.maxThirst) * 100}%`;
    happinessBar.style.width = `${(myPet.currentHappiness / myPet.maxHappiness) * 100}%`;
}


// const thirstBar=getElementById("thirstbar");
// thirstBar.style.width=( (currentThirst / maxThirst) * 100)vw;

// const happinessBar=getElementById("happinessbar");
// happinessBar.style.width=( (currentHappiness / maxHappiness) * 100)vw;