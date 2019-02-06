class calculatorController {

    constructor () {

        this._equalNumber = '';
        this._equalOperator = '';
        this._operation = [];
        this._displaycalcEl = document.querySelector('#display');
        this.initialize();
    }

    initialize () {
        this.getButtons();
        this.getKeyword();
    }

    get displayCalc () {
        return this._displaycalcEl.innerHTML;
    }

    set displayCalc (value) {
        this._displaycalcEl.innerHTML = value;
    }

    setError() {
        this._displaycalcEl.innerHTML = 'Error';
    }

    // get and initialize events listeners for all buttons, it's just a for inside other
    getButtons () {
        let buttons = document.querySelectorAll('button');        
        buttons.forEach((btn,i) => {            
            this.addEventListenerAll('click drag', btn, e =>{
                this.execBtn (btn.innerHTML);
            });    
        });
    }

    getKeyword () {
                  
        document.addEventListener('keyup', e=>{
            this.execBtn(e.key);
            //console.log(e.key);
        });      
    }

    addEventListenerAll (events, element, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false)
        });
    }

    evalOperation (value) {

        if (this._operation.length == 3) {
            let result = eval( this._operation.join(''));
            this._operation = [result.toString(), value];
         } 
         else {
            this._operation.push(value);
         }
    }

    addOperation (value) {

        if (this._operation.length == 0) {
            if (this.isOperator(value)) {
                this._displaycalcEl.innerHTML = '0';
            }
            else {
                this.evalOperation(value); 
            }
        }      
        else if (isNaN(this._operation[this._operation.length-1]) /*is not a number the last array position?*/) {

            if (isNaN(this._operation[this._operation.length-2])) {
                this.concatNumber(value);
            }
            //the value is a operator?
            else if (this.isOperator(value) /*is a operator?*/) {
                //change the position
                this._operation[this._operation.length-1] = value;
            }
            else {
                //push a new number
                this.evalOperation(value);
            }
//3461032019
        }
        else if (this.isOperator(value)/* the value is a operator?*/){
            // push new position
            this.evalOperation(value);
        }
        else {            
            this.concatNumber(value);// It's a number so concat the array
        }
        this.updateDisplay();
    }

    updateDisplay() {

        if (this._operation.join('').length > 9) {
            this._displaycalcEl.innerHTML = 'NaN';
        }
        else this._displaycalcEl.innerHTML = this._operation.join('');
    }

    clearAll() {
        this._operation = [];
        this._equalNumber = '';
        this._equalOperator = '';
        this._displaycalcEl.innerHTML = '0';
    }

    clearEntry() {
        this._operation.pop();
        this._displaycalcEl.innerHTML = this._operation.join('');
    }

    clearLast () {
        if (isNaN(this._operation[this._operation.length-1])) {
             this._operation.pop();
        }
        else {
            this._operation[this._operation.length-1] = this._operation[this._operation.length-1].slice(0,-1);           
        }  
        this.updateDisplay();      
    }

    isOperator (value) {        
        return (['+','-','/','*','%','√','x²','¹/x','±'].indexOf(value) > -1);
    }

    concatNumber (value) {
        this._operation[this._operation.length-1] += value;
    }

    plusMinus() {

        let element = this._operation[this._operation.length-1].toString();
        if (this.isOperator(element)) {            
            this._operation.push('-');
        }
        else {
            if (element[0] == '-') {
                this._operation[this._operation.length-1] = element.slice(1,element.length);
            }
            else {
                let minus = '-';
                minus += this._operation[this._operation.length-1];  
                this._operation[this._operation.length-1] = minus;
            }
        }
        this.updateDisplay();
    }

    /* execute the equal button */
    equalOperation(value = null) {

        if (this._operation.length < 2) {    
            switch (value){                
                case '√':
                    this._operation = [Math.sqrt(this._operation[0]).toString()];
                    break;                
                case 'x²':
                    this._operation = [Math.pow(this._operation[0],2).toString()];
                    break;
                case '¹/x':
                    this._operation = [1/this._operation[0].toString()];
                break;                
                default:
                this._operation = [eval(this._operation+this._equalOperator+this._equalNumber).toString()];
            }              
        }
        else {
            if (this._operation.length < 3) {

                switch (value){                
                    case '%':
                    case 'x²':
                        this._operation.push(Math.pow(this._operation[0],2).toString());
                    break;                    
                    case '√':
                        this._operation.push(Math.sqrt(this._operation[0]).toString());
                    break;                  
                    case '¹/x':
                        this._operation.push(1/this._operation[0].toString());
                    break;                    
                    default:
                    this._operation.push(this._operation[0]);
                }              
            }
            else {

                switch (value){                
                    case '%':
                        this._operation[this._operation.length-1] *= this._operation[0] / 100;
                        this._operation[this._operation.length-1] = this._operation[this._operation.length-1].toString();
                    break;
                    case '√':
                        this._operation[this._operation.length-1] = Math.sqrt(this._operation[this._operation.length-1]).toString();
                    break;                    
                    case 'x²':
                        this._operation[this._operation.length-1] = Math.pow(this._operation[this._operation.length-1],2).toString();
                    break;    
                    case '¹/x':
                        this._operation[this._operation.length-1] = 1/this._operation[this._operation.length-1].toString();
                    break;                    
                    default:
                    this._operation.push(this._operation[0]);
                }               
            }
            this.equal();          
        }
        this.updateDisplay();
    }

    equal() {
    this._equalOperator = this._operation[this._operation.length-2];
    this._equalNumber = this._operation[this._operation.length-1];           
    this._operation = [eval(this._operation.join('')).toString()];  
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
            case 'Backspace':
                this.clearLast(); 
                break;                
            case '+':
                this.addOperation('+');
                break;                
            case '-':
                this.addOperation('-');
                break;                
            case '÷':
            case '/':
                this.addOperation('/');
                break;                
            case 'X':
            case '*':
                this.addOperation('*');
                break;
            case '.':
            case ',':
            this.addOperation('.'); 
                break;
            case '√':
            this.equalOperation('√'); 
                break;
            case 'x²':
            this.equalOperation('x²'); 
                break;
            case '¹/x':
            this.equalOperation('¹/x'); 
                break;
            case '±':
            this.plusMinus(); 
                break;
            case '%':
            this.equalOperation('%');  
                break;       
            case '=':
            case 'Enter':
            this.equalOperation(); 
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
        }
    }
}