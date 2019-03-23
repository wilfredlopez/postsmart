//Wilfred



// links.click(function(e){
//    // $( "*" ).removeClass( "active" );

//    links.removeClass('active')
//    $(this).addClass('active')

// });


$(document).ready(function(){
    const currentPage = document.location
    const pagehash = currentPage.pathname + currentPage.hash
    var links = $('.nav-link')

    if(currentPage.pathname === '/'){
        $('.nav-link:first').addClass('active')
    }else if(currentPage.pathname ==='/newpost'){
        $('.nav-link:eq(1)').addClass('active')
    }else if(pagehash ==='/moreabout#pageTop'){
     //   $('.nav-link:eq(2)').addClass('active')
    } 
    
    if(pagehash === '/moreabout#contact'){
     //   $('.nav-link:eq(5)').addClass('active')
    }else if(pagehash === '/moreabout#about'){
       // $('.nav-link:eq(4)').addClass('active')
    }else if(pagehash === '/moreabout#portfolio'){
      //  $('.nav-link:eq(3)').addClass('active')
    }

    if(currentPage.pathname === '/auth/login'){
       // $('.nav-link:eq(6)').addClass('active')  
       $('.nav-link:eq(4)').addClass('active')
    }else if(currentPage.pathname === '/auth/register'){
       // $('.nav-link:eq(7)').addClass('active') 
       $('.nav-link:eq(5)').addClass('active') 
    }

    if(currentPage.pathname === '/about'){
        $('.nav-link:eq(2)').addClass('active')  
    }else if(currentPage.pathname === '/moreabout'){
        $('.nav-link:eq(3)').addClass('active')  
    }else if(currentPage.pathname.includes('/users')){
        $('.nav-link:eq(4)').addClass('active')  
    }



    links.click(function(e){

        if(links !== e.target){
            links.removeClass('active');
        }
        $(e.target).addClass('active');
    })

    //focus Error Message if there is one
    const errMessage = $('#invalid')
    $(errMessage).focus()

    $("#link-top").on("click", function(){
        window.scrollTo(0, 0);
    })

});//document ready function end



