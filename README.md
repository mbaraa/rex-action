# Rex's Action

Redeploy docker compose containers after git push

### Example usage:

```yaml
uses: mbaraa/rex-action@v0.3
with:
    server-url: "example.com"
    token: ${{ secrets.REX_TOKEN }}
    repo-name: "repoName"
```
