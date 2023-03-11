document.querySelector('.dropdown-link').addEventListener('click', function(evt){
evt.preventDefault();
document.querySelector('.dropdown').classList.toggle('dropdown--opened');
});
