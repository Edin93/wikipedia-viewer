
$(document).ready(function(){
    $('#search-bar').keyup(function(event){
        if(event.keyCode === 13){
            $('.btn-search').click();
        }
    });
});


$('.btn-search').on('click', function(){
    let $searchTerm = $("#search-bar").val();
    $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+$searchTerm+"&limit=20&callback=?",
        type: 'GET',
        dataType: 'JSONP',
        pilimit: '10',
        success: function(data){
            console.log(data);
            $('ul').html('');
            for(let i=0; i<data[1].length; i++){
                $('ul').append('<li><div class="img-container" id="image'+i+'"></div><div class="description-container"><a target="_blank" href='+data[3][i]+'><h2>'+data[1][i]+'</h2><p>'+data[2][i]+'</p></a></div><div class="clearfix"></div></li>');
            }

            $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch="+$searchTerm+"&gpslimit=20",
                method: "GET",
                dataType: "jsonp",
                success: function(imgData){
                    console.log(imgData);
                    for(let i=0; i<imgData.query.pages.length; i++){
                        if(imgData.query.pages[i].hasOwnProperty("thumbnail") === true){
                            $('#image'+ (imgData.query.pages[i].index -1)).html("<img src="+imgData.query.pages[i].thumbnail.source+">");
                        } else{
                            $('#image'+ (imgData.query.pages[i].index -1)).html("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Article_icon_cropped.svg/512px-Article_icon_cropped.svg.png'>");
                        }
                    }
                },
                error: function(){
                    console.log("Error, Something's wrong.");
                }
            });
        },
        error: function(){
            alert('Error, Please refresh the page');
        }
    });
    $('#search-bar').val('');
});



