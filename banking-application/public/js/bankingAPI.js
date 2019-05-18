/*
 * @author : Alexis Chretienne
 * @email : alexis.chretienne@fr.ibm.com
 * 
 * Sample code allowing to understand how to code API in Javascript
 * 
 */

//The API Developer Portal URL
var url_api_devloper_portal = "https://api.us.apiconnect.ibmcloud.com/spbodieusibmcom-prod/developer-contest/mplbank";


// Your API ClientID
var IBM_CLIENT_ID = "7e9f34e5-5821-436e-95be-79a9cdf4b8b8";


// Your API ClientSecret
var IBM_CLIENT_SECRET = "pV2yS0lM3sL5qR4qR7iE8uX5rD2vY1eT3lJ2fD0xU4eC7vS2lK";


/*
 * JQUERY ready
 */
$(document).ready(function() {

	// Customer Information API
	$("#btnCustomerContract").click(customerContract);

	// Banking Account API
	$("#btnBalanceInquiry").click(balanceInquiry);
	$("#btnTransactionsInquiry").click(transactionsInquiry);
	$("#btnAccountDetail").click(accountDetail);

});

/*
 * Banking customer information
 * 
 */

/**
 * Function allowing to get a banking customer's information
 * 
 * @returns customer Information
 */
function customerInformation(customerID) {

	var path = "/customers/";
	var data = customerID;

	doGet(path, data);
}

/**
 * Function allowing to get a banking customer's contracts (cards & banking
 * account)
 * 
 * @returns a list of banking contracts
 */
function customerContract() {

	var path = "/customers/contracts/";
	var pathParameter = $("#inputCustomerContract").val();

	doGet(path, pathParameter);

}

/*
 * Banking Account information
 */

/**
 * Function allowing to get a banking account's balance
 * 
 * @returns a balance
 */
function balanceInquiry() {

	var path = "/accounts/";
	var pathParameter = $("#inputBalanceInquiry").val();
	var queryParamaeter = "?date=2019-10-10";

	var data = pathParameter + queryParamaeter;

	doGet(path, data);

}

/**
 * Function allowing to get last banking account's transactions
 * 
 * @returns a list of banking transactions
 */
function transactionsInquiry() {

	var path = "/accounts/transactions/";
	var pathParameter = $("#inputTransactionsInquiry").val();

	doGet(path, pathParameter);

}

/**
 * Function allowing to get banking account's details
 * 
 * @returns details
 */
function accountDetail() {

	var path = "/accounts/details/";
	var pathParameter = $("#inputAccountDetail").val();

	doGet(path, pathParameter);

}


/*
 * Miscellaneous function
 */

/**
 * Function allowing to make a AJAX call using JQuery
 * 
 * @param path :
 *            customized URL path
 * @param parameter :
 *            path parameter + query parameters
 * @returns
 */
function doGet(path, parameter) {

	$.ajax({
		type : 'GET',
		headers : {
			"x-ibm-client-id" : IBM_CLIENT_ID,
			"x-ibm-client-secret" : IBM_CLIENT_SECRET
		},
		async : true,
		crossDomain : true,
		cache : false,
		url : url_api_devloper_portal + path + parameter,
		contentType : "application/json",
		beforeSend: function() { $('#myPleaseWait').modal('show'); },
		success : function(data) {
			var jsonPretty = JSON.stringify(data, null, 4);
			$("#result").text(jsonPretty);
		},
		error : function(xhr, status, error) {
			$("#result").text(xhr.responseText);
		},
		complete : function() {
			$('#myPleaseWait').modal('hide');
			console.log("complete function GET");
		}
       
	});

}
