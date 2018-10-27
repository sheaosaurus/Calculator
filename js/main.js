



const buttons = document.querySelectorAll('[data-type]'),
display = document.querySelector('[data-view=display]'),
calculateButton = document.querySelector('[data-calc=cal]'),
clearButton = document.querySelector('[data-clr]')

//*******************//
//  Storage Control  //
//*******************//
const storageCtrl = (function(){
	
	//State values that can be changed
	const storage = {
		emptyStorage: true,
		prevType: "",
		currDisplay: 0,
		valuesToCalculate: "",
	}


	//Public Methods
	return {
		emptyState: function(){
			return  storage.emptyStorage;
		},
		updateStorageValue: function(value){
			storage.emptyStorage = value;
		},
		getPrevType: function(){
			return storage.prevType;
		},
		updatePrevType: function(prevType){
			storage.prevType = prevType;
		},
		getCurrentDisplay: function(){
			return storage.currDisplay
		},
		setCurrDisplay: function(btnValue){
			storage.currDisplay = btnValue;
		},
		addCalcValues: function(btnValue){
			storage.valuesToCalculate += btnValue;
		},
		getCalcValues: function(){
			return storage.valuesToCalculate;
		},
		clearCalcValues: function(){
			storage.valuesToCalculate = "";
		},
		clearAll: function(){
			storageCtrl.updateStorageValue(true)
			storageCtrl.updatePrevType(""),
			storageCtrl.setCurrDisplay(0),
			storageCtrl.clearCalcValues()
		}
	}

})();

//*******************//
//  Display Control  //
//*******************//
const displayCtrl = (function(){

		return {
				
				//Function to determine display type
				displayType: function(dataType, btnValue, prevType){
					
					//DataType is passed as string variable from typeCtrl and used in switch statement 
					//to call functions
					switch(dataType){
						case dataType = "firstNum": displayCtrl.firstNum(btnValue); break;
						case dataType = "secNum": displayCtrl.secNum(btnValue); break;
						case dataType = "newNumAfterOpp": displayCtrl.newNumAfterOpp(btnValue); break;
						case dataType = "dec": displayCtrl.dec(btnValue); break;
						case dataType = "opp": displayCtrl.opp(btnValue); break;
						case dataType = "clr": displayCtrl.firstNum(btnValue); break;
					}
				},
				updateDisplay: function(btnValue){
					display.textContent = btnValue;
				},
				concatDisplay: function(btnValue){
					display.textContent += btnValue;
				},
				firstNum: function(btnValue){
					displayCtrl.updateDisplay(btnValue)
					if (clearButton.textContent === "AC") clearButton.textContent = "CE";
				},
				secNum: function(btnValue){
					displayCtrl.concatDisplay(btnValue)
				},
				newNumAfterOpp: function(btnValue){
					displayCtrl.updateDisplay(btnValue)
				},
				dec: function(btnValue){
					displayCtrl.concatDisplay(btnValue)
				},
				opp: function(btnValue){
					displayCtrl.updateDisplay(btnValue)
				},
				changeClearValue: function(value){
					clearButton.textContent = value;
				}


		}
})();

//*******************//
//  Type Control  //
//*******************//
const typeCtrl = (function(storageCtrl){
	
	return {
		typeClicked: function(emptyStorage, type, prevType, btnValue){
			//If storage-empty is true, add new value to calc array and set st-emp to false
			//First number entered into calculate in new state
			let firstNum = 'firstNum',
			//Second number following first number ie firstNum = 2,
			//secNum = 2, 22 would be displayed
			secNum = 'secNum',
			//New number enteted after opp entered ie 22 *  -> 2 <-
			newNumAfterOpp = 'newNumAfterOpp',
			dec = 'dec',
			opp = 'opp',
			clr = 'clr'
			
			//If storage set to true (empty) and type is num, first number is returned
			if (emptyStorage === true && type === 'num') return firstNum
			//If type is num and prevType is num, secNum is returned
			if (type === 'num' && prevType === 'num' || prevType === 'dec') return secNum
			//If the prev type was an operation, a new number input type is returned
			if (prevType === 'opp') return newNumAfterOpp;
			//If decimal, decimal is returned
			if (type === 'dec') return dec;
			//If operand, operand is returned
			if (type === 'opp') return opp;
			//If prevType is clear button, clr is returned
			if (prevType === 'clr') return clr;
		},

		evalType: function(type, prevType, btnValue, toBeCal){
			//Decimal Eval - If decimal was last type pressed and prevType was decimal and the current display 
			//has a decimal, return true and do not let user input another decimal on the screen.
			if(type === 'dec' && (prevType === 'dec' ||  display.textContent.includes('.'))){
				return true;
			}
			//Opperand Eval - If operand was last type pressed and prevType was opperand do not let user press
			//same opperand. However, if user pressed different opperand, skip statement (** incase user puts in
			//incorrrect opperand)
			if((type === 'opp' && prevType === 'opp') && display.textContent.includes(btnValue)){
				return true;
			}
			return false;
		},
		evalEqual: function(prevType, emptyStorage){	
			//Check if prevType is "" and empty storage is true.
			//If true, return false because user has put no input on calculator.
			if(prevType === "" && emptyStorage === true){
				return true;
			}
		}
	}

})(storageCtrl);

//*******************//
//  App Control  //
//*******************//
const App = (function(typeHandler, storageCtrl, displayCtrl){

	//Function to load event listener
	function loadEventListener(){
		buttons.forEach(function(button){
			button.addEventListener('click', delegateClick)
		}),
		calculateButton.addEventListener('click', calculateEval),
		clearButton.addEventListener('click', clearEval)
		
	}

	function delegateClick(e){
		//Setting type from data-type
		let type = e.target.dataset.type;
		let btnValue = e.target.textContent;
		//Get previous type of input entered
		let prevType = storageCtrl.getPrevType();
		//Get current display value
		let currDisplay = storageCtrl.getCurrentDisplay();
		//Sent data to typeCtrl function to be evaluated, returns boolean
		let toBeCal = storageCtrl.getCalcValues();

		let illegalType = typeCtrl.evalType(type, prevType, btnValue,toBeCal)

		if(illegalType){
			return 'no';
		}
		
		//Get empty storage boolean
		let emptyStorage = storageCtrl.emptyState();
		//Get dataType of input
		let dataType = typeCtrl.typeClicked(emptyStorage, type, prevType, btnValue);
		//After first input, change storage value to false  
		storageCtrl.updateStorageValue(false);
		//Update previousType to current type for next input value type delegation
		console.log(type)
		storageCtrl.updatePrevType(type);
		//Send inputValue to storage string 
		storageCtrl.addCalcValues(btnValue);
		//Set current display
		storageCtrl.setCurrDisplay(btnValue);
		//Send input type to displayCtrl to update display
		displayCtrl.displayType(dataType, btnValue, prevType);
		e.preventDefault()
	}

	function calculateEval(e){

		let prevType = storageCtrl.getPrevType();
		let emptyStorage = storageCtrl.emptyState();

		// Checking boolean of datatypes when calc button pressed 	
		let illegalEqual = typeCtrl.evalEqual(prevType, emptyStorage);
		console.log(prevType, emptyStorage, illegalEqual)
		if(illegalEqual){
			//User must input value in order for calc to be passed
			displayCtrl.updateDisplay('No Values')
			storageCtrl.setCurrDisplay('No Values')
			return false;
		}
		
		e.preventDefault()
	}
	
	function clearEval(e){
		let btnValue = clearButton.textContent;
		let type = e.target.dataset.clr;

		if(btnValue === "AC"){
			//Function to clear all attributes
			storageCtrl.clearAll()
		} else {
			storageCtrl.updatePrevType(type);
			displayCtrl.changeClearValue('AC')
			storageCtrl.setCurrDisplay(0)
		}

		displayCtrl.updateDisplay(0)
	}

	


	return {

		init: function(){
			loadEventListener();
		}

	}
	
	


})(typeCtrl, storageCtrl, displayCtrl);

App.init();







