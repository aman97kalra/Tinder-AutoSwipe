/* Disclaimer:  This extension works as of January 2020 but since Tinder keeps making changes in its DOM structure to prevent execution of such scripts, 
                there's no guarantee that it will keep working in future also. Feel free to use till it works and modify the structure accordingly if Tinder makes chanegs in its DOM structure.
                Also special thanks to @Ogil7190 for helping me in making this extension. Happy Coding! 
*/

var likeCount = 0;
var dislikeCount = 0;
var timerCount = 0;
var openCardTimer = 1000;
var openUserCardTimer;


console.log("Script Starting...");

function validProfile(bioText) {
    console.log("Checking for valid profiles", bioText);
    if( bioText ){
        var blacklist = [
            "shemale",
            "bisexual",
            "trans",
            "gay",
            "lesbian",
            "feminist"
        ];
        for (let i = 0; i < blacklist.length; i++){
            word = blacklist[i];
            if (bioText.match( `/${word}/gi`)){
                console.log("Blacklisted word found  " + word);
                return false;
            }
        }
        return true;
    }
    // swipe left in case of empty bio's
    return true;
}

function swipe( button ){
    console.log("Swiping Function ");
    button.click();
    setTimeout( openUserCard, 1000);
}


function openBio(){
    timerCount += 1;
    // find dislike and like button after bio is opened as button index is different before and after opening the bio
    var dislike_button = document.getElementsByClassName("recsGamepad__button")[0];
    var like_button = document.getElementsByClassName("recsGamepad__button")[2]; 
    var bio = document.getElementsByClassName("profileCard__bio")[0];
    console.log("Bio element is ", bio);

    if( timerCount >= 10 ){
        bio = {};
    }
    // since bio will be either there or will be assigned an empty object it will always enter into the below if condition
    if( bio ){
        clearInterval( openUserCardTimer );
        var bioText = bio.textContent;
        if (validProfile(bioText)== true) {
            setTimeout( () => {
                likeCount++;
                console.log('Swiped Right! ' + likeCount);
                swipe( like_button );
            }, 5000);
        } else {
           setTimeout(() => {    
                dislikeCount++;
                console.log('Swiped Left! ' + dislikeCount);
                swipe(dislike_button);
            }, 5000);
        }
    }
}

function openUserCard() {
    var userClassName = "recCard__info";
    var basicUserDetails = document.getElementsByClassName(userClassName)[1]; 
    // gives undefined error if we don't check for empty user details
    if (basicUserDetails) {
        document.getElementsByClassName(userClassName)[1].click();
        // we can only open bio after we click on user profile
    }
    clearInterval(timer);
    timerCount = 0;
    // It takes around 500ms to load the bio after weclick on User.
    openUserCardTimer = setInterval( openBio, openCardTimer);
}

timer = setInterval(function () {
    // after the content has been loaded  then only your can click on basicUserDetails
    timerCount += 1;
    var container = document.querySelector('.react-swipeable-view-container');   
    if( timerCount === 10 ){        
        clearInterval( timer );
    }

    if (container) {
        openUserCard();
    }
}, openCardTimer);