/* -*- Mode: Javascript; indent-tabs-mode:nil; js-indent-level: 2 -*- */
/* vim: set ts=2 et sw=2 tw=80: */

/*************************************************************
 *
 *  MathJax/config/local/local.js
 *
 *  Include changes and configuration local to your installation
 *  in this file.  For example, common macros can be defined here
 *  (see below).  To use this file, add "local/local.js" to the
 *  config array in MathJax.js or your MathJax.Hub.Config() call.
 *
 *  ---------------------------------------------------------------------
 *
 *  Copyright (c) 2009-2017 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
MathJax.Hub.Config({
  // Only one of the two following lines, depending on user settings
  // First allows browser-native MathML display, second forces HTML/CSS
  //  config: ["MMLorHTML.js"], jax: ["input/TeX"],
    
  jax: ["input/TeX", "output/HTML-CSS"],
  extensions: ["tex2jax.js","TeX/AMSmath.js","TeX/AMSsymbols.js",
               "TeX/noUndefined.js"],
  tex2jax: {
    inlineMath: [ ["\\(","\\)"] ],
    displayMath: [ ['$$','$$'], ['\\[','\\]'], ["\\begin{displaymath}","\\end{displaymath}"],["\\begin{align*}","\\end{align*}"] ],
    skipTags: ["script","noscript","style","textarea","pre","code"],
    ignoreClass: "tex2jax_ignore",
    processEscapes: false,
    processEnvironments: true,
    preview: "TeX"
  },
  showProcessingMessages: true,
  displayAlign: "center",
  displayIndent: "2em",

  "HTML-CSS": {
    scale: 100,
    availableFonts: ["STIX","TeX"],
    preferredFont: "TeX",
    webFont: "TeX",
    imageFont: "TeX",
    showMathMenu: true,
  },
  MMLorHTML: {
    prefer: {
      MSIE:    "MML",
      Firefox: "MML",
      Opera:   "HTML",
      other:   "HTML"
    }
  }
});




MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
  var TEX = MathJax.InputJax.TeX;

  // place macros here.  E.g.:
  //   TEX.Macro("R","{\\bf R}");
  //   TEX.Macro("op","\\mathop{\\rm #1}",1); // a macro with 1 parameter

// Ajit: my macros
TEX.Macro("nl","{\\nabla}");
TEX.Macro("Sig","{\\Sigma}");
TEX.Macro("Om","{\\Omega}");
TEX.Macro("om","{\\omega}");
TEX.Macro("Gm","{\\Gamma}");
TEX.Macro("tor","{\\rightarrow}");
TEX.Macro("R","{\\mathbf\{R\}}");
TEX.Macro("p","{\\partial}");
TEX.Macro("nl","{\\nabla}");
TEX.Macro("Dt","{\\Delta}");
TEX.Macro("dt","{\\delta}");
TEX.Macro("ep","{\\epsilon}");
TEX.Macro("vp","{\\varphi}");
TEX.Macro("ve","{\\mathbf{\\varepsilon\}}");
TEX.Macro("divc","{\\mathbf\{div\}}");
});





MathJax.Ajax.loadComplete("[MathJax]/config/local/local.js");
