<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="doc-license-footer">
        <div class="doc-license-divider"></div>
        <p class="doc-license-text">
          <span>本文档遵循 <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh" target="_blank" rel="noopener noreferrer">CC BY-NC-ND 4.0 国际许可协议</a> 保护</span>
          <span class="doc-license-separator">·</span>
          <span>商业转载需授权，严禁任何形式的闭门付费倒卖</span>
        </p>
        <p class="doc-license-copyright">
          Copyright © 2026 <strong>yxxbc</strong> & mac-guide contributors. All rights reserved.
        </p>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.doc-license-footer {
  margin-top: 3.5rem;
  padding-bottom: 2.5rem;
  text-align: center;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.doc-license-divider {
  width: 100%;
  height: 1px;
  background-color: var(--vp-c-divider);
  margin-bottom: 1.5rem;
}

.doc-license-text a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
  transition: color 0.25s;
}

.doc-license-text a:hover {
  color: var(--vp-c-brand-2);
}

.doc-license-separator {
  margin: 0 0.5rem;
  opacity: 0.5;
}

.doc-license-copyright {
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
</style>
