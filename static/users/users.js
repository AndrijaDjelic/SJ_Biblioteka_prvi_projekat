function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8500/admin/users/all', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            const lst = document.getElementById('usersTable');
            data.forEach(el => {
                lst.innerHTML += `<tr><td>${el.id}</td> <td>${el.username}</td> <td>${el.role}</td></tr>`;
            });
        });

    document.getElementById('findById').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('id').value


        document.getElementById('usersTable').innerHTML = '';
        document.getElementById('id').value = '';

        fetch('http://127.0.0.1:8500/admin/users/findById/' + id, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then( el => {
                const lst = document.getElementById('usersTable');
                if (el.msg) {
                    alert(el.msg)
                } else {
                    lst.innerHTML += `<tr><td>${el.id}</td> <td>${el.username}</td> <td>${el.role}</td></tr>`;
                }
            });

    });

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}