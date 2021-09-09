function OnLoad() {
    // generate event listeners on All Done and All Error Buttons for double click
    var x = document.getElementsByClassName('main-done');
    var y = document.getElementsByClassName('main-err');

    for (var i = 0; i < x.length; i++) {
        let x_split = x.item(i).id.split('-');
        let x_id = x_split[x_split.length - 1];
        document.getElementById(x.item(i).id).addEventListener("dblclick", function() { ShowHideScripts(x_id); }, false);
        document.getElementById(y.item(i).id).addEventListener("dblclick", function() { ShowHideScripts(x_id); }, false);
    }

    ShowAll();
}

function CheckClass(check, classes) {
    // check: Boolean, classes: [''], check or uncheck classes
    for (var i = 0; i < classes.length; i++) {
        var x = document.getElementsByClassName(classes[i]);
        console.log(classes[i]);
        for (var j = 0; j < x.length; j++) {
            x.item(j).checked = check;
        }    
    }
}

function ColorClass(color, classname) {
    // color: '', classname='', color class
    var x = document.getElementsByClassName(classname);
    for (var i = 0; i < x.length; i++) {
        x.item(i).style.backgroundColor = color;
    }
}

function AllDone(pt_no) {
    console.log('AllDone()');
    // 1) uncheck all pt errors
    CheckClass(false, ['check-pt-'+pt_no,'pt-check-'+pt_no]);
    // 2) uncolor all pt errors, color all pt done. Repeat for main buttons
    ColorClass('white', 'error-pt-'+pt_no);
    ColorClass('green', 'success-pt-'+pt_no);
    document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'green';
    document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'white';
    // 3) hide error options, hide scripts, showhide orange column names
    ShowHideClass('all-error-options-'+pt_no, false, 'row');
    HideScripts(pt_no);
    ShowHideOrange();
}

function AllError(pt_no) {
    console.log('ErrButton()');
    // 1) uncolor all pt done, color all pt error buttons, repeat for main buttons
    ColorClass('white','success-pt-'+pt_no);
    ColorClass('red','error-pt-'+pt_no);
    document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'white';
    document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'red';
    // 2) show all error options, main error options and show orange column names
    ShowHideClass('script-error-option-'+pt_no, true, 'cell');
    ShowHideClass('all-error-options-'+pt_no, true, 'cell');
    ShowHideOrange();
}

function Done(ind, pt_no) {
    console.log('Done');
    // 1) uncheck all pt error for row ind
    CheckClass(false, ['check-'+ind]);
    // 2) recolor buttons
    document.getElementById('error-button-'+ind).style.backgroundColor = 'white';
    document.getElementById('success-button-'+ind).style.backgroundColor = 'green';
    // 3) hide error options and showhide header
    ShowHideClass('error-option-'+ind, false, 'cell');
    ShowHideOrange();
    // 4) check if all done, if so call AllDone()
    CheckAll(pt_no);
}

function CheckAll(pt_no) {
    // check done column for pt_no, if all green => AllDone(), else if all red => AllError() else nothing
    var y = document.getElementsByClassName('success-pt-'+pt_no);
    var all_green, all_red = true;
    for (var i = 0; i < y.length; i++) {
        if (y.item(i).style.backgroundColor != 'green') {
            all_green = false;
        } else {
            all_red = false;
        }
    }
    if (all_green) {AllDone(pt_no);} else {
        document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'white';
    }
    if (all_red) {AllError(pt_no);} else {
        document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'white';
    }    
}

function Error(ind, pt_no) {
    console.log('Error');
    // 1) recolor buttons
    document.getElementById('error-button-'+ind).style.backgroundColor = 'red';
    document.getElementById('success-button-'+ind).style.backgroundColor = 'white';
    // 2) show error options for that row
    ShowHideClass('error-option-'+ind, true, 'cell');
    ShowHideOrange();
    // 3) check if all error, if so call AllError()
    CheckAll(pt_no);
}

function CheckCheck(ind, pt_no, type) {
    console.log('CheckCheck(ind, pt_no, type): '+ind.toString()+', '+pt_no.toString()+', '+type.toString());
    // 1) uncheck all in main pt row
    CheckClass(false, ['pt-check-'+pt_no]);
    // 2) uncheck all but checkbox selected in speciied row
    var x = document.getElementsByClassName('check-'+ind);
    for (var i = 0; i < x.length; i++) {
        if (i != (type-1)) {
            x.item(i).checked = false;
        }
    }
}

function MainCheck(pt_no, type) {
    console.log('MainCheck(pt_no, type): '+pt_no.toString()+', '+type.toString());
    // 1) uncheck all but checkbox selected in main pt row
    var x = document.getElementsByClassName('pt-check-'+pt_no);
    for (var i = 0; i < x.length; i++) {
        if (i != (type-1)) {
            x.item(i).checked = false;
        }
    }
    // 2) tick same on all scripts for pt
    var y = document.getElementsByClassName('check-pt-'+pt_no);
    var checkbox;
    for (var i = 0; i < y.length; i++) {
        checkbox = i % 4;
        if (checkbox != (type-1)) {
            y.item(i).checked = false;
        }
        else {
            console.log('i: '+i+', type: '+type);
            y.item(i).checked = true;
        }
    }
    // make main error red
    document.getElementById('all-success-button-'+pt_no).style.backgroundColor = 'white';
    document.getElementById('all-error-button-'+pt_no).style.backgroundColor = 'red';   
    // hide all scripts
    HideScripts(pt_no);
}

function ShowHideOrange() {
    var y = document.getElementsByClassName('main-done');
    var cols;
    var option_show = false;
    // 1) check if any of the all done buttons is not green
    for (var i = 0; i < y.length; i++)
    {
        console.log('checkbox '+i+' : '+y.item(i).style.display);
        if (y.item(i).style.backgroundColor != 'green') {
            option_show = true;
            break;
        }
    }
    // 2) if so, change table shape to 10 cols and show orange header
    if (option_show == true) { cols = '10'; } else { cols = '6'; }
    ShowHideClass('orange', option_show, 'cell');
    var x = document.getElementsByClassName('col-change');
    for (var i = 0; i < x.length; i++) {
        x.item(i).colSpan = cols;
    }
}

function ShowHideScripts(pt_no) {
    // 1) check if row is visible apart from ones in ids list
    var z = document.getElementsByClassName(pt_no);
    var ids = ['break-blank','break','first-row'];
    var hide = false;
    for (var i = 0; i < z.length; i++) {
        if ((z.item(i).style.display == 'table-row') && !(ids.includes(z.item(i).id))) {
            hide = true;
            break;
        }
    }
    // 2) if so, hide scripts for pt, else show scripts for pt
    if (hide) {HideScripts(pt_no);} 
    else {
        ShowHideClass(pt_no, true, 'row');
    }
}

function HideScripts(pt_no) {
    // 1) hide all rows
    ShowHideClass(pt_no, false, 'row');
    // 2) unhide rows that need to be shown
    ShowHideClass('stay', true, 'row');
}

function ShowHideClass(classname, show, obj_type) {
    var showstr = 'table-'+obj_type;
    if (!show) {showstr = 'none';};

    var x = document.getElementsByClassName(classname);
    for (var i = 0; i < x.length; i++) {
        x.item(i).style.display = showstr;
    }
}

function ShowAll() {
    console.log('ShowAll()');
    ShowHideClass('error-options', true, 'cell');
    ShowHideClass('script', true, 'row');
    ShowHideOrange();
}