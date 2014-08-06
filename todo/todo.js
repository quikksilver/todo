/*
 * Javascript file for todo.html
 * @author Axel Bengtsson
 */
 
/*Add item to the DOM and the local storage*/
function addItem() {
 var new_item = document.getElementById('new_item');
 var key = new Date().getTime();
 addListItem(key, new_item.value);
 addStorageItem(key, new_item.value);
 new_item.value = '';
}

/*Remove item from the DOM and the local storage*/
function removeItem(key) {
  removeStorage(key);
  var rm = document.getElementById(key);
  rm.parentNode.removeChild(rm);
}

/*Add the item to the local storage*/
function addStorageItem(key, item) {
  window.localStorage.setItem(key, item);
}

/*Remove item to the local storage*/
function removeStorage(key) {
  window.localStorage.removeItem(key);
}


/*Add the tag to the DOM*/
function addListItem(key, value) {
  var todo_list = document.getElementById('todo_list');
  // Create the li tag
  var li = document.createElement('li');
  // li.draggable = true;
  li.id = key
  li.setAttribute("contentEditable", true);
  li.setAttribute("class", "item");
  li.innerHTML = value;
  // Delete button
  var but = document.createElement('button');
  but.setAttribute("class", "deleteitem");
  but.appendChild(document.createTextNode('Delete'));
  but.setAttribute('onclick', "removeItem('" + key + "')");
  li.appendChild(but);
 
  todo_list.appendChild(li);
}

/*Load the locally stored value to the DOM*/
function init() {
  // Read from local storage and display it in the DOM
  var todo_index = window.localStorage.length;
  for (var i = 0; i < todo_index; i++) {
    key = window.localStorage.key(i);
    addListItem(key, window.localStorage.getItem(key));
  }
  document.addEventListener('keydown', keyEvent, true);
}

/* Save the node edited text if stroke new line*/
function keyEvent(event) {
  var esc = event.which == 27;
  var newline = event.which == 13;
  var el = event.target;
  var input = el.nodeName == 'LI';
  if (input) {
    if (esc) {
      // restore state
      document.execCommand('undo');
      el.blur();
    } else if (newline) {
      // save
      var id = el.getAttribute('id');
      // Remove the child text...
      addStorageItem(id, el.textContent.substr(0, el.textContent.length - 'Delete'.length));
      el.blur();
      event.preventDefault();
    }
  }
}







