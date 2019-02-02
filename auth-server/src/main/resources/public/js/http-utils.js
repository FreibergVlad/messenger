class HttpUtils {

    static post(url, body = {}, headers = {}) {
        return fetch(url, {
            method: "POST",
            headers: headers,
            body: body
        });
    }

    static encodeFormData(data) {
        let data_arr = [];
        Object.keys(data).forEach(key => {
            data_arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
        });
        return data_arr.join("&");
    }
}

/**
 * Enum for HTTP status codes
 *
 * @readonly
 * @enum {number}
 * */
HttpUtils.STATUS_CODES = {
    "OK": 200,
    "CREATED": 201,
    "BAD_REQUEST": 400
};