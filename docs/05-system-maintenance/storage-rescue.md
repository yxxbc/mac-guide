# 深度拯救“系统数据”暴增：本地快照与大文件清理

在 macOS 的“系统设置” -> “通用” -> “储存空间”中，几乎每一个 Mac 用户都曾见过这个令人抓狂的景象：
**名为「系统数据 (System Data)」的色块疯狂暴增，占据了 50GB、80GB 甚至 120GB 宝贵的固态硬盘空间！**

苹果官方只给了一个灰色条块，既不告诉你里面是什么，也不提供清理按钮。

本章深入 APFS 文件系统底层，彻底挖出霸占空间的真凶并安全铲除。

---

## 1. 罪魁祸首一：Time Machine 本地快照 (Local Snapshots)

如果你曾经开启过“时间机器”备份，macOS 会在你的内置固态硬盘中悄悄生成 APFS 差异化**本地快照**。在系统统计中，这些快照全部被粗暴计入了“系统数据”。

### 1.1 诊断本地快照
在终端中执行：

```bash
# 列出系统盘上的所有本地快照
tmutil listlocalsnapshots /
```
如果输出了一长串类似 `com.apple.TimeMachine.2026-09-08-102540.local` 的记录，说明你的几十 GB 空间全被快照锁死了。

### 1.2 一键安全清除所有本地快照
运行以下一键清除命令：

```bash
# 遍历并安全删除全部时间机器本地快照
for snapshot in $(tmutil listlocalsnapshots / | grep "com.apple.TimeMachine" | awk -F'.' '{print $4}'); do
  sudo tmutil deletelocalsnapshots "$snapshot"
done
```
执行完毕后刷新储存空间设置，你会发现数以十计的 GB 空间瞬间被释放回来！

---

## 2. 罪魁祸首二：开发者缓存 (Xcode / Docker / 包管理)

如果你是一名开发者，“系统数据”通常是编译产生的陈旧垃圾：

### 2.1 Xcode 衍生数据与不可用模拟器
Xcode 在编译项目时会产生无底洞般的 `DerivedData`：

```bash
# 1. 清除 Xcode 编译临时衍生文件（完全安全，下次编译会自动重新生成）
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# 2. 清除已经废弃的老旧 iOS 模拟器镜像
xcrun simctl delete unavailable
```

### 2.2 Homebrew 与 Node.js 缓存
```bash
# 清理 Homebrew 下载包缓存
brew cleanup -s

# 清理 npm / pnpm 全局临时文件
pnpm store prune 2>/dev/null || npm cache clean --force
```

---

## 3. 罪魁祸首三：聊天软件（微信/Telegram）文件膨胀

微信等国产桌面客户端通常将图片、视频和群文件存放在 macOS 的沙盒保护目录深处：
`~/Library/Containers/com.tencent.xinWeChat/Data/Library/Application Support/com.tencent.xinWeChat/`

在微信设置的“通用” -> “存储空间”中，定期点击“管理微信存储空间”，清理失效的群聊视频与聊天记录。

---

## 4. 可视化空间分析神器

不要去猜哪里占了空间，用工具直观呈现：

### 4.1 终端极客利器：`dust`
```bash
brew install dust

# 扫描个人主目录前两级目录体积，树状彩色展示
dust -d 2 ~
```

### 4.2 开源图形化树状图：GrandPerspective
```bash
brew install --cask grandperspective
```
打开后选择全盘扫描，它会用不同大小的彩色方块展示全盘文件，任何超过 1GB 的无用大文件、遗忘的虚拟磁盘镜像，在它面前无所遁形。
