const form = document.querySelector(".input-form");
const visualization = document.querySelector(".visualization");
const playPause = document.querySelector(".algo-toggle");
const stepBack = document.querySelector(".left");
const stepForward = document.querySelector(".right");
const domObject = document.querySelector(".algo");


let length;
let myHTML;
let array;
let subStringLength;
let ifStopped = false;
let currentIter = 0;
let modified = false;

function fun() {
   return new Promise((resolve) => {
       let i = 0;
       const loop = setInterval(() => {
          i++;
          if(!ifStopped) {
            clearInterval(loop);
            resolve(i)
          }
       }, 10)
   })
}

async function animate() {
   for (let index = 0; index < length; index++) {
      domObject.innerHTML = myHTML[index];  
      await new Promise((resolve) => setTimeout(() => resolve(), 1000));
      if (modified) {
         index = currentIter;
         modified = false;
      } else {
      currentIter = index;
      }
      if (ifStopped) {
         const val = await fun(); 
      }
   }
   document.querySelector(".again").classList.remove("visually-hidden");
}

function animationArray() {
   domObject.innerHTML = myHTML[currentIter]; 
   form.classList.add("visually-hidden");
   visualization.classList.remove("visually-hidden");
   playPause.classList.remove("visually-hidden");
   stepBack.classList.remove("visually-hidden");
   stepForward.classList.remove("visually-hidden");
   animate();
}


function prefixFunction() {
   const htmlStr = document.querySelector(".prefix-sums");
   const ifFound = document.querySelector(".found");
   const string = document.querySelector(".search-string");
   let nodes = string.childNodes;
   let prefixes = Array(array.length);
   for(let i = 0; i < array.length; ++i) {
      prefixes[i] = 0;
      if(i <= subStringLength) {
         htmlStr.innerHTML += "<span>-<span>";
      }
   }
   myHTML = [domObject.innerHTML.toString()];
   let k = 0;
   let found = 0;
   for(let i = subStringLength + 1; i < array.length; ++i) {
      while (k > 0 && array[k] !== array[i]) {
         k = prefixes[k-1];
      }
      if (array[k] === array[i]) {
         ++k;
      }
      prefixes[i] = k;
      if (k < prefixes[i-1]) {
         for (let index = 0; index < prefixes[i-1]; index++) {
            nodes[index].classList.remove("searching"); 
         }
         if (prefixes[i-1] !== subStringLength) {
            for (let index = i - 1; index > i - prefixes[i-1] - 1; --index) {
               nodes[index].classList.remove("searching"); 
            }
         }
      } 
      if (k > 0) {
         for (let index = 0; index < k; index++) {
            nodes[index].classList.add("searching");
         }
         nodes[i].classList.add("searching");
      }
      if (prefixes[i] === subStringLength) {
         ++found;
         ifFound.innerHTML = "<span>" + found + "<span>";
         htmlStr.innerHTML += "<span>" + prefixes[i] + "<span>";
         htmlStr.lastChild.classList.add("if-found");
         ifFound.classList.add("if-found");

         for(let j = i; j > i - subStringLength; --j) {
            nodes[j].classList.remove("searching");
            nodes[j].classList.add("if-found");
         }
      } else {
      htmlStr.innerHTML += "<span>" + prefixes[i] + "<span>";
      }
      length = myHTML.push(domObject.innerHTML.toString());
   }
   animationArray();
   
}


function handlerForm(event) {
   event.preventDefault();
   const strTB = form.querySelector("[name=string]");
   const substrTB = form.querySelector("[name=substring]");
   if (strTB.value === "" || substrTB.value === "") {
      return;
   } else {

      const string = document.querySelector(".search-string");
      subStringLength = substrTB.value.length;
      const workString = substrTB.value + "#" + strTB.value;
      array = workString.split("");
      for (let index = 0; index < array.length; index++) {
         string.innerHTML += "<span>" + array[index] + "</span>";
      }
   }
   prefixFunction()
}

function stopAlgo(event) {
   event.preventDefault();
   if (playPause.classList.contains("pause")) {
      playPause.classList.add("play");
      playPause.classList.remove("pause");
      ifStopped = true;
   } else {
      playPause.classList.add("pause");
      playPause.classList.remove("play");
      ifStopped = false;
   }

}

function back(event) {
   event.preventDefault();
   --currentIter;
   if (currentIter < length) {
      return;
   }
   domObject.innerHTML = myHTML[currentIter];
   modified = true;
}

function forward(event) {
   event.preventDefault();
   ++currentIter;
   if (currentIter > length) {
      return;
   }
   domObject.innerHTML = myHTML[currentIter];
   modified = true;
}

form.addEventListener("submit", handlerForm);
playPause.addEventListener("click", stopAlgo);
stepBack.addEventListener("click", back);
stepForward.addEventListener("click", forward);