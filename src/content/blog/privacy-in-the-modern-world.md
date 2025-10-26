---
title: Privacy in the modern world
description: A collection of casual and unfiltered notes on how to achieve increased privacy online.
createdAt: September, 2025
index: 2
---

Many of the notes below have varying levels of complexity, compromises and efficiency. Given the ever evolving nature of technology, it's difficult to guarantee that anything is foolproof or failsafe, however, the aim is set some strong principles and foundations to then build on as the world evolves. As with everything, there are tradeoffs and in this case it's often convenience. 

While many of the decisions have the goal of privacy in mind, this is a highly opinionated list of notes and it's encouraged to personalise and adjust it to your specific use-cases and setup.

## Principles
- Aim for simplicity.
- Favour tools and services with open standards to reduce vendor lock in.
- Reduce reliance on third party services.
- The cloud is just someone else's computer. When used carefully, it's incredibly convenient, just don't always default to it.
- Maintain separation of concerns between services. Avoid using many products from one service (especially proprietary ones).
- Abide by the principle of least privilege.

## Quick thoughts
- End to end encryption is all or nothing. The moment you introduce a backdoor for good actors, bad actors now have an in.
- A decentralised protocol/technology doesn't necessarily mean it's decentralised in power (ie some entity could have ownership of a large amount of nodes).
- Shift from ownership to leasing. We're constantly owning less and less of the items we purchase and instead have licences and agreements to lease or access it. Try opt for fully accessing and owning the product being sold where possible.

## Opinions
- SaaS fatigue is real - we're at the beginning of a shift back to on-prem deployments, perpetual licenses and reducing subscriptions.

---

## Fundamentals
### Choosing software
- When deciding between tools, evaluate the following:
	- Active community/creator
	- Well maintained with regular updates
	- Open source
		- Able to self host full service
	- Good cross platform support 
		- Depending on what it is, it ideally has support for Android via direct download from GitHub releases or equivalent (which you can then add to Obtainium). Fallback to Google Play if necessary.
	- Able to backup and store config easily to replicate quickly (ie deploy with docker and save `docker-compose.yml` file).

### Running apps
- Default to web apps where possible
	- Avoid downloading apps directly to your device and use web clients when available
	- Utilise browser isolation
		- Use Firefox containers on desktop devices
		- On mobile, download different browsers and containerise apps that way (or with different profiles in GrapheneOS)
- Avoid authenticating into services with SSO
- Give the least amount of app permission as possible
- Backup all data regularly (try automate it as much as possible, as it's often the first thing that isn't done otherwise)
- 321 Backup rule
	- 3 copies of your data
	- 2 copies in different media formats
	- 1 copy offsite 

---

## Operating Systems
### Android GrapheneOS
Notable highlights:
- Sandboxed Google Play services
- MAC address randomisation 
- Metadata removal from images
- Storage and contact scopes
- App network permission

Somethings which can get annoying (and that are generally hard for GrapheneOS to fix): 
- Lack of tap-to-pay support with Google Pay
- Some apps may not be supported if they use the Google play integrity API

Would be nice:
- If they allowed true app sandboxing (not just through creating new profiles)

#### Key apps
- Orbot - VPN over the Tor network
- Obtainium
- NewPipe
- VLC
	- Able to add media downloaded from NewPipe into VLC
	- Unfortunately, can't currently connect to WebDav server
- Readrops
- Davx5
- Calendar by FossifyOrg
- Organic maps
	- Just make sure to download locations ahead of time
	- Apple maps via web is also pretty good (maps.apple.com) as a fallback

## Desktop firewall
- MacOS: Littlesnitch or Lulu
- Linux: OpenSnitch

---

## File Management
For key aspects of your digital life such as files, contacts and calendar, backing them up to the cloud is generally a good idea (in addition to your own on-site backup) to fulfill the 3-2-1 backup rule. While the cloud is just someone else's computer and therefore hard to fully trust, encrypting your files client side before backing up significantly reduces the trust factor you would have otherwise had to have with the cloud provider.

There are 2 main options:
1. Use Cryptomator if you don't want to use Borg and want to do full syncs to the cloud (without an encryption layer in your backup solution). You can then backup the files using CyberDuck to your file server (e.g. using SFTP). You can use a cloud provider such as rsync.net, Backblaze or even S3.
2. Otherwise, Borg and backing it up using Borgmatic (script) or Vorta (desktop GUI) is a good option.
	- You can use a third-party Borg server to backup your encrypted data to, such as:
		- Rsync.net (their own infra)
		- BorgBase (built on Hetzner storage boxes)

Managing files between devices
- Self host NextCloud
	- Run NextCloud on a server or mini PC in your local network
		- Set it up with Tailscale
	- Create separate NextCloud users for each component since you'll need app passwords to connect CalDav and WebDav mounts. 
	- Connect to the NextCloud WebDav (using Tailscale) on computer using NextCloud desktop client.
	- For calendar, use CalDav (create new calendar user with scoped permissions) and use Davx5 and Calendar by FossifyOrg (not the SimpleMobileTools one as they have been acquired)
		- Another option if you don't want NextCloud is Radicale which is pretty simple
	- RSS - NextCloud rss works well with Readrops app on Android
- Syncthing is also useful
	- Not quite as good as NextCloud in this use-case since it does a full download of all your files to it's connected peer(s) since it doesn't have the 'virtual files' concept like NextCloud does and other true cloud sync tools since it's solely peer to peer. This can be a problem if you're constrained by storage on certain devices in your network. You could just choose to sync specific sub-folders as needed as a work around.
- NAS
	- You're more locked into the hardware/provider than just getting your own mini PC as a server and running NextCloud on it

### Obsidian
- Useful tool for writing and managing local notes
- You can use NextCloud to handle the syncing and just use Obsidian as the app to open the notes in
- To sync Android with Obsidian you can use Syncthing to copy the files straight down to your phone. Obsidian also offers a proprietary sync service.
- Standard notes is also another alternative

---

## VPNs
- Mullvad VPN
	- Pretty much the standard for a private VPN
	- Accepts Monero, cash and gift cards as payment
- IVPN
	- Accepts Monero and cash
	- Similar to Mullvad but less credible and often a second choice 
- Proton VPN
	- Avoid using it if you use Proton for other services (to keep separation of concerns), however, for watching content and using more main stream services (such as Youtube or Reddit), it's generally the only VPN out of this list that doesn't have their IPs blocked.
- Tailscale (Or self host Headscale)
	- Can't be used with Mullvad VPN desktop app. Need to use WireGuard desktop app and download WireGuard config from Mullvad VPN to have Tailscale work with Mullvad.
	- Ideally don't install Tailscale on phone (since you'd then have to pay for Tailscale's Mullvad Exit Node add-on and have everything route through Tailscale)
		- If you need Tailscale on your phone, you can add it to another profile and run it there without a VPN to access your self-hosted services. Otherwise, generally just accessing on a laptop is fine.

---

## Communication
### iMessages
- You may want to handle iMessages even when you have an Android in certain cases.
- In this case, BlueBubbles offers the ability to relay messages through to your Android phone over your own ngrok, Cloudflare or similar tunnel.
	- You'll need a Mac computer that remains on (Mac Mini recommended)
	- You then setup the BlueBubbles app on the Mac and add the client to your phone

### Forwarding messages
You may have multiple phone numbers (where not all of them are on your primary phone) and need to forward incoming messages to those non-primary phone numbers. This can also be useful if you don't want to setup BlueBubbles for a more native iMessage experience, but still want to see incoming iMessages.

Using an iPhone, you can forward all text messages it receives to a central store using the built-in Shortcuts app.
- Setup a trigger for 'new message from any contact which contains a `' ' ` (space)' and send a webhook to your own handler which can then upload it to your NextCloud file system (use a scoped token).
- You can also implement PGP encryption in the webhook handler before uploading it to NextCloud (mainly if you're not self hosting NextCloud but using a third-party server for it).
	- You can then decrypt it on Android with the OpenKeychain app. Mount the NextCloud file system to your phone with Davx5 and when you click on a file you should see the ability to open with OpenKeychain app and enter decryption key.
- If you have a mail server setup for NextCloud (generally the default if you use a third-party hosted solution of NextCloud), then you can also be notified of new files being added to folder via email

#### Remote desktop 
- RustDesk
    - Able to self host coordinator server
    - Install clients on host machine and accessor machines to access machines remotely 
    - This can be useful if you need to access the Mac Mini server remotely

### Email
- Sending messages with PGP encryption works but know that it only takes one side to break it and then it's over completely. Opt for using encrypted messengers like Signal if possible.
	- Network effect is very real with communication channels and Signal seems to be the closest mainstream option right now. It does require your phone number, so an alternative would be Session but that seems to be less established / harder onboarding experience. Going with the mind set that most people don't use tech for technology's sake, Signal is probably a better bet here that sparks a nice middle ground.

#### Email providers
Email is inherently not private, so take the end-to-end encryption feature with a grain of salt (since it only works within the same provider).
- Proton Mail
	- Probably the best option right now
	- Allows you to install the ProtonMail bridge if you want to connect with your own email client on desktop (e.g. Thunderbird)
	- Doesn't allow anonymous payments (ie cash or Monero)
	- Can setup with SimpleLogin (ideally on your own domain so you don't have vendor lock in though that does compromise your anonymity)
- Tuta
	- UI/UX leaves a lot to be desired (it's improving)
	- Often quite slow to load client
	- Can't be used with other clients
	- Better end-to-end encryption than Proton
	- Pretty cheap
- Mailbox.org
	- Doesn't have end to end encryption
	- Has access through IMAP etc so you can BYO email client
	- Has it's own PGP which you can use between contacts

---

## Domains
- Choose a domain registrar that offers at cost or close to cost domains such as Cloudflare, Namecheap or Porkbun.
- Always favour a gTLD domain name (3+ characters) over a ccTLD domain name to reduce risk since it's not tied to a specific country.

---

## Secret Management
### Password managers
- 1Password is the gold standard but it's proprietary
- Ideal option is KeePassXC or self hosted BitWarden
- You should use your password manager's built in SSH agent so you're not storing private keys in plain text on your file system
	- If you have many SSH keys, you may reach max retries for public key attempts. In that case, for 1Password, include the public key in your `./ssh` directory and link to the file in your `config` as the `IdentityFile` property value (instead of it normally referencing the private key file) to guide the SSH agent on which primary key to pull (1Password auto maps it to the private key).

### 2FA
- Yubikeys are good for hardware 2FA
- Avoid using SMS 2FA
- Store your 2FA OTP seeds in providers that allow you to view the seed after creation. For example, Aegis, Standard Notes or Ente Auth.
- Also consider adding 2FA seeds to your YubiKey with an encryption passphrase

---

## Cryptocurrency
### Wallets
- Avoid using custodial wallets (kind of defeats the purpose of decentralisation and just requires an extra layer of trust).

--- 

## Related resources
- Extreme Privacy by Michael Bazzell
- [FUTO](https://www.futo.org/)
- [SideofBurritos](https://sideofburritos.com/)

---

## Future considerations
- Matrix and Element (seems a little unstable right now, but ideally can be used instead of some messaging clients like Whatsapp, Slack and Discord).
- Sim cards / phone numbers
	- There's quite a few phone number alias companies (that are non VoIP) but you're then locked in. For a one time phone number it's probably fine, but for a longer one it's not great.
- Quantum computing safety
	- Need to be cognisant that even though something may be encrypted today, it may not be in X years time. There are a variety of encryption algorithms available with varying levels of effectiveness.


