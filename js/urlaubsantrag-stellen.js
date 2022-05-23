function toggleGleitzeit() {

    let checkboxGleitzeit = document.getElementById('checkbox_gleitzeit');
    let isGleitzeitChecked = checkboxGleitzeit.checked;
    console.log(isGleitzeitChecked);
    let inputUrlaubstage = document.getElementById('number_urlaubstage'); 
    console.log(inputUrlaubstage);


    if (isGleitzeitChecked) {
        // Checkbox is set to Gleitzeit
        inputUrlaubstage.readOnly = false;
        inputUrlaubstage.setAttribute('style', "width: 3em");
    } else {
        // Checkbox is set to no Gleitzeit
        inputUrlaubstage.readOnly = true;
        inputUrlaubstage.setAttribute('style', "width: 3em; background-color: #fff0e2; border-color: transparent; color: grey;");
        // TODO set calculated Urlaubstage from VON and BIS date
            inputUrlaubstage.value = 0;
    }
}