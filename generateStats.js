/* sorteMapByValue receives a map as input
   and returns a sorted array using its values
*/
function sortMapByValue(map) {
    let sorted = [];
    for (let key of map.keys()) {
        sorted.push([key, map.get(key)]);
    }

    // sorting it
    sorted.sort(function (a, b) {
        return (b[1] - a[1]);
    });

    return sorted;
}

/* sorteMapByKey receives a map as input
   and returns a sorted array using its keys
*/
function sortMapByKey(map) {
    let sorted = [];
    for (let key of map.keys()) {
        sorted.push([key, map.get(key)]);
    }

    // sorting it
    sorted.sort(function (a, b) {
        return (b[0] > a[0]);
    });

    return sorted;
}

/*  includeOnHTML uses the DOM to display our results to the user.
*/
function includeOnHTML(column1, column2, data, auxiliaryData=false) {
    document.getElementById("response-table").innerHTML = "<thead><tr><th>" + column1 + "</th><th>" + column2 + "</th></tr></thead><tbody>";
    for ([key, value] of data) {
        document.getElementById("response-table").innerHTML += "<tr><th> " + (auxiliaryData[key] || key) + "</th><th>" + value + "</th></tr>";
    }
    document.getElementById("response-table").innerHTML += "</tbody>";
}

function getDateOfTweets() {
    let dates = new Map();

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    var countsOnMonth = 0;
    for (let tweet of tweets) {
        let tweetSplit = tweet.created_at.split(' ');
        // let day = tweetSplit[2];
        // getting month, but adding 0 if the month is before october
        let month = months.indexOf(tweetSplit[1]) < 9 ? '0' + (months.indexOf(tweetSplit[1]) + 1) : (months.indexOf(tweetSplit[1]) + 1);
        let year = tweetSplit[5];
        let dateAsString = month + "/" + year;
        if ((countsOnMonth = dates.get(dateAsString)) == undefined) {
            dates.set(dateAsString, 1);
        } else {
            dates.set(dateAsString, countsOnMonth + 1);
        }
    }

    let sorted = sortMapByValue(dates);

    // printing
    // for ([day, count] of dates) {
    //     console.log(day + "," + count);
    // }
    includeOnHTML("Month", "Tweets", sorted);
}

function getUsersWithMoreReplies() {
    let repliedUsers = new Map();

    var replyCount = 0;
    for (let tweet of tweets) {
        if (tweet.in_reply_to_screen_name != undefined) {
            if ((replyCount = repliedUsers.get(tweet.in_reply_to_screen_name)) == undefined) {
                repliedUsers.set(tweet.in_reply_to_screen_name, 1);
            } else {
                repliedUsers.set(tweet.in_reply_to_screen_name, replyCount + 1);
            }
        }
    }

    // turning our map into an array
    let sorted = sortMapByValue(repliedUsers);

    // printing
    // document.getElementById("response-table").innerHTML += "<tr><th>User</th><th>Count</th></tr>";
    // for ([user, count] of sorted) {
    //     // console.log("[" + user + "]:", count);
    //     document.getElementById("response-table").innerHTML += "<tr><th>" + user + "</th><th>" + count + "</th></tr>";
    // }
    includeOnHTML("User", "Tweets", sorted);

}

function getTweetsLanguage() {
    let languagesMap = new Map();

    // using a varialbe to display the appropriate names
    let languagesName = {
        "en": "English",
        "ar": "Arabic",
        "bn": "Bengali",
        "ca": "Catalan",
        "cs": "Czech",
        "cy": "Welsh",
        "da": "Danish",
        "de": "German",
        "eu": "Basque",
        "el": "Greek",
        "es": "Spanish",
        "et": "Estonian",
        "is": "Icelandic",
        "fa": "Persian",
        "fi": "Finnish",
        "fil": "Filipino",
        "fr": "French",
        "he": "Hebrew",
        "hi": "Hindi",
        "ht": "Haitian Creole",
        "hu": "Hungarian",
        "id": "Indonesian",
        "in": "Indonesian",
        "it": "Italian",
        "ja": "Japanese",
        "lt": "Lithuanian",
        "lv": "Latvian (Lettish)",
        "ko": "Korean",
        "msa": "Malay",
        "nl": "Dutch",
        "no": "Norwegian",
        "pl": "Polish",
        "pt": "Portuguese",
        "ro": "Romanian",
        "ru": "Russian",
        "sl": "Slovenian",
        "sv": "Swedish",
        "th": "Thai",
        "tl": "Tagalog",
        "tr": "Turkish",
        "uk": "Ukrainian",
        "ur": "Urdu",
        "vi": "Vietnamese",
        "zn-cn": "Chinese (Simplified)",
        "zn-tw": "Chinese (Traditional)"
    }


    var key = 0;
    for (let tweet of tweets) {
        if(tweet.lang != "und") {
            // instead of doing languagesMap.has(tweet.lang)
            // and languagesMap.set(tweet.lang, languagesMap.get(tweet.lang) + 1)
            // inside our else statement, we use the code below
            // because, in my naive mindset,
            // this implementation will only need to traverse the map once
            if ((key = languagesMap.get(tweet.lang)) == undefined) {
                languagesMap.set(tweet.lang, 1);
            } else {
                languagesMap.set(tweet.lang, key + 1);
            }
        }
    }

    let sorted = sortMapByValue(languagesMap);

    // now we have to print it
    // for ([lang, count] of sorted) {
    //     console.log("You have", count, "tweets in", languagesName[lang] || lang);
    // }
    includeOnHTML("Language", "Quantity", sorted, auxiliaryData=languagesName);
}
