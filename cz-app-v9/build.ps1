#!/system/bin/sh
# 检查node_modules文件夹是否存在
# yarn

# if (Test-Path .\dist\){
#     rm .\dist\ -Force -Recurse
# }

# if(Test-Path .\out\){
#     rm .\out\ -Force -Recurse
# }
# 执行vue构建
node node_modules/typescript/bin/tsc -b
# 执行webpack打包，这样就不需要将node_modules带到打包后apk中，减少apk体积和启动时间
node node_modules/webpack/bin/webpack.js

$OFS = "`r`n"
$content = Get-Content -Path dist/main.node.js
Set-Content -Path dist/main.node.js -Value ('"ui";' + $OFS + $content)

Copy-Item .\dist\main.node.js -Destination "\\192.168.16.149\tools\js\CZ\scripts\1.0.0\main.node.js"