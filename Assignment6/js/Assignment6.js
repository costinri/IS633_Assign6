function SelectArea(selectList){
    if (selectList.value == "addCustomer") {
        document.getElementById("sectionOne").style.visibility = "visible";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("secOneCustomerID").value = "";
        document.getElementById("secOneCustomerName").value = "";
        document.getElementById("secOneCity").value = "";
        document.getElementById("secOneCustomerID").focus();
        document.getElementById("sectionOneResult").innerHTML = "";
    }//end if
    else if (selectList.value == "modifyAddress"){
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "visible";
        document.getElementById("sectionThree").style.visibility = "hidden";
        document.getElementById("sectionTwoResult").innerHTML = "";
        document.getElementById("secTwoOrderNumber").value = "";
        document.getElementById("secTwoOrderNumber").focus();
        document.getElementById("secTwoShipToName").value = "";
        document.getElementById("secTwoShipToAddress").value = "";
        document.getElementById("secTwoShipToCity").value = "";
        document.getElementById("secTwoShipToPostalCode").value = "";
    }//end if else
    else if (selectList.value == "deleteCustomer"){
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "visible";
        document.getElementById("sectionThreeResult").innerHTML = "";
        document.getElementById("secThreeCustomerID").value = "";
        document.getElementById("secThreeCustomerID").focus();
    }//end if else
    else {
        document.getElementById("sectionOne").style.visibility = "hidden";
        document.getElementById("sectionTwo").style.visibility = "hidden";
        document.getElementById("sectionThree").style.visibility = "hidden";
    }//end else
    
}//end SelectArea

function isUpperCase(checkString) {
    //return (checkString == checkString.toUpperCase());
    var regEx = new RegExp("[A-Z][A-Z][A-Z][A-Z][A-Z]")
    return regEx.test(checkString);
}

/////////////////////////////    AddCustomer   //////////////////////////////////////////////
function AddCustomer() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer";
    
    var customerID = document.getElementById("secOneCustomerID").value;
    var customerName = document.getElementById("secOneCustomerName").value;
    var customerCity = document.getElementById("secOneCity").value;
    
    if (!isUpperCase(customerID)) {
        alert("Customer ID must be all UpperCase letters!")
        document.getElementById("secOneCustomerID").focus();
        return;
    }
    if (customerID.length != 5) {
        alert("Customer ID must be 5 letters long!")
        document.getElementById("secOneCustomerID").focus();
        return;
    }
    if (customerName == "") {
        alert("Please enter a customer name!")
        document.getElementById("secOneCustomerName").focus();
        return;
    }
    if ((customerCity == "")) {
        alert("Please enter a customer city!")
        document.getElementById("secOneCity").focus();
        return;
    }
    
    var customerParameters = '{"CustomerID":"' + customerID + '","CompanyName":"' + customerName +
                             '","City":"' + customerCity +'"}';
    
    objReq.onreadystatechange = function() {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var test1 = objReq.responseText;
            var output = JSON.parse(objReq.responseText);
            AddCustomerOutput(output);
        }//end if
        if (objReq.readyState == 4 && objReq.status != 200) {
            alert("There was an error sending the request!  readyState = " +
                   objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
        }
    }//end onreadystatechange function
    
    objReq.open("POST", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objReq.send(customerParameters);
}//end AddCustomer

///////////////////////   AddCustomerOutput  //////////////////////////////////////////
function AddCustomerOutput(outputResult) {
    //code
    var displayText = "";
    
    if (outputResult.WasSuccessful == 1) {
        displayText = "The customer was added successfully!";
        document.getElementById("secOneCustomerID").value = "";
        document.getElementById("secOneCustomerName").value = "";
        document.getElementById("secOneCity").value = "";
        document.getElementById("secOneCustomerID").focus();
    }
    else
    {
        displayText = "There was an error adding the customer.<br>Error Message: " + outputResult.Exception;
        document.getElementById("secOneCustomerID").focus();
    }
    
    document.getElementById("sectionOneResult").innerHTML = displayText;
}//end function AddCustomerOutput

/////////////////////////////    EditAddress   //////////////////////////////////////////////
function EditAddress() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress";
    
    var orderNumber = document.getElementById("secTwoOrderNumber").value;
    var shipToName = document.getElementById("secTwoShipToName").value;
    var shipToAddress = document.getElementById("secTwoShipToAddress").value;
    var shipToCity = document.getElementById("secTwoShipToCity").value;
    var shipToPostalCode = document.getElementById("secTwoShipToPostalCode").value;
    
    if (orderNumber == "") {
        alert("Please enter a order number!")
        document.getElementById("secTwoOrderNumber").focus();
        return;
    }
    if ((shipToName == "")) {
        alert("Please enter a ship to name!")
        document.getElementById("secTwoShipToName").focus();
        return;
    }
    if ((shipToAddress == "")) {
        alert("Please enter a ship to address!")
        document.getElementById("secTwoShipToAddress").focus();
        return;
    }
    if ((shipToCity == "")) {
        alert("Please enter a ship to city!")
        document.getElementById("secTwoShipToCity").focus();
        return;
    }
    if ((shipToPostalCode == "")) {
        alert("Please enter a ship to postal code!")
        document.getElementById("secTwoShipToPostalCode").focus();
        return;
    }
    
    var orderParameters = '{"OrderID":"' + orderNumber + '","ShipAddress":"' + shipToAddress +
                             '","ShipCity":"' + shipToCity + '","ShipName":"' + shipToName +
                             '","ShipPostcode":"' + shipToPostalCode +'"}';
    
    objReq.onreadystatechange = function() {
        if (objReq.readyState == 4 && objReq.status == 200) {
            var test1 = objReq.responseText;
            var output = JSON.parse(objReq.responseText);
            EditAddressOutput(output);
        }//end if
        if (objReq.readyState == 4 && objReq.status != 200) {
            alert("There was an error sending the request!  readyState = " +
                   objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
        }
    }//end onreadystatechange function
    
    objReq.open("POST", url, true);
    objReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objReq.send(orderParameters);
}//end EditAddress

///////////////////////   EditAddressOutput  //////////////////////////////////////////
function EditAddressOutput(outputResult) {
    //code
    var displayText = "";
    
    switch(outputResult) {
        case 1:
            displayText = "The operation completed successfully!";
            document.getElementById("secTwoOrderNumber").value = "";
            document.getElementById("secTwoOrderNumber").focus();
            document.getElementById("secTwoShipToName").value = "";
            document.getElementById("secTwoShipToAddress").value = "";
            document.getElementById("secTwoShipToCity").value = "";
            document.getElementById("secTwoShipToPostalCode").value = "";
            break;
        case 0:
            displayText = "The operation failed with an unspecified error!";
            document.getElementById("secTwoOrderNumber").focus();
            break;
        case -2:
            displayText = "The operation failed because the data string supplied could not be deserialized into the service object!";
            document.getElementById("secTwoOrderNumber").focus();
            break;
        case -3:
            displayText = "The operation failed because a record with the supplied Order ID could not be found!";
            document.getElementById("secTwoOrderNumber").focus();
            break;
        default:
            displayText = "No Output result was returned!";
            document.getElementById("secTwoOrderNumber").focus();
            break;
    }//end switch

    document.getElementById("sectionTwoResult").innerHTML = displayText;
}//end function EditAddressOutput

////////////////////////////   DeleteCustomer    ///////////////////////////////
function DeleteCustomer() {
    var objReq = new XMLHttpRequest();
    
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/";
    
    var customerID3 = document.getElementById("secThreeCustomerID").value;
    url += customerID3
    
    //if (!isUpperCase(customerID)) {
    //    alert("Customer ID must be all UpperCase letters!")
    //    document.getElementById("secOneCustomerID").focus();
    //    return;
    //}
    //if (customerName == "") {
    //    alert("Please enter a customer name!")
    //    document.getElementById("secOneCustomerName").focus();
    //    return;
    //}

    var r = confirm("Do you want to delete this customer?\nCustomer ID:  " + customerID3);
    
    if (r) {
      
        objReq.onreadystatechange = function() {
            if (objReq.readyState == 4 && objReq.status == 200) {
                var test1 = objReq.responseText;
                var output = JSON.parse(objReq.responseText);
                DeleteCustomerOutput(output);
            }//end if
            if (objReq.readyState == 4 && objReq.status != 200) {
                alert("There was an error sending the request!  readyState = " +
                    objReq.readyState + "  status = " + objReq.status + " Text: " + objReq.statusText);
            }
        }//end onreadystatechange function
    
    
        objReq.open("GET", url, true);
        objReq.send();
    } //end if
}//end DeleteCustomer

///////////////////////    DeleteCustomerOutput /////////////////////////////////////////////////
function DeleteCustomerOutput(outputResult) {
    //code
    var displayText = "";
    
    if (outputResult.DeleteCustomerResult.WasSuccessful == 1) {
        displayText = "The customer was deleted successfully!";
        document.getElementById("secThreeCustomerID").value = "";
    }
    else
    {
        displayText = "There was an error deleting the customer.<br>Error Message: " + outputResult.DeleteCustomerResult.Exception;
        document.getElementById("secThreeCustomerID").focus();
    }
    
    document.getElementById("sectionThreeResult").innerHTML = displayText;
}//end function DeleteCustomerOutput

