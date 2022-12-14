const previousOperationText = document.querySelector("#previous-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-containers button")

class Calculator {
    constructor(previousOperationText, currentOperationText){//construtor: cria objeto e instancia a classe
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = "" //O que o user está digitando agora
    }


//add digit to calculator screen
addDigit(digit){
    //verifica se a função atual já tem um ponto
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
    } 
    this.currentOperation = digit //current vai ser o valor que o user digitar
    this.updateScreen()
}

// Process all calculator operations

processOperation(operation){
    //Check if current is empty
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        // Change operation
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation)
        }
        return
    }

    //get current and previous value
    let operationValue
    const previous = +this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText

    switch(operation){
        case "+":
            operationValue = previous + current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "-":
            operationValue = previous - current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "/":
            operationValue = previous / current
            this.updateScreen(operationValue, operation, current, previous)
            break;
        case "*":
            operationValue = previous * current
            this.updateScreen(operationValue, operation, current, previous)
            break; 
        case "DEL":
            this.processDelOperator()
            break;
        case "CE":
            this.processClearCurrentOperation()
            break;
        case "C":
            this.processClearOperation()
            break;
        case "=":
            this.processEqualOperator()
            break;    
        default:
            return;
    }
}


//Change values of the calculator screen
updateScreen(operationValue = null, operation = null, current = null, previous = null ){
    //console.log(operationValue, operation, current, previous)
    
    if(operationValue === null){
        this.currentOperationText.innerText += this.currentOperation
    }else{
        if(previous === 0){
            operationValue = current
        }

        this.previousOperationText.innerText = `${operationValue} ${operation}` //exibi o valor que o user digitou na parte superior da calculadora
        this.currentOperationText.innerText = ""
    }
    
}

//Change math operation

changeOperation(operation){
    const mathOperations = ["*", "/", "+", "-"]
    if(!mathOperations.includes(operation)){
        return
    }

    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation

}

//Delete the last digit
processDelOperator(){
    this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
}

//Clear current operation
processClearCurrentOperation(){
    this.currentOperationText.innerText = ""
}

//Clear all operations
processClearOperation(){
    this.currentOperationText.innerText = ""
    this.previousOperationText.innerText = ""
}

//Process an operation
processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1]

    this.processOperation(operation)
}

}

const calc = new Calculator(previousOperationText, currentOperationText);

//evento onde posso acessar todos os buttons
buttons.forEach((btn) => { //pecorre o array
    btn.addEventListener("click", (e) => { //add evento com o click
        const value = e.target.innerText; //pega o valor do button 
        if(+value >= 0 || value === "."){
            calc.addDigit(value)
        }else{
            calc.processOperation(value);
        }
    });
});

