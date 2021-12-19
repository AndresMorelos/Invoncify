## ⚠️ Maintenance & support

This is a continuation of Manta App, I'm taking care about the maintenance and new features as I need it

![GitHub all releases](https://img.shields.io/github/downloads/AndresMorelos/InvoncifyReleases/total?style=for-the-badge)
![GitHub release (latest by date)](https://img.shields.io/github/downloads/AndresMorelos/InvoncifyReleases/latest/total?color=green&style=for-the-badge)

---------

## Invoncify


A desktop application for creating invoices with beautiful and customizable templates.

<a href="#features">Features</a> •
<a href="#technologies">Technologies</a> •
<a href="#why">Why?</a> •
<a href="#goals">Goals</a> •
<a href="#development">Development</a> •
<a href="#faq">FAQ</a> •
<a href="#acknowledgement">Acknowledgement</a>

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
