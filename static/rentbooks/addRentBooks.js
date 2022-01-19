function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8500/admin/rentbooks/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('rentBooksTable');
            data.forEach(el => {
                lst.innerHTML += `<tr><td>${el.id}</td> <td>${el.available}</td> <td>${el.book.id}</td><td>${el.book.title}</td></tr>`;
            });
        });

    document.getElementById('rentBooksAddButton').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            available: document.getElementById('available').checked,
            titleID: document.getElementById('titleID').value
            
        };
        document.getElementById('rentBooksTable').innerHTML = '';
        document.getElementById('available').checked = false,
        document.getElementById('titleID').value = '';

        fetch('http://127.0.0.1:8500/admin/rentbooks/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                const lst = document.getElementById('rentBooksTable');
                if (el.msg) {
                    alert(el.msg)
                } else {
                    lst.innerHTML += `<tr><td>${el.id}</td> <td>${el.available}</td> <td>${el.bookId}</td></tr>`;
                }
            });

    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}