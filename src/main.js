import elementGraph from "./graph.js";

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

//all elements available
var elementsFound = ['fire','water','air','earth'];

sortElements();


//resorts element list and redisplays everything
function sortElements() {
    //delete everything in current element list
    var currentList = document.querySelectorAll('.element');
    currentList.forEach((elem) => {
        elem.remove();
    });

    elementsFound.sort();
    for (let i = 0; i < elementsFound.length; i++) {
        //create new element div
        const element = document.createElement("div");
        element.classList.add("element");
        //create new element emoji li
        const elementImg = document.createElement("li");
        elementImg.classList.add("element-img");
        elementImg.innerHTML = `<i class="twa twa-${elementsFound[i]}"></i>`;
        element.appendChild(elementImg);
        //create new element text li
        const elementTxt = document.createElement("h1");
        elementTxt.classList.add("element-name");
        elementTxt.innerText = elementsFound[i];
        element.appendChild(elementTxt);
        //append element to elementlist
        elementList.appendChild(element);
        elementImg.addEventListener('mousedown', drag, true);
    }
}


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
    elementsFound.push('name');
    sortElements();
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
    div.classList.add('workspace-element');
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
    var isTouching = false;
    var touchingElem;
    var touchingElemText;

    //create new div
    
    var div = this;

    workspace.appendChild(div);

    div.addEventListener('mouseup', (e) => {
        isDown = false;
        var pos = elementList.getBoundingClientRect();
        if (e.clientX < pos.right) {
            div.remove();
        } 
        if (isTouching) {
            console.log('MATCH!');
            var activeElemText = (div.innerHTML).substring(18, div.innerHTML.lastIndexOf("\""));
            console.log(activeElemText);
            console.log(touchingElemText);
            checkCombination(activeElemText, touchingElemText);
        }
    }, true);

    document.addEventListener('mousemove', (e) => {
        e.preventDefault();
        isTouching = false;
        if (isDown) {
            mousePosition = {
                x : e.clientX,
                y : e.clientY
            };
            
            //check if div is touching another element in the workspace
            const workspaceElements = document.querySelectorAll('.workspace-element');
            workspaceElements.forEach((elem) => {
                var pos = elem.getBoundingClientRect();
                if (mousePosition.x < pos.right && mousePosition.x > pos.left && elem != div) {
                    if (mousePosition.y > pos.top && mousePosition.y < pos.bottom) {
                        //check if mouse is within bounds of another workspace element
                        isTouching = true;
                        //touchingElem contains the element it is touching (in case of combination => removal from workspace)
                        touchingElem = elem;
                        //touchingElemText contains the text value of the element (fire, earth, etc.)
                        touchingElemText = (elem.innerHTML).substring(18, elem.innerHTML.lastIndexOf("\""));
                        console.log(touchingElemText);
                    }
                }
            });

            div.style.left = (mousePosition.x - 30) + 'px';
            div.style.top = (mousePosition.y - 30) + 'px';
        }
    }, true);
}

//checks if two elements forms a combination
function checkCombination(elem1, elem2) {
    if (!elementGraph.adjacencyList[elem1]) {
        return;
    }
    for (let i = 0; i < elementGraph.adjacencyList[elem1].length; i++) {
        if (elementGraph.adjacencyList[elem1][i][0] == elem2) {
            console.log(`${elementGraph.adjacencyList[elem1][i][1]} has been formed`);
        }
    }
}