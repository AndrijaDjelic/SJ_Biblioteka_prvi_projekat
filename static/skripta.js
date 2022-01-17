function init() {

    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];//ovo ti je bitno da doas u tvoje skripte
    //document je kao globalna biblioteka svih html elemenata i jos nekog sranja, zato je cookie tu

    

    document.getElementById('logout').addEventListener('click', e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.href = 'login.html';
    });
}