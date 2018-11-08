
const endpoint = "https://spec-trek.herokuapp.com/"
export default class APIManager {
    static getData = section => {
        return fetch(`${endpoint}${section}`).then(e => e.json());
    };

    static addData = (section, body) => {
        return fetch(`${endpoint}${section}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });
    };
    static deleteData = (section, id) => {
        return fetch(`${endpoint}${section}/${id}`, {
            method: "DELETE"
        })
    };
    static changeStatus = (body, id) => {
        return fetch(`${endpoint}orders/${id}`, {
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
        return fetch(`${endpoint}orders/${id}`, {
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
        return fetch(`${endpoint}orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        })
    }
}