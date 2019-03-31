## Notes

- The `connect-src https://gloapi.gitkraken.com/;` and `script-src 'self' 'sha256-5As4+3YpY62+l38PsxCEkjB1R4YtyktBtRScTJ3fyLU='` in the [Chrome manifest's CSP](https://github.com/radi-cho/Glomium/blob/master/frontend/public/manifest.json#L17) are needed to allow requests to GitKraken and proper functioning of the CRA boilerplate.
