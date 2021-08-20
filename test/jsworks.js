document.addEventListener('DOMContentLoaded', (event) => { //функция доставляет уже забронированные дни с сервера при загрузку страницы.
    console.log('DOM fully loaded and parsed');

$.ajax({
    url: "/test/conn.php", 
   data: {
                action: 'test'
            },
            type: 'post',
    success : function(result) { //при успехе парсит строку и присваивает css класс closed уже забронированным.
	
	var closedList = result.split(' ');
	
 	$("td").each(function(row, $el, field) { //проверяет все объекты td
   	    var row = $(this).index();
	    var col = $(this)[0].textContent;
		if (closedList.includes(col)&($(this).hasClass("this-month"))) {
			$(this).addClass("closed");
			
                   
			}
		
	})
	
        
    }

});



});

$(function() { 
$("#tab").on("click", "td", function (row, $el, field) { //при клике на правильную ячейку календаря присваивает/убирает класс clicked (отметку выбранного).
  if ($(this).hasClass("this-month")) {
if (!($(this).hasClass("closed"))){

if(!($("#btext").hasClass("hide"))){ 
$("#btext").addClass("hide");
				}

  if ($(this).hasClass("clicked")) {



                    var row = $(this).index();
			var col = $(this)[0].textContent;
			
			
			var $items = $('.clicked');

			if($items.length==1)
			{
 			console.log("items.length==1");
			
			$("#bron").addClass("hide");
			}
			$(this).removeClass("clicked");
					}
else{
                    var row = $(this).index();
			var col = $(this)[0].textContent;
			
			$(this).addClass("clicked");
			$("#bron").removeClass("hide");
} 
}
					} ///this-month

 							}); //onclick


}); //function



$(function() {
	$("#bron").on("click", function () {
	bootbox.confirm({ //bootbox открывает диалоговое окно
    message: "Вы уверены, что хотите забронировать?",
    buttons: {
        confirm: {
            label: 'Да',
            className: 'btn-success'
        },
        cancel: {
            label: 'Нет',
            className: 'btn-danger'
        }
    },
    callback: function (result) {
        
	if (result==true)
	{

	var $items = $('.clicked');
	var $send="";
	for(var i=0;i<$items.length;i++){
	var $item=$items[i];
	
	$send=$send+" "+$item.textContent;
					}
	$.ajax({ //данные отправляются на сервер.
    url: "/test/send.php",
   data: {'form': $send},
   type: 'post',
    success : function(result) { 
       
	
	
	var res=result;
	
	var closedList = res.split(' ');
	
 	$("td").each(function(row, $el, field) {
   	    var row = $(this).index();
	    var col = $(this)[0].textContent;
		if (closedList.includes(col)&($(this).hasClass("this-month"))) {
			$(this).removeClass("clicked");
			$(this).addClass("closed");
			
                  
			}

		
	})
	//прячет кнопку бронирования и вызывает текст.
	$("#bron").addClass("hide");
        $("#btext").removeClass("hide");
    } //success

}); //ajax
	} //agree
    } //callback
});//bootbox

	}); //onclick
}); 