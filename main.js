// main.js
const inputElement = document.getElementById("fileInput");

// adding an event listeneter to our input field
// handleFiles is called when our input state is changed

inputElement.addEventListener("change", handleFiles, false);

// global variable used to store our tweets
// this variable is also used on generateState.js
// to generate statistics
var tweets;

function handleFiles() {
    const label = document.getElementById("fileLabel");
    label.className += " loading";
    const fileList = this.files;
    let file = fileList[0];
    // instantiating FileReader
    let reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = function (event) {
        // check for errors
        if(event.target.error) {
            console.error(event.target.error);
        } else {
            // everything loaded just fine
            let result = event.target.result;
            // this a huge gambiarra and I'm not proud to say that I've used it
            // I'm assuming our little friend had not changed tweet.js file
            // provided by Twitter Account Data.
            result = result.split("window.YTD.tweet.part0 = ")[1];
            tweets = JSON.parse(result);
            label.className = "ui icon button fluid positive";
            document.getElementById("fileIcon").className = "file icon";
            document.getElementById("fileLabel").innerHTML = label.innerHTML.replace("Open File", "File Opened");
        }
    }
}