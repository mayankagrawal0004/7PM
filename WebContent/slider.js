var images=new Array('http://placehold.it/250x150','http://placehold.it/250x150/123456','http://placehold.it/250x150/dbca98');
var nextimage=0;

doSlideshow();

function doSlideshow()
{
    if($('.slideshowimage').length!=0)
    {
        $('.slideshowimage').fadeOut(500,function(){
        	slideshowFadeIn();$(this).remove();
        }
        );
    }
    else
    {
        slideshowFadeIn();
    }
}
function slideshowFadeIn()
{
    $('.slideshow').prepend($('<img class="slideshowimage" src="'+images[nextimage++]+'" style="display:none">').fadeIn(500,function(){setTimeout(doSlideshow,1000);}));
    if(nextimage>=images.length)
        nextimage=0;
}
