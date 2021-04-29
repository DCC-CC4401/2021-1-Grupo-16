const Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // index => month [0-11]

function initDatesFormBirthDate() {
    let option = '<option value="Día">Día</option>';
    const selectedDay = "Día";
    for (let i = 1; i <= Days[0]; i++) { //add option days
        option += '<option value="' + i + '">' + i + '</option>';
    }

    let $day = $('#day');
    $day.append(option);
    $day.val(selectedDay);

    option = '<option value="Mes">Mes</option>';
    let selectedMon = 'Mes';
    for (let i = 1; i <= 12; i++) {
        option += '<option value="' + i + '">' + i + '</option>';
    }
    let $month = $('#month');
    $month.append(option);
    $month.val(selectedMon);

    option = '<option value="Mes">Mes</option>';
    selectedMon = 'Mes';
    for (let i = 1; i <= 12; i++) {
        option += '<option value="' + i + '">' + i + '</option>';
    }
    let $month2 = $('#month2');
    $month2.append(option);
    $month2.val(selectedMon);

    const d = new Date();
    option = '<option value="Año">Año</option>';
    let selectedYear = 'Año';
    for (let i = 1930; i <= d.getFullYear(); i++) {// years start i
        option += '<option value="' + i + '">' + i + '</option>';
    }
    let $year = $('#year')
    $year.append(option);
    $year.val(selectedYear);
}

function isLeapYear(year) {
    year = parseInt(year);
    if (year % 4 !== 0) {
        return false;
    } else if (year % 400 === 0) {
        return true;
    } else return year % 100 !== 0;
}

function change_year(select) {
    if (isLeapYear($(select).val())) {
        Days[1] = 29;

    } else {
        Days[1] = 28;
    }
    if ($("#month").val() === 2) {
        const day = $('#day');
        let val = $(day).val();
        $(day).empty();
        let option = '<option value="Día">Día</option>';
        for (let i = 1; i <= Days[1]; i++) { //add option days
            option += '<option value="' + i + '">' + i + '</option>';
        }
        const month = $('#month').val();
        $(day).append(option);
        if (val > Days[month]) {
            val = 1;
        }
        $(day).val(val);
    }
}

function change_month(select) {
    const day = $('#day');
    let val = $(day).val();
    $(day).empty();
    let option = '<option value="Día">Día</option>';
    const month = parseInt($(select).val()) - 1;
    for (let i = 1; i <= Days[month]; i++) { //add option days
        option += '<option value="' + i + '">' + i + '</option>';
    }
    $(day).append(option);
    if (val > Days[month]) {
        val = 1;
    }
    $(day).val(val);
}