function createCombobox(input="20%")
{
 let cb= document.createElement("select");
 cb.style.width = "20%";
 cb.style.height = "100%";
 return cb;
}
function createLabel(input_string="default")
{
 let label= document.createElement("label");
 label.innerText=input_string;
 label.style.marginRight="1px";
 return label
}

function createBox(number)
{
// Create the main container
let container = document.createElement("div");
container.style.display = "flex";
container.style.alignItems = "center";
container.style.justifyContent = "space-between";
container.style.width = "100%";
container.style.height = "50px";
container.style.border = "1px solid black";
container.id= "box"+number
container.className="box"
container.style.padding="10px"

// Create the first combobox


let StatusLabel=createLabel("Status")
let LevelLabel=createLabel("Level")
let ExpLabel=createLabel("Exp")
let WeaponLabel=createLabel("Weapon")
let ArmorLabel=createLabel("Armor")
let OrbLabel=createLabel("orb")


// Create the second combobox
let StatusCombobox = createCombobox()
let ExpCombobox=document.createElement("input")
ExpCombobox.style.width = "20%";
ExpCombobox.style.height = "100%";
let WeaponCombobox =createBox()
let ArmorCombobox = createBox()
// Append the comboboxes to the main container
container.appendChild(StatusLabel);
container.appendChild(StatusCombobox);
container.appendChild(ExpCombobox);
container.appendChild(WeaponLabel);
container.appendChild(WeaponCombobox);
container.appendChild(ArmorLabel);
container.appendChild(ArmorCombobox);

// Append the main container to the body
document.body.appendChild(container);
}