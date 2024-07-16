 document.addEventListener('DOMContentLoaded', () => {
    fetch('ViolationData.json')
        .then(response => response.json())
        .then(data => {
            window.violations = data;
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
});

function filterViolations() {
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    const violationList = document.getElementById('violation-list');
    violationList.innerHTML = '';

    window.violations.forEach(pvk => {
        pvk.data.forEach(violation => {
            const violationDate = new Date(violation.date_violation);
            if (violationDate >= startDate && violationDate <= endDate) {
                const listItem = document.createElement('li');
                listItem.className = 'violation-item';
                listItem.innerHTML = `
                    <p>ГРЗ: ${violation.grz}</p>
                    <p>Дата нарушения: ${violation.date_violation}</p>
                    <p>Тип ТС: ${violation.vehicle_type}</p>
                    <p>Количество осей: ${violation.count_axles}</p>
                `;
                violationList.appendChild(listItem);
            }
        });
    });
}