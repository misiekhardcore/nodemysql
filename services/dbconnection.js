import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

//Create connection
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
  });
  
  //Open Connection
  connection.connect(error => {
    if (error) throw error;
    console.log("database:",connection.state);
  });


// class DbService {
//   constructor() {
//     dotenv.config();
//     this.instance = null;
//     this.connection = mysql.createConnection({
//       host: process.env.HOST,
//       user: process.env.NAME,
//       password: process.env.PASS,
//       database: process.env.DATABASE,
//     });

//     this.connection.connect((err) => {
//       if (err) throw err;
//       console.log("database:", this.connection.state);
//     });
//   }

//   static getDbServiceInstance() {
//     return this.instance ? this.instance : new DbService();
//   }

//   async getAllData() {
//     try {
//       const response = await new Promise((resolve, reject) => {
//         const query = "SELECT * FROM names";
//         this.connection.query(query, (err, result) => {
//           if (err) reject(new Error(err.message));
//           resolve(result);
//         });
//       });

//       return response;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   async insertData(name) {
//     try {
//       const response = await new Promise((resolve, reject) => {
//         const query = "INSERT INTO names (name,date) VALUES(?,NOW())";
//         this.connection.query(query, [name], (err, result) => {
//           if (err) reject(new Error(err.message));
//           resolve(result);
//         });
//       });

//       return this.getAllData();
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

// export default DbService;
export default connection;

