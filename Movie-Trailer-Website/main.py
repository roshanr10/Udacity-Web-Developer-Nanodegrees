# Import Libraries
import media
import codegen

# Define Movies Using the 'Movie' Class
furious_six = media.Movie("Furious 6",
                        "Hobbs has Dominic and Brian reassemble their crew to take down a team of mercenaries: Dominic unexpectedly gets convoluted also facing his presumed deceased girlfriend, Letty.",
                        "http://ia.media-imdb.com/images/M/MV5BMTM3NTg2NDQzOF5BMl5BanBnXkFtZTcwNjc2NzQzOQ@@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=z7zl_t48CMc",
                        "2013",
                        7.2)

furious_seven = media.Movie("Furious Seven",
                        "Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.",
                        "http://ia.media-imdb.com/images/M/MV5BMTQxOTA2NDUzOV5BMl5BanBnXkFtZTgwNzY2MTMxMzE@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=Skpu5HaVkOc",
                        "2015",
                        7.7)

divergent = media.Movie("Divergent",
                        "In a world divided by factions based on virtues, Tris learns she's Divergent and won't fit in. When she discovers a plot to destroy Divergents, Tris and the mysterious Four must find out what makes Divergents dangerous before it's too late.",
                        "http://ia.media-imdb.com/images/M/MV5BMTYxMzYwODE4OV5BMl5BanBnXkFtZTgwNDE5MzE2MDE@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=336qJITnDi0",
                        "2014",
                        6.8)

insurgent = media.Movie("Insurgent",
                        "Beatrice Prior must confront her inner demons and continue her fight against a powerful alliance which threatens to tear her society apart with the help from others on her side.",
                        "http://ia.media-imdb.com/images/M/MV5BMTgxOTYxMTg3OF5BMl5BanBnXkFtZTgwMDgyMzA2NDE@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=suZcGoRLXkU",
                        "2015",
                        6.9)

brick_mansions = media.Movie("Brick Mansions",
                        "An undercover Detroit cop navigates a dangerous neighborhood that's surrounded by a containment wall with the help of an ex-con in order to bring down a crime lord and his plot to devastate the entire city.",
                        "http://ia.media-imdb.com/images/M/MV5BOTI0ODQ2MzY5NF5BMl5BanBnXkFtZTgwNTcxNzQxMTE@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=4CzcsN4k9FM",
                        "2014",
                        5.7)

tomorrowland = media.Movie("Tomorrowland",
                        "Bound by a shared destiny, a teen bursting with scientific curiosity and a former boy-genius inventor embark on a mission to unearth the secrets of a place somewhere in time and space that exists in their collective memory.",
                        "http://ia.media-imdb.com/images/M/MV5BMTQ4OTgzNTkwNF5BMl5BanBnXkFtZTgwMzI3MDE3NDE@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=lNzukD8pS_s",
                        "2015",
                        6.8)

skyfall = media.Movie("Skyfall",
                        "Bond's loyalty to M is tested when her past comes back to haunt her. Whilst MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.",
                        "http://ia.media-imdb.com/images/M/MV5BMjAyODkzNDgzMF5BMl5BanBnXkFtZTcwMDMxMDI4Nw@@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=6kw1UVovByw",
                        "2012",
                        7.8)

ghost_protocol = media.Movie("Mission: Impossible - Ghost Protocol",
                        "The IMF is shut down when it's implicated in the bombing of the Kremlin, causing Ethan Hunt and his new team to go rogue to clear their organization's name.",
                        "http://ia.media-imdb.com/images/M/MV5BMTY4MTUxMjQ5OV5BMl5BanBnXkFtZTcwNTUyMzg5Ng@@._V1_SY317_CR0,0,214,317_AL_.jpg",
                        "https://www.youtube.com/watch?v=V0LQnQSrC-g",
                        "2011",
                        7.4)

cloud_nine = media.Movie("Cloud 9",
                        "A snowboarder takes lessons from a former champion, inspiring him to reach for the stars once again.",
                        "http://ia.media-imdb.com/images/M/MV5BMTk0Nzk2ODM5Ml5BMl5BanBnXkFtZTgwOTkzMDUwMTE@._V1_SY317_CR104,0,214,317_AL_.jpg",
                        "https://www.youtube.com/watch?v=W2MRmAE_Z3E",
                        "2014",
                        6.9)

senior_year = media.Movie("High School Musical 3: Senior Year",
                        "As seniors in high school, Troy and Gabriella struggle with the idea of being separated from one another as college approaches. Along with the rest of the Wildcats, they stage a spring musical to address their experiences, hopes and fears about their future.",
                        "http://ia.media-imdb.com/images/M/MV5BNDE1NjU2NTMyNV5BMl5BanBnXkFtZTcwMTg3NDA3MQ@@._V1_SX214_AL_.jpg",
                        "https://www.youtube.com/watch?v=1S8RTKL5cW8",
                        "2008",
                        4.3)

# Compile Movies into List
movies = [furious_six, furious_seven, divergent, insurgent, brick_mansions, tomorrowland, skyfall, ghost_protocol, cloud_nine, senior_year]

# Dynamically Generate Movie Page and Open in Browser
codegen.open_movies_page(movies)