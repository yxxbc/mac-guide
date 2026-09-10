# 用 Lua 脚本操纵一切：Hammerspoon 桌面自动化

对于终极折腾玩家而言，任何现成的 GUI 工具都比不上自己亲手写代码操纵操作系统。

**Hammerspoon** 是 macOS 平台上久负盛名的自动化瑞士军刀：它本质上是一个**连接 macOS 系统底层 Objective-C/Swift API 与轻量级 Lua 脚本引擎的高性能桥梁**。

通过写几行精简的 Lua 脚本，你可以随心所欲监听系统事件并自动化一切。

---

## 1. 安装与初始化

```bash
brew install --cask hammerspoon
```

启动 Hammerspoon 并授予其必要的辅助功能权限。其核心入口配置文件位于 `~/.hammerspoon/init.lua`。

---

## 2. 实战大招一：防“社死”拔耳机自动静音

在图书馆、自习室或安静的办公室，一旦蓝牙耳机没电断连，或者手滑碰掉了有线耳机线，MacBook 澎湃的六扬声器可能会瞬间将正在播放的声音大声外放，造成顶级社死现场。

在 `~/.hammerspoon/init.lua` 中添加以下 10 行脚本：

```lua
-- 监听音频输出设备变动
function audiodeviceWatch(event)
  if event == "dev#" then
    local currentDevice = hs.audiodevice.defaultOutputDevice()
    -- 如果当前设备变更为内置扬声器（说明耳机已拔出断开）
    if currentDevice:name() == "MacBook Pro 扬声器" or currentDevice:name() == "内置扬声器" then
      -- 瞬间执行全局静音
      currentDevice:setMuted(true)
      hs.alert.show("🔇 扬声器已自动静音，防止社死！", 2)
    end
  end
end

hs.audiodevice.watcher.setCallback(audiodeviceWatch)
hs.audiodevice.watcher.start()
```
*保存后，只要耳机断开，系统音量瞬间掐断，安全感拉满。*

---

## 3. 实战大招二：Wi-Fi 感知与场景自适应

当你的 MacBook 在“公司”与“家”之间移动时，网络环境往往需要切换：

```lua
-- 监听 Wi-Fi 网络 SSID 变化
local wifiWatcher = hs.wifi.watcher.new(function()
  local currentSSID = hs.wifi.currentNetwork()
  if currentSSID == "Company-Office-5G" then
    hs.alert.show("🏢 已连入公司网络，启动工作流")
    -- 比如自动开启办公代理环境或内网挂载
  elseif currentSSID == "Home-Sweet-Home" then
    hs.alert.show("🏠 已连入家庭网络，欢迎回家")
  end
end)
wifiWatcher:start()
```

---

## 4. 优雅保存：配置文件修改自动重载

在 `init.lua` 顶部加入自动监控重载逻辑，以后每次用编辑器修改该文件，Hammerspoon 都会自动热重载，无需手动点击：

```lua
-- 监听 init.lua 文件变化并自动重载
hs.pathwatcher.new(os.getenv("HOME") .. "/.hammerspoon/", function(files)
  for _, file in pairs(files) do
    if file:sub(-4) == ".lua" then
      hs.reload()
      hs.alert.show("✨ Hammerspoon 配置已热重载")
      return
    end
  end
end):start()
```
