/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    /* On load, set theme from local storage */
    if (supports_storage) {
        var theme = localStorage.theme;
        if (theme) {
            set_theme(theme);
        }
    } else {
        /* Don't annoy user with options that don't persist */
        $('#theme-dropdown').hide();
    }

    $('body').on('click', '.change-style-menu-item', function () {
        var theme_name = $(this).attr('name');
        var theme = "//netdna.bootstrapcdn.com/bootswatch/3.3.7/" + theme_name + "/bootstrap.min.css";
        set_theme(theme, theme_name);
    });
});

function set_theme(theme, theme_name) {
    $('link[title="main"]').attr('href', theme);
    $('li.theme-item').removeClass('active');
    $('li#li-' + theme_name).addClass('active');
    
    if (supports_storage) {
        localStorage.theme = theme;
    }
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

var supports_storage = supports_html5_storage();