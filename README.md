# Rex's Action

Redeploy docker compose containers after git push

### Example usage:

```yaml
uses: mbaraa/rex-action@v0.7
with:
    server-url: "example.com"
    token: ${{ secrets.REX_KEY }}
    repo-name: "repoName"
```

```yaml
jobs:
  rex-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: rex-7567-e27
        uses: mbaraa/rex-action@v0.7
        with:
          server-url: https://rex.mbaraa.com
          token: ${{ secrets.REX_KEY }}
          repo-name: crowpay_backend

```
