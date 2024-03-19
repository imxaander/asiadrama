$(document).ready(function() {
    $('.carousels').flickity({
        // options
        cellAlign: 'left',
        contain: true
    });

});


if(!("favs" in localStorage)){
    localStorage.setItem("favs", "")
    
}
if (!String.prototype.includes) {
    String.prototype.includes = function() {
        'use strict';
        return String.prototype.indexOf.apply(this, arguments) !== -1;
    };
}

function search(){
    var query = $('#search-input').val();
    // console.log("search event")
    var site;
    var isRecent;

    //set to true to default in input
    if(query){
        $("#search-page-btn").click();
        site = 'https://dramacool.com.pa/search?type=movies&keyword='+query;
        // console.log("may laman")
        isRecent = false;
    }else{
        $("#home-page-btn").click();
        site = `https://dramacool.com.pa/`;
        // console.log("walang laman")
        isRecent = true;
    }
    
    var wrapper = $('.search-results')[0];
    wrapper.innerHTML = '<i class="fas fa-spinner spinner"></i>';

    
    fetch(site).then(response => response.text()).then(html => 
    {
        
        var page = document.createElement('html');
        page.innerHTML = html;
    
        var ul = page.getElementsByClassName('switch-block list-episode-item')[0];
        
        wrapper.innerHTML = "";
  
        for(let child of ul.children){

            let itemDiv = document.createElement("div");
            let href = child.querySelector('a').getAttribute("href").slice(14);
            let name = child.querySelector('h3').innerHTML;
            let img = child.querySelector('a').querySelector('img').getAttribute("data-original");
            let itemImg = document.createElement("img");

            if(isRecent){
                href = getTitle(href);
            }

            itemImg.classList.add("position-absolute")
            itemImg.classList.add("card-img")
            itemImg.classList.add("img-fluid")
            itemImg.classList.add("top-50")
            itemImg.classList.add("start-50")
            
            itemImg.src = img;
            itemDiv.appendChild(itemImg);
            itemDiv.classList.add("position-relative")
            itemDiv.classList.add("card");
            itemDiv.classList.add('col')
            itemDiv.setAttribute("onclick", `detail('${href}', \`${name}\`, '${img}') `);
            
            // itemDiv.innerHTML += `<p class="item-text">${name}</p>`;
        
            wrapper.appendChild(itemDiv);
        }
        page.remove();
    }
    );
}