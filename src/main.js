//Selectors
const elementList = document.querySelector('.element-list');
const workspace = document.querySelector('.workspace');
const element = document.querySelector('.element');


//Button Listeners
elementList.addEventListener('click', addElement);
element.addEventListener('mousedown', drag, true);


//Functions
function addElement(event) {
    event.preventDefault();
    //create new element div
    const element = document.createElement("div");
    element.classList.add("element");
    //create new element emoji li
    const elementImg = document.createElement("li");
    elementImg.classList.add("element-img");
    elementImg.innerText = "❔";
    element.appendChild(elementImg);
    //create new element text li
    const elementTxt = document.createElement("h1");
    elementTxt.classList.add("element-name");
    elementTxt.innerText = "name";
    element.appendChild(elementTxt);
    //append element to elementlist
    elementList.appendChild(element);
}

function drag(event) {
    console.log('drag start');
    event.preventDefault();
    var mousePosition;
    var div = document.createElement("div");
    var offset = [0,0];
    var isDown = true;

    //create new div
    //div = document.createElement("div");
    div.style.position = "absolute";
    div.classList.add('element-img');
    div.style.left = 0;
    div.style.top = 0;
    div.style.width = "40px";
    div.innerText = "🔥";
    div.style.zIndex = 2;

    workspace.appendChild(div);

    document.addEventListener('mouseup', () => {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (isDown) {
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}





