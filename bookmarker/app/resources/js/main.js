document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
	var sitename = document.getElementById('sitename').value;
	var siteurl = document.getElementById('siteurl').value;

	if(!validateForm(sitename, siteurl)){
		return false;
	}

	var bookmark = {
		name: sitename,
		url: siteurl
	};
	var bookmarks;
	if(localStorage.getItem('bookmarks') === null){
		bookmarks = [];
	}
	else{
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	}
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	
	document.getElementById('myForm').reset();

	fetchBookmarks();

	// prevents form from submitting
	e.preventDefault();
}

function deleteBookmark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0; i < bookmarks.length; i++){;
		if(url === bookmarks[i].url){
			bookmarks.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	fetchBookmarks();
}

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarkResults = document.getElementById('bookmarkResults');
	bookmarkResults.innerHTML = '';
	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		bookmarkResults.innerHTML += '<div class="well">' + 
									 '<h3>' + name + 
									 ' <a class = "btn btn-default" target = "_blank" href="'+url+'">Visit</a> ' + 
									 '<a onclick = "deleteBookmark(\'' + url +'\')" class = "btn btn-danger" href="#">Delete</a>' + 
									 '</h3>' + 
									 '</div>';

	}
}

function validateForm(sitename, siteurl ){
	if(!sitename || !siteurl){
		alert('Please fill the details in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);
	if (!siteurl.match(regex)) {
		alert("Please use a valid url");
		return false;
	}
	return true;
}