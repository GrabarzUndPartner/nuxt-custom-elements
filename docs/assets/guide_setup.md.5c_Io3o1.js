import{_ as e,o as t,c as i,k as s,a as n,t as l,R as p}from"./chunks/framework.6zm7bCQa.js";const E=JSON.parse('{"title":"Setup","description":"","frontmatter":{"title":"Setup"},"headers":[],"relativePath":"guide/setup.md","filePath":"guide/setup.md"}'),o={name:"guide/setup.md"},d={id:"frontmatter-title",tabindex:"-1"},h=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{$frontmatter.title}}"'},"​",-1),c=p(`<p>Check the <a href="https://nuxtjs.org/guides/configuration-glossary/configuration-modules" target="_blank" rel="noreferrer">Nuxt.js documentation</a> for more information about installing and using modules in Nuxt.js.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>Add <code>nuxt-custom-elements</code> dependency to your project:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-BwC--" id="tab-b9_C1EP" checked="checked"><label for="tab-b9_C1EP">Yarn</label><input type="radio" name="group-BwC--" id="tab-NtTWSvG"><label for="tab-NtTWSvG">NPM</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nuxt-custom-elements@beta</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nuxt-custom-elements@beta</span></span></code></pre></div></div></div><p>Then, add <code>nuxt-custom-elements</code> to the <code>modules</code> section of <code>nuxt.config.js</code>:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-2JYuo" id="tab-YOmbDTx" checked="checked"><label for="tab-YOmbDTx">nuxt.config.js</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  modules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;nuxt-custom-elements&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  customElements</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Options</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div></div><p>See <a href="/guide/options.html">module options</a>.</p>`,7);function r(a,k,u,g,m,b){return t(),i("div",null,[s("h1",d,[n(l(a.$frontmatter.title)+" ",1),h]),c])}const _=e(o,[["render",r]]);export{E as __pageData,_ as default};