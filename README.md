> 这是个人的在线简历，既用于招聘，又用来练习前端熟练度。

## 技术栈（暂定）

- HTML
- CSS
- Javascript

## 当前

- [X] 用于快速打造一个个人在线简历，方便展示/本地打印。

## 未来

- 做一些审美甚至点击交互的升级
- 每一块都能控制展示与否，应对不同的招聘需求

---

<!-- ============ 临时：优化路线，push 前删除本节 ============ -->

## 优化路线（临时记录）

**基调**：单版本、深蓝配色（参考图 2 的色彩强度 + 图 1 的信息组织）、纯原生 HTML/CSS/JS，无构建工具。
**节奏**：每步只动一两个地方，改完立刻刷新浏览器看效果，跑通再进下一步。每步做完 commit 一次，方便回滚。

### 架构（最终形态）

```
index.html            骨架 + 各区块内容
css/style.css         样式（:root 变量统一色板与间距）
data/resume.demo.js   占位数据，提交进 git
data/resume.local.js  真实数据，已被 .gitignore 排除
js/app.js             头部数据填充 + 区块显示开关
asset/photo.jpg       证件照
```

保留现有的 `window.RESUME || window.DEMO_RESUME` 兜底写法：本地有真实数据就用真实的，没有就退回 demo（线上演示用）。

### Step 1 设计变量

- 在 `css/style.css` 顶部写 `:root { ... }`，定义主色、辅助色、文字色、分割线、底色、间距。
- 把现有的 `#222` / `#555` / `#666` / `#eee` / `#fff` 换成 `var(--...)`。
- **验收**：外观和现在几乎一样（这步是纯重构），但只改 `--primary` 一行，全站主色就跟着变。

### Step 2 头部信息网格

- `<header>` 里加一块信息网格：求职意向、年龄、手机、邮箱、GitHub，两列排布，右侧仍是证件照。
- `data/resume.local.js` 补 `intro` / `age` / `github` 字段；`js/app.js` 分别填进对应元素，不再拼成一行字符串。
- 关键语法：`display: grid; grid-template-columns: auto 1fr auto 1fr;`
- **验收**：5 项信息两行对齐，姓名和求职意向在最上方，打印不溢出。

### Step 3 区块标题条 + SVG 图标

- `<h2>` 改造成横条：浅色底、左侧 4px 主色竖条、圆角、图标 + 文字。
- 图标用内联 `<svg viewBox="0 0 24 24">`，配 `fill="currentColor"`，尺寸交给 CSS。不引 iconfont（离线和打印都更稳）。
- 需要 4 个图标：教育、技能、证书、项目（预留）。
- **验收**：每个区块标题都是明显的视觉锚点，灰度打印也分得清层级。

### Step 4 条目三段式

- 教育 / 项目 / 实习统一结构：`标题` + `机构或角色` + `日期` 三段，日期靠右。
- 关键语法：`.item-head { display: flex }` + `.item-date { margin-left: auto }`
- **验收**：多条并列时右边界对齐，日期不换行。

### Step 5 技能 chip + 证书区块

- 技能从 `<p><b>前端</b>: ...</p>` 改成 `<ul class="chips">` + 若干 `<li>`，每个是浅底圆角小标签。
- 新增"证书与语言"区块：CET-4 603 / CET-6 522。
- 关键语法：`.chips { display: flex; flex-wrap: wrap; gap: 6px }`
- **验收**：标签自动换行不重叠，打印时不在行中间截断。

### Step 6 一页纸

- 单位统一：字号用 `pt`，间距和页边距用 `mm`，边框保留 `px`。
- Chrome 打印预览必须只有 1 页；超了就删内容，不靠缩小字号。
- **验收**：`Ctrl+P` 预览一页，底部不留大片空白。

### Step 7 区块开关

- HTML：每个 `<section>` 加 `data-section="edu"` 这类标识；新增浮动 `.toolbar`，里面每个 checkbox 对应一块。
- CSS：`.is-hidden { display: none !important }` + `@media print { .toolbar { display: none } }`
- JS：读 `localStorage` 恢复状态 → checkbox 绑 `change` → 切换 class → 写回 `localStorage`。
- **验收**：勾掉一块，屏幕上消失、打印出的 PDF 里也没有、刷新后状态保持。

### Step 8 打印与移动端

- `@media print`：去掉阴影、页边距归零、隐藏 `.toolbar`、`break-inside: avoid` 保护条目。
- `@media screen and (max-width: 820px)`：纸变成流式（`width: 100%`），头部改单列。
- **验收**：手机打开无横向滚动；导出的 PDF 文字可选中、颜色保留。

### Step 9（可选）内容数据化

- 只有以后要做"后端版 / Agent 版"切换时才需要：把各 section 的内容挪进 `data/resume.js` 的 `sections` 数组，用 `render()` 生成 DOM。
- 现在不做，避免难度陡增。
