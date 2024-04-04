"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exclude = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
function exclude(Schema, SkipKeys) {
    const newObj = Object.assign({}, Schema);
    SkipKeys.forEach(key => delete newObj[key]);
    return newObj;
}
exports.exclude = exclude;
//# sourceMappingURL=prisma.js.map