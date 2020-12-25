# Import Libraries
import webbrowser

# Define 'Movie' Class
class Movie():
    # Initialize Object
    def __init__(self, movie_title, movie_storyline, poster_image, trailer_youtube, release_date, rating):
        # Set All Properties on 'self' object
        self.title = movie_title
        self.storyline = movie_storyline
        self.poster_image_url = poster_image
        self.trailer_youtube_url = trailer_youtube
        self.release_date = release_date
        self.rating = rating
        
    # Open Trailer in Browser
    def show_trailer(self):
        # Open Trailer in Browser Using YouTube URL From the 'self' Object
        webbrowser.open(self.trailer_youtube_url);
    