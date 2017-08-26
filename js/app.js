var allSectionCounts = {part1a: 0, part1b: 0, part2: 0, part3: 0, part4: 0};
var totalQuestions = 26;

var globalTheme;

$(document).ready(function () {
    /* On load, set theme from local storage */
    if (supports_storage) {
        var theme = localStorage.theme;
        var theme_name = localStorage.theme_name;
        
        if (theme) {
            set_theme(theme, theme_name);
        }
    } else {
        /* Don't annoy user with options that don't persist */
        //$('#theme-dropdown').hide();
    }

    $('body').on('click', '.change-style-menu-item', function () {
        var theme_name = $(this).attr('name');
        var theme = "//netdna.bootstrapcdn.com/bootswatch/3.3.7/" + theme_name + "/bootstrap.min.css";
        set_theme(theme, theme_name);
    });
    
    $('.btn-group input[type=radio]').on('change', function() {
       updateProgress($(this));
    });
    
    $('.form-control').on('change', function() {
        var parent = $(this).closest('.form-control-parent');
        var hasButtonActive = $(parent).has('.btn.active').length;
        if (hasButtonActive === 0) $(parent).append('<button class="btn active" style="display: none">a</button>');
        updateProgress($(this));
    });
});

function updateProgress(input)
{
    var section = input.closest('div').closest('div.question-section');
    var sectionName = section.attr('id');

    var checkCount = $(section).find('.btn.active').length;

    var qCount = $(section).find('li').length;

    var progress = $('div#' + sectionName + '-panel').find('span.progress');
    var bar = $(progress).find('span.progress-bar');

    $(progress).css('opacity', 0.8);
    var prog = checkCount * 100.0 / qCount;
    $(bar).css('width', prog + '%');
    $(bar).text(checkCount + ' / ' + qCount);
    
    allSectionCounts[sectionName] = checkCount;
    prog = getCompletedQuestionCount() * 100 / totalQuestions;
    
    var overallProgress = $('#overallProgress');
    //console.log(prog);
    $(overallProgress).css('width', prog + '%');
    
    if (prog >= 75.0)
    {
        $(overallProgress).removeClass('progress-bar-warning').addClass('progress-bar-success');
    }
    else if (prog >= 30.0)
    {
        $(overallProgress).removeClass('progress-bar-danger').addClass('progress-bar-warning');
    }
    
    if (prog == 100) $('#submitButton').removeClass('transparent', 1000);
}

function set_theme(theme, theme_name) {
    $('link[title="main"]').attr('href', theme);
    $('li.theme-item').removeClass('active');
    $('li#li-' + theme_name).addClass('active');
    
    if (supports_storage) {
        localStorage.theme = theme;
        localStorage.theme_name = theme_name;
    }
    
    globalTheme = theme_name || 'darkly';
    console.log(globalTheme);
    
    var pt = getProgressPaddingTop();
    $('span.progress-bar').css('padding-top', pt + 'px');
}

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

var supports_storage = supports_html5_storage();

var themePaddings = 
    {
        'darkly': 4, cyborg: 0, slate: 0, solar: 0, superhero: 0, cosmo: 4, flatly: 4, lumen: 0, paper: 0, spacelab: 0, united: 0
    };
    
function getProgressPaddingTop()
{
    return themePaddings[globalTheme];
}

function getCompletedQuestionCount()
{
    return allSectionCounts.part1a + allSectionCounts.part1b + allSectionCounts.part2 + allSectionCounts.part3 + allSectionCounts.part4;
}