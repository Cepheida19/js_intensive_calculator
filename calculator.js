
let win = document.querySelector("#window");
let buttons = document.querySelectorAll(".digit");
let zero = document.querySelector("#zero");
let plus_minus = document.querySelector("#plus_minus");
let arrow = document.querySelector("#arrow");
let signs = document.querySelectorAll(".signs");
let equal = document.querySelector("#equal");
let percent = document.querySelector("#percent");
let point = document.querySelector("#point");
let second_input = document.querySelector("#second_input");
let multiply = document.querySelector("#multiply");
let divide = document.querySelector("#divide");

for(let but of buttons){
    but.addEventListener("click", func_write);
}
for(let sign of signs){
    sign.addEventListener("click", func_signs);
}

zero.addEventListener("click", function(){
    second_input.setAttribute("value", "0");
    win.setAttribute("value", "0");});
plus_minus.addEventListener("click", func_plus_minus);
arrow.addEventListener("click", func_del);
equal.addEventListener("click", func_equal);
percent.addEventListener("click", func_percent);
point.addEventListener("click", func_point);
multiply.addEventListener("click", func_multiply);
divide.addEventListener("click", func_multiply);

//------------------------simple functions-----------------------
function func_plus_minus(){
    let flag = Number(win.getAttribute("value"));
    if (isNaN(flag)){
        win.setAttribute("value", win.value);
    } else {
        win.setAttribute("value", -1 * Number(win.value));
    }
}
function func_signs(){
    let exp = win.getAttribute("value");
    let last = exp.split("").pop();
    let flag1 = (/\d/).test(last);
    let flag2 = (/\./).test(last);
    let flag3 = (/[\u00D7\u00F7]/).test(exp);
    if(flag3){
        win.setAttribute("value", win.value);
    } else if(flag1){
        win.setAttribute("value", win.value + this.innerHTML);
    } else if (flag2){
        win.setAttribute("value", win.value + "0" + this.innerHTML);
    } else 
       { win.setAttribute("value", win.value);
    }
}

function func_write(){
    if(win.getAttribute("value") === "0"){
        win.setAttribute("value", this.innerHTML);
    } 
    else {
        win.setAttribute("value", win.value + this.innerHTML);
    }
}
function func_point(){
    let flag1 = (/\.$/).test(win.getAttribute("value")); 
    let flag2 = (/\.\d+$/).test(win.getAttribute("value"));
    let flag3 = (/[\+\-\u00D7\u00F7]$/).test(win.getAttribute("value"));
    if(flag1 || flag2){
        win.setAttribute("value", win.value);
    } else if (flag3) {
        win.setAttribute("value", win.value + "0" + this.innerHTML);
    } else {
        win.setAttribute("value", win.value + this.innerHTML);
    }
}
function func_del(){
    let numb = win.getAttribute("value");
    let res = String(numb).split("").slice(0, -1).join("");
    if (win.value.length === 1){
        win.setAttribute("value", "0");
    } else {
        win.setAttribute("value", res);
    }
}

//-------------------------------calculations-----------------------
function func_multiply(){
    let exp = win.getAttribute("value");
    let flag1 = (/[\+\u00F7\u00D7]/).test(exp);
    let flag2 = (/\d+\-/g).test(exp);
    if(flag1 || flag2){
        win.setAttribute("value", win.value);
    } else {
        win.setAttribute("value", win.value + this.innerHTML);
    }
}
function func_percent(){
    let exp = win.getAttribute("value");
    let flag1 = (/^\-*[0-9]*[.,]?[0-9]+.[0-9]*[.,]?[0-9]+$/).test(exp);
    let flag2 = (/^[0-9]*[.,]?[0-9]+\.*$/g).test(exp);
    if (flag1 && !flag2){
        let digits = exp.match(/[0-9]*[.,]?[0-9]+/g);
        let signs1 = exp.match(/\D/g);
        let signs = signs1.join("").match(/[^\.]/g);
        let first = exp.split("").shift();
        if(first === "-"){
            signs[0] = signs[1];
            let percents = digits[0] * digits[1] / 100;
            let res = (operations(digits[0], percents, signs[0])) * (-1);
            if (String(res).length > 8){
                second_input.setAttribute("value", exp + "% =");
                win.setAttribute("value", res.toFixed(8));
             } else {
                second_input.setAttribute("value", exp + "% =");
                win.setAttribute("value", res);
             }
        } else {
            let percents = digits[0] * digits[1] / 100;
            let res = operations(digits[0], percents, signs[0]);
            if (String(res).length > 8){
                second_input.setAttribute("value", exp + "% =");
                win.setAttribute("value", res.toFixed(8));
             } else {
                second_input.setAttribute("value", exp + "% =");
                win.setAttribute("value", res);
             }
        }
    } else {
        win.setAttribute("value", "0");
    }
}

function func_equal(){
    let exp = win.getAttribute("value");
    let last = exp.split("").pop();
    let flag1 = (/[\-\+\u00D7\u00F7\.]/).test(last);
    let flag = (/^[0-9]*[.,]?[0-9]+\.*$/g).test(exp);
    if(flag || flag1){
        win.setAttribute("value", win.value);
    } else {
        let digits = exp.match(/[0-9]*[.,]?[0-9]+/g);
        let signs1 = exp.match(/\D/g);
        let signs = signs1.join("").match(/[^\.]/g);
        let first_sign = exp.split("").shift();
        let filter = signs.some(x => x === "\u00F7" || x === "\u00D7");
        if(filter){
            if(first_sign === "-"){
                signs[0] = signs[1];
                digits[0] = digits[0] * (-1);
            }
            let result = operations(digits[0], digits[1], signs[0]);
            if (String(result).length > 8){
                second_input.setAttribute("value", exp + "=");
                win.setAttribute("value", result.toFixed(8));
             } else {
                second_input.setAttribute("value", exp + "=");
                win.setAttribute("value", result);
             }
        } else{
            if (first_sign !== "-"){
                let res = digits[0];
                for(let i = 0; i < signs.length; i++){
                res = operations(res, digits[i+1], signs[i]);
            }
             if (String(res).length > 8){
                second_input.setAttribute("value", exp + "=");
                win.setAttribute("value", res.toFixed(8));
             } else {
                second_input.setAttribute("value", exp + "=");
                win.setAttribute("value", res);
             }
             
            } else {
                let res = 0;
                for(let i = 0; i < signs.length; i++){
                    res = operations(res, digits[i], signs[i]);
                }
                if (String(res).length > 8){
                    second_input.setAttribute("value", exp + "=");
                    win.setAttribute("value", res.toFixed(8));
                 } else {
                    second_input.setAttribute("value", exp + "=");
                    win.setAttribute("value", res);
                 }
            }
        }
    }
}
function operations(num1, num2, operation){
    switch(operation){
        case "+":
            return Number(num1) + Number(num2);
        case "-":
            return Number(num1) - Number(num2);
        case "\u00D7":
            return Number(num1) * Number(num2);
        case "\u00F7":
            return Number(num1) / Number(num2);
    }
}
