"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginRouter_1 = require("./routes/loginRouter");
const app = (0, express_1.default)();
app.use(loginRouter_1.router);
// app.get('/', (req: Request, res: Response) => {
//     res.send(`
//         <div>
//             <h1>Hello World!</h1>
//         </div>
//         `);
// });
app.listen(3000, () => {
    console.log('listening on port 3000');
});
