"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./controllers/RootController");
require("./controllers/LoginController");
const AppRouter_1 = require("./AppRouter");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_session_1.default)({ keys: ['oatmeal'] }));
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(3000, () => {
    console.log('listening on port 3000');
});
