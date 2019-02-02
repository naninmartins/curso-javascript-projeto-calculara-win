class calculatorController {


constructor () {

    this._displaycalcEl = document.querySelector('#display');
}

get displayCalc () {

    return this._displaycalcEl.innerHTML;
}

set displayCalc (value) {

    this._displaycalcEl.innerHTML = value;
}

getButtons () {

    let buttons = document.querySelectorAll('button');
    
    buttons.forEach((btn,i) => {
        
        this.addEventListenerAll('click drag mouseover', btn, e =>{

            console.log(btn.innerHTML);

        });
        
       


    });
}

addEventListenerAll (events, element, fn) {

    events.split(' ').forEach(event => {

        element.addEventListener(event, fn, false)


    });


}




}