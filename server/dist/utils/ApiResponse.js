"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(statuscode, data = {}, message = "Success", success = true) {
        this.statuscode = statuscode;
        this.message = message;
        this.success = success;
        if (data)
            this.data = data;
    }
}
exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map