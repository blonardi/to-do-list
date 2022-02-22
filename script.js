/*
let myArrayNumber = [1,2,3,4,5];

let myArrayNumberJSON = JSON.stringify(myArrayNumber)

//Para volver a array normal.

JSON.parse(myArrayNumberJSON);
*/

	const form = document.querySelector('#transactionForm');

	form.addEventListener("submit", function(event){
		event.preventDefault();
		console.log(event);
		let transactionFormData = new FormData(form); //Construye un objeto en el cual va a tener los datos del form, que va a tener los valores de los campos que tengo. FormData construye, dandole los datos.
		let transactionObj = convertFormDataToTransactionObj(transactionFormData);//variable, con funcion que retorna los datos del formulario.
		saveTransactionObj(transactionObj);
		insertRowInTransactionTable(transactionObj);
	})

	document.addEventListener('DOMContentLoaded', function(event){
		let transactionObjArray = JSON.parse(localStorage.getItem('transactionData'));
		transactionObjArray.forEach(element => insertRowInTransactionTable(element));
	})

	function convertFormDataToTransactionObj(transactionFormData){
		//Esta funcion va a convertir, el obj formData, a un objeto de transaccion. Separado, pero con los mismos nombres
		//Agarra los campos de formData y los transforma a variables
		let transactionSelector = transactionFormData.get("transactionSelector");
		let transactionDescription = transactionFormData.get("transactionDescription");
		let transactionCategory = transactionFormData.get("transactionCategory");
		let transactionAmount = transactionFormData.get("transactionAmount");

		return {
			"transactionSelector": transactionSelector,
			"transactionDescription": transactionDescription,
			"transactionCategory": transactionCategory,
			"transactionAmount": transactionAmount 
		}
	}

	function insertRowInTransactionTable(transactionObj){

		let transactionTableRef = document.querySelector('#transactionTable');
		let newTransactionRowRef = transactionTableRef.insertRow(-1); // Agarro la variable de la tabla e inserto fila.

		let newTypeCellRef = newTransactionRowRef.insertCell(0); // Inserto celda en la fila de la variable de la tabla.
		newTypeCellRef.textContent = transactionObj["transactionSelector"];//Con estos transactionObj, obtiene los datos desde el objeto

		newTypeCellRef = newTransactionRowRef.insertCell(1);
		newTypeCellRef.textContent = transactionObj["transactionDescription"];

		newTypeCellRef = newTransactionRowRef.insertCell(2);
		newTypeCellRef.textContent = transactionObj["transactionCategory"];

		newTypeCellRef = newTransactionRowRef.insertCell(3);
		newTypeCellRef.textContent = transactionObj["transactionAmount"];

		let newDeleteCell = newTransactionRowRef.insertCell(4);
		let $deleteButton = document.createElement("button");
		$deleteButton.textContent = 'Eliminar';
		newDeleteCell.appendChild($deleteButton);

		$deleteButton.onclick = function(event){
			console.log(event.target.parentNode.parentNode);
		}

		// $deleteButton.addEventListener('click', (event) => {
		// 	console.log(event);
		// })
	}

	//Manera Mia-DamianS
	// function saveTransactionObj(transactionObj){
    //     let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];

    //     myTransactionArray.push(transactionObj);

    //     //Convierto mi array de transacciones JSON
    //     let transactionArrayJSON = JSON.stringify(myTransactionArray);

    //     //Guardo mi array de transacciones en formato Json en localStorage
    //     localStorage.setItem("transactionData", transactionArrayJSON); 
    // }

	// function saveTransactionObj(transactionObj){
    //     // let myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
    //     myTransactionArray.push(transactionObj);

    //     //Convierto mi array de transacciones JSON
    //     let transactionArrayJSON = JSON.stringify(myTransactionArray);

    //     //Guardo mi array de transacciones en formato Json en localStorage
    //     localStorage.setItem("transactionData", transactionArrayJSON); 
    // }


	function saveTransactionObj(transactionObj){

		//let myTransactionArray = JSON.parse(localStorage.getItem("transactionData") || '[]');
		//Esta opcion o la de arriba son validas.
		let myTransactionArray;

		 try{
			myTransactionArray = JSON.parse(localStorage.getItem("transactionData")) || [];
		} catch(err){
			myTransactionArray = [];
		}

		myTransactionArray.push(transactionObj);
		//Convierto mi array de transaccioens a JSON
		let transactionArrayJSON = JSON.stringify(myTransactionArray);
		//Guardo mi array de transacciones en formato Json en localStorage
		localStorage.setItem("transactionData", transactionArrayJSON); 
	}