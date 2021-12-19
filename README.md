## ⚠️ Maintenance & support

This is a continuation of Manta App, I'm taking care about the maintenance and new features as I need it

> Note: The **auto-update** for *Mac* is **disabled** for now, I just bought the Developer Program and I'm waiting to be activated.

![GitHub all releases](https://img.shields.io/github/downloads/AndresMorelos/Invoncify/total?style=for-the-badge)
![GitHub release (latest by date)](https://img.shields.io/github/downloads/AndresMorelos/Invoncify/latest/total?color=green&style=for-the-badge)
[![Crowdin](https://badges.crowdin.net/invoncify/localized.svg)](https://crowdin.com/project/invoncify)

## Why I change the name?

I really want to continue with the **Manta** Name but there could be a name conflict in the App review and they would reject the app.

Ref: https://developer.apple.com/forums/thread/70708

---------

## Invoncify


A desktop application for creating invoices with beautiful and customizable templates.

<a href="#translation">Translation</a> •
<a href="#features">Features</a> •
<a href="#technologies">Technologies</a> •
<a href="#why">Why?</a> •
<a href="#goals">Goals</a> •
<a href="#development">Development</a> •
<a href="#faq">FAQ</a> •
<a href="#acknowledgement">Acknowledgement</a>

### Translation

Do you speak multiple languages? We need your help!

If you're interested in translating Invoncify, please see the [detailed instruction here](https://github.com/AndresMorelos/InvoncifyReleases/wiki/Translating-Invoncify).
The following languages are currently being translated, if you would like to Manta to support another language, [please submit your request here](https://github.com/AndresMorelos/InvoncifyReleases/issues/1).

* [🇨🇳 中文 (Chinese Simplified)](https://crowdin.com/project/invoncify/zh-CN)
* [🇨🇳 中文 (Chinese Traditional)](https://crowdin.com/project/invoncify/zh-TW)
* [🇩🇪 Deutsch (German)](https://crowdin.com/project/invoncify/de)
* [🇩🇰 Dansk (Danish)](https://crowdin.com/project/invoncify/da)
* [🇪🇸 Español (Spanish)](https://crowdin.com/project/invoncify/es-ES)
* [🇫🇷 Français (French)](https://crowdin.com/project/invoncify/fr)
* [🇬🇷 Ελληνικά (Greek)](https://crowdin.com/project/invoncify/el)
* [🇮🇩 Indonesian](https://crowdin.com/project/invoncify/id)
* [🇮🇹 Italiano (Italian)](https://crowdin.com/project/invoncify/it)
* [🇯🇵 日本語 (Japanese)](https://crowdin.com/project/invoncify/ja)
* [🇰🇷 한국어 (Korean)](https://crowdin.com/project/invoncify/ko)
* [🇱🇹 Lietuviškai (Lithuanian)](https://crowdin.com/project/invoncify/lt)
* [🇳🇱 Nederlands (Dutch)](https://crowdin.com/project/invoncify/nl)
* [🇵🇹 Português (Portuguese)](https://crowdin.com/project/invoncify/pt-PT)
* [🇧🇷 Portuguese, Brazilian (Brazil)](https://crowdin.com/project/invoncify/pt-BR)
* [🇷🇺 Русский (Russian)](https://crowdin.com/project/invoncify/ru)
* [🇹🇭 ไทย (Thai)](https://crowdin.com/project/invoncify/th)
* [🇹🇷 Türkçe (Turkish)](https://crowdin.com/project/invoncify/tr)
* [🇻🇳 Việt Nam (Vietnamese)](https://crowdin.com/project/invoncify/vi)
* [🇭🇷 Croatia (Croatian)](https://crowdin.com/project/invoncify/hr)

### Features
* 🎚 Flexible form. You can turn on/off field and save as default setting.
* 🏗 Drag & drop for reordering items. This makes editing easier.
* 📐 Use SVGs for logo for better printing.
* 🎨  Custom designed & highly customizable templates.
* 🏷 Custom statuses for invoices.
* 📊 Export PDF for print or email.
* 🔒Complete Privacy. You financial data stays where it belongs.
* 💯 Totally Free.

#### Supported Platforms
Following platforms are supported by Electron:

**macOS**
The minimum version supported is macOS 10.9.

**Windows**
Windows 7 and later are supported

**Linux:**

- Ubuntu 12.04 and later
- Fedora 21
- Debian 8

[More information](https://www.electronjs.org/docs/latest/tutorial/support#supported-platforms).

Note that on Linux, some users might experience a GPU bug where the select options rendered as a black box, see [issue #128 of Invoncify](https://github.com/hql287/Manta/pull/128) and [issue #4322 of Electron](https://github.com/electron/electron/issues/4322). This can be fixed by disabling hardware acceleration like so:

```sh
invoncify --disable-hardware-acceleration
```

> Remember that doing this might lead to some degradation of the app's performance. This is why "the fix" is not included by default.
