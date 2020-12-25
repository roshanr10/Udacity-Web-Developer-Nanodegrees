# Linux Server Configuration
This project focuses on configuring a given Linux instance to host web applications, which includes installing updates, securing it from a number of attack vectors and installing/configuring web and database servers.

This project, the fifth in [Udacity’s Full Stack Web Developer Nanodegree](https://www.udacity.com/course/nd004), used Linux, Apache, PostgreSQL, and Python stack to set up a server.

## HTTP
The web application, [Restaurant Menu Catalog](https://github.com/roshanr10/Restaurant-Menu-Catalog), is hosted via HTTP at the server's IP address: [52.35.231.131](http://52.35.231.131/).

## SSH
To make ssh access to the server, you can use following syntax:
```
$ ssh -i [rsa_file] -p 2200 grader@52.35.231.131
```
1. Create a file in your home directory and name it whatever you want (e.g. mykey).
2. Copy the RSA key from submission note, and paste it into the file created in step 1.
3. Make the file only readable (e.g. `$ chmod 400 mykey`)
4. In your terminal, from your home directory, use the above ssh command to access the server.
 - e.g. `$ ssh -i mykey -p 2200 grader@52.35.231.131`

## Utilities
Glances is installed to aid in monitoring the system.

The "unattended-upgrades" is used to automatically manage package updates.

Fail2Ban is configured to protect from repeat unsuccessful login attempts over SSH.