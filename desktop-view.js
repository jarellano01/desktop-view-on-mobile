//Basic Cookie Funtions
function createCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    console.log(document.cookie);
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}
// End Cookie Functions

// Create a variable to store the meta viewport tag
var viewportElement = document.querySelector("meta[name=viewport]");

// Store the cookie which tells us which mode to render in
var viewport = readCookie('viewport') || 'mobile';

// Function to set Viewport based on viewport variable which is retrieved from a cookie
function setViewPort() {
    if (viewport == 'desktop') {
        viewportElement.setAttribute('content', 'width=1200');
    }
    else {
        viewportElement.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
}

// Initially set the ViewPort on page load
setViewPort();

var desktopViewBtn = document.getElementById('desktop-view');
if(viewport =='desktop'){
    desktopViewBtn.innerHTML = 'Mobile View';
}
else{
    desktopViewBtn.innerHTML = 'Desktop View';
}

desktopViewBtn.onclick = function (e) {
    e.preventDefault();

    // If currently in desktop mode, delete the cookie to reset it to default
    if(viewport == 'desktop'){
        eraseCookie('viewport');
    }
    // Else set the cookie to desktop mode
    else{
        createCookie('viewport', 'desktop', 1);
    }

    //reload page once viewport is saved to cookie
    location.reload();
};
