//*******************//
//  Type Control     //
//*******************//
const typeCtrl = (function(){
	
	const display = document.querySelector('[data-view=display--view]');

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
			//Decimal Eval - If decimal was last type pressed and prevType was decimal and the current display has a decimal, return true and do not let user input another decimal on the screen.
			if(type === 'dec' && (prevType === 'dec' ||  display.textContent.includes('.'))){
				return true;
			}
			//Opperand Eval - If operand was last type pressed and prevType was opperand do not let user press same opperand. However, if user pressed different opperand, allow user to move forward.
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

			return false;
		},
		changeOpp: function(btnValue, tempValues){
			console.log('here')
			console.log(btnValue, tempValues)
		}
	}

})();