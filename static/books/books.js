function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8500/admin/books/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('bookTitleTable');
            data.forEach(el => {
                lst.innerHTML += `<tr><td>${el.id}</td> <td>${el.title}</td> <td>${el.author}</td> <td>${el.genre}</td></tr>`;
            });
        });

    document.getElementById('finById').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('id').value


        document.getElementById('bookTitleTable').innerHTML = '';
        document.getElementById('id').value = '';

        fetch('http://127.0.0.1:8500/admin/books/findById/' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then( el => {
                const lst = document.getElementById('bookTitleTable');
                if (el.msg) {
                    alert(el.msg)
                } else {
                    lst.innerHTML += `<tr><td>${el.id}</td> <td>${el.title}</td> <td>${el.author}</td> <td>${el.genre}</td></tr>`;
                }
            });

    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}




