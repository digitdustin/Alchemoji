import elementGraph from "./graph.js";

//Selectors
const elementList = document.querySelector('.element-list');
const workspace = document.querySelector('.workspace');
//const element = document.querySelector('.element');
var allElements = document.querySelectorAll('.element-img');

//all elements available
var elementsFound = ['fire','water','air','earth'];

sortElements();
var counter = document.createElement("div");
createCounter();

//Button Listeners
elementList.addEventListener('click', addElement);
//element.addEventListener('mousedown', drag, true);
allElements.forEach((elem) => {
    elem.addEventListener('mousedown', drag, true);
});

//counter creation
function createCounter() {
    counter.classList.add("counter");
    counter.style.right = 0;
    counter.style.bottom = 0;
    workspace.appendChild(counter);
    counter.innerHTML = `<h1>${elementsFound.length}/200</h1>`
}


function updateCounter() {
    counter.innerHTML = `<h1>${elementsFound.length}/500</h1>`
}


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
        //create new element text li
        const elementTxt = document.createElement("h1");
        elementTxt.classList.add("element-name");
        elementTxt.innerText = elementsFound[i];
        element.appendChild(elementTxt);
        //create new element emoji li
        const elementImg = document.createElement("li");
        elementImg.classList.add("element-img");
        elementImg.innerHTML = `<i class="twa twa-${elementsFound[i]}"></i>`;
        element.appendChild(elementImg);
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
    console.log(this.getBoundingClientRect());

    var originalPosition = this.getBoundingClientRect();

    var offset = [
        event.clientX - originalPosition.left,
        event.clientY - originalPosition.top
    ];
    console.log(offset);
    var isDown = true;

    //create new div
    
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.classList.add('element-img');
    div.classList.add('workspace-element');

    div.style.left = event.clientX - offset[0] + "px";
    div.style.top = event.clientY - offset[1] + "px";
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
            div.style.left = (mousePosition.x - offset[0]) + 'px';
            div.style.top = (mousePosition.y - offset[1]) + 'px';
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
            
            var newElemName = checkCombination(activeElemText, touchingElemText);
            console.log(newElemName);
            if (newElemName != -1) {
                //replace combined elements with new element
                touchingElem.remove();
                div.remove();
                var newElem = document.createElement("div");
                newElem.style.position = "absolute";
                newElem.classList.add('element-img');
                newElem.classList.add('workspace-element');
                newElem.style.left = e.clientX - 30 + "px";
                newElem.style.top = e.clientY - 30 + "px";
                newElem.style.width = "40px";
                newElem.innerHTML = `<i class="twa twa-${newElemName}"></i>`;
                newElem.style.zIndex = 2;

                workspace.appendChild(newElem);

                newElem.addEventListener('mousedown', move, true);
            }
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
        return -1;
    }
    for (let i = 0; i < elementGraph.adjacencyList[elem1].length; i++) {
        if (elementGraph.adjacencyList[elem1][i][0] == elem2) {
            console.log(`${elementGraph.adjacencyList[elem1][i][1]} has been formed`);
            //add new combination to element list
            if (!elementsFound.includes(elementGraph.adjacencyList[elem1][i][1])) {
                elementsFound.push(elementGraph.adjacencyList[elem1][i][1]);
                updateCounter();
            }
            sortElements();
            return elementGraph.adjacencyList[elem1][i][1];
        }
    }
    //if no combination found
    return -1;
}