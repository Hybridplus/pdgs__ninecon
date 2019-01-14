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
                "פלטינום",
                "ברויל",
                "גלקסי",
                "רבולושן",
                "עילית",
                "פרימיום",
                "אלפא",
                "אפיק",
                "לג'נד"
            ];
        },
        productOptions: function () {
            switch (this.brand){
                case "פלטינום":
                    return [
                        "פלטינום 400",
                        "פלטינום 710",
                        "פלטינום 810",
                        "פלטינום 850",
                        "פלטינום יחידת אחסון מודולרית",
                        "פלטינום יחידת ארון לכיור מודולרית",
                        "פלטינום יחידת פינה מודולרית",
                        "פלטינום יחידת אחסון למקרר"
                    ];
                case "ברויל" :
                    return [
                        "ברויל 600"
                    ];
                case "גלקסי":
                    return [
                        "גלקסי 2 שחור",
                        "גלקסי 2 נירוסטה",
                        "גלקסי 3 שחור",
                        "גלקסי 3 נירוסטה",
                        "גלקסי 4 שחור",
                        "גלקסי 4 נירוסטה",
                        "גלקסי משולב פחמים",
                        "גלקסי יחידת ארון  לכיור מודולרית",
                        "גלקסי יחידת אחסון למקרר"
                    ];
                case "רבולושן":
                    return [
                        "רובלושן 2",
                        "רבולושן 3 שחור",
                        "רבולושן 3 נירוסטה",
                        "רבולושן 3 מגורגר",
                        "רבולושן 4 שחור",
                        "רבולושן 4 נירוסטה",
                        "רבולושן 4 מגורגר",
                        "רבולושן משולב פחמים",
                        "רבולושן יחידת אחסון מודולרית",
                        "רבולושן יחידת ארון לכיור מודולרית",
                        "רבולושן יחידת פינה מודולרית",
                        "רבולושן יחידת אחסון למקרר"
                    ];
                case "עילית":
                    return [
                        "עילית 4 שחור"
                    ];
                case "פרימיום":
                    return [
                        "גריל פרימיום 6 מבערים",
                        "גריל פרימיום 4 מבערים",
                        "כיור פרימיום שיש לבן",
                        "כיור פרימיום שיש שחור",
                        "מקרר דלת זכוכית פרימיום שיש לבן",
                        "מקרר דלת זכוכית פרימיום שיש שחור",
                        "מקרר דלת כפולה פרימיום שיש לבן",
                        "מקרר דלת  כפולה  פרימיום שיש שחור",
                        "יחידת אחסון פרימיום שיש לבן",
                        "יחידת אחסון פרימיום שיש שחור",
                        "יחידת פינה פרימיום",
                        "מקפיא דלת זכוכית פרימיום שיש לבן",
                        "מקפיא דלת זכוכית פרימיום שיש שחור",
                        "מעטפת למקרר 118 ליטר פרימיום שיש לבן",
                        "מעטפת למקרר 118 ליטר פרימיום שיש שחור",
                        "מעטפת למקרר 2 מגירות פרימיום שיש לבן",
                        "מעטפת למקרר 2 מגירות פרימיום שיש שחור",
                        "גריל בילדאין פרימיום 4 מבערים עם כירת צד",
                        "גריל בילדאין פרימיום 6 מבערים עם כירת צד",
                        "גריל בילדאין פרימיום 4 מבערים",
                        "כירת צד פרימיום דרופ אין"
                    ];
                case "אלפא":
                    return [
                        "גריל בילדאין אלפא 3 מבערים",
                        "גריל בילדאין אלפא 3 מבערים",
                        "גריל  אלפא 4 מבערים על עגלה"
                    ];
                case "אפיק":
                    return [
                        "אפיק גריל 4 מבערים",
                        "אפיק כיור",
                        "אפיק מקרר",
                        "מעטפת למקרר 118 ליטר אפיק "
                    ];
                case "לג'נד":
                    return [
                        "גריל בילטאין לג'נד 4 מבערים"
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