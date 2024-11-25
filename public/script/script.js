/*
SCRIPT

Author: Washington Valencia
Instructor: Washington Valencia

ENTER STUDENT INFORMATION HERE
==========================================
CCTB project DevOps course
STUDENT NAME: 
STUDENT ID:
SQAC114
==========================================
*/

// Define constants
const DAILYRATE = 50;
// Group 1
const MINSIZEGRP1 = 5;
const MAXSIZEGRP1 = 10;
const DISCGRP1 = 0.10;
// Group 2
const MAXSIZEGRP2 = 24;
const DISCGRP2 = 0.20;
// Group 3
const DISCGRP3 = 0.25;

// Define variables
let wCurrentPos = document.getElementById("bee").style.left;
let hCurrentPos = document.getElementById("bee").style.top;

// Define initial position
let wPos = 0;
let hPos = 0;

// Screen size
let wSize = window.innerWidth;
let hSize = window.innerHeight;

// Global variable
let intID;

// Define variables for input
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let groupSize = document.getElementById("GroupSize");
let discRate = document.getElementById("discRate");
let membersLst = document.getElementById("members");

// Define variables for buttons
let addMemberBtn = document.getElementById("addMemberBtn");
let deleteMemberBtn = document.getElementById("deleteMemberBtn");
let sortMemberListBtn = document.getElementById("sortMemberListBtn");

// Reference to Bee
let bee = document.getElementById("bee");

// Reference to advice
let advice = document.getElementById("advice");

let ratePerson;

/**
 * Function to check that a user has entered a group member’s first and last name.
 */
function CheckForGroupMemberInput() {
    if (firstname.value !== "") {
        if (lastname.value !== "") {
            CheckForGroupSizeInput();
        } else {
            throw "Please enter the last name of the group member.";
        }
    } else {
        throw "Please enter the first name of the group member.";
    }
}

/**
 * Function to check that a user has entered a valid group size and it is numeric.
 */
function CheckForGroupSizeInput() {
    if (groupSize.value !== "") {
        if (isNaN(groupSize.value)) {
            throw groupSize.value + " is not a number.";
        } else if (groupSize.value > 0) {
            CalcGroupDiscount(parseInt(groupSize.value, 10));
        } else {
            throw "Group size must be greater than 0.";
        }
    } else {
        throw "Please enter the size of your group.";
    }
}

/**
 * Function to calculate the applicable discount per group member based on group size.
 */
function CalcGroupDiscount(groupSize) {
    if (groupSize < MINSIZEGRP1) {
        ratePerson = DAILYRATE;
    } else if (groupSize >= MINSIZEGRP1 && groupSize <= MAXSIZEGRP1) {
        ratePerson = DAILYRATE - (DAILYRATE * DISCGRP1);
    } else if (groupSize > MAXSIZEGRP1 && groupSize <= MAXSIZEGRP2) {
        ratePerson = DAILYRATE - (DAILYRATE * DISCGRP2);
    } else if (groupSize > MAXSIZEGRP2) {
        ratePerson = DAILYRATE - (DAILYRATE * DISCGRP3);
    }

    discRate.value = ratePerson.toFixed(2);
    AddGroupMember(lastname.value, firstname.value);
}

/**
 * Function to add a group member to the selection list.
 */
function AddGroupMember(lastName, firstName) {
    let option = document.createElement("option");
    option.text = lastName + ", " + firstName;
    membersLst.add(option);

    lastname.value = "";
    firstname.value = "";

    firstname.focus();
}

/**
 * Function to remove the selected group member from the selection list.
 */
function RemoveGroupMember() {
    if (membersLst.selectedIndex !== -1) {
        membersLst.remove(membersLst.selectedIndex);
    } else {
        throw "Please select a group member to remove.";
    }
}

/**
 * Function to sort the list of group members in ascending order by last name.
 */
function SortGroupMembers() {
    if (membersLst.options.length > 0) {
        let tmpArray = [];

        for (let i = 0; i < membersLst.options.length; i++) {
            tmpArray.push(membersLst.options[i].text);
        }

        tmpArray.sort();

        membersLst.options.length = 0; // Clear the list

        for (let i = 0; i < tmpArray.length; i++) {
            let op = new Option(tmpArray[i]);
            membersLst.add(op);
        }
    } else {
        throw "There are no group members to sort!";
    }
}

/**
 * Function to animate the bee flying across the screen.
 */
function FlyingBee() {
    wPos += 50;
    hPos += 10;

    if (wPos <= wSize * 0.65 && hPos <= hSize * 0.20) {
        bee.style.left = wPos + "px";
        bee.style.top = hPos + "px";
    } else {
        clearInterval(intID);
        advice.style.display = "block";
    }
}

// Event listeners
addMemberBtn.addEventListener("click", function () {
    try {
        CheckForGroupMemberInput();
    } catch (e) {
        alert(e);
    }
});

deleteMemberBtn.addEventListener("click", function () {
    try {
        RemoveGroupMember();
    } catch (e) {
        alert(e);
    }
});

sortMemberListBtn.addEventListener("click", function () {
    try {
        SortGroupMembers();
    } catch (e) {
        alert(e);
    }
});

bee.addEventListener("load", function () {
    bee.style.visibility = "visible";
    intID = setInterval(FlyingBee, 300);
});

