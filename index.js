import express from "express";
import fs from "fs";
import { format } from "date-fns";
import path from "path";

const PORT = 9000;
let app = express();
app.use(express.json());
app.get("/", (req, res) => {
  let today = format(new Date(), "dd-MM-yyyy-HH-mm-ss");
  fs.writeFileSync(`DateTime/${today}.txt`, `${today}`, "utf8");
  let data = fs.readFileSync(`DateTime/${today}.txt`, "utf8");
  try {
    res.status(200).send(data);
  } catch (error) {
    req.res(500).send("Internel server error");
  }
});


app.get("/getTxtFiles", (req, res) => {

  fs.readdir('DateTime', (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
      res.status(200).json(textFiles);
    }
  });
});

app.listen(PORT, () => console.log(`App Listening to ${PORT}`));
