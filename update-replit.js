import fs from "fs";
try {
  let data = fs.readFileSync(".replit", "utf8");
  if (!data.includes("[[deployment.rewrites]]")) {
    data += "\n[[deployment.rewrites]]\nfrom = \"/*\"\nto = \"/index.html\"\n";
    fs.writeFileSync(".replit", data);
    console.log("Success");
  } else {
    console.log("Already added");
  }
} catch (e) {
  console.error(e.message);
}
