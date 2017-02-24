# Desktop and Mobile Button 
This a simple example of how to create a button that allows a desktop view on a mobile device.

## Live Demo

https://jarellano01.github.io/tutorial_desktop-view-on-mobile/
- Desktop View Link will be found in the footer of this demo
- Also note that this code will only work on a mobile device or in mobile mode using chrome inspector. Desktops by default will ignore the viewport property.


## Usage
- Include `desktop-view.js` in your html page
- Add a link on the page with an id = 'desktop-view'
`<a id="desktop-view" href="">Desktop View</a>`


## Code break down
For simplicity I have included the following functions which are commonly used to create, read, and delete cookies.

```
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
```

Now we can use these cookie functions in our code.

1. Include the following meta tag in your html head. A content width of device-width and an initial-scale=1 is standard for any responsive website.
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```
    What we will be doing, is manipulating this tag to create a desktop view on a mobile device. To do this we will need to remove the initial scale and set a fixed width to a desktop size width such as 1200px.

2. Create the following variables

    ```
     // Create a variable to store the meta viewport tag
     var viewportElement = document.querySelector("meta[name=viewport]");

     // Store the cookie which tells us which mode to render in
     var viewport = readCookie('viewport') || 'mobile';
    ```


3. Create the following function to set the viewport.

    ```
    function setViewPort() {
        if (viewport == 'desktop') {
            viewportElement.setAttribute('content', 'width=1200');
        }
        else {
            viewportElement.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
        }
    }

    //Call the function
    setViewPort();
    ```
    This function will check to see if desktop view has been set. Otherwise by default it will st the viewport to the usual responsive mode which will work on desktops or mobile. If desktop mode is set then the width will be set to 1200. Feel free to change this to a size that works best for your layout.

4. Now that our viewports our set based on a stored cookie, let's create an on click function that stores this cookie.

    ```
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
    ```

5. Now just add a link, button, div, or any element with an `id = 'desktop-view'` and it is ready to go.

Be sure to look at the working example.


