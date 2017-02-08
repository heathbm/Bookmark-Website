// Listen for for submit 

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    if(!siteUrl.startsWith("http://")) {
        siteUrl = "http://" + siteUrl;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)) {
        alert('Please enter a valid URL');
        return false;
    }

    // Create an object
    var bookmark = {
        name: siteName,
        url: siteUrl,
    }
   
    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarkList = [];
        // Add to array
        bookmarkList.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    } else {
        // Get bookmarks from localStorage
        var bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array 
        bookmarkList.push(bookmark);
        // Re-set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));
    }

    // Refresh bookmark listview
    fetchBookmarks();

    // Clear form
    document.getElementById('myForm').reset();

    // Prevent form submitting 
    e.preventDefault();
}

function deleteBookmark(url) {
    
    // Get bookmarks from localStorage
    var bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));

    // Find the bookmark to be deleted
    for(var i = 0; i < bookmarkList.length; i++) {
        if(bookmarkList[i].url == url) {
            // Remove from array
            bookmarkList.splice(i, 1);
            break;
        }
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkList));

    // Refresh bookmark listview
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks() {

    // Get bookmarks from localStorage
    var bookmarkList = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build output
    bookmarksResults.innerHTML = '';

    for(var i = 0; i < bookmarkList.length; i++) {
        var name = bookmarkList[i].name;
        var url = bookmarkList[i].url;

        bookmarksResults.innerHTML += "<div class='well'>" + 
                                      '<h3>' + name + 
                                      "<a class='btn btn-default' target='_blank' href='" + url + "'>Visit</a>" + 
                                      "<a onclick='deleteBookmark(\""+url+"\")' class='btn btn-danger' href='#'>Delete</a>" +
                                      '</h3>' + 
                                      "</div>";
    }
}