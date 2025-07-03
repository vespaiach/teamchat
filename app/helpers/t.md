- Create a TagHelper inject_assets and it will be used like this <%= inject_assets, ('entry-point'). The tag helper will read manifest.json file in public/tmp folder and use the entry-point parameter to look up assets for entry point and its dependencies. Then use that data to generate script tags and link tags, like this sample:
<script type="module" defer src="/tmp/sign-in-BEHMAWOG.js"></script>
<link rel="modulepreload" href="/tmp/common-OQSLGE5K.js">
<link rel="modulepreload" href="/tmp/common-722D7GMT.js">
<link rel="modulepreload" href="/tmp/common-WCTFNJAQ.js">
<link rel="modulepreload" href="/tmp/common-HPS6C7QP.js">