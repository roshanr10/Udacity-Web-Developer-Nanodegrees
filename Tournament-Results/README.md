# Tournament-Results

## Running
1. Vagrant and Virtualbox must be installed.
  - https://www.vagrantup.com/downloads.html
  - https://www.virtualbox.org/wiki/Downloads
2. Clone the Udacity Repo
  - https://github.com/udacity/fullstack-nanodegree-vm
3. Navigate into the VM 
  - `vagrant up` & `vagrant ssh`
4. Navigate to the Tournament Directory
  - `cd /vagrant/tournament`
5. Download the Files in this Repository into Directory 
6. Initialize the Database
  - `psql -f tournament.sql`
7. Run tests
  - `python tournament_test.py`
