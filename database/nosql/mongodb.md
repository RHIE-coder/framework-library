# MongoDB 

## # Intro

Document 기반 NoSQL 서버

 - 공식사이트 [CLICK](https://www.mongodb.com/)

<hr><br><br><br><br>

## # Installation
###  - [Ubuntu 18.04 Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-debian/)

1. Import the public key used by the package management system.

```sh
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
```

 - However, if you receive an error indicating that gnupg is not installed, you can:

> ```sh
> sudo apt-get install gnupg
> ```
>
> Once installed, retry importing the key

2. Create a `/etc/apt/sources.list.d/mongodb-org-6.0.list` file for MongoDB.

```sh
echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/6.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
```

3. Reload local package database.

```sh
sudo apt-get update
```

4. Install the MongoDB packages.

```sh
sudo apt-get install -y mongodb-org
```

<br><br><br>

###  - [Centos 7 Installation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/)

1. Create a `/etc/yum.repos.d/mongodb-org-6.0.repo` file so that you can install MongoDB directly using yum:

```
[mongodb-org-6.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/6.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-6.0.asc
```

2. install

```
sudo yum install -y mongodb-org
```

3. run

```
sudo systemctl start mongod
```

<br><br><br>

### - Directories

By default, a MongoDB instance stores:
 - its data files in `/var/lib/mongodb`
 - its log files in `/var/log/mongodb`

<br><br><br>

### - if "Failed to start mongod.service: Unit mongod.service not found." 

```sh
sudo systemctl daemon-reload
```

<hr><br><br><br><br>