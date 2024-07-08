async function sendPostRequest(url, data) {
    const response = await fetch(url, {
        mode: 'no-cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Host': '188.235.0.207:23081',
            'Content-Type': 'application/json',
            'Authorization': 'Basic 0JDQtNC80LjQvdC40YHRgtGA0LDRgtC+0YA6MDAwMA==',
            'Access-Control-Allow-Origin': 'http://188.235.0.207:23081',
            'Access-Control-Allow-Credentials': 'true'
        },
        body: JSON.stringify(data),
    });
    let json = await response.json();
    console.log(json);
    return json;
}

function printError(errors) {
    console.log("Произошла ошибка при получении данных о нарушениях", errors);
}
document.getElementById('buttonSearch').addEventListener('click', async function () {
    try {
        const startDate = document.querySelector("#start-date");
        const endDate = document.querySelector("#end-date");
        const violationsPost = await sendPostRequest('http://188.235.0.207:23081/DemoStand_Perm_ITS/hs/ramka_GetLocation/ViolationData', { start_date: startDate.value, end_date: endDate.value });
        dispViolations(violationsPost);
    }
    catch (error) {
        printError(error);
    }


});

function dispViolations(violations) {
    const violationList = document.getElementById("info_violations");
    violationList.innerHTML = '';
    for (const violation of violations) {
        const item = document.createElement('div');
        item.innerHTML = `ГРЗ: ${violation.grz}<br>Дата нарушения: ${violation.date_violation}<br>Тип ТС: ${violation.vehicle_type}<br>Количество осей: ${violation.count_axles}<br><br>`;
        violationList.appendChild(item);
    }
}
