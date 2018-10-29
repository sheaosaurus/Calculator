const buttons = document.querySelectorAll('[data-type]'),
displayContainer = document.querySelector('[data-view=display]'),
display = document.querySelector('[data-view=display--view]'),
calculateButton = document.querySelector('[data-calc=cal]'),
clearButton = document.querySelector('[data-clr]')





//*******************//
//  App Control  //
//*******************//
const App = (function(typeHandler, storageCtrl, displayCtrl, calculateCtrl){

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
		//Sent data to typeCtrl function to be evaluated, returns boolean
		let toBeCal = storageCtrl.getTempValues();

		let illegalType = typeCtrl.evalType(type, prevType, btnValue,toBeCal)

		if(illegalType){
			return false;
		}
		//Get empty storage boolean
		let emptyStorage = storageCtrl.emptyState();
		//Get dataType of input
		let dataType = typeCtrl.typeClicked(emptyStorage, type, prevType, btnValue);
		//Send input type to displayCtrl to update display
		displayCtrl.displayType(dataType, btnValue, prevType);
		//Variable for current display
		let currDisplay = displayContainer.innerText;
		//After first input, change storage value to false  
		storageCtrl.updateStorageValue(false);
		//Update previousType to current type for next input value type delegation
		storageCtrl.updatePrevType(type);
		if(type === "opp"){
			if(type === prevType){
				storageCtrl.reduceTempValues();
			}
			storageCtrl.setValuesToCalculate()
		}
		//Send inputValue to storage string 
		storageCtrl.addTempValues(btnValue);
		//Set current display
		storageCtrl.setCurrDisplay(currDisplay);



		e.preventDefault()
	}

	function calculateEval(e){

		let prevType = storageCtrl.getPrevType();
		let emptyStorage = storageCtrl.emptyState();
		// Checking boolean of datatypes when calc button pressed 	
		let illegalEqual = typeCtrl.evalEqual(prevType, emptyStorage);
		if(illegalEqual){
			displayCtrl.updateDisplay('No Values')
			storageCtrl.setCurrDisplay('No Values')
			return false;
		}

		let solved = storageCtrl.getSolved();
		let solvedEqu = 0;

		if(solved !== 0){
			let alreadySolved = storageCtrl.getAdditonalValuesToCalculate();
			let solvedFormat = calculateCtrl.reformat(alreadySolved);
			solvedEqu = calculateCtrl.solveStr(solvedFormat);
		} else {
			let calculateStr = storageCtrl.getValuesToCalculate();
			let reformatedStr = calculateCtrl.reformat(calculateStr);
			solvedEqu = calculateCtrl.solveStr(reformatedStr);
		}



		storageCtrl.setSolved(solvedEqu);
		displayCtrl.updateDisplay(solvedEqu)


		e.preventDefault()
	}
	
	function clearEval(e){
		let btnValue = clearButton.textContent;
		let type = e.target.dataset.clr;
		let tempVales = storageCtrl.getTempValues();
		console.log(tempVales)

		if(btnValue === "AC"){
			//Function to clear all attributes
			storageCtrl.clearAll()
		} else {
			storageCtrl.reduceTempValues();
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
	
	


})(typeCtrl, storageCtrl, displayCtrl, calculateCtrl);

App.init();







