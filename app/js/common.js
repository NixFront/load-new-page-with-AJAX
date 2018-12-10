$(function() {
	var arrayTabs = document.getElementsByClassName('products__gallery-item--tab');
	var tabsContainer = $('.tab-nav');
	$(document).ready(function(){
		$('.products__gallery').fadeIn().css('display','flex');
		$('.carousel').carousel();
		$('.phone').mask('+375(99) 999-99-99',{placeholder: "+375(__) ___-__-__"});
	$('.header__menu-mobile-btn').on('click', function () {
		$('.header__menu').slideToggle(500);
		$(this).toggleClass('clicked');
	});
	$('.categoryList').on('click', function () {
		$('.products__category').slideToggle(500);
		$('.categoryList span').toggleClass('clicked');
	});
	$('.page').on('click', function (e) {
		e.preventDefault();
		var link = $(this).attr('href');
		var newLink = window.location;
		if (link == '#') {
			newLink == 'index.html';
			loadPage(newLink);
		}
		else{
			newLink += link;
			loadPage(newLink);
		}	
	});
	$('.call').on('click', function (e) {
		e.preventDefault();
		$('.modal').fadeIn();
		
	});
	$('.close-modal').on('click', function () {
		$('.modal').fadeOut();
	});
	$('.form-send').on('click', function (e) {
		e.preventDefault();
		e.isDefaultPrevented();
		validate(this.form);
		
	});
	$('#name').keypress(function(e) {
		if (e.which >= 1072 && e.which<=1103 
			|| e.which >= 1040 && e.which<=1071
			|| e.which == 8 
			|| e.which >= 97 && e.which<=122
			|| e.which >= 65 && e.which<=90) {
			return true;
		}
		else{
			return false;
		}
});
	$('span').on('click', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.products__gallery').find('div.products__gallery-item--tab')
      .removeClass('active').eq($(this).index()).addClass('active');
  });
});
	function loadPage(newLink){
		$.ajax({
			url: newLink,
			type: 'post',
			success: function (url) {
				$('body').html(url);
			}
		});
	}
	function validate(form){
		var elems = form.elements;
		var name,email,phone,message;
		var form = form;
		resetError(elems.name.parentNode);
		if (elems.name.value.length > 2) {
			name = elems.name.value;
		}
		else{
			showError(elems.name.parentNode,'В имени должно быть больше 2-х символов!');
		}
		var r = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
		resetError(elems.email.parentNode);
		if (!r.test(elems.email.value)) {
			showError(elems.email.parentNode,'Не корректный email');
		}
		else{
			email = elems.email.value;
		}
		resetError(elems.phone.parentNode);
		if (!elems.phone.value) {
			showError(elems.phone.parentNode,'Введите номер');
		}
		else{
			phone = elems.phone.value;
		}
		message = elems.message.value;
		if (name != undefined && email != undefined && phone != undefined) {
			$.ajax({
					url: 'php/sendForm.php',
					type: 'post',
					data: "name="+name+"&email="+email+"&phone="+phone+"&message="+message,
					success: function (data) {
						formSuccess();	
						resetError(form);
					}
				});
		}
		else{
			return
		}
	}
	function formSuccess(){
		$(".form")[0].reset();
	}
	function showError(container,errorMessage){
		$(container).addClass('error');
		var msgElem = document.createElement('span');
		msgElem.className = 'error';
		msgElem.innerHTML = errorMessage;
		container.appendChild(msgElem);
	}
	 function resetError(container) {
	 	if (container.lastChild.className == "error") {
        	container.removeChild(container.lastChild);
        }

      }
});
