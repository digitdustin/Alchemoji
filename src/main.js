//Selectors
const elementList = document.querySelector('.element-list');
const workspace = document.querySelector('.workspace');
//const element = document.querySelector('.element');
var allElements = document.querySelectorAll('.element-img');


//Button Listeners
elementList.addEventListener('click', addElement);
//element.addEventListener('mousedown', drag, true);
allElements.forEach((elem) => {
    elem.addEventListener('mousedown', drag, true);
});


//Functions
function addElement(event) {
    event.preventDefault();
    //create new element div
    const element = document.createElement("div");
    element.classList.add("element");
    //create new element emoji li
    const elementImg = document.createElement("li");
    elementImg.classList.add("element-img");
    elementImg.innerHTML = '<i class="twa twa-question"></i>';
    element.appendChild(elementImg);
    //create new element text li
    const elementTxt = document.createElement("h1");
    elementTxt.classList.add("element-name");
    elementTxt.innerText = "name";
    element.appendChild(elementTxt);
    //append element to elementlist
    elementList.appendChild(element);
    elementImg.addEventListener('mousedown', drag, true);
}

//moving element out of list into workspace
function drag(event) {
    console.log('drag start');
    event.preventDefault();
    var mousePosition;
    
    var offset = [
        event.clientX,
        event.clientY
    ];
    var isDown = true;

    //create new div
    
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.classList.add('element-img');
    div.style.left = event.clientX - 20 + "px";
    div.style.top = event.clientY - 20 + "px";
    div.style.width = "40px";
    div.innerHTML = this.innerHTML;
    div.style.zIndex = 2;

    

    workspace.appendChild(div);

    div.addEventListener('mouseup', (e) => {
        
        var pos = elementList.getBoundingClientRect();
        if (e.clientX < pos.right) {
            div.remove();
        } else {
            div.addEventListener('mousedown', move, true);
        }
        isDown = false;
    }, true);

    document.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (isDown) {
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            };
            div.style.left = (mousePosition.x - 30) + 'px';
            div.style.top = (mousePosition.y - 30) + 'px';
        }
    }, true);

    
}

//for moving element in workspace
function move(event) {
    console.log('move start');
    event.preventDefault();
    var mousePosition;
    
    var offset = [
        event.clientX,
        event.clientY
    ];
    var isDown = true;

    //create new div
    
    var div = this;

    workspace.appendChild(div);

    div.addEventListener('mouseup', (e) => {
        isDown = false;
        var pos = elementList.getBoundingClientRect();
        if (e.clientX < pos.right) {
            div.remove();
        } 
    }, true);

    document.addEventListener('mousemove', (e) => {
        e.preventDefault();
        if (isDown) {
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            };
            div.style.left = (mousePosition.x - 30) + 'px';
            div.style.top = (mousePosition.y - 30) + 'px';
        }
    }, true);

}





