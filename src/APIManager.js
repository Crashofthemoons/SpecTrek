export default class APIManager {
    static getData = section => {
        return fetch(`http://localhost:5002/${section}`).then(e => e.json());
    };

    static addData = (section, body) => {
        return fetch(`http://localhost:5002/${section}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });
    };
    static deleteData = (section, id) => {
        return fetch(`http://localhost:5002/${section}/${id}`, {
            method: "DELETE"
        })
    };
    static changeStatus = (body, id) => {
        return fetch(`http://localhost:5002/orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                orderStatus: body
            })
        }).then(e => e.json())
    };
    static remakeOrder = (body, id) => {
        return fetch(`http://localhost:5002/orders/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                remake: body
            })
        }).then(e=> e.json())
    };
    static editOrder = (body, id) => {
        return fetch(`http://localhost:5002/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        })
    }
}