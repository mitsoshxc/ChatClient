function activate(element) {
  var groupItems = document.getElementsByClassName('group');

  for (i = 0; i < groupItems.length; i++) {
    groupItems[i].classList.remove('active');
  }

  element.classList.add('active');

  groupChange(element.text);
}
