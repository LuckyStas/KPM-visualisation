const form = document.querySelector(".input-form");
const visualization = document.querySelector(".visualization");


let array;
let subStringLength;

async function prefixFunction() {
   const htmlStr = document.querySelector(".prefix-sums");
   const ifFound = document.querySelector(".found");
   const string = document.querySelector(".search-string");
   let nodes = string.childNodes;
   let prefixes = Array(array.length);
   for(let i = 0; i < array.length; ++i) {
      prefixes[i] = 0;
   }
   let k = 0;
   let found = 0;
   for(let i = 1; i < array.length; ++i) {
      if(i <= subStringLength) {
         prefixes[i] = 0;
         htmlStr.innerHTML += "<span>-<span>";
         continue;
      }
      await new Promise((resolve) => setTimeout(() => resolve(), 1000));
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
   }
   document.querySelector(".again").classList.remove("visually-hidden");
}


function handlerForm(event) {
   event.preventDefault();
   const strTB = form.querySelector("[name=string]");
   const substrTB = form.querySelector("[name=substring]");
   if (strTB.value === "" || substrTB.value === "") {
      return;
   } else {
      form.classList.add("visually-hidden");
      visualization.classList.remove("visually-hidden");
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


form.addEventListener("submit", handlerForm);