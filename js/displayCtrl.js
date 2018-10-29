//*******************//
//  Display Control  //
//*******************//
const displayCtrl = (function(){

		const display = document.querySelector('[data-view=display--view]'),
		clearButton = document.querySelector('[data-clr]')
		
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
				},
				solvedValue: function(value){
					displayCtrl.updateDisplay(value)
				}


		}
})();