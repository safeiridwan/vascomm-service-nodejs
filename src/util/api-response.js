class ApiResponse {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    };
}

export {
    ApiResponse
};