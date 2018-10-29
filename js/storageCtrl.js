//*******************//
//  Storage Control  //
//*******************//
const storageCtrl = (function(){
	
	//State values that can be changed
	const storage = {
		emptyStorage: true,
		prevType: "",
		currDisplay: 0,
		tempValues: "",
		valuesToCalculate: "",
		solved: 0
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
		setCurrDisplay: function(displayVal){
			storage.currDisplay = displayVal;
		},
		addTempValues: function(btnValue){
			storage.tempValues += btnValue;
		},
		reduceTempValues: function(){
			storage.tempValues = storage.tempValues.slice(0,-1);
		},
		clearButtonCalcValues(clearValues){
			storage.tempValues
		},
		getTempValues: function(){
			return storage.tempValues;
		},
		clearTempValues: function(){
			storage.tempValues = "";
		},
		setValuesToCalculate: function(){
			storage.valuesToCalculate += storage.tempValues;
			storageCtrl.clearTempValues();
		},
		getValuesToCalculate: function(){
			return storage.valuesToCalculate + storage.tempValues;
		},
		getAdditonalValuesToCalculate: function(){
			return storage.solved + storage.tempValues;
		},
		clearCalcValues: function(){
			storage.valuesToCalculate = "";
		},
		clearAll: function(){
			storageCtrl.updateStorageValue(true)
			storageCtrl.updatePrevType(""),
			storageCtrl.setCurrDisplay(0),
			storageCtrl.clearCalcValues(),
			storageCtrl.clearTempValues()
		}, 
		setSolved: function(value){
			storage.solved = value;
		},
		getSolved: function(){
			return storage.solved;
		}
	}

})();