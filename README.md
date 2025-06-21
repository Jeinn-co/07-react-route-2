- **Git remote 指令**
```
git remote -v

git remote set-url origin <新的 Git URL>

git remote remove origin


```

- **Support for .js / .jsx 檔案**
```
{
  "compilerOptions": {
    "allowJs": true,    // ✅ 允許編譯 .js / .jsx 檔案
    "checkJs": false,   // ✅ 不對 JS 做嚴格型別檢查（可後續改成 true）
  }
}
```