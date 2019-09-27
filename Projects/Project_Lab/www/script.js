/*  Project 01_11_02

    Author: Trent Peterson
    Date: 9/19/19  

    Filename: script.js
*/


// I made this code twice once with the broken API and then Ryan updated it and I did it again with that
"use strict";

/* global variables */

// this var is set up for the data request
var httpRequest = false;
// this is the ticker symbol for which company you get the data from
var entry = "MSFT";
// this tests for make the new request
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }

    return httpRequest;
}
// This takes the evt parameter and make sure that it is not default
function stopSubmission(evt) {

    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
    //this calls in a function
    getQuote();
}

function getQuote() {
    // This is to get a new date and the date three days ago bye subtracting value
    let current = new Date();
    let threeDaysAgo = new Date();
    threeDaysAgo.setDate(current.getDate() - 3);
    //this makes it so if there is a new ticker typed in then it will replace theat with the old ticker
    if (document.getElementsByTagName("input")[0].value) {
        entry = document.getElementsByTagName("input")[0].value;
    }
    //this make sure there is a httprequest and if there is not it gets one
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    // this gets the data for the dates
    let dateOne = `2019-${getMonth(threeDaysAgo.getMonth())}-${threeDaysAgo.getDate()}`;
    let dateTwo = `2019-${getMonth(current.getMonth())}-${current.getDate()}`
    //this aborts old requests, opens, new ones, and sends the info
    httpRequest.abort();
    httpRequest.open("get", `StockCheck.php?t=${entry}&s=${dateOne}&e=${dateTwo}`, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

function displayData() {
    //this checks to make sure that the requests are correct
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var stockResults = httpRequest.responseText;
        var stockItems;
        try {
            stockItems = JSON.parse(stockResults);
        } catch (error) {
            // this sets all of the stuff in case their is any errors
            document.getElementById("ticker").innerHTML = "Error: Invalid Ticker.";
            document.getElementById("openingPrice").innerHTML = "-";
            document.getElementById("lastTrade").innerHTML = "-";
            document.getElementById("lastTradeDT").innerHTML = "-";
            document.getElementById("change").innerHTML = "-";
            document.getElementById("range").innerHTML = "-";
            document.getElementById("volume").innerHTML = "-";
            return;
        }
        //all of these set each of the catagories according to the ticker code 
        document.getElementById("ticker").innerHTML = stockItems.dataset.dataset_code;
        document.getElementById("openingPrice").innerHTML = stockItems.dataset.data[0][1];
        document.getElementById("lastTrade").innerHTML = stockItems.dataset.data[1][4];
        document.getElementById("lastTradeDT").innerHTML = stockItems.dataset.data[1][0].replace("2017", new Date().getFullYear());
        document.getElementById("change").innerHTML = ((parseFloat(stockItems.dataset.data[1][4]) - parseFloat(stockItems.dataset.data[0][1]))).toFixed(2);
        document.getElementById("range").innerHTML = "Low " + stockItems.dataset.data[0][3] + "<br>High " + stockItems.dataset.data[0][2];
        document.getElementById("volume").innerHTML = stockItems.dataset.data[0][5];
    }
}
// this sets the styles of the format
function formatTable() {
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.background = "#9FE098";
    }
}
// this gets the month that is used to get the dates earlier
function getMonth(month) {
    var curMonth = month > 0 ? month + 1 : 12;
    return curMonth < 10 ? "0" + curMonth : curMonth;
}
//this is what calls in all of the functions through on load and submit through the form button
var form = document.getElementsByTagName("form")[0];
if (form.addEventListener) {
    form.addEventListener("submit", stopSubmission, false);
    window.addEventListener("load", formatTable, false);
    window.addEventListener("load", getQuote, false);
} else if (form.attachEvent) {
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload", getQuote);
}