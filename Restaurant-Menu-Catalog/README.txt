Vagrant
    Configuration
        Run "vagrant up" in the directory in order to configure the VM
    Running the Server
        Run "python ./project.py" from within the "/vagrant" directory to run the server on "0.0.0.0:5000"
    Destruction
        You may also destroy the VM by running "vagrant destroy" from within the directory
        
Standalone 
    Configuration
        Run "./config.sh" in the directory in order to configure the environment
    Running the Server
        Run "python ./project.py" in the directory to run the server on "0.0.0.0:5000"

    
JSON Endpoints
    /restaurant/JSON
        Returns list of restaurants
    /restaurant/<int:restaurant_id>/menu/JSON
        Returns list of menu items for given restaurant
    /restaurant/<int:restaurant_id>/menu/<int:menu_id>/JSON
        Returns given menu item in given restaurant

What is handled by the configuration file?  
    APT-GET Installations
        apt-get -qqy install postgresql python-psycopg2
        apt-get -qqy install python-sqlalchemy
        apt-get -qqy install python-pip
    PIP Installations
        pip install werkzeug==0.8.3
        pip install flask==0.9
        pip install Flask-Login==0.1.3
        pip install oauth2client
        pip install requests
        pip install httplib2s
    Database Configuration
        python database_setup.py
        python lotsofmenus.py