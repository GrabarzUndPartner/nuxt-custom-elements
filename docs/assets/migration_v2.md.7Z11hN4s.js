import{_ as a,o as i,c as s,k as e,a as r,t as o,R as l}from"./chunks/framework.oadXRzgC.js";const _=JSON.parse('{"title":"Migrate from v1 to v2","description":"","frontmatter":{"title":"Migrate from v1 to v2"},"headers":[],"relativePath":"migration/v2.md","filePath":"migration/v2.md"}'),n={name:"migration/v2.md"},c={id:"frontmatter-title",tabindex:"-1"},d=e("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{$frontmatter.title}}"'},"​",-1),p=l('<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>Please note the issue.</p><p><a href="https://github.com/GrabarzUndPartner/nuxt-custom-elements/issues/433" target="_blank" rel="noreferrer">https://github.com/GrabarzUndPartner/nuxt-custom-elements/issues/433</a></p></div><h2 id="builder" tabindex="-1">Builder <a class="header-anchor" href="#builder" aria-label="Permalink to &quot;Builder&quot;">​</a></h2><p>Nuxt 3 supports the following builders:</p><ul><li><a href="https://vitejs.dev/" target="_blank" rel="noreferrer">Vite</a></li><li><a href="https://webpack.js.org/" target="_blank" rel="noreferrer">Webpack</a></li></ul><p>This is controlled by the Nuxt option <code>builder</code>. If builder <code>@nuxt/webpack-builder</code> is set, the custom elements will also be a webpack build.</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-lDNhV" id="tab-pBHy5sN" checked="checked"><label for="tab-pBHy5sN">nuxt.config</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  builder</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@nuxt/webpack-builder&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span></code></pre></div></div></div><h2 id="entry-file" tabindex="-1">Entry File <a class="header-anchor" href="#entry-file" aria-label="Permalink to &quot;Entry File&quot;">​</a></h2><p>It is recommended to set the entry file with the file extension <code>.ce.vue</code>.</p><p>With <code>.ce.vue</code> in Dev-Mode the component can be used as CustomElement.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If no <code>.ce.vue</code> is set, the CSS of the component is missing in dev mode.</p></div>',10);function h(t,u,m,b,k,v){return i(),s("div",null,[e("h1",c,[r(o(t.$frontmatter.title)+" ",1),d]),p])}const g=a(n,[["render",h]]);export{_ as __pageData,g as default};
