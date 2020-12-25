var bio = {
    "name": "Roshan Ravi",
    "role": "Web Developer",
    "welcomeMessage": "Hi there! I'm Roshan and I love to code and to bike.",
    "contacts": {
        "mobile": "+1 617 817 5673",
        "email": "roshanravi10@gmail.com",
        "github": "RoshanR10",
        "twitter": "@roshanravi10",
        "location": "Boston"
    },
    "biopic": "images/biopic.jpg",
    "skills": ["Node.JS", "GoLang", "HTML & CSS", "JavaScript"],
    "display": function() {
        var formattedName = HTMLheaderName.replace("%data%", bio.name),
            formattedRole = HTMLheaderRole.replace("%data%", bio.role),

            formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile),
            formattedEmail = HTMLemail.replace("%data%", bio.contacts.email),
            formattedGitHub = HTMLgithub.replace("%data%", bio.contacts.github),
            formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter),
            formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location),

            formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic),
            formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);

        $("#header")
            .prepend(formattedName + formattedRole);
        $("#topContacts, #footerContacts")
            .append(formattedMobile + formattedEmail + formattedGitHub + formattedTwitter + formattedLocation);
        $("#header")
            .append(formattedBioPic)
            .append(formattedWelcomeMsg)
            .append(HTMLskillsStart);

        for (var skill = 0; skill < bio.skills.length; skill++) {
            $("#skills")
                .append(HTMLskills.replace("%data%", bio.skills[skill]));
        }
    }
};

//  All Timestamps are in Milliseconds.
var education = {
    "schools": [{
        "name": "Billerica Memorial High School",
        "location": "Billerica, MA",
        "degree": "-",
        "majors": ["-"],
        "dates": "N/A",
        "url": "http://bmhs.billerica.k12.ma.us"
    }],
    "onlineCourses": [{
        "title": "M101JS: MongoDB for Node.js Developers",
        "school": "MongoDB University",
        "dates": "2013",
        "url": "https://university.mongodb.com/"
    }],
    display: function() {
        for (var school = 0; school < education.schools.length; school++) {
            $("#education")
                .append(HTMLschoolStart);
            
            var formattedName = HTMLschoolName.replace("%data%", education.schools[school].name)
                                                .replace("#", education.schools[school].url),
                formattedLocation = HTMLschoolLocation.replace("%data%", education.schools[school].location),
                formattedMajors = HTMLschoolMajor.replace("%data%", education.schools[school].majors.join(", ")),
                formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree),
                
                formattedDates = HTMLschoolDates.replace("%data%", education.schools[school].dates);

            $(".education-entry:last")
                .append(formattedName + formattedDegree)
                .append(formattedDates)
                .append(formattedLocation)
                .append(formattedMajors);
        }
    
        $("#education")
            .append(HTMLonlineClasses);

        for (var course = 0; course < education.onlineCourses.length; course++) {
            $("#education")
                .append(HTMLschoolStart);


            var formattedTitle = HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title)
                    .replace("#", education.onlineCourses[course].url),
                formattedSchool = HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school),
                formattedDates = HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates);

            $(".education-entry:last")
                .append(formattedTitle + formattedSchool)
                .append(formattedDates)
                .append("<br><div><hr class='section-hr'></div>");
        }
    }
};

var work = {
    "jobs": [{
        "employer": "Innovate Loop",
        "title": "Chief Executive Officer, Founder",
        "location": "Billerica, MA",
        "dates": "Present",
        "description": "I am starting Innovate Loop to pursue my dream of running my own business and giving back to the community."
    }, {
        "employer": "Authors Unified",
        "title": "Chief Technical Officer, Cofounder",
        "location": "Billerica, MA",
        "dates": "August 2015 - Present",
        "description": "A freelance project that I took on."
    }],
    display: function() {
        for (var job = 0; job < work.jobs.length; job++) {
            $("#workExperience")
                .append(HTMLworkStart);

            var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer),
                formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title),
                formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates),
                formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location),
                formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);

            $(".work-entry:last")
                .append(formattedEmployer + formattedTitle)
                .append(formattedDates)
                .append(formattedLocation)
                .append(formattedDescription);
        }
    }
};

var projects = {
    "projects": [{
        "title": "Feedreader",
        "dates": "2015",
        "description": "I used Jasmine to write tests for this project in the front-end nanodegree.",
        "images": ["images/197x148.gif"]
    }],
    display: function() {   
        for (var project = 0; project < projects.projects.length; project++) {
            $("#projects")
                .append(HTMLprojectStart);

            var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[project].title),
                formattedDates = HTMLprojectDates.replace("%data%", projects.projects[project].dates),
                formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[project].description),
                formattedImage = "";

            for (var image = 0; image < projects.projects[project].images.length; image++) {
                formattedImage += HTMLprojectImage.replace("%data%", projects.projects[project].images[image]);
            }

            $(".project-entry:last")
                .append(formattedTitle + formattedDates + formattedDescription + formattedImage);
        }
    }
};

bio.display();
education.display();
work.display();
projects.display();

$("#mapDiv")
    .append(googleMap);