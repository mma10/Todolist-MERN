$(document).ready(function(){
    $('.hide .hide_box').on('change',function(){
        $('.list').fadeToggle(200);                  
    });

    $('.search .search_box').on('keyup',function(){

        var search = $('.search .search_box').val();                       
        var tasks = $('.list li span');
        
        for(var i = 0; i<tasks.length ; i++){
            if(tasks[i].innerHTML.toLowerCase().indexOf(search) == -1)
                $(tasks[i].parentElement).hide(100);
            else    
                $(tasks[i].parentElement).show(100);
        }
    });
    
    $('main li .edit').on('click',function(e){
        e.preventDefault();        
        $(this.parentElement.parentElement).find('span').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.input').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.delete_edit').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.cancel_done').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.input')[0].value = $(this.parentElement.parentElement).find('span').text();
    });

    $('main li .input').on('keyup',function(e){
        if(e.keyCode === 13)
            $(this.parentElement).find('.done').click();
        
    });

    $('main li .cancel').on('click',function(e){
        e.preventDefault();        
        $(this.parentElement.parentElement).find('span').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.input').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.delete_edit').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.cancel_done').toggleClass('deactive');
        $(this.parentElement.parentElement).find('.input')[0].value = null;
    });
    

});