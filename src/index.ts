import {storageAvailable, escapeHtml} from "./utils";
import $, { Cash } from "cash-dom";
import { ChallengeRenderer } from "./ChallengeRenderer";
import { ChallengeEntry } from "./ChallengeEntry";
import { NavigationController } from "./NavigationController";
import { StorageHelper } from "./storage-helper";
import { Navigation } from "./Navigation";
// import css from "./../style.css";

$(function () {
    if(!storageAvailable("localStorage")) {
        $("#main-content").html("<span style='color:white'>WebStorage not detected! Please enable it or install a modern browser.</span>");
        return;
    }
    initStuff();
  });

/**
 * Idk start running things
 */
function initStuff() {
    setupListeners();

    if(StorageHelper.isFirstLoad()) {
        console.log("First load, run setup");
        // Time to run first time setup
        // setupFirstTime();
        // Init keywords
    }
    else {
        console.log("Not first load, retrieve saved info");
        StorageHelper.loadFromStorage();
    }
    StorageHelper.loadFromStorage();
    NavigationController.init();
}

/**
 * Do first time shit:
 * 
 */
function setupFirstTime() {
    StorageHelper.setValue("started", "true");
}

/**
 * Initialize our event listeners
 */
function setupListeners() {
    // Setup our nav button listener
    $(".tab-entry").on("click", (e) => {
       NavigationController.handleTabClick(e.target.id);
    });
    window.addEventListener('hashchange', () => {
        // Move to the new hash when it's changed
        NavigationController.navToHash();
    });
}
