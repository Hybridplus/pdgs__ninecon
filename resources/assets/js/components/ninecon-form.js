window.VueComponent['ninecon-form'] = Vue.component('ninecon-form', {
    template: '#ninecon-form',
    data: function () {
        return {
            fullName: "",
            address: "",
            phoneHome: "",
            phoneMobile: "",
            email: "",
            brand: "",
            product: "",
            date: "",
            place: "",
            // file: "",
            freetext: "",
            hours : ""
        }
    },
    computed: {
        brandOptions: function () {
            return [
                "גרילים חשמליים",
                "כיסויים לגרילים",
                "כלים לגרילים",
                "סדרת  BUFFALO",
                "סדרת גרילי  CHEF",
                "סדרת גרילי REBEL",
                "סדרת גרילי מטבח"
            ];
        },
        productOptions: function () {
            switch (this.brand) {
                case "גרילים חשמליים":
                    return [
                        "גריל חשמלי IN&OUT"
                    ];
                case "כיסויים לגרילים":
                    return [
                        "כיסוי לגריל 2 מבערים",
                        "כיסוי לגריל גז 3 מבערים",
                        "כיסוי לגריל גז 3 מבערים REBEL",
                        "כיסוי לגריל גז 4 מבערים",
                        "כיסוי לגריל גז 4 מבערים REBEL",
                        "כיסוי לגריל גז 5-6 מבערים",
                        "כיסוי לגריל גז מטבח 4 מבערים"
                    ];
                case "כלים לגרילים":
                    return [
                        "כף הופכן לגריל מנירוסטה",
                        "מברשת ברזל  למנגל / גריל",
                        "מברשת ברזל למנגל ארוכה",
                        "מברשת ברזל למנגל/גריל",
                        "מברשת למנגל - 3 באחד",
                        "מלקחיים לגריל ארוכות משונן",
                        "מלקחיים נירוסטה",
                        "מלקחיים עם מזלג מנירוסטה",
                        "סט 12 שיפודי מתכת ידית עץ",
                        "סט 18 כלים למנגל במזוודת פלסטיק שחורה",
                        "סט 3 כלים לגריל במארז קומפקטי",
                        "סט 3 כלים למנגל - ידית בקלית",
                        "סט 3 כלים למנגל ידיות עץ",
                        "סט 3 כלים למנגל עיצוב נירוסטה",
                        "סט 5 כלים נירוסטה במזוודת אלומיניום",
                        "סט 6 שיפודי נירוסטה דקים",
                        "סט 6 שיפודי נירוסטה רחבים",
                        "פטיש תבלינים נירוסטה למנגל",
                        "צולה בשר גדול 33/29 ס\"מ",
                        "צולה בשר עגול - קוטר 39 ס\"מ",
                        "צולה בשר עגול- קוטר 31 ס\"מ",
                        "צולה בשר עמוק 25/32 ס\"מ",
                        "צולה בשר ענק רשת 40/29 ס\"מ",
                        "צולה דגים אובלי 38/15 ס\"מ",
                        "צולה נקניקיות",
                        "רשת צליה + מגש"
                    ];
                case "סדרת  BUFFALO":
                    return [
                        "גריל גז 3 מבערים BUFFALO CHEF",
                        "גריל גז 4 מבערים BUFFALO CHEF",
                        "גריל גז 6 מבערים BUFFALO CHEF"
                    ];
                case "סדרת גרילי  CHEF":
                    return [
                        "גריל גז  CLASSIC CHEF metal frame 3B",
                        "גריל גז  MIAMI CHEF  3B",
                        "גריל גז  SILVER CHEF 2B",
                        "גריל גז CALIFORNIA CHEF 4B",
                        "גריל גז CLUB CHEF B3",
                        "גריל גז DENVER  CHEF 3B",
                        "גריל גז HOME GARDEN  3B",
                        "גריל גז LAS VEGAS 3B",
                        "גריל גז LAS VEGAS 4B",
                        "גריל גז METRO CHEF 4B",
                        "גריל גז NEVADA CHEF 6B",
                        "גריל גז NEW YORK CHEF 4B",
                        "גריל גז PATAGONIA CHEF 4B",
                        "גריל גז PATAGONIA CHEF 6B",
                        "גריל גז SILVER CHEF 3B",
                        "גריל גז SMART CHEF 2B",
                        "גריל גז SMART Chef 3B",
                        "גריל גז TEXAS 3B",
                        "גריל גז TEXAS CHEF 4B",
                        "גריל גז TEXAS CHEF 6B",
                        "גריל גז נייד TRAVEL CHEF"
                    ];
                case "סדרת גרילי REBEL":
                    return [
                        "גריל גז  4 מבערים MERAPI GRILL 4B",
                        "גריל גז 3  מבערים STROMBOLI  GRILL 3B",
                        "גריל גז 3 מבערים  MERAPI GRILL 3B",
                        "גריל גז 4 מבערים  TAMBORA MULTI GRILL 4B",
                        "גריל גז 4 מבערים BROMO GRILL 4B",
                        "גריל גז 4 מבערים GALERAS GRILL 4B",
                        "גריל גז 4 מבערים GALERAS GRILL 4B + כירת צד",
                        "גריל גז 6 מבערים TAMBORA MULTI GRILL 6B"
                    ];
                case "סדרת גרילי מטבח":
                    return [
                        "גריל גז מטבח 4 מבערים KENTUCKY MULTI CHEF",
                        "גריל גז מטבח 4 מבערים OKLAHOMA CHEF"
                    ];
                default:
                    return [
                        "גריל חשמלי IN&OUT"
                    ];
            }
        }
    },
    mounted : function () {
        if(!this.brand){
            this.$set(this, 'brand', this.brandOptions[0]);
        }

        $(this.$el).find(":input").each(function(){
            let $this = $(this);
            $this.on('change focus', function(){
                $(this).removeClass('is-invalid');
                $(this).removeClass('is-valid');
            });
        });
    },
    watch: {
        brand: function ($new, $old){
            if($new !== $old){
                this.$set(this, 'product', this.productOptions[0])
            }
        },
        file : function ($new, $old){
            console.log($new, $old);
        }
    },
    methods : {
        checkForm : function (e) {
            let $that = this;
            let invalid = 0;
            $(this.$el).find(":input").each(function(){
                let $this = $(this);
                if($this.prop('required')){
                    if(!$this.val()){
                        $this.addClass('is-invalid');
                        invalid++;
                    }
                }
                let re;
                switch ($this.prop('type')) {
                    case 'email' :
                        re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if(!re.test($this.val())){
                            $this.addClass('is-invalid');
                            invalid++;
                        }
                        break;
                    case 'tel' :
                        // re = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
                        // if(!re.test($this.val())){
                        //     $this.addClass('is-invalid');
                        //     invalid++;
                        // }
                        break;
                }
                if(!$this.hasClass('is-invalid'))
                    $this.addClass('is-valid');
            });
            e.preventDefault();
            if(!invalid) {
                axios({
                    method: 'POST',
                    url: $(this.$el).prop('action'),
                    data: {
                        fullName: this.fullName,
                        address: this.address,
                        phoneHome: this.phoneHome,
                        phoneMobile: this.phoneMobile,
                        email: this.email,
                        brand: this.brand,
                        product: this.product,
                        date: this.date,
                        place: this.place,
                        // file: "",
                        freetext: this.freetext,
                        hours : this.hours
                    },
                }).then(function (response){
                    if(!!response.status && response.status == 200)
                        window.location.href = "/finish";
                })
            }
        },
        checkFile : function ($event) {
            let file = $event.target.files[0];
            let availableTypes = ['image/jpeg',  'image/png'];
            if(!(availableTypes.indexOf(file.type) + 1)){
                $event.target.value = "";
                alert("Available types: .jpeg, .jpg, .png");
            }

            if(file.size > 1048576) {
                $event.target.value = "";
                alert("Max file size 1mb");
            }
        }
    }
});