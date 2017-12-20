$('#edit-group').click(function(evt) {
  var editInput = $('.interest-input')
  var itemList = $('.passion-item')

  console.log(itemList, 'this is  we have')

  if (editInput.attr('class').indexOf('show') >= 0) {
    editInput.addClass('hide');
    itemList.addClass('show');
    editInput.removeClass('show');
    itemList.removeClass('hide');
  } else {
    editInput.addClass('show');
    itemList.addClass('hide');
    editInput.removeClass('hide');
    itemList.removeClass('show');
  }
  return false;
});

$('#edit-practice-group').click(function(evt) {
  var editInput = $('.practice-input')
  var itemList = $('.practice-item')

  console.log(itemList, 'this is  we have')

  if (editInput.attr('class').indexOf('show') >= 0) {
    editInput.addClass('hide');
    itemList.addClass('show');
    editInput.removeClass('show');
    itemList.removeClass('hide');
  } else {
    editInput.addClass('show');
    itemList.addClass('hide');
    editInput.removeClass('hide');
    itemList.removeClass('show');
  }
  return false;
});
/* to be edited for the top portion of the profile to be edited*/
$('#edit-university-statistics').click(function(evt) {
  var editInput = $('.practice-input')
  var itemList = $('.practice-item')

  console.log(itemList, 'this is a print')

  if (editInput.attr('class').indexOf('show') >= 0) {
    editInput.addClass('hide');
    itemList.addClass('show');
    editInput.removeClass('show');
    itemList.removeClass('hide');
  } else {
    editInput.addClass('show');
    itemList.addClass('hide');
    editInput.removeClass('hide');
    itemList.removeClass('show');
  }
  return false;
});

/*var editButton = document.getElementById('edit-group');
var editInput = document.getElementsByClassName('interest-input')
var itemList = document.getElementsByClassName('passion-item')

editButton.addEventListener('click', function(event) {
  console.log(editInput, 'testing')
  if (editInput.className === 'show') {
    editInput.className = 'hide';
    itemList.className = 'show';
  } else {
    editInput.className = 'show';
    itemList.className = 'hide';
  }
  return false;
});
*/
