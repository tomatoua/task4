var enterKey = 13;
var escapeKey = 27;
var spanText; // хранится значения редактируемого элемента в списке товаров

function addGoods() {
    var goodsName = $('#texting').val();    
    $('#goods').append('<li><input type="checkbox" name="goods" class="elemCheckbox"/ ><span class="goodsItem">' + goodsName + ' </span><button class="deleteButton">X</button></li>');
    $('.deleteButton').hide();
}; // функция создания нового элемента в списке товаров

$('#texting').bind('keypress',function(e){
    if (e.keyCode == enterKey &&  $('#texting').val()) {
        addGoods();
        $('#texting').val('');
    }
}); // обрабатываем нажатие Enter в поле названия продукта, вызываем функцию создания нового элемента

$(document).on('mouseover','li', function() {
    $(this).children('button').show();
}); // показываем кнопку удаления при наведении курсора 

$(document).on('mouseout','li', function() {
    $(this).children('button').hide();
}); // скрываем кнопку удаления 

$(document).on('change', "input[name='goods']", function() {
   if ($(this).is(':checked')) 
       $(this).parent().css('textDecoration', 'line-through');
   else
       $(this).parent().css('textDecoration', 'none');
}); // вычеркиваем элемент при измении состояния чекбокса

$(document).on('click', '.deleteButton', function() {
   $(this).parent().remove();      
}); // удаляем элемент списка при нажатии кнопки delete

$(document).on('click', '#checkAll', function() {
    if ($('#checkAll').prop('checked')) 
    {
        $('.elemCheckbox').prop('checked', 'checked'); 
        $('li').css('textDecoration', 'line-through');
    }
    else
    {
        $('.elemCheckbox').prop('checked', '');  
        $('li').css('textDecoration', 'none');
    }
}); // логика чекбокса "вычеркнуть все"

$(document).on('click', '#deleteChecked', function(){
    $("input[name='goods']:checked").each(function(){
        $(this).parent().remove();   
    });
    $('#checkAll').prop('checked', ''); // обнуляем состояние чекбокса "вычеркнуть все"
}); // логика кнопки "удалить все вычеркнутые элементы"

$(document).on('dblclick','.goodsItem', function() {
    $(this).attr('contentEditable', true); // делаем span редактируемым
    spanText = $(this).text(); // сохраняем исходное значение
    $(this).focus(); // передаем ему фокус
    $(this).bind('keypress', function (e) {					
        if (e.keyCode == enterKey) {                         
            if (!$(this).text()) 
                $(this).text(spanText) // вовзаращем первоначальное значение, если после редактирование отсутствует текст
            e.preventDefault(); // прерываем стандартный обработчик нажатия Enter, что бы не устанавливался перенос строки
            $(this).trigger('blur');
		}                    
    }); 
    
    $(this).bind('keyup', function (e) {
	    if (e.keyCode == escapeKey) {                     
            $(this).text(spanText);
            $(this).trigger('blur');
        } 
    }); // используем keyup, т.к. значение в keyCode(which) события keypress ESC, в некоторых браузерах может быть некорректным
}); // функция редактирования названия товара по двойному клику

$(document).on('blur','.goodsItem', function() {
    $(this).attr('contentEditable', false);
}); // устанавливаем свойство contentEditable:false после потери фокуса элементом

