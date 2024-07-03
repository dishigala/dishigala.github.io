/*
Template Name: Liebe
Author: Ingrid Kuhn
Author URI: themeforest/user/ingridk
Version: 1.0
*/

"use strict";
$(document).ready(function() {

  //Countdown
  
    $(function(){
			$('#countdown').countdowntimer({
			dateAndTime : "2024/06/19 19:00:00",  // <-- edit yyyy / mm / dd / time
			size : "lg",
			// if the date has over 4 digits in days then add an extra [0-9] in the first field bellow
			regexpMatchFormat: "([0-9][0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
			regexpReplaceWith:  " <div class='count'> $1<div class='displayformat'>Days</div></div> <div class='count'> $2<div class='displayformat'>Hours</div></div> <div class='count'> $3<div class='displayformat'>Minutes</div></div> <div class='count'> $4<div class='displayformat'>Seconds</div></div>"
			});
	});
	
    //Smooth Scroll 

    $('.page-scroll a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 2500, 'easeInOutExpo');
        event.preventDefault();
    });
	
    //	Back Top Link

    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(400);
        } else {
            $('.back-to-top').fadeOut(400);
        }
    });

    //Owl-carousels

    $("#story-carousel").owlCarousel({
        dots: true,
		 margin: 50,
        loop:true,
        autoplay: false,
        nav: true,
		  navText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        }
    });

 
    $("#owl-attendants1,#owl-attendants2").owlCarousel({
        dots: true,
        loop: true,
        autoplay: false,
        nav: true,
        margin: 20,
        navText: [
                          "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        responsive: {
            1: {
                items: 1,
            },
			600: {
                items: 2,
            },
            991: {
                items: 3,
            },
        }
    });
 
}); // end document ready


// Window scroll function

$(window).scroll(function() {
	
	   // Shrink Navbar on Scroll 	

	  if ($(document).scrollTop() > 50) {
		$('nav').addClass('shrink');
	  } else {
		$('nav').removeClass('shrink');
	  }
	  
});

//On Click  function
	$(document).on('click',function(){
		
		//Navbar toggle
		$('.navbar .collapse').collapse('hide');
		
	})	

// Window load function

$(window).load(function() {

    // Page Preloader 	

    $("#preloader").fadeOut("slow");
	
    // Pretty Photo

    $("a[data-gal^='prettyPhoto']").prettyPhoto({
        hook: 'data-gal'
    });
    ({
        animation_speed: 'normal',
        opacity: 1,
        show_title: true,
        allow_resize: true,
        counter_separator_label: '/',
        theme: 'light_square',
        /* light_rounded / dark_rounded / light_square / dark_square / facebook */
    });

    //Isotope 

    var $container = $('#lightbox');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
            layoutMode: 'masonry'
        }

    });
    $(window).smartresize(function() {
        $container.isotope({
            columnWidth: '.col-sm-3'
        });
    });

	//initialize skrollr
    skrollr.init({
        smoothScrolling: true,
		 smoothScrollingDuration: 1000,
		forceHeight: false			
    });

    // disable skrollr if using handheld device
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        skrollr.init().destroy();
    }
			
    //Isotope Nav Filter
	
    $('.category a').on('click', function() {
        $('.category .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
	

}); // end window load

// New JS

// JavaScript
var modal = document.getElementById('myModal');
var btn = document.getElementById('openModal');
var span = document.getElementsByClassName('close')[0];
function showModal(name){
    var modal = document.getElementById('myModal');
    // console.log("Openeing Modal")
    var btn = document.getElementById('openModal');
    var span = document.getElementsByClassName('close')[0];
    modal.style.display = 'block';
    $('.modal-title').text(name);
    var innerHtml = `
        <!-- HTML -->
        <input class="form-control" type="text" id="name" style="display:none" placeholder="Username" value=`+name+`>
        <input class="form-control" type="text" id="password" placeholder="What does `+name+` call you?">
        <button class="form-control" id="loginBtn" onclick="validate(this)">Unlock</button>
    `
    // console.log(innerHtml)

    $('.modal-body').html(innerHtml);
}

// btn.onclick = function() {
//   modal.style.display = 'block';
// };

var attempts = 0;


function validate() {
    var usernameInput = document.getElementsByClassName('modal-title')[0];
    var passwordInput = document.getElementById('password');
    var loginBtn = document.getElementById('loginBtn');
    var username = usernameInput.innerText;
    var password = passwordInput.value;
  
    // Perform your password validation logic here
    if (isPasswordValid(username,password)) {
      // Password validation passed
      populateDetails(username);
    } else {
      // Password validation failed
      attempts++;
      if (attempts === 3) {
        // Ran out of attempts, wait for 60s
        loginBtn.disabled = true;
        alert('Too many incorrect attempts. You have gotten a penalty. Try again after 60s');
        setTimeout(function() {
          loginBtn.disabled = false;
          attempts = 0;

        }, 60000);
      } else {
        // Password validation failed, try again
        alert('Incorrect password. Please try again.');
      }
    }
  };

span.onclick = function() {
  modal.style.display = 'none';
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function populateDetails(name) {
    // Populate the details using JavaScript

    // Populate 4 Questions
    var person = getPersonData(name);
    var called = person['called']
    var calls = person['calls']
    var relation = person['relation']
    var message = person['message']
    var memory = person['memory']
    var innerHtml = `
        <!-- HTML -->
        
        <hr>
        <h5> View the Memories </h5>
        <div id="personal-gallery">
        `+populateCarousel(name)+ `</div>
        <hr>
        <h5> View the Answers </h5>
        <div id="personal-answers"> </div>
        <div class='panel-group' id='accordion-851075' role='tablist' aria-multiselectable='false'>
    <div class='panel panel-default'>
        <div class='panel-heading' role='tab' id='heading-9912011'>
            <h5 class='panel-title'><a role='button' data-toggle='collapse'
                    class='accordion-toggle accordion-arrow-toggle collapsed' data-parent='#accordion-851075'
                    href='#collapse-9912011' aria-expanded='false' aria-controls='collapse-9912011'>What does Dishita affectionately call you?</a></h5>
        </div>
        <div id='collapse-9912011' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading-9912011'>
            <div class='panel-body'>`+called+`</div>
        </div>
    </div>
    <div class='panel panel-default'>
        <div class='panel-heading' role='tab' id='heading-2822522'>
            <h5 class='panel-title'><a role='button' data-toggle='collapse'
                    class='accordion-toggle accordion-arrow-toggle collapsed' data-parent='#accordion-851075'
                    href='#collapse-2822522' aria-expanded='false' aria-controls='collapse-2822522'>Your nickname for Dishita</a></h5>
        </div>
        <div id='collapse-2822522' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading-2822522'>
            <div class='panel-body'>`+calls+`</div>
        </div>
    </div>
    <div class='panel panel-default'>
        <div class='panel-heading' role='tab' id='heading-6560437'>
            <h5 class='panel-title'><a role='button' data-toggle='collapse'
                    class='accordion-toggle accordion-arrow-toggle collapsed' data-parent='#accordion-851075'
                    href='#collapse-6560437' aria-expanded='false' aria-controls='collapse-6560437'>What is your relationship with her?</a></h5>
        </div>
        <div id='collapse-6560437' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading-6560437'>
            <div class='panel-body'>`+relation+`</div>
        </div>
    </div>
    <div class='panel panel-default'>
        <div class='panel-heading' role='tab' id='heading-3872837'>
            <h5 class='panel-title'><a role='button' data-toggle='collapse'
                    class='accordion-toggle accordion-arrow-toggle collapsed' data-parent='#accordion-851075'
                    href='#collapse-3872837' aria-expanded='false' aria-controls='collapse-3872837'>A birthday message for her</a></h5>
        </div>
        <div id='collapse-3872837' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading-3872837'>
            <div class='panel-body'>`+message+`</div>
        </div>
    </div>
    <div class='panel panel-default'>
        <div class='panel-heading' role='tab' id='heading-1238610'>
            <h5 class='panel-title'><a role='button' data-toggle='collapse'
                    class='accordion-toggle accordion-arrow-toggle collapsed' data-parent='#accordion-851075'
                    href='#collapse-1238610' aria-expanded='false' aria-controls='collapse-1238610'>Share a favorite memory you have with Dishita  </a></h5>
        </div>
        <div id='collapse-1238610' class='panel-collapse collapse' role='tabpanel' aria-labelledby='heading-1238610'>
            <div class='panel-body'>`+memory+`</div>
        </div>
    </div>
</div>`;
    
    $('.modal-body').html(innerHtml);  
    var acc = document.getElementsByClassName("accordion");
    var i;
  
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
    // Add gallery of pictures using JavaScript
     // Append the carousel content to the carousel element
     // Initialize the owlCarousel
     $('#carousel').owlCarousel({
       loop: true,
       margin: 10,
       nav: false,
       responsive: {
         0: {
           items: 1
         },
         600: {
           items: 2
         },
         1000: {
           items: 3
         }
       }
     });
 
     // Show the carousel
     $('#carousel').show();  
    // Add accordions with questions and answers using JavaScript
  }
  

  function isPasswordValid(username, passwordEntered){
    // To read the password from a JSON file.
    // console.log("Is Password valid??", username);
    passwordEntered = cleanString(passwordEntered)
    var passwordList = getPasswords(username);
    passwordList = passwordList.split(',');
    // console.log(passwordList);
    // if (passwordList.length > 3){
    //     if (cleanString(passwordList) === passwordEntered) {
    //         return true; // Return true if a correct password is found
    //     }
    //     return false
    // }
     // Iterate over each password in the list
    for (let i = 0; i < passwordList.length; i++) {
        let password = passwordList[i];
        // Check if the password is correct (replace this condition with your own logic)
        if (cleanString(password) === passwordEntered) {
        return true; // Return true if a correct password is found
        }
    }
    return false;
  }

  function getPasswords(Username){
    // console.log("Get Passwords",Username);
    var userData = getPersonData(Username)
    // console.log(userData['calls'])
    return userData['calls']
  }

  function cleanString(inputString) {
    // Convert the string to lowercase
    // console.log(inputString);
    let cleanedString = inputString.toLowerCase();  
    // Remove non-alphabetic characters using regular expression
    cleanedString = cleanedString.replace(/[^a-z]+/g, '');  
    // Replace repeated alphabets with a single alphabet
    cleanedString = cleanedString.replace(/(.)\1+/g, '\$1');  
    return cleanedString;
  }

  var jsonData = {"Aditya Mehta":{"0":"2.webp","1":"1.webp","2":"","3":"","4":"","5":"","6":""},"Aman":{"0":"2.webp","1":"1.webp","2":"","3":"","4":"","5":"","6":""},"Anam Kazi":{"0":"1.flv","1":"","2":"","3":"","4":"","5":"","6":""},"Ashesh Gala":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Dr. Jasmeet Singh Manchanda":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Kajal Gawri":{"0":"1.MP4","1":"1.webp","2":"2.webp","3":"4.MOV","4":"5.MOV","5":"","6":""},"KAVITA Gala":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Maitry Gala":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"4.webp","4":"5.webp","5":"","6":""},"Muskan Kalati":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"4.webp","4":"5.webp","5":"","6":""},"Niyanta":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"4.webp","4":"5.webp","5":"7.webp","6":"6.webp"},"Pinal Mavani":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"4.webp","4":"5.webp","5":"","6":""},"Prerna Jain":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Priyanshi Budhrani":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"4.webp","4":"5.webp","5":"","6":""},"Priyesh Shah":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Riya Bhatt":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Sakshi Balani":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"","4":"","5":"","6":""},"Shivani Gawli":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""},"Tanya Shah":{"0":"1.webp","1":"2.webp","2":"3.webp","3":"4.webp","4":"5.mp4","5":"","6":""},"Vaibhavi Shah":{"0":"1.webp","1":"","2":"","3":"","4":"","5":"","6":""}}
  var data = {"Shivani gawli":{"called":"Shivani","calls":"Dishita","relation":"My jr from ug college but met her at sdc","message":"Wish u many many happy returns of the day! Have a blast and Have an amazingggg year ahead🎂🥳🥳","memory":"My neighbour in the college where only one look was enough to say there was some gossip for each other 😂","type":"friends"},"Maitry Gala":{"called":"Maitry","calls":"Dishi","relation":"I’m her 1st cousin from her mother’s side","message":"Wish you a very Happy Birthday baby sister (in literal sense😉).This is your last bachelorette birthday,enjoy fullest from next year we’ll be calling you Mrs.Framewala and your fairy tale will start and you’ll be a QUEEN of YOUR house. And I know Aman will be very good partner. Happiness has always been there and will always be there in your life. Love you 😘 wish you again a very happy birthday 🥳","memory":"There are a life full of memories with her. As she was the 1st baby sister I had from my another mother. She gave me the feeling of big responsible sister rather I had vatsal (but still as all know sibling rivalry😅).I used to make her sleep on swing (sometimes jabardasti)as that used to be the best feeling as I used to feel big responsible and loved. And I will never forget her sleep talks as this got me into trouble not once but many times but most memorable one was once I took her down to get something for nani and got her a chocolate but masi had strictly told me not to get her one , so being scared of masi I told her do not tell her,she agreed and didn’t tell anything consciously but then the night came and she started blabbering and told everything and masi came to know about our lies. Don’t remember if we got hitting but definitely scolding was there🙈 and then I learnt a lesson not to tell any scared to her till I think she was in her teen. After that we became very good friends as we used to share lots of things, gossip about friends a lot ,going for shopping together, completing her art book etc etc.. Tho we don’t talk on regular bases as I’m not a phone person whenever we meet we have our time and that is the best thing we share that we both know we have each other’s back no matter what. And never forget this ever in your life miss Dishita Gala😘 soon to be Mrs. Framewala.\nAnd now it comes to your bond with Raavee she loves you in purest form and I know this masi of hers love her like my masi did to me and that is precious. And Pallavi masi house will always be Dishi Masi house for her weather you’ll be staying there or no and all airplanes go from Dishi masi house and to Chennai 😂. I know she might not remember all this after few years but surely we’ll cherish this.\nLove you Dishi masi always 😘","type":"family"},"Prerna Jain":{"called":"Prerna! ❤️","calls":"Dis, Dishita","relation":"Had an amazing time doing fellowship with her in Saveetha","message":"Wishing you the best birthday & year ahead, Dis ❤️ you have always been the most enthusiastic & energetic person I’ve ever met! Your spirit to always learn and work more has truly inspired me! Thank you for the beautiful memories, love you 😘","memory":"Loved all our small/funny conversations we had in between patients! Our Bangkok days, Amadora nights & the clinic fun ❤️","type":"friends"},"Sakshi Balani":{"called":"Shakshi","calls":"Thishita","relation":"We used to be roomates in Chennai 🥰","message":"Hi dishita, you deserve all the happiness in the world, so glad for finally getting things that you wanted , really happy for you, here’s another year to cherish you. love you","memory":"All the time we sat in her room doing all the nonsense gossip and best part was time just flew by , Missing Chennai for sure","type":"friends"},"Muskan Kalati":{"called":"Muskan","calls":"Dish","relation":"Known her for 8 years now at simran’s birthday at socials. Been close since then, have taken trips to Lonavala several times and it’s always been fun around with youuu","message":"Wishing you a very happy birthday!!so glad to share our wedding date in the same month🤗it’s always been fun to be around with you, from our clubbing nights to Lonavala trips, it’s always been a memory to cheer","memory":"Drunk dancing at BC😜oh yes and the Manali trip which we never went for😉","type":"friends"},"Riya Bhatt":{"called":"Riya","calls":"Dishita","relation":"One of the best roomies one could ask for!","message":"Happy 25th Birthday Dishita!🎂🎉\nWe have shared countless memories together this past year, and there's still so much more to create.\nYour journey is just beginning, and I can’t wait to see the incredible things it holds for you. \nMay this year be a beautiful chapter of love, laughter, and the fulfillment of all your dreams. Cheers to the amazing journey ahead!❤️✨","memory":"When it comes to a favorite memory with Dishita, it's never any one particular memory coz she's always so fun to be around! From our adventurous incidents of jumping on our beds trying to get a moth or lizard out of our rooms to falling on our kitchen floors trying to get cockroach out of our house, where you were the main hero(iykyk). To always being that supportive roommate who would cheer me up on my bad days, who would never give up on asking me to go out despite me telling her 'no' a hundred times over and I'm so very thankful for that!❣️✨","type":"friends"},"Pinal Mavani":{"called":"Pinal","calls":"Fugly","relation":"Sisters by blood, bitches by choice !!","message":"Happy happy 25th fugsss !! Let the other side of 20s begin 🤣","memory":"Not really a favorite but i will always always remember this 🤣 once mama mami had gone for a movie and dishi was hardly 8-10 months old ! The 5 year old me thought it’ll be fun to hold her and roam in the hall ! 30 seconds and i dropped her 🤭 Literally on the marble floor !! And she cried and cried and cried !! \nPS- I was unsupervised ! PPS- that fall is the reason you developed this BDS brain & became the amazing dentist that youu are today 😘","type":"family"},"Priyesh Shah":{"called":"Pri","calls":"Dishita","relation":"Batchmates","message":"Meeting right from first day of college to sticking by till today our friendship has come a long way. From this girl crying for torn Kurtis to getting married and settling in life ( I bet u would still cry for the same though😂) girl you have come a long way. I wish u all the very best with all your endeavors and may god bless you gala❤️ A very happy birthday to you","memory":"Mummy maari kurti fati gai😂","type":"friends"},"Tanya Shah":{"called":"Tanu","calls":"Dishhh","relation":"Bestfriends since Childhood","message":"Thank you for always giving great advice and never blaming me when I don't take it. Happy birthday to the person who always matches my level of crazy and is there no matter what! I got you Dish❤️ Love you🥰 Cheers to a year filled with things we always talked about but now are actually happening!","memory":"Has to be the time when we met after forever and she came downstairs at her society reception in Chennai and how we hugged! So much to catch up on and undoubtedly the best days that followed.","type":"friends"},"Ashesh Gala":{"called":"Daddy","calls":"Dishi","relation":"She is a part of my heart","message":"Be happy wherever you are","memory":"I would take Dishi on bike at night ,left side being Malad,right side being Kurla","type":"family"},"Aditya Mehta":{"called":"Adi","calls":"Dishita only 😂","relation":"Friends. We became friends in the first year of dental college","message":"Happy Birthday Dishitaaa !!! Lesgoooo! Have a great day and year ahead🙌🏻 May all your hopes and dreams come true❤️❤️ Soon to be a superstar implantologist in town (marine drive- ab SOBO ki citizen hone wali 😂) . Have a year full of deserts & chocolates and cafés (hopefully no dairy, vegetables are involved in these encounters😂). Wish you the very best as always 🥳❤️ Happy 25th(Silver Jubilee hogayi😎)","memory":"Definitely the Goa trip back during internship. What a lit🔥trip it was! Las Olas & Hammerz (Las Olas😂) , drinks, partying, pulling all nighters (not for studies luckily) - can’t describe that trip in words but I hope we can do this soon again! 😌","type":"friends"},"Dr. Jasmeet Singh Manchanda":{"called":"jassi, jazy","calls":"DS, pagal aurat, babydoll","relation":"one of my best and closest friends … and it all started in the end of first bds year","message":"beti badi ho gaye eh … getting married and all huh … aaj ke din sagayi bhi hai … double celebration … very happy for you and god bless you dear❤️❤️","memory":"our long conversations in car during covid times and relishing our beloved memories when you used to visit mumbai during your fellowship … and of course … the whole effing 5 years i’ve spent and enjoyed with you 😭❤️","type":"friends"},"Priyanshi Budhrani":{"called":"Ayyyeee","calls":"Fishi","relation":"We know each other since we were little kids, got closer in teenage years and became best friends in adulthood! ❤️","message":"Happy Birthday Fishi! \nMay you have a very happy and prosperous year ahead! \nForever grateful to have you as the elder sister I never had! Thank you for guiding me through it all, thank you for being unapologetically YOU! \nCan't believe the things we talked about are finally begging to happen for you! Very excited for the upcoming events 🤭\nI love you ❤️","memory":"We were on a school trip to Jaipur in 8th grade and some of us had decided to skip the dance party arranged for us and danced in the room on our own music. I remember we danced for a very long time, i remember the songs we danced on, i remember laughing, i remember how much fun we both had that night!❤️","type":"friends"},"Kajal Gawri":{"called":"joker, cartoon","calls":"bitch, mumma, Drama Queen","relation":"ooo, good one. I remember her walking in anatomy lab dressed up in Kurt and those grey lenses and asking for votes for class respresentative. Later on we were in same batch and has close roll nos where we became parthners for most of the labs and that's how our friendship started.","message":"I miss you kuttti, how are you getting so old haan????? getting married and all ;0 Chal koi ni kar le mere bina birthday celebrate. but live young and throw SASS wherever you go. May this year bring more joy and you celebrate this new chapter of your life with great happiness. Be the QUEEN you are!!! Love you","memory":"kaha start karu yaar. more than half of the day for 5 years I was next to this girl. for sharing our Prostho work , tu baseplate kar le mai wax rims karti hu, Dishita shouting ki kitna time legs packup karne ke lie, bitching about professors. Long life discussions, watching series together, planning our imaginary weddings and crying in labs to now discussing real life wedding. jitna bolu less hai, you were always there. but I do have some fav memories, firstly bunking Prostho and watching movie and then coming back slyly and getting attendance. you forcing me to get out and come partying. CUT AHEAD IF FAMILY WATCHING dealing with drunk Dishita pulling my hair has to be the most memorable.","type":"friends"},"Anam Kazi":{"called":"Anammm","calls":"Dishitaaaa","relation":"Friend cum sister","message":"Have a blast and rock it","memory":"All the memories I have with you is amazing but The most beautiful and amazing memory I have of you is that time in Goa when we where in Thalassa and we didn’t click a video of the dance so you took me back to the stage in between all the people and crowd so that I can have a dance and I could click a video of it is one of the best memories I have. So hears to all the great memories we had and making more super soooonnnnn.","type":"friends"},"KAVITA Gala":{"called":"Kavi fia","calls":"Dishi","relation":"Family, friendship and love ❤️","message":"Wishing you all the love in the world !","memory":"So many to choose from. CCD, khau Gali, marines, the only one always crying at the airport, a friend to Satya and relationship advisor for me 🤣","type":"family"},"Niyanta":{"called":"Juicy/ adopted kid","calls":"Aafat, tabahi","relation":"Came from the same womb","message":"To the most annoying yet the person whom I call my home , it’s been an absolute privilege to be bullied by you.\nHappyyy freaking 25th birthday \nWill always steal your skin care products and clothes for life (you can’t get rid of me even if you change your home) \nLove youu","memory":"My entire life with you is my favourite memory but if I have to choose it would be waking you up in the morning ❤️","type":"family"},"Vaibhavi Shah":{"called":"Motuu","calls":"Galaa","relation":"School till the end","message":"Love how our friendship has changed from being strangers in school to being best friends almost end of college.\nIt's inclined to a level of comfort where we don't wanna go looking for others to have deep meaningful conversations.\nNow I know this is for life♥️\nLove you babe","memory":"Alibaug beach😂","type":"friends"},"Aman":{"called":"Aman","calls":"Dishita","relation":"Partners for Life","message":"","memory":"Day 1","type":"family"}}
  var populateDataV = [{"name":"Shivani gawli","called":"Shivani","calls":"Dishita","relation":"My jr from ug college but met her at sdc","message":"Wish u many many happy returns of the day! Have a blast and Have an amazingggg year ahead🎂🥳🥳","memory":"My neighbour in the college where only one look was enough to say there was some gossip for each other 😂","type":"friends"},{"name":"Maitry Gala","called":"Maitry","calls":"Dishi","relation":"I’m her 1st cousin from her mother’s side","message":"Wish you a very Happy Birthday baby sister (in literal sense😉).This is your last bachelorette birthday,enjoy fullest from next year we’ll be calling you Mrs.Framewala and your fairy tale will start and you’ll be a QUEEN of YOUR house. And I know Aman will be very good partner. Happiness has always been there and will always be there in your life. Love you 😘 wish you again a very happy birthday 🥳","memory":"There are a life full of memories with her. As she was the 1st baby sister I had from my another mother. She gave me the feeling of big responsible sister rather I had vatsal (but still as all know sibling rivalry😅).I used to make her sleep on swing (sometimes jabardasti)as that used to be the best feeling as I used to feel big responsible and loved. And I will never forget her sleep talks as this got me into trouble not once but many times but most memorable one was once I took her down to get something for nani and got her a chocolate but masi had strictly told me not to get her one , so being scared of masi I told her do not tell her,she agreed and didn’t tell anything consciously but then the night came and she started blabbering and told everything and masi came to know about our lies. Don’t remember if we got hitting but definitely scolding was there🙈 and then I learnt a lesson not to tell any scared to her till I think she was in her teen. After that we became very good friends as we used to share lots of things, gossip about friends a lot ,going for shopping together, completing her art book etc etc.. Tho we don’t talk on regular bases as I’m not a phone person whenever we meet we have our time and that is the best thing we share that we both know we have each other’s back no matter what. And never forget this ever in your life miss Dishita Gala😘 soon to be Mrs. Framewala.\nAnd now it comes to your bond with Raavee she loves you in purest form and I know this masi of hers love her like my masi did to me and that is precious. And Pallavi masi house will always be Dishi Masi house for her weather you’ll be staying there or no and all airplanes go from Dishi masi house and to Chennai 😂. I know she might not remember all this after few years but surely we’ll cherish this.\nLove you Dishi masi always 😘","type":"family"},{"name":"Prerna Jain","called":"Prerna! ❤️","calls":"Dis, Dishita","relation":"Had an amazing time doing fellowship with her in Saveetha","message":"Wishing you the best birthday & year ahead, Dis ❤️ you have always been the most enthusiastic & energetic person I’ve ever met! Your spirit to always learn and work more has truly inspired me! Thank you for the beautiful memories, love you 😘","memory":"Loved all our small/funny conversations we had in between patients! Our Bangkok days, Amadora nights & the clinic fun ❤️","type":"friends"},{"name":"Sakshi Balani","called":"Shakshi","calls":"Thishita","relation":"We used to be roomates in Chennai 🥰","message":"Hi dishita, you deserve all the happiness in the world, so glad for finally getting things that you wanted , really happy for you, here’s another year to cherish you. love you","memory":"All the time we sat in her room doing all the nonsense gossip and best part was time just flew by , Missing Chennai for sure","type":"friends"},{"name":"Muskan Kalati","called":"Muskan","calls":"Dish","relation":"Known her for 8 years now at simran’s birthday at socials. Been close since then, have taken trips to Lonavala several times and it’s always been fun around with youuu","message":"Wishing you a very happy birthday!!so glad to share our wedding date in the same month🤗it’s always been fun to be around with you, from our clubbing nights to Lonavala trips, it’s always been a memory to cheer","memory":"Drunk dancing at BC😜oh yes and the Manali trip which we never went for😉","type":"friends"},{"name":"Riya Bhatt","called":"Riya","calls":"Dishita","relation":"One of the best roomies one could ask for!","message":"Happy 25th Birthday Dishita!🎂🎉\nWe have shared countless memories together this past year, and there's still so much more to create.\nYour journey is just beginning, and I can’t wait to see the incredible things it holds for you. \nMay this year be a beautiful chapter of love, laughter, and the fulfillment of all your dreams. Cheers to the amazing journey ahead!❤️✨","memory":"When it comes to a favorite memory with Dishita, it's never any one particular memory coz she's always so fun to be around! From our adventurous incidents of jumping on our beds trying to get a moth or lizard out of our rooms to falling on our kitchen floors trying to get cockroach out of our house, where you were the main hero(iykyk). To always being that supportive roommate who would cheer me up on my bad days, who would never give up on asking me to go out despite me telling her 'no' a hundred times over and I'm so very thankful for that!❣️✨","type":"friends"},{"name":"Pinal Mavani","called":"Pinal","calls":"Fugly","relation":"Sisters by blood, bitches by choice !!","message":"Happy happy 25th fugsss !! Let the other side of 20s begin 🤣","memory":"Not really a favorite but i will always always remember this 🤣 once mama mami had gone for a movie and dishi was hardly 8-10 months old ! The 5 year old me thought it’ll be fun to hold her and roam in the hall ! 30 seconds and i dropped her 🤭 Literally on the marble floor !! And she cried and cried and cried !! \nPS- I was unsupervised ! PPS- that fall is the reason you developed this BDS brain & became the amazing dentist that youu are today 😘","type":"family"},{"name":"Priyesh Shah","called":"Pri","calls":"Dishita","relation":"Batchmates","message":"Meeting right from first day of college to sticking by till today our friendship has come a long way. From this girl crying for torn Kurtis to getting married and settling in life ( I bet u would still cry for the same though😂) girl you have come a long way. I wish u all the very best with all your endeavors and may god bless you gala❤️ A very happy birthday to you","memory":"Mummy maari kurti fati gai😂","type":"friends"},{"name":"Tanya Shah","called":"Tanu","calls":"Dishhh","relation":"Bestfriends since Childhood","message":"Thank you for always giving great advice and never blaming me when I don't take it. Happy birthday to the person who always matches my level of crazy and is there no matter what! I got you Dish❤️ Love you🥰 Cheers to a year filled with things we always talked about but now are actually happening!","memory":"Has to be the time when we met after forever and she came downstairs at her society reception in Chennai and how we hugged! So much to catch up on and undoubtedly the best days that followed.","type":"friends"},{"name":"Ashesh Gala","called":"Daddy","calls":"Dishi","relation":"She is a part of my heart","message":"Be happy wherever you are","memory":"I would take Dishi on bike at night ,left side being Malad,right side being Kurla","type":"family"},{"name":"Aditya Mehta","called":"Adi","calls":"Dishita only 😂","relation":"Friends. We became friends in the first year of dental college","message":"Happy Birthday Dishitaaa !!! Lesgoooo! Have a great day and year ahead🙌🏻 May all your hopes and dreams come true❤️❤️ Soon to be a superstar implantologist in town (marine drive- ab SOBO ki citizen hone wali 😂) . Have a year full of deserts & chocolates and cafés (hopefully no dairy, vegetables are involved in these encounters😂). Wish you the very best as always 🥳❤️ Happy 25th(Silver Jubilee hogayi😎)","memory":"Definitely the Goa trip back during internship. What a lit🔥trip it was! Las Olas & Hammerz (Las Olas😂) , drinks, partying, pulling all nighters (not for studies luckily) - can’t describe that trip in words but I hope we can do this soon again! 😌","type":"friends"},{"name":"Dr. Jasmeet Singh Manchanda","called":"jassi, jazy","calls":"DS, pagal aurat, babydoll","relation":"one of my best and closest friends … and it all started in the end of first bds year","message":"beti badi ho gaye eh … getting married and all huh … aaj ke din sagayi bhi hai … double celebration … very happy for you and god bless you dear❤️❤️","memory":"our long conversations in car during covid times and relishing our beloved memories when you used to visit mumbai during your fellowship … and of course … the whole effing 5 years i’ve spent and enjoyed with you 😭❤️","type":"friends"},{"name":"Priyanshi Budhrani","called":"Ayyyeee","calls":"Fishi","relation":"We know each other since we were little kids, got closer in teenage years and became best friends in adulthood! ❤️","message":"Happy Birthday Fishi! \nMay you have a very happy and prosperous year ahead! \nForever grateful to have you as the elder sister I never had! Thank you for guiding me through it all, thank you for being unapologetically YOU! \nCan't believe the things we talked about are finally begging to happen for you! Very excited for the upcoming events 🤭\nI love you ❤️","memory":"We were on a school trip to Jaipur in 8th grade and some of us had decided to skip the dance party arranged for us and danced in the room on our own music. I remember we danced for a very long time, i remember the songs we danced on, i remember laughing, i remember how much fun we both had that night!❤️","type":"friends"},{"name":"Kajal Gawri","called":"joker, cartoon","calls":"bitch, mumma, Drama Queen","relation":"ooo, good one. I remember her walking in anatomy lab dressed up in Kurt and those grey lenses and asking for votes for class respresentative. Later on we were in same batch and has close roll nos where we became parthners for most of the labs and that's how our friendship started.","message":"I miss you kuttti, how are you getting so old haan????? getting married and all ;0 Chal koi ni kar le mere bina birthday celebrate. but live young and throw SASS wherever you go. May this year bring more joy and you celebrate this new chapter of your life with great happiness. Be the QUEEN you are!!! Love you","memory":"kaha start karu yaar. more than half of the day for 5 years I was next to this girl. for sharing our Prostho work , tu baseplate kar le mai wax rims karti hu, Dishita shouting ki kitna time legs packup karne ke lie, bitching about professors. Long life discussions, watching series together, planning our imaginary weddings and crying in labs to now discussing real life wedding. jitna bolu less hai, you were always there. but I do have some fav memories, firstly bunking Prostho and watching movie and then coming back slyly and getting attendance. you forcing me to get out and come partying. CUT AHEAD IF FAMILY WATCHING dealing with drunk Dishita pulling my hair has to be the most memorable.","type":"friends"},{"name":"Anam Kazi","called":"Anammm","calls":"Dishitaaaa","relation":"Friend cum sister","message":"Have a blast and rock it","memory":"All the memories I have with you is amazing but The most beautiful and amazing memory I have of you is that time in Goa when we where in Thalassa and we didn’t click a video of the dance so you took me back to the stage in between all the people and crowd so that I can have a dance and I could click a video of it is one of the best memories I have. So hears to all the great memories we had and making more super soooonnnnn.","type":"friends"},{"name":"KAVITA Gala","called":"Kavi fia","calls":"Dishi","relation":"Family, friendship and love ❤️","message":"Wishing you all the love in the world !","memory":"So many to choose from. CCD, khau Gali, marines, the only one always crying at the airport, a friend to Satya and relationship advisor for me 🤣","type":"family"},{"name":"Niyanta","called":"Juicy/ adopted kid","calls":"Aafat, tabahi","relation":"Came from the same womb","message":"To the most annoying yet the person whom I call my home , it’s been an absolute privilege to be bullied by you.\nHappyyy freaking 25th birthday \nWill always steal your skin care products and clothes for life (you can’t get rid of me even if you change your home) \nLove youu","memory":"My entire life with you is my favourite memory but if I have to choose it would be waking you up in the morning ❤️","type":"family"},{"name":"Vaibhavi Shah","called":"Motuu","calls":"Galaa","relation":"School till the end","message":"Love how our friendship has changed from being strangers in school to being best friends almost end of college.\nIt's inclined to a level of comfort where we don't wanna go looking for others to have deep meaningful conversations.\nNow I know this is for life♥️\nLove you babe","memory":"Alibaug beach😂","type":"friends"},{"name":"Aman","called":"Aman","calls":"Dishita","relation":"Partners for Life","message":"","memory":"Day 1","type":"family"}]
  function getJSON(){
    return data
  }

  function getPersonData(person){
    // console.log("Get Person Details", person)
    var data = getJSON();
    return data[person]
  }

  function populateCarouselFamily(){

    var populateDataHtml = "";
    var i;
    // console.log(populateDataV.length)
    for (i = 0; i < populateDataV.length; i++){
        var userData = populateDataV[i];      
        var name = userData['name'];
        var type = userData['type'];
        // console.log(userData);
        if (name && type == "family"){
            name = capitalizeSentence(name);
            var populateData = 
            `
            <div class="attendants-wrap col-md-12">
                <div class="member text-center">
                    <div class="wrap" onclick="showModal('`+ name+`')">
                    <!-- image -->
                    <img src="img/d/`+name+`/1.webp" alt="" class="img-circle img-responsive">
                    <!-- Info -->
                    <div class="info">
                        <h5 class="name">`+name+`</h5>
                    </div>
                    <!-- /info -->
                    </div>
                    <!-- /wrap -->
                </div>
                <!-- / member -->
            </div>
            `
    
            populateDataHtml += populateData;

        }


    }
    $('#owl-attendants1').html(populateDataHtml);
    
  }
  function populateCarouselFriends(){

    var populateDataHtml = "";
    var i;
    // console.log(populateDataV.length)
    for (i = 0; i < populateDataV.length; i++){
        var userData = populateDataV[i];      
        var name = userData['name'];
        var type = userData['type'];
        // console.log(userData);
        if (name && type == "friends"){
            name = capitalizeSentence(name);
            var populateData = 
            `
            <div class="attendants-wrap col-md-12">
                <div class="member text-center">
                    <div class="wrap" onclick="showModal('`+ name+`')">
                    <!-- image -->
                    <img src="img/d/`+name+`/1.webp" alt="" class="img-circle img-responsive">
                    <!-- Info -->
                    <div class="info">
                        <h5 class="name">`+name+`</h5>
                    </div>
                    <!-- /info -->
                    </div>
                    <!-- /wrap -->
                </div>
                <!-- / member -->
            </div>
            `
    
            populateDataHtml += populateData;

        }


    }
    $('#owl-attendants2').html(populateDataHtml);
    
  }

  function capitalizeSentence(sentence) {
    // Split the sentence into an array of words
    let words = sentence.split(" ");
  
    // Capitalize the first letter of each word
    let capitalizedWords = words.map(function(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
  
    // Join the capitalized words back into a sentence
    let capitalizedSentence = capitalizedWords.join(" ");
  
    return capitalizedSentence;
  }
  function populateCarousel(itemName) {
    var mediaFiles = jsonData[itemName];
    var carouselContent = '<div id="carousel" class="owl-carousel">';

    // Loop through the media files and generate the carousel content
    for (var i = 0; i < Object.keys(mediaFiles).length; i++) {
      var mediaFile = mediaFiles[i];
      if (mediaFile !== "" ) {
        if(mediaFile.endsWith(".webp")){
            carouselContent += '<div><img src="img/d/'+itemName+'/' + mediaFile + '" height="600px"></div>';
        }
        else{
            carouselContent += '<div class="item"><video src="img/d/'+itemName+'/' + mediaFile + '" controls  height="600px"></video></div>';
        }
      }
    }
    carouselContent += '</div>'
    return carouselContent

   
  }

  populateCarouselFamily();
  populateCarouselFriends();

//   scoring system. Lives and final score.
// Amans Message to be improved
