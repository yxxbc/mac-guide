# 效率中枢：Raycast 深度配置与工作流

在 macOS 上，Spotlight（聚焦搜索）的功能过于薄弱，而老牌的 Alfred 无论在 UI 质感、现代扩展生态还是社区活跃度上，都已被现代新星 **Raycast** 全面超越。

Raycast 不仅是一个应用启动器，更是现代 macOS 生产力工作流的绝对中枢。

---

## 1. 为什么坚决推荐 Raycast？

1. **一把梭替代多款独立软件**：
   - 内置**剪贴板历史管理器**（无需再装 Paste / Maccy）；
   - 内置**文本片段扩展（Snippets）**（无需再装 TextExpander）；
   - 内置**取色器（Color Picker）**、**轻量浮动便签（Floating Notes）**、**系统监控与进程查杀（Kill Process）**；
2. **极速的原生架构**：基于 Rust 与 Swift 构建，极速响应，现代深色毛玻璃 UI 与 macOS 深度融合；
3. **强大的开源插件市场（Raycast Store）**：拥有数千款高质量社区插件，且完全免费无内购壁垒。

---

## 2. 安装与系统快捷键无缝接管

### 2.1 安装
```bash
brew install --cask raycast
```

### 2.2 替换系统默认 Spotlight (Command + Space)
1. 打开 `系统设置` -> `键盘` -> `键盘快捷键...`；
2. 选择左侧的 **Spotlight** 分栏，**取消勾选** “显示聚焦搜索 (Command + 空格键)”；
3. 打开 Raycast Preferences（快捷键 `Cmd + ,`），在 `General` -> `Raycast Hotkey` 中按下 `Command + Space`。

至此，按下 `Command + Space` 将呼出强大的 Raycast 界面。

---

## 3. 必配的核心生产力扩展推荐

在 Raycast 中输入 `Store` 即可进入插件商店，强烈推荐安装以下核心扩展：

### 3.1 杀掉流氓进程：Kill Process
- 遇到卡死或占用 100% CPU 的进程时，呼出 Raycast 敲 `kill`，模糊搜索进程名，回车直接 `SIGKILL`，比打开 Activity Monitor 快十倍。

### 3.2 软件包即搜即装：Brew
- 在启动器内直接搜索 Homebrew 的 Formula 和 Cask，查看软件描述、星标数，并可直接在界面内一键触发安装或查看依赖。

### 3.3 GitHub 极速工作流：GitHub
- 快速检索你的 Stars 仓库、PR 列表、未处理的 Issues 和通知，回车秒开网页或复制链接。

### 3.4 开发者百宝箱：Developer Utilities
- 包含 JSON 格式化校验、Base64 编解码、JWT 解析、时间戳转换、UUID 生成等，无需打开任何网页小工具。

---

## 4. 文本片段与快捷回复 (Snippets)

Raycast 内置的 Snippets 功能支持通过简单的关键词前缀（如 `!` 或 `;`）自动展开高频文本。

建议配置的高频片段：
- `!mail` 自动展开为你的主邮箱地址；
- `!sh` 自动展开为 `#!/usr/bin/env bash\nset -euo pipefail`；
- `!today` 自动插入当前格式化日期。

结合全键盘操作，你几乎无需离开主键盘区即可处理 90% 的桌面日常事务。
