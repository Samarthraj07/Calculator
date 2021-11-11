class Calculator {
  constructor(previousOperandText , currentOperandText){
    this.previousOperandText = previousOperandText
    this.currentOperandText = currentOperandText
    this.clear()
  }

  clear(){
   this.currentOperand = ''
   this.previousOperand = '' 
   this.operation = undefined
}

del() {
  this.currentOperand = this.currentOperand.toString().slice(0 , -1)
   
}

append(number){
  if (number === '.' && this.currentOperand.includes('.')) return

  this.currentOperand = this.currentOperand.toString() + number.toString()
}

compute(){
 let computation 
 const prev = parseFloat(this.previousOperand) 
 const curr = parseFloat(this.currentOperand)
 if (isNaN(prev) || isNaN(curr)) return
 switch(this.operation){
   case '+' :
     computation = prev + curr
     break
  case '-' :
     computation = prev - curr
     break
  case '*' :
     computation = prev * curr
      break
  case '÷' :
     computation = prev / curr
      break
  default :
     return
 }
  this.currentOperand = computation
  this.operation = undefined
  this.previousOperand = ''
}

getDisplayNumber(number){
  const stringNumber = number.toString()
  const integerDigits= parseFloat(stringNumber.split('.')[0])
  const decimalDigits = stringNumber.split('.')[1]
  let integerDisplay
  if(isNaN(integerDigits)){
    integerDisplay= ''
  }else{
    integerDisplay= integerDigits.toLocaleString('en', {
      maximumFractionDigits: 0
    })
  }
  if (decimalDigits != null){
    return `${integerDisplay}.${decimalDigits}`
  }else{
    return integerDisplay
  }
}

updateDisplay(){
this.currentOperandText.innerText =
 this.getDisplayNumber(this.currentOperand)
if(this.operation != null) {
  this.previousOperandText.innerText = 
    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
 } 
 else {
   this.previousOperandText.innerText = ''
 }   
}

 chooseOperation(operation){
  if (this.currentOperand === '') return
  if (this.previousOperand !=='') {
    this.compute()
  }
   this.operation= operation
   this.previousOperand = this.currentOperand
   this.currentOperand = ''
 }
}


const numberButtons = document.querySelectorAll('[data-number]')
const OperationButtons = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-allClear]')
const previousOperandText = document.querySelector('[data-prevOP]')
const currentOperandText = document.querySelector('[data-currentOP]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button =>{
   button.addEventListener('click' ,() =>{
   calculator.append(button.innerText)
   calculator.updateDisplay()
   })
})

OperationButtons.forEach(button =>{
  button.addEventListener('click' ,() =>{
  calculator.chooseOperation(button.innerText)
  calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click' , button =>{
  calculator.compute() 
  calculator.updateDisplay()
})

allClearButton.addEventListener('click' , button =>{
  calculator.clear() 
  calculator.updateDisplay()
})

deleteButton.addEventListener('click' , button =>{
  calculator.del() 
  calculator.updateDisplay()
})





