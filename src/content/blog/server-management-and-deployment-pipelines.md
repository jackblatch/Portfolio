---
title: Server management and monitoring
description: Notes on managing and maintaining servers for development and production
createdAt: July, 2025
index: 1
---
## Getting a server
### Hosting providers
Some notable VPS providers are as follows: Hetzner, OVH, Digital Ocean, Linode, Vultr. These offer cheap servers for you to spin up a development box and run production apps on.

### Server setup
- Block root access
- Install Tailscale and add firewall in cloud provider for Tailscale only + HTTP/S traffic depending on server
- Setup Borgmatic on server to Borg server (rsync.net, BorgBase etc)
	- To monitor backups, setup Uptime Kuma on a server and include notifications to Uptime Kuma within the Borgmatic yaml file
	- Make sure to include the path to your docker volumes in the config
- Other useful tools to setup:
	- Fail2ban
	- ufw (if you want to implement the firewall on the server and not inside VPS provider)

---

## Server development
### Local development
- Do all local development in a cloud server
- Able to then SSH into it from anywhere regardless of the computer
- Packages are all isolated and don't pollute computer storage

### Git and version control
- Github is the standard, though there are plenty of other git clients that often work just as well
- Regardless of your primary repository host, it's a good idea to backup your git repositories externally:
	- Gitea works well and is good for mirroring Github repos
		- You can use GiteaMirror to auto sync your GitHub repos to Gitea in the background

### Neovim
- Neovim kickstart works great if you're ok using vim and losing some features of a full code editor like VSCode (or it's forks). Generally, the best option is to pair it with a terminal multiplexer like tmux since you can dip in and out and be in the same place as you were previously.
- VSCode is the gold standard these days. Ideally you can use VSCodium (open source version without Microsoft telemetry etc), but it doesn't support remote SSH connections within
- Other option is Zed which is ok and looking more promising every day

### Terminal packages
- Setup `tmux-resurrect` to restore tmux sessions after a server restart
- Lazygit
- Zsh

### Deployment and monitoring
- Use Grafana with Loki and Prometheus for metrics and logging
- Create a server on your private network which has Grafana on it
	- Fetch from this server on your private network to your other services to ingest metrics and logs
- Kamal (from DHH) is pretty good for deploying
	- Allows for horizontal scaling out of the box
- Dokku is another one (mainly vertical scaling)
- Generally you'd want to setup a load balancer and setup your domain and DNS to point to that so you can easily horizontally scale or replace a node if needed
- This is good for small apps that don't have large volumes of traffic. You can get pretty far with this. Otherwise, going down the Kubernetes (or equivalent) path with one of the big cloud providers may be best.
- Serverless technology can be beneficial in some scenarios but you often have much larger vendor lock with these and build your apps with service specific primitives requiring code changes to move compared to just a simple DockerFile.

### Backup any cloud databases
- If all dbs are hosted on the server, then install and setup borgmatic to save backups.
- If you're hosting them through a managed database provider then do a database dump on an interval and backup with borg (or any other tool) from that.
