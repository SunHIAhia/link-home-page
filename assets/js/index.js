function research(){
    var search_txt = document.getElementById("search-bar-input").value;
    if (search_txt == "") {
        alert("关键词不能为空! ");
        return false;
    }
    var search_url = "http://www.suiyuanka.com:88/?q=" + search_txt;
    window.open(search_url);
}
    
function onKeyDown(event){
    var e = event || window.event || arguments.callee.caller.arguments[0]; 
        // enter 键         
        if(e && e.keyCode==13){ 
            research();
        }
        // Esc 键          
        if(e && e.keyCode==27){ 
            $('#search-bar-input').val('')
        }
                
} 