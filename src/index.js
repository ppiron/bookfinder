import App from "./App.svelte";
// const env = import.meta.env;
// console.log("hello world", env);
// async function pippo() {
//   const res = await fetch("http://localhost:7000/.netlify/functions/getBooks", {
//     mode: "cors",
//   });
//   console.log(await res.json());
// }
// pippo();
let app = new App({
  target: document.body,
});
export default app;
