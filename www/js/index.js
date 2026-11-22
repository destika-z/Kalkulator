const display = document.getElementById("display");
const history = document.getElementById("history");
const buttons = document.querySelectorAll("button");

let current = "";
let last = "";

function formatExpression(exp){
  return exp
    .replace(/(\d+(\.\d+)?)%/g, "($1/100)")
    .replace(/×/g,"*")
    .replace(/÷/g,"/")
    .replace(/−/g,"-");
}

function isOperator(x){
  return ["+", "−", "×", "÷"].includes(x);
}

buttons.forEach(btn=>{
  btn.onclick = () => {
    let val = btn.innerText;

    if(val === "AC"){
      current = "";
      last = "";
    }
    else if(val === "+/-"){
      if(current){
        current = current.startsWith("-") 
          ? current.slice(1) 
          : "-" + current;
      }
    }
    else if(val === "%"){
      let lastChar = current.slice(-1);
      if(lastChar === "%" || isOperator(lastChar)) return;
      current += "%";
    }
    else if(val === "="){
      try{
        last = current;
        let result = eval(formatExpression(current));
        current = (!isNaN(result) && isFinite(result)) 
          ? result.toString() 
          : "0";
      }catch{
        current = "0";
      }
    }
    else{
      if(val === "."){
        let lastNumber = current.split(/[\+\−×÷]/).pop();
        if(lastNumber.includes(".")) return;
      }

      if(isOperator(val) && isOperator(current.slice(-1))){
        current = current.slice(0,-1) + val;
      } else {
        current += val;
      }
    }

    display.innerText = current || "0";
    history.innerText = last;
    display.scrollLeft = display.scrollWidth;
  }
});