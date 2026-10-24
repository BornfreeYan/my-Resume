// 概念1：window 是浏览器的全局对象，别的脚本挂上去的东西这里能读到
// 概念2：|| 是"或者"，左边为空（undefined）时取右边
const data = window.RESUME || window.DEMO_RESUME;

// 概念3：document.querySelector(".name") 按 class 找到页面上的元素
const nameEl = document.querySelector(".name");

// 概念4：textContent 改元素里的文字。它不会把内容当 HTML 解析，
// 所以就算数据里混进 <script> 也只会原样显示，比 innerHTML 安全
nameEl.textContent = data.name;

document.querySelector(".intro").textContent = data.intro;
document.querySelector("#meta-age").textContent = data.age+"岁";
document.querySelector("#meta-phone").textContent = data.phone;
document.querySelector("#meta-email").textContent = data.email;

const githubEl = document.querySelector("#meta-github");
githubEl.textContent = data.github.replace("https://", "");
githubEl.href = data.github;

document.querySelector(".header img").src = data.photo;

document.querySelector(".edu-title").textContent = data.edu;