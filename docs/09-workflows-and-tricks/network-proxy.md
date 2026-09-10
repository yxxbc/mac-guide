# macOS 网络代理避坑与极客指南

在 macOS 上进行开源开发，网络配置是几乎每个开发者都曾摔过跤的环节：
明明图形代理软件已经开启，浏览器能正常访问，但终端里的 `curl`、`git clone`、`brew install` 依然超时甚至连接被重置。

本章彻底理清 macOS 代理分层逻辑与终极解法。

---

## 1. 核心认知：macOS 代理的三层隔离

macOS 的网络流量处理机制分为严格的三层，互不相通：

1. **第一层：系统设置代理 (System Proxy)**
   - 绝大多数桌面浏览器（Safari/Chrome）遵循此设置；
   - **终端命令行程序（curl/git/brew/python）默认 100% 忽略系统代理！**
2. **第二层：终端环境变量 (Environment Variables)**
   - 依赖 `http_proxy`、`https_proxy`、`all_proxy`；
   - 仅在当前 Shell 会话中生效，但无法代理不走 HTTP 的原始 UDP / ICMP 协议（如 `ping`）。
3. **第三层：虚拟网卡 TUN 模式 (Virtual Network Interface)**
   - 在系统网络栈虚拟一块网卡，接管整台机器的全部 L3/L4 IP 数据包（包括终端、原生应用、系统进程与 DNS 查询）。

---

## 2. 命令行专属：即开即关的 Proxy 函数

不要在 `~/.zshrc` 中永久写死 `export http_proxy`，这会导致本地局域网调试、内网服务或 Docker 内部通信出现诡异问题。

推荐在 `~/.zshrc` 中定义一对极速开关函数：

```zsh
# 假设你的本地客户端监听在 7890 端口（根据实际端口修改）
PROXY_PORT=7890

# 开启终端代理
proxy() {
  export http_proxy="http://127.0.0.1:${PROXY_PORT}"
  export https_proxy="http://127.0.0.1:${PROXY_PORT}"
  export all_proxy="socks5://127.0.0.1:${PROXY_PORT}"
  export ALL_PROXY="socks5://127.0.0.1:${PROXY_PORT}"
  echo "✔ 终端代理已开启 (127.0.0.1:${PROXY_PORT})"
}

# 关闭终端代理
unproxy() {
  unset http_proxy https_proxy all_proxy ALL_PROXY
  echo "✖ 终端代理已关闭"
}

# 测试当前外网 IP 与地理位置
myip() {
  curl -s -m 5 https://ipinfo.io/json | jq . || curl -s -m 5 https://api.ip.sb/geoip
}
```

使用方式：
需要拉取大仓库或安装外网依赖时，输入 `proxy`，搞定后输入 `unproxy`，随时掌握主动权。

---

## 3. Git 特异性加速配置

Git 客户端支持针对特定域名（如 GitHub）单独设置代理，且不影响国内代码托管平台（如 Gitee / 公司内部 GitLab）：

### 3.1 仅对 GitHub 启用 HTTP 代理
```bash
# 针对 github.com 独立设置代理
git config --global http.https://github.com.proxy "http://127.0.0.1:7890"
git config --global https.https://github.com.proxy "http://127.0.0.1:7890"
```

### 3.2 针对 Git over SSH 的代理配置
如果你习惯使用 `git@github.com:...` 的 SSH 方式克隆：
编辑 `~/.ssh/config`，添加以下段落（利用 macOS 自带的 `nc` 工具转发）：

```ssh
Host github.com
  User git
  ProxyCommand nc -X 5 -x 127.0.0.1:7890 %h %p
```

---

## 4. 全局霸权：TUN 虚拟网卡模式

现代代理客户端（如 **Surge**、**Clash Verge Rev**、**Sing-box**）均提供 **TUN 模式**。

### 4.1 TUN 模式的核心收益
- 一旦开启 TUN 模式，所有终端、IDE 插件下载、Go/Rust/Python 包管理器均自动走代理，**无需在终端执行任何 `export` 或配置**。
- 彻底解决 GitHub 释放的 DNS 污染问题。

### 4.2 避坑要点：与 OrbStack / Docker 路由冲突
在开启 TUN 模式时，如果发现 OrbStack 无法访问网络或容器内域名解析失败：
- 确保在代理客户端的“直连 / 绕过”规则中，加入了 `*.orb.local` 与私有保留网段（`192.168.0.0/16`, `10.0.0.0/8`, `172.16.0.0/12`）。

### 4.3 macOS 刷新 DNS 缓存黄金命令
如果修改了 hosts 或网络环境后域名依然解析到旧 IP，使用原生指令强制刷新：

```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```
