function showLeftMenu(){

        openMenu();

}

function showChildLeftMenu()
{
    openMenu();
}

/**
 * 显示侧滑菜单
 */



function openMenu() {
    var  page=plus.webview.getWebviewById(plus.runtime.appid);

    var menu=plus.webview.getWebviewById("index-menu.html");

    page.setStyle({mask:"rgba(0,0,0,0.3)"}); //显示遮罩层
    plus.webview.startAnimation({
            'view': page,
            'styles': {
                'fromLeft': '0',
                'toLeft': "85%"
            },
            'action': 'show'
        }, {
            'view': menu,
            'styles': {
                'fromLeft': "-70%",
                'toLeft': '0'
            },
            'action': 'show'
        },
        function(e) {
            //console.log(JSON.stringify(e));
            if(e.id == menu.id) { //侧滑菜单打开
            }
        }.bind(this)
    )
};
/**
 * 关闭菜单
 */



function closeMenu() {
    var  page=plus.webview.getWebviewById(plus.runtime.appid);
    var menu=plus.webview.getWebviewById("index-menu.html");
    page.setStyle({mask:"none"}); //关闭遮罩层
    plus.webview.startAnimation({
            'view': page,
            'styles': {
                'fromLeft': '85%',
                'toLeft': "0"
            },
            'action': 'show'
        }, {
            'view': menu,
            'styles': {
                'fromLeft': "0",
                'toLeft': '-85%'
            },
            'action': 'show'
        },
        function(e) {
            console.log(JSON.stringify(e));
            if(e.id == page.id) {}
        }.bind(this)
    )
};
window.addEventListener("menu:close", closeMenu);


