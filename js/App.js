//*******************//
//  App Control  //
//*******************//
const App = (function(typeHandler, storageCtrl, displayCtrl, calculateCtrl){

	const buttons = document.querySelectorAll('[data-type]'),
	displayContainer = document.querySelector('[data-view=display]'),
	calculateButton = document.querySelector('[data-calc=cal]'),
	clearButton = document.querySelector('[data-clr]')

	//Function to load event listener
	function loadEventListener(){
		buttons.forEach(function(button){
			button.addEventListener('click', delegateClick)
		}),
		calculateButton.addEventListener('click', calculateEval),
		clearButton.addEventListener('click', clearEval)
		
	}

	function delegateClick(e){
		let type = e.target.dataset.type,
		btnValue = e.target.textContent,
		prevType = storageCtrl.getPrevType(),
		toBeCal = storageCtrl.getTempValues();

		//Returns boolean if input-type is illegal
		let illegalType = typeCtrl.evalType(type, prevType, btnValue,toBeCal)

		if(illegalType){
			return false;
		}
		

		let emptyStorage = storageCtrl.getEmptyStorage();
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
				//If input is opp then another opp value, remove initial opp from tempValues.
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
		let emptyStorage = storageCtrl.getEmptyStorage();
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







