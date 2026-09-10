# 本地开发域名与 Hosts 管理：避开 .local 陷阱

在进行前后端联调、微服务测试或屏蔽某些特定域名时，修改 `/etc/hosts` 是开发者的家常便饭。

但在 macOS 下，修改 Hosts 文件经常会遭遇两个极其诡异的“灵异现象”：
1. 编辑了 `/etc/hosts`，浏览器里刷新却依然访问旧 IP；
2. 配置了形如 `myproject.local` 的本地域名，访问时居然要卡顿死等 5 秒钟才响应！

本章为你揭开 macOS 网络栈与 mDNS 的底层秘密。

---

## 1. 避开绝对大坑：千万不要在 Mac 上使用 `.local` 顶级域名！

许多开发者习惯在 hosts 中配置：
`127.0.0.1 api.local` 或 `127.0.0.1 frontend.local`。

**在 macOS 上，这是严重的翻车根源**：
macOS 内部的 **Bonjour / mDNS (多播 DNS)** 服务将所有 `.local` 结尾的域名保留为**局域网零配置发现协议（Multicast DNS）**专用！
- 当你访问 `api.local` 时，macOS 会优先向局域网广播发起 mDNS 广播探测；
- 探测无果超时后（通常整整耗时 2~5 秒），系统才会回落去读取 `/etc/hosts`；
- 这会导致你的每一个本地 API 请求都背负长达数秒的无意义网络延迟！

### 推荐的本地开发顶级域名标准：
遵循 IETF RFC 2606 规范，在 macOS 上请务必改用以下保留后缀：
- **`.test`**（例如 `api.test`）
- **`.localhost`**（例如 `web.localhost`）
- **`.internal`**（例如 `service.internal`）

---

## 2. 刷新系统 DNS 缓存的正确姿势

当你更新了 `/etc/hosts` 后，macOS 的 `mDNSResponder` 守护进程依然保留着旧缓存。

直接在终端执行刷新组合拳：

```bash
# 刷新本地目录服务缓存并唤醒 mDNSResponder
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
执行后无需重启浏览器，新 IP 映射即可瞬间生效。

---

## 3. 生产力管理工具：SwitchHosts

如果你需要在“本地开发环境”、“测试环境”、“预发环境”和“生产环境”之间频繁切换大量不同的 Hosts 规则：

由国内开源作者维护的 **SwitchHosts** 是跨平台最好用的 Hosts 管理器：
- 语法高亮与行内注释；
- 支持将公司内部统一的 Hosts 托管在 Git 或远端服务器上，定时自动拉取更新；
- 菜单栏一键无感打勾切换，自动静默刷新 macOS 系统 DNS 缓存。

### 安装
```bash
brew install --cask switchhosts
```
配合使用，可以彻底告别手工在终端里 `sudo vim /etc/hosts` 的低效模式。
