
  $(document).ready(function() {
    var modal = $('.modal'),
        modalAnswer = $('.modal-answer'),
        modalBtn = $('[data-toggle=modal]'),
        closeBtn = $('.modal__close'),
        closeBtnAnswer = $('.modal-answer__close');


    function showModal(selector){
        $(selector).toggleClass('modal--visible')
    }

    function hideModal(selector){
        $(selector).removeClass('modal--visible')
    }

    function showAnswer(ans) {
        modalAnswer.find('.modal-answer__title').text(ans)
        modalAnswer.toggleClass('modal--visible')
    }

    function hideAnswer() {
        modalAnswer.hide()
    }

    modalBtn.on('click', function() {
        const modalInst = $(this).data('instance') 
        showModal(modalInst)
    });
    
    closeBtn.on('click', function() {
        $(this).parents('.modal').removeClass('modal--visible');
    });

    $(document).on('keydown', function(event){
        if (event.key === "Escape" || event.key === "Esc") {
            if (modal.hasClass('modal--visible')){
                modal.find('form').each(function(i,x) {
                    x.reset()
                })
                modal.removeClass('modal--visible');
            }
        }
    }) 
    
    modal.on('click', function(event) {
        if (event.target.classList.contains('modal')) {
            modal.find('form').each(function(i,x) {
                x.reset()
            })
            modal.removeClass('modal--visible');
        }
    });

     //initialize swiper when document ready
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    })
    
    var next = $('.swiper-button-next');
    var prev = $('.swiper-button-prev');
    var bullets = $('.swiper-pagination');

    // next.css('left', prev.width() + 10 + bullets.width() + 20);
    // bullets.css('left', prev.width() + 20);

    new WOW().init();

    //Валидация форм
    $('.modal__form, .hero__form, .personal-offer__form').each(function(index, item){
        $(item).validate({
            errorClass: "invalid",
            rules: {
                // строчное правило
                userName: {
                    required: true,
                    minlength: 2,
                },
                userQuestion: {
                    required: true,
                    minlength: 2
                },
                userPhone: {
                    required: true,
                    minlength: 17,
                    maxlength: 17,
                },
                // правило-объект (блок)
                userEmail: {
                required: true,
                email: true,
                },
                'policy-checkbox': { required: true }
            },
            //сообщения
            errorElement: "div",
            messages: {
            userName: {
                required: "Пожалуйста, введите имя",
                minlength: "Имя не короче двух символов",
            },
            userPhone: {
                required: "Пожалуйста, введите телефон",
                minlength: "Формат номера: +7(000) 000-00-00",
                maxlength: "Формат номера: +7(000) 000-00-00",
            },
            userEmail: {
                required: "Пожалуйста, введите e-mail",
                email: "Формат e-mail: name@domain.com"
            },
            userQuestion: {
                required: "Пожалуйста, введите свой вопрос"
            },
            'policy-checkbox': 'Необходимо согласие на обработку данных'
            },
            errorPlacement: function (error, element) {
                if (element.attr("type") == "checkbox") {
                    return element.next('label').append(error);
                }
            
                 error.insertAfter($(element));
            },
            submitHandler: function(form) {
                //ym(65452483, 'reachGoal', 'request');
                $.ajax({
                    method: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function(response) {
                        console.log(response)
                        $(form)[0].reset()
                        showAnswer('Заявка успешно отправлена. Наш менеджер перезвонит Вам в течение 15 минут.');
                        hideModal('.modal-callback');
                    },
                    error: function(response) {
                        console.error(response)
                        $(form)[0].reset()
                        showAnswer('Ошибка!')
                        hideModal('.modal-callback');
                    }
                })
                return false;
            }
        })
    });

    //маска телефона
    $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "Ваш номер телефона:"});

    //создание yandex карты
    function init(){
        var myMap = new ymaps.Map("map", {
            center: [55.738024, 37.520322],
            zoom: 15
        });
        myMap.behaviors.disable('scrollZoom');

        var placemark = new ymaps.Placemark(myMap.getCenter(), {
          // Зададим содержимое заголовка балуна.
          // Зададим содержимое основной части балуна.
          balloonContentBody:
          '<div class="footer__sticker-map">' + 
          '    <img src="images/sticker-map.png" alt="">' + 
          '    <div class="map-text-group">' + 
          '      <h4 class="sticker-map__title">Мы находимся:</h4>' + 
          '      <p class="sticker-map__text">г. Москва, ул. Неверовского, д. 9</p>' + 
          '      <p class="sticker-map__text">Телефон: <a class="sticker-map__link" href="tel:84954444444">+7 (495) 444-44-44</a></p>' + 
          '      <p class="sticker-map__text">E-mail: <a class="sticker-map__link--red" href="email:info@ied.ru">info@ied.ru</a></p>' + 
          '      </div>' + 
          '</div>',
          hintContent: 'Балашиха хлеб'
      });
      // Добавим метку на карту.
      myMap.geoObjects.add(placemark);
      // Откроем балун на метке.
      placemark.balloon.open();
    }

    setTimeout(function(){
      ymaps.ready(init);
    }, 2000);

//Видео
   var player;
   $('.video__play').on('click',function onYouTubeIframeAPIReady() {
       player = new YT.Player('player', {
         height: '430',
         width: '100%',
         videoId: 'BUh0q8z5Pbs',
         events: {
           'onReady': videoPlay,
         }
       });
     })

     function videoPlay(event) {
       event.target.playVideo();
     }

  });


