class Storage {
    static saveUsers(users) {
        localStorage.setItem("users",JSON.stringify(users))
    };

    static getAllUsers() {
        return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
    }

    static getUser(id) {
        let users = JSON.parse(localStorage.getItem('users'));
        return users.find(user => user.id === id)
    };

    static checkUser(mail) {
        let users = JSON.parse(localStorage.getItem('users'));
        return users.find(user => user.mail === mail)
    };



    static removeUser(usuario) {
        let users = this.getAllUsers()
        users = users.filter(user => user.id !== usuario.id)
        this.saveCart(users)
        
    }

    static updateUser(usuario) {
        let users = this.getAllUsers()

        for (let user in users) {
            if (users[user].id == usuario.id) {
                users[user] = usuario
            }
        }
       
        this.saveCart(users)
        
    }
}

export {
    Storage,
}