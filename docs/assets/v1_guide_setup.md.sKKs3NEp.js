import{_ as e,c as t,m as s,a as i,t as n,U as l,o as p}from"./chunks/framework.2BqUgkvO.js";const y=JSON.parse('{"title":"Setup","description":"","frontmatter":{"title":"Setup"},"headers":[],"relativePath":"v1/guide/setup.md","filePath":"v1/guide/setup.md"}'),o={name:"v1/guide/setup.md"},d={id:"frontmatter-title",tabindex:"-1"},c=s("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{$frontmatter.title}}"'},"​",-1),h=l(`<p>Check the <a href="https://nuxtjs.org/guides/configuration-glossary/configuration-modules" target="_blank" rel="noreferrer">Nuxt.js documentation</a> for more information about installing and using modules in Nuxt.js.</p><h2 id="installation" tabindex="-1">Installation <a class="header-anchor" href="#installation" aria-label="Permalink to &quot;Installation&quot;">​</a></h2><p>Add <code>nuxt-custom-elements</code> dependency to your project:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group--c68j" id="tab-emKMf2g" checked="checked"><label for="tab-emKMf2g">Yarn</label><input type="radio" name="group--c68j" id="tab-3-Ccmsi"><label for="tab-3-Ccmsi">NPM</label></div><div class="blocks"><div class="language-bash vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nuxt-custom-elements</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> nuxt-custom-elements</span></span></code></pre></div></div></div><p>Then, add <code>nuxt-custom-elements</code> to the <code>modules</code> section of <code>nuxt.config.js</code>:</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-8pRVk" id="tab-7tybZH4" checked="checked"><label for="tab-7tybZH4">nuxt.config.js</label></div><div class="blocks"><div class="language-js vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  modules</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;nuxt-custom-elements&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  customElements</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // Options</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div></div><p>See <a href="/v1/guide/options.html">module options</a>.</p>`,7);function r(a,k,u,g,m,v){return p(),t("div",null,[s("h1",d,[i(n(a.$frontmatter.title)+" ",1),c]),h])}const E=e(o,[["render",r]]);export{y as __pageData,E as default};
