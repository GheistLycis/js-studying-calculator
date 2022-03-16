class Calculator{
    constructor(){
        this.initCalc();
        this._operation = [];
        this._displayValue.innerHTML = document.querySelector('#display');

    }

    initCalc(){
        this.buttonsEvents();
        this.updateDisplay();
    }

    buttonsEvents(){
        let buttons = document.querySelectorAll('#calculadora > button');
        buttons.forEach(button => {
            this.addMultiEventListener(button, 'click drag', () => {
                this.execButton(button.innerHTML);
            });
            this.addMultiEventListener(button, 'mouseover mousedown mouseup', () => {
                button.style.cursor = 'pointer';
            });
        });
    }
    
    addMultiEventListener(trigger, events, func){
        events.split(' ').forEach(event => {
            trigger.addEventListener(event, func);
        });
    }

    execButton(button){
        switch(button){
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
                this.addNumber(button);
                break;
            case '+':
            case '-':
            case 'X':
            case '÷':
                this.addOperator(button);
                break;
        };
    }

    addNumber(value){
        //LAST OP WAS A NUMBER:
        if (!isNaN(this.getLastOperation())){
            this._operation[this._operation.length-1] += value.toString();
        };
        //LAST OP WASN'T A NUMBER:
        if (isNaN(this.getLastOperation())){
            //LAST OP WAS AN OPERATOR:
            if (this.isLastAnOperator()){
                this._operation.push(value.toString());
            }
            //THIS IS THE FIRST OP:
            else{
                this._operation = [value.toString()];
            }
        }

        this.updateDisplay();
    }

    addOperator(value){
        //CONVERT HTML OPERATOR TO KEYBOARD OPERATOR (EG: X -> *)
        let operator = value;
        switch (operator){
            case '+':
                break;
            case '-':
                break;
            case 'X':
                operator = '*';
                break;
            case '÷':
                operator = '/';
                break;
        };
        //LAST OP WAS A NUMBER:
        if (!isNaN(this.getLastOperation())){
            this._operation.push(operator.toString());
        }
        //LAST OP WASN'T A NUMBER:
        if (isNaN(this.getLastOperation())){
            //LAST OP WAS AN OPERATOR:
            if (this.isLastAnOperator()){
                this._operation[this._operation.length-1] = operator.toString();
            }
            //THIS IS THE FIRST OP:
            else{
                this._operation = this._operation;
            }
        }
    }

    getLastOperation(){
        let lastOp = this._operation[this._operation.length-1];
        return lastOp;
    }

    isLastAnOperator(){
        let operations = ['+', '-', '*', '/'];
        let lastOp = this.getLastOperation();
        return (operations.indexOf(lastOp) > -1);
    }

    updateDisplay(){
        this._displayValue = this.getLastNumber();
    }

    getLastNumber(){
        let lastNum;
        for (let i = this._operation.length-1; i >= 0; i--){
            if(!isNaN(this._operation[i])){
                lastNum = this._operation[i];
                break;
            }
        }
        if (!lastNum){
            lastNum = 0;
        }
        return lastNum;
    }
}