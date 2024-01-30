import{_ as e,c as t,m as s,a as i,t as n,V as l,o}from"./chunks/framework.sg3AF1FH.js";const E=JSON.parse('{"title":"Setup","description":"","frontmatter":{"title":"Setup"},"headers":[],"relativePath":"guide/setup.md","filePath":"guide/setup.md"}'),p={name:"guide/setup.md"},d={id:"frontmatter-title",tabindex:"-1"},c=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{$frontmatter.title}}"'},"​",-1),h=l(`<p>Check the <a href="https://nuxtjs.org/guides/configuration-glossary/configuration-modules" target="_blank" rel="noreferrer">Nuxt.js documentation</a> for more information about installing and using modules in Nuxt.js.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>Add <code>nuxt-custom-elements</code> dependency to your project:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-VhEIi" id="tab-reIz8ua" checked="checked"><label for="tab-reIz8ua">Yarn</label><input type="radio" name="group-VhEIi" id="tab-aq1D02H"><label for="tab-aq1D02H">NPM</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add nuxt-custom-elements@beta</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install nuxt-custom-elements@beta</span></span></code></pre></div></div></div><p>Then, add <code>nuxt-custom-elements</code> to the <code>modules</code> section of <code>nuxt.config.js</code>:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-wYHTF" id="tab-T8D44JP" checked="checked"><label for="tab-T8D44JP">nuxt.config.js</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  modules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;nuxt-custom-elements&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  customElements</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Options</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div></div><p>See <a href="/guide/options.html">module options</a>.</p>`,7);function r(a,u,k,g,m,b){return o(),t("div",null,[s("h1",d,[i(n(a.$frontmatter.title)+" ",1),c]),h])}const _=e(p,[["render",r]]);export{E as __pageData,_ as default};