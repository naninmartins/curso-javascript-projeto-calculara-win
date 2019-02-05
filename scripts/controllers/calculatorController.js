class calculatorController {

    constructor () {

        this._operation = [];
        this._displaycalcEl = document.querySelector('#display');
    }

    get displayCalc () {

        return this._displaycalcEl.innerHTML;
    }

    set displayCalc (value) {

        this._displaycalcEl.innerHTML = value;
    }

    // get and initialize events listeners for all buttons, it's just a for inside other
    getButtons () {

        let buttons = document.querySelectorAll('button');
        
        buttons.forEach((btn,i) => {
            
            this.addEventListenerAll('click drag', btn, e =>{

                //console.log(btn.innerHTML);
                this.execBtn (btn.innerHTML);

            });    
        });
    }

    addEventListenerAll (events, element, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false)

        });
    }

    addOperation (value) {

        //what's the flow and situations on calculate?
        //can be a operator or a number
        //if a number I need concat
        //if a operator a need a new array position or a change of operator position
        //the dot signal will be treated together with number by string and evalue function

        if (isNaN(this._operation[this._operation.length-1]) /*is not a number the last array position?*/) {

            //the value is a operator?
            if (this.isOperator(value) /*is a operator?*/) {
                //change the position
                this._operation[this._operation.length-1] = value;
            }
            else {
                //push a new number
                this._operation.push(value);
            }

        } //else 
        else if (this.isOperator(value)/* the value is a operator?*/){
            // push new position
            this._operation.push(value);
        }
        else {
            
            this.concatNumber(value);// It's a number so concat the array
        }
        console.log(this._operation);
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        return this._operation.pop();
    }

    clearLast () {

        if (isNaN(this._operation[this._operation.length-1])) {
             this._operation.pop();
        }
        else {
            this._operation[this._operation.length-1] = this._operation[this._operation.length-1].slice(0,-1);           
        }        
    }

    isOperator (value) {
        
        return (['+','-','/','*','%','√','x²','¹/x','±'].indexOf(value) > -1);
    }

    concatNumber (value) {

        this._operation[this._operation.length-1] += value;

    }


    // function to execute button event triggered
    execBtn (value){

        switch (value){
            case 'C':
                this.clearAll();
                break;
                
            case 'CE':
                this.clearEntry();
                break;

            case '←':
                this.clearLast(); 
                break;
                
            case '+':
                this.addOperation('+');
                break;
                
            case '-':
                this.addOperation('-');
                break;
                
            case '÷':
                this.addOperation('/');
                break;
                
            case 'X':
                this.addOperation('*');
                break;
                
            case '%':
                this.addOperation('%');  
                break;

            case '=':
                this.addOperation('='); 
                break;

            case ',':
            this.addOperation('.'); 
                break;

            case '√':
            this.addOperation('√'); 
                break;

            case 'x²':
            this.addOperation('x²'); 
                break;

            case '¹/x':
            this.addOperation('¹/x'); 
                break;

            case '±':
            this.addOperation('±'); 
                break;          

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(value);               
                break;
            default:
                this.setError();

                
        }
    }

}