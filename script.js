const form = document.querySelector(".input-form");
const visualization = document.querySelector(".visualization");


let array;
let subStringLength;

async function prefixFunction() {
   const htmlStr = document.querySelector(".prefix-sums");
   const ifFound = document.querySelector(".found");
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
      if (prefixes[i] === subStringLength) {
         ++found;
         ifFound.innerHTML = "<span>" + found + "<span>";
         htmlStr.innerHTML += "<span>" + prefixes[i] + "<span>";
         htmlStr.lastChild.classList.add("if-found");
         ifFound.classList.add("if-found");
         const string = document.querySelector(".search-string");
         let nodes = string.childNodes;
         for(let j = i; j > i - subStringLength; --j) {
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