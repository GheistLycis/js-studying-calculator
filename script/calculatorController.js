class Calculator{
    constructor(){
        this._operation = [];
    }

    buttonsEvents(){
        let buttons = document.querySelectorAll('#calculadora > button');
        buttons.forEach(button => {
            this.addMultiEventListener(button, 'click drag', () => {
                this.execButton(button.innerText);
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
            if (this.isOperator()){
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
        

        //LAST OP WAS A NUMBER:
        if (!isNaN(this.getLastOperation())){
            this._operation.push(value.toString());
        }
        //LAST OP WASN'T A NUMBER:
        if (isNaN(this.getLastOperation())){
            //LAST OP WAS AN OPERATOR:
            if (this.isOperator()){
                this._operation[this._operation.length-1] = value.toString();
            }
            //THIS IS THE FIRST OP:
            else{
                this._operation = this._operation;
            }
        }

        this.updateDisplay();
    }

    getLastOperation(){
        let lastOp = this._operation[this._operation.length-1];
        return lastOp;
    }

    isOperator(){
        let operations = ['+', '-', '*', '/'];
        let lastOp = this.getLastOperation();
        return (operations.indexOf(lastOp) > -1);
    }

    updateDisplay(){

    }
}